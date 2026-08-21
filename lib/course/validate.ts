import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type {
  AvailabilityEvidence,
  CourseBundle,
  EvidenceRef,
  EvidenceType,
  Harness,
  HarnessVariant,
  Lesson,
  Scenario,
  SourceRef,
} from "./types";

const PRIMARY_HARNESSES = ["claude", "codex", "hermes"] as const;
const COURSE_RELEASE_STATUSES = ["foundation", "internal_slice", "public_preview", "released_three_harness"] as const;
const LESSON_RELEASE_STATUSES = ["planned", "internal_slice", "public_preview", "released_three_harness"] as const;

export class CourseValidationError extends Error {
  readonly issues: string[];

  constructor(issues: string[]) {
    super(`Course validation failed:\n${issues.map((issue) => `- ${issue}`).join("\n")}`);
    this.issues = issues;
    this.name = "CourseValidationError";
  }
}

const SHA_256 = /^[a-f0-9]{64}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)?$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function nonEmptyStrings(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every(nonEmptyString);
}

function dateIsValid(value: unknown): value is string {
  return nonEmptyString(value) && ISO_DATE.test(value) && !Number.isNaN(Date.parse(value));
}

function isPrimaryHarness(value: unknown): value is Harness {
  return typeof value === "string" && (PRIMARY_HARNESSES as readonly string[]).includes(value);
}

function fileHash(filePath: string): string {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function add(issues: string[], location: string, message: string) {
  issues.push(`${location}: ${message}`);
}

function rejectUnknownKeys(
  value: unknown,
  allowed: readonly string[],
  location: string,
  issues: string[],
): value is Record<string, unknown> {
  if (!isRecord(value)) {
    add(issues, location, "must be an object");
    return false;
  }
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) add(issues, location, `unexpected key ${key}`);
  }
  return true;
}

function checkIdentity(
  identity: unknown,
  root: string,
  location: string,
  issues: string[],
  verifyManifestBytes = false,
) {
  if (!rejectUnknownKeys(identity, ["manifestPath", "origin", "licenseOrPermission", "version", "contentIdentity", "sha256"], location, issues)) {
    return;
  }

  for (const field of ["manifestPath", "origin", "licenseOrPermission", "version", "contentIdentity", "sha256"]) {
    if (!nonEmptyString(identity[field])) add(issues, location, `${field} must be a non-empty string`);
  }

  const manifestPath = identity.manifestPath;
  if (nonEmptyString(manifestPath)) {
    const resolved = path.resolve(root, manifestPath);
    if (!resolved.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(resolved)) {
      add(issues, location, "manifestPath must resolve to an existing file within the course root");
    } else if (!isSourceControlled(resolved)) {
      add(issues, location, "manifestPath must be source-controlled and not ignored");
    } else if (verifyManifestBytes) {
      const actual = fileHash(resolved);
      if (identity.sha256 !== actual) add(issues, location, "fixture manifest SHA-256 does not match disk");
      if (identity.contentIdentity !== `sha256:${actual}`) add(issues, location, "fixture manifest contentIdentity does not match disk");
    }
  }

  if (typeof identity.sha256 === "string" && !SHA_256.test(identity.sha256)) {
    add(issues, location, "sha256 must be a lowercase SHA-256 digest");
  }
  if (typeof identity.contentIdentity === "string" && !identity.contentIdentity.startsWith("sha256:")) {
    add(issues, location, "contentIdentity must be a sha256: immutable identity");
  }
}

function checkScenario(scenario: Scenario, root: string, issues: string[]) {
  const location = `scenario ${scenario.id || "<unknown>"}`;
  rejectUnknownKeys(scenario, ["id", "title", "artifactRefs", "sourceRefs", "portability"], location, issues);
  if ("synthetic" in scenario) add(issues, location, "legacy Scenario.synthetic is forbidden; use portability.synthetic");
  if (!nonEmptyString(scenario.id) || !nonEmptyString(scenario.title)) {
    add(issues, location, "id and title must be non-empty strings");
  }
  if (!isRecord(scenario.portability)) {
    add(issues, location, "must include a portability contract");
    return;
  }

  const portability = scenario.portability;
  rejectUnknownKeys(
    portability,
    ["synthetic", "locallyAvailable", "sourceControlled", "optionalIntegrationsOnly", "fixtureIdentity", "artifacts", "semanticEquivalenceStatement", "commonArtifactAcceptance", "connectedOrPaidToolAlternatives"],
    `${location}.portability`,
    issues,
  );
  for (const flag of ["synthetic", "locallyAvailable", "sourceControlled", "optionalIntegrationsOnly"] as const) {
    if (portability[flag] !== true) add(issues, location, `${flag} must be literal true`);
  }
  checkIdentity(portability.fixtureIdentity, root, `${location}.portability.fixtureIdentity`, issues, true);

  if (!nonEmptyStrings(portability.semanticEquivalenceStatement ? [portability.semanticEquivalenceStatement] : [])) {
    add(issues, location, "semanticEquivalenceStatement must be non-empty");
  }
  if (!nonEmptyStrings(portability.commonArtifactAcceptance)) {
    add(issues, location, "commonArtifactAcceptance must be a non-empty list");
  }
  if (!Array.isArray(portability.connectedOrPaidToolAlternatives)) {
    add(issues, location, "connectedOrPaidToolAlternatives must be a list");
  }
  if (!Array.isArray(portability.artifacts) || portability.artifacts.length === 0) {
    add(issues, location, "must declare learner-visible scenario artifacts");
    return;
  }

  const artifactIds = new Set<string>();
  for (const artifact of portability.artifacts) {
    const artifactLocation = `${location}.artifact ${isRecord(artifact) ? String(artifact.id ?? "<unknown>") : "<invalid>"}`;
    if (!isRecord(artifact) || !nonEmptyString(artifact.id) || !nonEmptyString(artifact.learnerVisiblePath)) {
      add(issues, artifactLocation, "id and learnerVisiblePath must be non-empty strings");
      continue;
    }
    rejectUnknownKeys(artifact, ["id", "learnerVisiblePath", "identity"], artifactLocation, issues);
    if (artifactIds.has(artifact.id)) add(issues, artifactLocation, "artifact id must be unique");
    artifactIds.add(artifact.id);
    const resolved = path.resolve(root, artifact.learnerVisiblePath);
    if (!resolved.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(resolved)) {
      add(issues, artifactLocation, "learnerVisiblePath must resolve to an existing local file inside the course root");
    } else if (fs.lstatSync(resolved).isSymbolicLink()) {
      add(issues, artifactLocation, "learnerVisiblePath may not be a symlink");
    } else if (!isSourceControlled(resolved)) {
      add(issues, artifactLocation, "learnerVisiblePath must be source-controlled and not ignored");
    }
    checkIdentity(artifact.identity, root, `${artifactLocation}.identity`, issues);
    if (isRecord(artifact.identity) && nonEmptyString(artifact.identity.sha256) && fs.existsSync(resolved)) {
      const actual = fileHash(resolved);
      if (actual !== artifact.identity.sha256) add(issues, artifactLocation, "artifact SHA-256 does not match learner-visible file");
      if (artifact.identity.contentIdentity !== `sha256:${actual}`) {
        add(issues, artifactLocation, "artifact contentIdentity does not match learner-visible file");
      }
    }
  }

  const declaredRefs = new Set(scenario.artifactRefs ?? []);
  if (declaredRefs.size !== artifactIds.size || [...artifactIds].some((id) => !declaredRefs.has(id))) {
    add(issues, location, "artifactRefs must exactly match portability artifact ids");
  }
}

function checkSourceRef(source: unknown, location: string, issues: string[]) {
  if (!rejectUnknownKeys(source, ["id", "title", "kind", "canonicalUrl", "retrievedAt", "operationalExpiresAt", "note"], location, issues)) return;
  if (!nonEmptyString(source.id) || !nonEmptyString(source.title)) {
    add(issues, location, "id and title must be non-empty strings");
  }
  if (!["current-operational-doc", "pinned-snapshot", "tutorial-judgement"].includes(String(source.kind))) {
    add(issues, location, "kind must be a known source kind");
  }
  if (source.kind === "current-operational-doc") {
    if (!nonEmptyString(source.canonicalUrl) || !dateIsValid(source.retrievedAt) || !dateIsValid(source.operationalExpiresAt)) {
      add(issues, location, "current operational sources require canonicalUrl, retrievedAt, and operationalExpiresAt");
    } else if (Date.parse(source.operationalExpiresAt) <= Date.parse(source.retrievedAt)) {
      add(issues, location, "operationalExpiresAt must be later than retrievedAt");
    }
  }
}

function sourcesById(bundle: CourseBundle): Map<string, SourceRef> {
  const result = new Map<string, SourceRef>();
  for (const registry of bundle.sources) {
    for (const source of registry.sources ?? []) result.set(source.id, source);
  }
  return result;
}

function sourceIsCurrent(source: SourceRef, reviewDate: string): boolean {
  if (source.kind !== "current-operational-doc" || !dateIsValid(source.operationalExpiresAt)) return false;
  const expiresAt = Date.parse(source.operationalExpiresAt);
  return Date.parse(reviewDate) <= expiresAt && Date.now() <= expiresAt;
}

function isSourceControlled(filePath: string): boolean {
  const repositoryPath = path.relative(process.cwd(), filePath);
  if (repositoryPath.startsWith("..") || path.isAbsolute(repositoryPath)) return false;
  try {
    execFileSync("git", ["check-ignore", "-q", "--", repositoryPath], {
      cwd: process.cwd(),
      stdio: "ignore",
    });
    return false;
  } catch {
    return true;
  }
}

function checkEvidenceRef(
  reference: EvidenceRef,
  expectedType: EvidenceType,
  root: string,
  scenario: Scenario,
  location: string,
  issues: string[],
  identities: Map<string, string>,
): boolean {
  if (!rejectUnknownKeys(reference, ["id", "type", "path", "byteLength", "sha256", "contentIdentity", "fixtureId", "fixtureIdentity", "execution", "review"], location, issues)) {
    return false;
  }
  if (reference.type !== expectedType) add(issues, location, `must have type ${expectedType}`);
  if (!nonEmptyString(reference.id) || !nonEmptyString(reference.path) || !nonEmptyString(reference.contentIdentity)) {
    add(issues, location, "id, path, and contentIdentity must be non-empty strings");
  }
  if (!Number.isInteger(reference.byteLength) || reference.byteLength < 0) {
    add(issues, location, "byteLength must be a non-negative integer");
  }
  if (!nonEmptyString(reference.sha256) || !SHA_256.test(reference.sha256)) {
    add(issues, location, "sha256 must be a lowercase SHA-256 digest");
  }
  if (!nonEmptyString(reference.contentIdentity) || !reference.contentIdentity.startsWith("sha256:")) {
    add(issues, location, "contentIdentity must be a sha256: immutable identity");
  }
  if (reference.fixtureId !== scenario.id || reference.fixtureIdentity !== scenario.portability.fixtureIdentity.contentIdentity) {
    add(issues, location, "fixtureId and fixtureIdentity must bind to the lesson scenario manifest");
  }

  const evidenceRoot = path.resolve(root, "evidence");
  const evidencePath = path.resolve(root, reference.path ?? "");
  if (!evidencePath.startsWith(`${evidenceRoot}${path.sep}`) || !fs.existsSync(evidencePath)) {
    add(issues, location, "path must resolve to an existing file beneath content/evidence");
    return false;
  }
  if (fs.lstatSync(evidencePath).isSymbolicLink()) {
    add(issues, location, "evidence path may not be a symlink");
    return false;
  }
  const contents = fs.readFileSync(evidencePath);
  const actualHash = crypto.createHash("sha256").update(contents).digest("hex");
  if (contents.byteLength !== reference.byteLength || actualHash !== reference.sha256) {
    add(issues, location, "declared byteLength or SHA-256 does not match evidence file");
  }
  if (reference.contentIdentity !== `sha256:${actualHash}`) {
    add(issues, location, "contentIdentity does not match evidence file");
  }
  const prior = identities.get(reference.contentIdentity);
  if (prior && prior !== actualHash) add(issues, location, "contentIdentity is reused for different evidence bytes");
  identities.set(reference.contentIdentity, actualHash);
  return true;
}

function checkActor(value: unknown, role: string, location: string, issues: string[]) {
  if (!rejectUnknownKeys(value, ["id", "role", "recordedAt"], location, issues)) return;
  if (!nonEmptyString(value.id) || !dateIsValid(value.recordedAt) || value.role !== role) {
    add(issues, location, `must include a ${role} identity and ISO-8601 recordedAt date`);
  }
}

function checkExecution(value: unknown, location: string, issues: string[]) {
  if (!rejectUnknownKeys(value, ["id", "harness", "executor", "executedAt"], location, issues)) return;
  if (!nonEmptyString(value.id) || !isPrimaryHarness(value.harness) || !dateIsValid(value.executedAt)) {
    add(issues, location, "must include execution id, primary harness, and ISO-8601 execution date");
  }
}

function checkReview(value: unknown, location: string, issues: string[]) {
  if (!rejectUnknownKeys(value, ["reviewer", "reviewedAt", "verdict"], location, issues)) return;
  if (!dateIsValid(value.reviewedAt) || (value.verdict !== "fit" && value.verdict !== "not-fit")) {
    add(issues, location, "must include an ISO-8601 review date and fit/not-fit verdict");
  }
}

function checkAvailabilityEvidence(
  evidence: AvailabilityEvidence | undefined,
  variant: HarnessVariant,
  lesson: Lesson,
  scenario: Scenario,
  root: string,
  issues: string[],
) {
  const location = `lesson ${lesson.slug} ${variant.harness} availabilityEvidence`;
  if (!rejectUnknownKeys(evidence, ["fixtureManifest", "executionLog", "artifact", "verificationReport", "recoveryReport", "reviewRecord", "invariantEvidence", "nonProxyAttestation"], location, issues)) {
    return;
  }
  const identities = new Map<string, string>();
  const references: Array<[keyof AvailabilityEvidence, EvidenceType]> = [
    ["fixtureManifest", "fixture-manifest"],
    ["executionLog", "execution-log"],
    ["artifact", "artifact"],
    ["verificationReport", "verification-report"],
    ["recoveryReport", "recovery-report"],
    ["reviewRecord", "review-record"],
  ];
  const ids = new Set<string>();
  for (const [field, expectedType] of references) {
    const reference = evidence[field] as EvidenceRef;
    if (checkEvidenceRef(reference, expectedType, root, scenario, `${location}.${field}`, issues, identities)) {
      if (reference.execution) checkExecution(reference.execution, `${location}.${field}.execution`, issues);
      if (reference.review) checkReview(reference.review, `${location}.${field}.review`, issues);
      if (ids.has(reference.id)) add(issues, location, "each evidence record must have a distinct id");
      ids.add(reference.id);
    }
  }
  const verification = evidence.verificationReport;
  const recovery = evidence.recoveryReport;
  if (
    verification && recovery &&
    (verification.id === recovery.id || verification.path === recovery.path || verification.sha256 === recovery.sha256 || verification.contentIdentity === recovery.contentIdentity)
  ) {
    add(issues, location, "verificationReport and recoveryReport must be distinct immutable evidence");
  }

  if (!evidence.executionLog?.execution || evidence.executionLog.execution.harness !== variant.harness || !dateIsValid(evidence.executionLog.execution.executedAt)) {
    add(issues, `${location}.executionLog`, "must record this harness execution and date");
  } else {
    checkActor(evidence.executionLog.execution.executor, "executor", `${location}.executionLog.executor`, issues);
  }
  if (!evidence.verificationReport?.execution || !dateIsValid(evidence.verificationReport.execution.executedAt)) {
    add(issues, `${location}.verificationReport`, "must record verification execution date");
  } else {
    checkActor(evidence.verificationReport.execution.executor, "verifier", `${location}.verificationReport.verifier`, issues);
  }
  if (!evidence.recoveryReport?.execution || !dateIsValid(evidence.recoveryReport.execution.executedAt)) {
    add(issues, `${location}.recoveryReport`, "must record recovery execution date");
  } else {
    checkActor(evidence.recoveryReport.execution.executor, "verifier", `${location}.recoveryReport.verifier`, issues);
  }
  if (!evidence.reviewRecord?.review || evidence.reviewRecord.review.verdict !== "fit" || !dateIsValid(evidence.reviewRecord.review.reviewedAt)) {
    add(issues, `${location}.reviewRecord`, "must record reviewer fit verdict and date");
  } else {
    checkActor(evidence.reviewRecord.review.reviewer, "reviewer", `${location}.reviewRecord.reviewer`, issues);
  }

  const invariantIds = new Set(lesson.assessment?.artifactInvariants?.map((invariant) => invariant.id) ?? []);
  const linked = new Set<string>();
  if (!Array.isArray(evidence.invariantEvidence)) {
    add(issues, location, "must link every artifact invariant to immutable evidence");
  } else {
    for (const link of evidence.invariantEvidence) {
      rejectUnknownKeys(link, ["invariantId", "evidenceIds"], `${location}.invariantEvidence`, issues);
      if (!invariantIds.has(link.invariantId) || !nonEmptyStrings(link.evidenceIds)) {
        add(issues, location, "invariant evidence links must reference known invariants and evidence ids");
      }
      linked.add(link.invariantId);
      for (const id of link.evidenceIds ?? []) if (!ids.has(id)) add(issues, location, `invariant evidence link references unknown id ${id}`);
    }
    for (const invariantId of invariantIds) if (!linked.has(invariantId)) add(issues, location, `missing evidence link for invariant ${invariantId}`);
  }

  if (variant.harness === "codex") {
    const attestation = evidence.nonProxyAttestation;
    if (!attestation) {
      add(issues, location, "Codex requires independently attested non-proxy assurance");
    } else {
      checkEvidenceRef(attestation, "non-proxy-attestation", root, scenario, `${location}.nonProxyAttestation`, issues, identities);
      if (attestation.execution) checkExecution(attestation.execution, `${location}.nonProxyAttestation.execution`, issues);
      if (attestation.review) checkReview(attestation.review, `${location}.nonProxyAttestation.review`, issues);
      if (!attestation.review || !dateIsValid(attestation.review.reviewedAt)) {
        add(issues, `${location}.nonProxyAttestation`, "must include an independent attestor identity and date");
      } else {
        checkActor(attestation.review.reviewer, "attestor", `${location}.nonProxyAttestation.attestor`, issues);
        if (attestation.review.reviewer.id === evidence.executionLog?.execution?.executor.id) {
          add(issues, `${location}.nonProxyAttestation`, "attestor must be independent of the executor");
        }
      }
    }
  } else if (evidence.nonProxyAttestation) {
    add(issues, location, "nonProxyAttestation is only valid for Codex");
  }
}

function checkAvailableVariant(
  variant: HarnessVariant,
  lesson: Lesson,
  scenario: Scenario,
  sourceMap: Map<string, SourceRef>,
  root: string,
  issues: string[],
) {
  const location = `lesson ${lesson.slug} variant ${variant.harness}`;
  for (const field of ["permissionBoundary", "expectedArtifact"] as const) {
    if (!nonEmptyString(variant[field])) add(issues, location, `${field} is required for available variants`);
  }
  for (const field of ["dataFlow", "steps", "verification", "failureModes", "recoverySteps"] as const) {
    if (!Array.isArray(variant[field]) || variant[field].length === 0) add(issues, location, `${field} must be a non-empty list for available variants`);
  }
  if (!isRecord(variant.recoveryVerification)) add(issues, location, "recoveryVerification is required for available variants");
  if (!dateIsValid(variant.sourceReviewDate)) add(issues, location, "sourceReviewDate must be a valid ISO-8601 date");
  if (!nonEmptyStrings(variant.sourceRefs)) {
    add(issues, location, "sourceRefs are required for available variants");
  } else if (dateIsValid(variant.sourceReviewDate)) {
    for (const sourceId of variant.sourceRefs) {
      const source = sourceMap.get(sourceId);
      if (!source || !sourceIsCurrent(source, variant.sourceReviewDate)) {
        add(issues, location, `source ${sourceId} is missing, stale, or not a current operational source`);
      }
    }
  }
  if (!Array.isArray(variant.dataFlow) || !variant.dataFlow.some((step) => step.stage === "input" && step.location === "local")) {
    add(issues, location, "dataFlow must declare local learner-visible input");
  }
  if (Array.isArray(variant.dataFlow) && variant.dataFlow.some((step) => step.location === "connected-service" && !step.optional)) {
    add(issues, location, "connected-service steps must be optional under the portability contract");
  }
  const failureMatchesShared = variant.failureModes?.some((failure) =>
    failure.affectedInvariantIds?.includes(lesson.sharedFailureScenario?.affectedInvariant),
  );
  if (!failureMatchesShared) add(issues, location, "failureModes must cover the shared failure scenario invariant");
  if (
    !variant.recoveryVerification?.verifiesInvariantIds?.includes(lesson.sharedFailureScenario?.affectedInvariant) ||
    !variant.recoveryVerification?.evidenceProduced?.length
  ) {
    add(issues, location, "recoveryVerification must prove the shared failure invariant with evidence");
  }
  checkAvailabilityEvidence(variant.availabilityEvidence, variant, lesson, scenario, root, issues);
}

function checkLesson(bundle: CourseBundle, lesson: Lesson, sourceMap: Map<string, SourceRef>, issues: string[]) {
  const location = `lesson ${lesson.slug || "<unknown>"}`;
  rejectUnknownKeys(
    lesson,
    ["num", "slug", "title", "summary", "learnerGoal", "scenario", "sharedSteps", "sharedOutcome", "reliabilityGoal", "privacyGoal", "sharedSafetyBoundary", "sharedFailureScenario", "sharedRecoveryOutcome", "assessment", "sourceRefs", "releaseStatus", "variants"],
    location,
    issues,
  );
  for (const field of ["slug", "title", "summary", "learnerGoal", "scenario", "sharedOutcome", "reliabilityGoal", "privacyGoal", "sharedSafetyBoundary"] as const) {
    if (!nonEmptyString(lesson[field])) add(issues, location, `${field} must be a non-empty string`);
  }
  if (!Number.isInteger(lesson.num) || lesson.num <= 0) add(issues, location, "num must be a positive integer");
  if (!(LESSON_RELEASE_STATUSES as readonly string[]).includes(lesson.releaseStatus)) add(issues, location, "releaseStatus is invalid");
  if (!Array.isArray(lesson.sharedSteps) || lesson.sharedSteps.length === 0) add(issues, location, "sharedSteps must be non-empty");
  for (const step of lesson.sharedSteps ?? []) {
    rejectUnknownKeys(step, ["title", "body"], `${location}.sharedStep`, issues);
  }
  if (!isRecord(lesson.sharedFailureScenario) || !nonEmptyString(lesson.sharedFailureScenario.observableSymptom) || !nonEmptyString(lesson.sharedFailureScenario.affectedInvariant)) {
    add(issues, location, "sharedFailureScenario must name an observable symptom and affected invariant");
  } else {
    rejectUnknownKeys(lesson.sharedFailureScenario, ["id", "trigger", "observableSymptom", "affectedInvariant"], `${location}.sharedFailureScenario`, issues);
  }
  if (!isRecord(lesson.sharedRecoveryOutcome) || !nonEmptyStrings(lesson.sharedRecoveryOutcome.acceptanceInvariantIds) || !nonEmptyStrings(lesson.sharedRecoveryOutcome.handoffEvidence)) {
    add(issues, location, "sharedRecoveryOutcome must identify invariant-bound handoff evidence");
  } else {
    rejectUnknownKeys(lesson.sharedRecoveryOutcome, ["description", "requiredArtifactState", "acceptanceInvariantIds", "handoffEvidence"], `${location}.sharedRecoveryOutcome`, issues);
  }
  if (!isRecord(lesson.assessment) || !Array.isArray(lesson.assessment.artifactInvariants) || lesson.assessment.artifactInvariants.length === 0 || !nonEmptyStrings(lesson.assessment.automated) || !nonEmptyStrings(lesson.assessment.humanReview)) {
    add(issues, location, "assessment must include artifact invariants, automated checks, and human review");
  } else {
    rejectUnknownKeys(lesson.assessment, ["artifactInvariants", "automated", "humanReview"], `${location}.assessment`, issues);
  }
  const invariantIds = new Set<string>();
  for (const invariant of lesson.assessment?.artifactInvariants ?? []) {
    rejectUnknownKeys(invariant, ["id", "description"], `${location}.assessment.artifactInvariant`, issues);
    if (!nonEmptyString(invariant.id) || !nonEmptyString(invariant.description) || invariantIds.has(invariant.id)) add(issues, location, "artifact invariants need unique ids and descriptions");
    invariantIds.add(invariant.id);
  }
  if (!invariantIds.has(lesson.sharedFailureScenario?.affectedInvariant)) add(issues, location, "shared failure invariant must be a declared artifact invariant");
  for (const invariantId of lesson.sharedRecoveryOutcome?.acceptanceInvariantIds ?? []) if (!invariantIds.has(invariantId)) add(issues, location, "shared recovery outcome references unknown invariant");

  const scenario = bundle.scenarios.find((candidate) => candidate.id === lesson.scenario);
  if (!scenario) {
    add(issues, location, "scenario must resolve to a declared portability contract");
    return;
  }
  const commonAcceptance = new Set(scenario.portability.commonArtifactAcceptance ?? []);
  if (
    commonAcceptance.size !== invariantIds.size ||
    [...invariantIds].some((invariantId) => !commonAcceptance.has(invariantId))
  ) {
    add(issues, location, "scenario commonArtifactAcceptance must exactly match lesson artifact invariants");
  }
  const harnesses = new Set<string>();
  for (const variant of lesson.variants ?? []) {
    const variantLocation = `lesson ${lesson.slug} variant ${isRecord(variant) ? String(variant.harness ?? "<unknown>") : "<invalid>"}`;
    rejectUnknownKeys(variant, ["harness", "status", "statusReason", "supportedSurface", "sourceRefs", "sourceReviewDate", "prerequisites", "permissionBoundary", "dataFlow", "steps", "expectedArtifact", "verification", "failureModes", "recoverySteps", "recoveryVerification", "limitations", "availabilityEvidence"], variantLocation, issues);
    for (const step of variant.dataFlow ?? []) rejectUnknownKeys(step, ["stage", "data", "location", "trustBoundary", "optional"], `${variantLocation}.dataFlow`, issues);
    for (const step of variant.steps ?? []) rejectUnknownKeys(step, ["title", "body", "prompt", "command"], `${variantLocation}.step`, issues);
    for (const failure of variant.failureModes ?? []) rejectUnknownKeys(failure, ["id", "condition", "observableSymptom", "affectedInvariantIds"], `${variantLocation}.failureMode`, issues);
    for (const recovery of variant.recoverySteps ?? []) rejectUnknownKeys(recovery, ["order", "action", "expectedEvidence"], `${variantLocation}.recoveryStep`, issues);
    if (variant.recoveryVerification !== undefined) rejectUnknownKeys(variant.recoveryVerification, ["method", "evidenceProduced", "verifiesInvariantIds", "humanReviewStillRequired"], `${variantLocation}.recoveryVerification`, issues);
    if (!isPrimaryHarness(variant.harness) || harnesses.has(variant.harness)) add(issues, location, "variants must have unique primary harnesses");
    harnesses.add(variant.harness);
    if (variant.status === "available") checkAvailableVariant(variant, lesson, scenario, sourceMap, bundle.root, issues);
    if (variant.status !== "available" && !nonEmptyString(variant.statusReason)) add(issues, `lesson ${lesson.slug} ${variant.harness}`, "draft and unavailable variants require statusReason");
  }
  for (const harness of PRIMARY_HARNESSES) if (!harnesses.has(harness)) add(issues, location, `missing ${harness} variant`);
  if (lesson.releaseStatus === "released_three_harness" && [...harnesses].some((harness) => lesson.variants.find((variant) => variant.harness === harness)?.status !== "available")) {
    add(issues, location, "released_three_harness lessons require all primary variants available");
  }
}

function checkComparison(comparison: unknown, issues: string[]) {
  const location = `comparison ${isRecord(comparison) ? String(comparison.id ?? "<unknown>") : "<invalid>"}`;
  if (!rejectUnknownKeys(comparison, ["id", "status", "role", "notPrimaryHarness", "notLessonVariant", "sources", "summary", "facts"], location, issues)) return;
  if (!nonEmptyString(comparison.id) || comparison.status !== "draft" || comparison.role !== "comparison-only") {
    add(issues, location, "must be a draft comparison-only record with a non-empty id");
  }
  if (comparison.notPrimaryHarness !== true || comparison.notLessonVariant !== true) {
    add(issues, location, "must explicitly forbid primary harness and lesson variant use");
  }
  if (!nonEmptyString(comparison.summary) || !nonEmptyStrings(comparison.facts)) {
    add(issues, location, "summary and facts must be non-empty");
  }
  if (!Array.isArray(comparison.sources) || comparison.sources.length === 0) {
    add(issues, location, "must include at least one source");
  } else {
    comparison.sources.forEach((source) => checkSourceRef(source, `${location}.source`, issues));
  }
}

export function validateCourse(bundle: CourseBundle): void {
  const issues: string[] = [];
  rejectUnknownKeys(bundle.course, ["title", "releaseStatus", "primaryHarnesses", "contentReviewedAt"], "course", issues);
  if (!(COURSE_RELEASE_STATUSES as readonly string[]).includes(bundle.course.releaseStatus)) {
    add(issues, "course", "releaseStatus is invalid");
  }
  if (
    !Array.isArray(bundle.course.primaryHarnesses) ||
    bundle.course.primaryHarnesses.length !== PRIMARY_HARNESSES.length ||
    PRIMARY_HARNESSES.some((harness) => !bundle.course.primaryHarnesses.includes(harness))
  ) {
    add(issues, "course", "primaryHarnesses must be exactly claude, codex, and hermes");
  }
  const sourceMap = sourcesById(bundle);
  const sourceIds = new Set<string>();
  for (const registry of bundle.sources) {
    rejectUnknownKeys(registry, ["provider", "sources"], `source registry ${registry.provider ?? "<unknown>"}`, issues);
    if (!isPrimaryHarness(registry.provider)) add(issues, "source registry", "provider must be a primary harness");
    if (!Array.isArray(registry.sources)) {
      add(issues, "source registry", "sources must be a list");
      continue;
    }
    for (const source of registry.sources) {
      const sourceLocation = `source ${isRecord(source) ? String(source.id ?? "<unknown>") : "<invalid>"}`;
      checkSourceRef(source, sourceLocation, issues);
      if (!isRecord(source)) continue;
      if (!nonEmptyString(source.id) || sourceIds.has(source.id)) add(issues, "source registry", "source ids must be unique and non-empty");
      sourceIds.add(source.id);
    }
  }
  const scenarioIds = new Set<string>();
  for (const scenario of bundle.scenarios) {
    if (scenarioIds.has(scenario.id)) add(issues, "scenarios", `duplicate scenario id ${scenario.id}`);
    scenarioIds.add(scenario.id);
    checkScenario(scenario, bundle.root, issues);
  }
  for (const comparison of bundle.comparisons) checkComparison(comparison, issues);
  const lessonSlugs = new Set<string>();
  const lessonNumbers = new Set<number>();
  for (const lesson of bundle.lessons) {
    if (lessonSlugs.has(lesson.slug) || lessonNumbers.has(lesson.num)) add(issues, "lessons", "lesson slugs and numbers must be unique");
    lessonSlugs.add(lesson.slug);
    lessonNumbers.add(lesson.num);
    checkLesson(bundle, lesson, sourceMap, issues);
  }
  if (bundle.course.releaseStatus === "released_three_harness") {
    const complete = bundle.lessons.length === 6 && bundle.lessons.every(
      (lesson) => lesson.releaseStatus === "released_three_harness" && lesson.variants.every((variant) => variant.status === "available"),
    );
    if (!complete) add(issues, "course", "released_three_harness requires six released lessons and all 18 variants available");
  }
  if (bundle.course.releaseStatus === "foundation" || bundle.course.releaseStatus === "internal_slice") {
    if (bundle.lessons.some((lesson) => lesson.releaseStatus === "released_three_harness")) {
      add(issues, "course", "foundation/internal_slice courses cannot contain released_three_harness lessons");
    }
  }
  if (issues.length > 0) throw new CourseValidationError(issues);
}
