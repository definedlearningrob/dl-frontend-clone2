import {
  SERVICE_NAME,
  CONTACT_LINK_TYPES,
  EVIDENCE_KIND,
  STATEMENT_QUESTION_TYPE,
  EVIDENCE_CONTEXT_KIND,
} from '@shared/resources/enums';
import { TPortfolioProject } from '@shared/components/Portfolio/types';

export type TFile = {
  filename: string;
  googleWeblink: string | null;
  id: string;
  source: string;
  submitter: {
    uuid: string;
    firstName: string | null;
    lastName: string | null;
  };
  url: string;
  previewUrl?: string;
  createdAt: string;
};

export type GoogleUploadHandlerData = {
  data: {
    action: 'picked' | unknown;
    docs: GoogleUploadDocument[];
  };
  token: string;
};

export type GoogleUploadDocument = {
  name: string;
  id: string;
  sizeBytes: string;
};

export type ContactLink = {
  id: string;
  type: CONTACT_LINK_TYPES;
  value: string;
  visible: boolean;
};

export type StudentBadgeResource = {
  id: string;
  name: string;
};

export type Badge = {
  id: string;
  imageUrl: string;
  description: string;
  name: string;
  isHighlighted: boolean;
  resource: StudentBadgeResource;
};

export type BadgeGroupedById = {
  id: string;
  description: string;
  imageUrl: string;
  name: string;
  isHighlighted: boolean;
  resources: StudentBadgeResource[];
};

export type Resume = {
  avatarUrl: string;
  bio: string;
  shareCode: string;
  contactLinks: ContactLink[];
  highlightedProjectsEnabled: boolean;
  id: string;
  name: string;
  sharedUrl: string;
  sharedUrlEnabled: boolean;
  experiences: ResumeItemAttributes[];
  educations: ResumeItemAttributes[];
  extraCurriculars: ResumeItemAttributes[];
  externalResumes?: TExternalResumes[];
  highlightedProjects: TPortfolioProject[];
  personalProjects: { nodes: TPortfolioProject[] };
  dcProjects: { nodes: TPortfolioProject[] };
  dlProjects: { nodes: TPortfolioProject[] };
  badges: Badge[];
  highlightedBadges: Badge[];
};

export type ResumeItemAttributes = {
  description: string;
  endedAt: string;
  id?: string;
  name: string;
  startedAt: string;
  visible?: boolean;
};

export type PlanStatement = {
  id: string;
  name: string;
  isLocked: boolean;
  isRequired: boolean;
  evaluationId: string;
  archivedAt: string;
  step: number;
  group: PlanGroup;
  question?: {
    text: string;
    questionType: STATEMENT_QUESTION_TYPE;
    options: {
      option: string;
      step: number;
    }[];
  };
};

export type PlanGroup = {
  id: string;
  displayName: string;
  description: string;
  statements: PlanStatement[];
  archivedAt: string;
  name: string;
  step: number;
};

export type TEvidence = {
  contextType: EVIDENCE_CONTEXT_KIND | null;
  id: string | null;
  isTeamSubmission: boolean;
  itemId: string | null;
  label: string;
  rubricScores: { currentScore: number; maxScore: number; label: string }[] | null;
  service: SERVICE_NAME;
  type: EVIDENCE_KIND;
  updatedAt: Date;
};

export type TExternalResumes = {
  id: string;
  url: string;
  filename: string;
};
