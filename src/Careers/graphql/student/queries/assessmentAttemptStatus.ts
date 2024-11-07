import { gql } from '@apollo/client';

import { AssessmentStatuses, AssessmentType } from '@dc/resources/enums';

export default gql`
  query AssessmentAttemptStatus {
    assessmentProgress {
      attempt {
        assessmentType
        updatedAt
        id
        status
      }
    }
  }
`;

export type TAssessmentProgressAttempt = {
  assessmentType: AssessmentType;
  id: string;
  status: AssessmentStatuses;
};

export type TAssessmentProgress = {
  attempt: TAssessmentProgressAttempt;
};

export type TAssessmentAttemptStatusData = {
  assessmentProgress: TAssessmentProgress;
};
