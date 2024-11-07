export type TCatalog = {
  id: string;
  name: string;
};

export type THierarchyMetrics = {
  entitiesCount: number;
  schoolClassesCount: number;
  studentsCount: number;
  teachersCount: number;
};

export type TPlan = {
  id: string;
  name: string;
};

export type TSettings = {
  assessmentEnabled: boolean;
  assessmentType: string;
  onboardingEnabled: boolean;
  selfEvaluationEnabled: boolean;
};

export type TStandardSet = {
  id: string;
  name: string;
};

export type EntityInfoContentHierarchyMetrics = {
  entitiesCount: number;
  schoolClassesCount: number;
  studentsCount: number;
  teachersCount: number;
};

export type EntityInfoContentSettings = {
  assessmentEnabled: boolean;
  assessmentType: 'HIGH_SCHOOL' | 'MIDDLE_SCHOOL';
  onboardingEnabled: boolean;
};

export const EDUCATIONAL_SETTINGS_TYPES = {
  HIGH_SCHOOL: 'HIGH_SCHOOL',
  MIDDLE_SCHOOL: 'MIDDLE_SCHOOL',
};

export const EDUCATIONAL_RESOURCE_TYPES = {
  COURSE: 'course',
  ENTITY: 'entity',
  SCHOOLCLASS: 'schoolClass',
  STUDENT: 'student',
};
