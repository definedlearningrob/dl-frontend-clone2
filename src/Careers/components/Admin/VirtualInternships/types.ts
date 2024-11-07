import { TOpportunity as TBaseOpportunity } from '@dc/resources/types';

export const enum VirtualInternshipStatuses {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export type VirtualInternshipLessonAttributes = {
  lessonId: string;
  step: number;
};

export type FormValues = {
  badges: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
  description: string;
  name: string;
  pathways: {
    label: string;
    value: string;
  }[];
  availableSpots: number;
  creditsOutcomes: string;
  image: Record<string, unknown>;
  tags: {
    label: string;
    value: string;
  }[];
  requiredExperiences: number;
  status: { value: VirtualInternshipStatuses; label: string };
  calendarLessons: Lesson[];
  experienceOpportunityLessons: Lesson[];
  postExperienceLessons: Lesson[];
  readinessSkillsLessons: Lesson[];
};

export type TPathway = Pick<TBaseOpportunity['pathways'][number], 'id' | 'name'>;

export type TOpportunity = Pick<
  TBaseOpportunity,
  | 'id'
  | 'name'
  | 'availableSpots'
  | 'creditsOutcomes'
  | 'description'
  | 'imageUrl'
  | 'opportunityType'
  | 'tags'
  | 'salaryInformation'
> & {
  pathways: TPathway[];
};

export type Lesson = {
  id: string;
  step: number;
  name: string;
  imageUrl: string;
  thumbnailUrl: string;
  type: string;
};

export type TVirtualInternship = {
  archivedAt: string | null;
  badges: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
  id: string;
  opportunity: TOpportunity;
  requiredExperiences: number;
  status: VirtualInternshipStatuses;
  calendarLessons: Lesson[];
  experienceOpportunityLessons: Lesson[];
  postExperienceLessons: Lesson[];
  readinessSkillsLessons: Lesson[];
};
