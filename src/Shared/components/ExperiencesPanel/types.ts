export enum ServiceName {
  LEARNING = 'LEARNING',
  CAREERS = 'CAREERS',
}

export type Submission = {
  submittedAt: string;
  submissionName: string;
  contextName: string;
  service: ServiceName;
};
