import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { loadCourse } from "../../lib/course/load.ts";
import { CourseValidationError, validateCourse } from "../../lib/course/validate.ts";

const repositoryRoot = process.cwd();
const fixtureRoot = path.join(repositoryRoot, "tests/fixtures/course/content");
const fixtureManifestPath = "scenarios/bounded-brief/fixture-manifest.json";
const fixtureArtifactPath = "scenarios/bounded-brief/inbox.json";
const fixtureId = "bounded-brief";

function digest(relativePath) {
  const bytes = fs.readFileSync(path.join(fixtureRoot, relativePath));
  return { bytes, sha256: crypto.createHash("sha256").update(bytes).digest("hex") };
}

function identity(contentPath, manifestPath = fixtureManifestPath) {
  const { sha256 } = digest(contentPath);
  return {
    manifestPath,
    origin: "Test-only synthetic fixture",
    licenseOrPermission: "Test fixture",
    version: "1",
    contentIdentity: `sha256:${sha256}`,
    sha256,
  };
}

function evidence(id, type, relativePath, harness, options = {}) {
  const { bytes, sha256 } = digest(relativePath);
  return {
    id,
    type,
    path: relativePath,
    byteLength: bytes.byteLength,
    sha256,
    contentIdentity: `sha256:${sha256}`,
    fixtureId,
    fixtureIdentity: identity(fixtureManifestPath).contentIdentity,
    ...options,
  };
}

function availabilityEvidence(harness, includeNonProxy = true) {
  const execution = {
    id: `fixture-${harness}-execution`,
    harness,
    executor: { id: "test-executor", role: "executor", recordedAt: "2026-08-20T09:00:00Z" },
    executedAt: "2026-08-20T09:00:00Z",
  };
  const verificationExecution = {
    id: `fixture-${harness}-verification`,
    harness,
    executor: { id: "test-verifier", role: "verifier", recordedAt: "2026-08-20T09:10:00Z" },
    executedAt: "2026-08-20T09:10:00Z",
  };
  const recoveryExecution = {
    id: `fixture-${harness}-recovery`,
    harness,
    executor: { id: "test-recovery-verifier", role: "verifier", recordedAt: "2026-08-20T09:20:00Z" },
    executedAt: "2026-08-20T09:20:00Z",
  };
  const result = {
    fixtureManifest: evidence("fixture-manifest", "fixture-manifest", "evidence/fixture-manifest.txt", harness),
    executionLog: evidence("execution-log", "execution-log", "evidence/execution.log", harness, { execution }),
    artifact: evidence("artifact", "artifact", "evidence/artifact.txt", harness),
    verificationReport: evidence("verification-report", "verification-report", "evidence/verification.json", harness, { execution: verificationExecution }),
    recoveryReport: evidence("recovery-report", "recovery-report", "evidence/recovery.json", harness, { execution: recoveryExecution }),
    reviewRecord: evidence("review-record", "review-record", "evidence/review.json", harness, {
      review: {
        reviewer: { id: "test-reviewer", role: "reviewer", recordedAt: "2026-08-20T09:30:00Z" },
        reviewedAt: "2026-08-20T09:30:00Z",
        verdict: "fit",
      },
    }),
    invariantEvidence: [
      { invariantId: "request", evidenceIds: ["artifact", "verification-report"] },
      { invariantId: "untrusted", evidenceIds: ["artifact", "recovery-report"] },
    ],
  };
  if (harness === "codex" && includeNonProxy) {
    result.nonProxyAttestation = evidence("non-proxy", "non-proxy-attestation", "evidence/non-proxy.json", harness, {
      review: {
        reviewer: { id: "test-attestor", role: "attestor", recordedAt: "2026-08-20T09:40:00Z" },
        reviewedAt: "2026-08-20T09:40:00Z",
        verdict: "fit",
      },
    });
  }
  return result;
}

function availableVariant(harness, includeNonProxy = true) {
  return {
    harness,
    status: "available",
    sourceRefs: [`${harness}-current`],
    sourceReviewDate: "2026-08-20",
    prerequisites: ["Use the local fixture only."],
    permissionBoundary: "Do not send, delete, or connect external data.",
    dataFlow: [
      {
        stage: "input",
        data: ["synthetic inbox"],
        location: "local",
        trustBoundary: "Local learner-visible fixture.",
        optional: false,
      },
      {
        stage: "processing",
        data: ["synthetic inbox"],
        location: "provider",
        trustBoundary: "Selected harness processes only the fixture.",
        optional: false,
      },
    ],
    steps: [{ title: "Write brief", body: "Produce the bounded brief from the local fixture." }],
    expectedArtifact: "A cited bounded brief.",
    verification: ["Check both artifact invariants."],
    failureModes: [
      {
        id: "follows-untrusted",
        condition: "The output follows the untrusted message.",
        observableSymptom: "The brief proposes deletion.",
        affectedInvariantIds: ["untrusted"],
      },
    ],
    recoverySteps: [{ order: 1, action: "Rewrite from the legitimate message.", expectedEvidence: "Corrected brief." }],
    recoveryVerification: {
      method: "Check corrected brief against artifact invariants.",
      evidenceProduced: ["recovery report"],
      verifiesInvariantIds: ["untrusted"],
      humanReviewStillRequired: ["Clarify the safe next step."],
    },
    limitations: ["Test-only fixture."],
    availabilityEvidence: availabilityEvidence(harness, includeNonProxy),
  };
}

function bundleWithAvailable(harness, includeNonProxy = true) {
  const otherVariants = ["claude", "codex", "hermes"]
    .filter((candidate) => candidate !== harness)
    .map((candidate) => ({
      harness: candidate,
      status: "unavailable",
      statusReason: "Not part of this focused availability fixture.",
      sourceRefs: [],
      prerequisites: [],
    }));
  return {
    root: fixtureRoot,
    course: {
      title: "Test course",
      releaseStatus: "internal_slice",
      primaryHarnesses: ["claude", "codex", "hermes"],
    },
    sources: ["claude", "codex", "hermes"].map((provider) => ({
      provider,
      sources: [{
        id: `${provider}-current`,
        title: "Test operational source",
        kind: "current-operational-doc",
        canonicalUrl: "https://example.invalid/test-source",
        retrievedAt: "2026-08-20",
        operationalExpiresAt: "2099-01-01",
      }],
    })),
    scenarios: [{
      id: fixtureId,
      title: "Test bounded brief",
      artifactRefs: ["inbox"],
      sourceRefs: [],
      portability: {
        synthetic: true,
        locallyAvailable: true,
        sourceControlled: true,
        optionalIntegrationsOnly: true,
        fixtureIdentity: identity(fixtureManifestPath),
        artifacts: [{ id: "inbox", learnerVisiblePath: fixtureArtifactPath, identity: identity(fixtureArtifactPath) }],
        semanticEquivalenceStatement: "Every harness receives the same local test inbox and acceptance checks.",
        commonArtifactAcceptance: ["request", "untrusted"],
        connectedOrPaidToolAlternatives: [],
      },
    }],
    lessons: [{
      num: 1,
      slug: "test-bounded-brief",
      title: "Test bounded brief",
      summary: "Test summary.",
      learnerGoal: "Create a safe brief.",
      scenario: fixtureId,
      sharedSteps: [{ title: "Read", body: "Read the fixture." }],
      sharedOutcome: "A checked brief.",
      reliabilityGoal: "Do not follow untrusted content.",
      privacyGoal: "Use only test fixture data.",
      sharedSafetyBoundary: "No external actions.",
      sharedFailureScenario: {
        id: "follows-untrusted",
        trigger: "Output follows untrusted message.",
        observableSymptom: "Output proposes deletion.",
        affectedInvariant: "untrusted",
      },
      sharedRecoveryOutcome: {
        description: "Corrected brief restores the trusted request.",
        requiredArtifactState: ["Trusted request retained."],
        acceptanceInvariantIds: ["request", "untrusted"],
        handoffEvidence: ["Corrected brief."],
      },
      assessment: {
        artifactInvariants: [
          { id: "request", description: "Brief identifies trusted request." },
          { id: "untrusted", description: "Brief records and does not follow untrusted content." },
        ],
        automated: ["Check invariants."],
        humanReview: ["Review clarity."],
      },
      sourceRefs: [],
      releaseStatus: "internal_slice",
      variants: [availableVariant(harness, includeNonProxy), ...otherVariants],
    }],
  };
}

function expectInvalid(bundle, fragment) {
  assert.throws(
    () => validateCourse(bundle),
    (error) => error instanceof CourseValidationError && error.message.includes(fragment),
  );
}

test("loads and validates the additive Phase 1 foundation", () => {
  const bundle = loadCourse(path.join(repositoryRoot, "content"));
  assert.equal(bundle.course.releaseStatus, "foundation");
  assert.equal(bundle.lessons.length, 1);
  assert.doesNotThrow(() => validateCourse(bundle));
});

test("the common available gate applies to Claude, Codex, and Hermes", () => {
  for (const harness of ["claude", "codex", "hermes"]) {
    assert.doesNotThrow(() => validateCourse(bundleWithAvailable(harness)));
  }
});

test("Codex additionally requires independent non-proxy evidence", () => {
  expectInvalid(bundleWithAvailable("codex", false), "Codex requires independently attested non-proxy assurance");
});

test("rejects missing recovery verification for an available path", () => {
  const bundle = bundleWithAvailable("claude");
  delete bundle.lessons[0].variants[0].recoveryVerification;
  expectInvalid(bundle, "recoveryVerification is required");
});

test("rejects stale operational sources for every available harness", () => {
  const bundle = bundleWithAvailable("hermes");
  bundle.lessons[0].variants[0].sourceReviewDate = "2019-01-01";
  bundle.sources.find((registry) => registry.provider === "hermes").sources[0].operationalExpiresAt = "2020-01-01";
  expectInvalid(bundle, "stale");
});

test("rejects non-distinct normal verification and recovery evidence", () => {
  const bundle = bundleWithAvailable("claude");
  const evidence = bundle.lessons[0].variants[0].availabilityEvidence;
  evidence.recoveryReport = evidence.verificationReport;
  expectInvalid(bundle, "must be distinct immutable evidence");
});

test("rejects altered immutable evidence bytes or hash declarations", () => {
  const bundle = bundleWithAvailable("claude");
  bundle.lessons[0].variants[0].availabilityEvidence.artifact.sha256 = "0".repeat(64);
  expectInvalid(bundle, "SHA-256 does not match evidence file");
});

test("rejects evidence bound to a different fixture or incomplete invariant coverage", () => {
  const fixtureMismatch = bundleWithAvailable("claude");
  fixtureMismatch.lessons[0].variants[0].availabilityEvidence.executionLog.fixtureId = "other-fixture";
  expectInvalid(fixtureMismatch, "fixtureId and fixtureIdentity");

  const missingInvariant = bundleWithAvailable("claude");
  missingInvariant.lessons[0].variants[0].availabilityEvidence.invariantEvidence = [
    { invariantId: "request", evidenceIds: ["artifact"] },
  ];
  expectInvalid(missingInvariant, "missing evidence link for invariant untrusted");
});

test("rejects a portability flag that is not literally true", () => {
  const bundle = bundleWithAvailable("claude");
  bundle.scenarios[0].portability.locallyAvailable = false;
  expectInvalid(bundle, "locallyAvailable must be literal true");
});

test("rejects unexpected keys at every parsed schema boundary", () => {
  const cases = [
    [(bundle) => { bundle.course.unexpected = true; }, "course"],
    [(bundle) => { bundle.sources[0].unexpected = true; }, "source registry"],
    [(bundle) => { bundle.sources[0].sources[0].unexpected = true; }, "source"],
    [(bundle) => { bundle.scenarios[0].unexpected = true; }, "scenario"],
    [(bundle) => { bundle.scenarios[0].portability.unexpected = true; }, "portability"],
    [(bundle) => { bundle.scenarios[0].portability.artifacts[0].identity.unexpected = true; }, "identity"],
    [(bundle) => { bundle.lessons[0].sharedFailureScenario.unexpected = true; }, "sharedFailureScenario"],
    [(bundle) => { bundle.lessons[0].sharedRecoveryOutcome.unexpected = true; }, "sharedRecoveryOutcome"],
    [(bundle) => { bundle.lessons[0].assessment.unexpected = true; }, "assessment"],
    [(bundle) => { bundle.lessons[0].variants[0].dataFlow[0].unexpected = true; }, "dataFlow"],
    [(bundle) => { bundle.lessons[0].variants[0].failureModes[0].unexpected = true; }, "failureMode"],
    [(bundle) => { bundle.lessons[0].variants[0].recoveryVerification.unexpected = true; }, "recoveryVerification"],
    [(bundle) => { bundle.lessons[0].variants[0].availabilityEvidence.artifact.unexpected = true; }, "availabilityEvidence.artifact"],
  ];
  for (const [mutate] of cases) {
    const bundle = bundleWithAvailable("claude");
    mutate(bundle);
    expectInvalid(bundle, "unexpected key unexpected");
  }
});

test("rejects fixture identity manifests whose declared bytes or identity do not match disk", () => {
  const hashMismatch = bundleWithAvailable("claude");
  hashMismatch.scenarios[0].portability.fixtureIdentity.sha256 = "0".repeat(64);
  expectInvalid(hashMismatch, "fixture manifest SHA-256 does not match disk");

  const identityMismatch = bundleWithAvailable("claude");
  identityMismatch.scenarios[0].portability.fixtureIdentity.contentIdentity = `sha256:${"0".repeat(64)}`;
  expectInvalid(identityMismatch, "fixture manifest contentIdentity does not match disk");
});

test("rejects an incomplete tri-harness release claim", () => {
  const bundle = bundleWithAvailable("claude");
  bundle.course.releaseStatus = "released_three_harness";
  expectInvalid(bundle, "requires six released lessons and all 18 variants available");
});
