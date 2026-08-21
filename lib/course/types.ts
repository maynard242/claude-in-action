export const PRIMARY_HARNESSES = ["claude", "codex", "hermes"] as const;

export type Harness = (typeof PRIMARY_HARNESSES)[number];
export type VariantStatus = "available" | "draft" | "unavailable";
export type LessonReleaseStatus =
  | "planned"
  | "internal_slice"
  | "public_preview"
  | "released_three_harness";
export type CourseReleaseStatus =
  | "foundation"
  | "internal_slice"
  | "public_preview"
  | "released_three_harness";
export type SourceKind =
  | "current-operational-doc"
  | "pinned-snapshot"
  | "tutorial-judgement";

export type SourceRef = {
  id: string;
  title: string;
  kind: SourceKind;
  canonicalUrl?: string;
  retrievedAt?: string;
  operationalExpiresAt?: string;
  note?: string;
};

export type SourceRegistry = {
  provider: Harness;
  sources: SourceRef[];
};

export type ImmutableIdentity = {
  manifestPath: string;
  origin: string;
  licenseOrPermission: string;
  version: string;
  contentIdentity: string;
  sha256: string;
};

export type ScenarioArtifact = {
  id: string;
  learnerVisiblePath: string;
  identity: ImmutableIdentity;
};

export type ScenarioPortability = {
  synthetic: true;
  locallyAvailable: true;
  sourceControlled: true;
  optionalIntegrationsOnly: true;
  fixtureIdentity: ImmutableIdentity;
  artifacts: ScenarioArtifact[];
  semanticEquivalenceStatement: string;
  commonArtifactAcceptance: string[];
  connectedOrPaidToolAlternatives: string[];
};

export type Scenario = {
  id: string;
  title: string;
  artifactRefs: string[];
  sourceRefs: string[];
  portability: ScenarioPortability;
};

export type SharedFailureScenario = {
  id: string;
  trigger: string;
  observableSymptom: string;
  affectedInvariant: string;
};

export type SharedRecoveryOutcome = {
  description: string;
  requiredArtifactState: string[];
  acceptanceInvariantIds: string[];
  handoffEvidence: string[];
};

export type DataFlowStep = {
  stage: "input" | "processing" | "tool-call" | "output" | "persistence" | "handoff";
  data: string[];
  location: "local" | "provider" | "connected-service" | "learner-controlled-export";
  trustBoundary: string;
  optional: boolean;
};

export type FailureMode = {
  id: string;
  condition: string;
  observableSymptom: string;
  affectedInvariantIds: string[];
};

export type RecoveryStep = {
  order: number;
  action: string;
  expectedEvidence: string;
};

export type RecoveryVerification = {
  method: string;
  evidenceProduced: string[];
  verifiesInvariantIds: string[];
  humanReviewStillRequired: string[];
};

export type EvidenceType =
  | "fixture-manifest"
  | "execution-log"
  | "artifact"
  | "verification-report"
  | "recovery-report"
  | "review-record"
  | "non-proxy-attestation";

export type EvidenceActor = {
  id: string;
  role: "executor" | "verifier" | "reviewer" | "attestor";
  recordedAt: string;
};

export type EvidenceRef = {
  id: string;
  type: EvidenceType;
  path: string;
  byteLength: number;
  sha256: string;
  contentIdentity: string;
  fixtureId: string;
  fixtureIdentity: string;
  execution?: {
    id: string;
    harness: Harness;
    executor: EvidenceActor;
    executedAt: string;
  };
  review?: {
    reviewer: EvidenceActor;
    reviewedAt: string;
    verdict: "fit" | "not-fit";
  };
};

export type InvariantEvidenceLink = {
  invariantId: string;
  evidenceIds: string[];
};

export type AvailabilityEvidence = {
  fixtureManifest: EvidenceRef;
  executionLog: EvidenceRef;
  artifact: EvidenceRef;
  verificationReport: EvidenceRef;
  recoveryReport: EvidenceRef;
  reviewRecord: EvidenceRef;
  invariantEvidence: InvariantEvidenceLink[];
  nonProxyAttestation?: EvidenceRef;
};

export type HarnessVariant = {
  harness: Harness;
  status: VariantStatus;
  statusReason?: string;
  supportedSurface?: string;
  sourceRefs: string[];
  sourceReviewDate?: string;
  prerequisites: string[];
  permissionBoundary?: string;
  dataFlow?: DataFlowStep[];
  steps?: { title: string; body: string; prompt?: string; command?: string }[];
  expectedArtifact?: string;
  verification?: string[];
  failureModes?: FailureMode[];
  recoverySteps?: RecoveryStep[];
  recoveryVerification?: RecoveryVerification;
  limitations?: string[];
  availabilityEvidence?: AvailabilityEvidence;
};

export type ArtifactInvariant = {
  id: string;
  description: string;
};

export type Lesson = {
  num: number;
  slug: string;
  title: string;
  summary: string;
  learnerGoal: string;
  scenario: string;
  sharedSteps: { title: string; body: string }[];
  sharedOutcome: string;
  reliabilityGoal: string;
  privacyGoal: string;
  sharedSafetyBoundary: string;
  sharedFailureScenario: SharedFailureScenario;
  sharedRecoveryOutcome: SharedRecoveryOutcome;
  assessment: {
    artifactInvariants: ArtifactInvariant[];
    automated: string[];
    humanReview: string[];
  };
  sourceRefs: string[];
  releaseStatus: LessonReleaseStatus;
  variants: HarnessVariant[];
};

export type Course = {
  title: string;
  releaseStatus: CourseReleaseStatus;
  primaryHarnesses: Harness[];
  contentReviewedAt?: string;
};

export type CourseBundle = {
  root: string;
  course: Course;
  sources: SourceRegistry[];
  scenarios: Scenario[];
  lessons: Lesson[];
};
