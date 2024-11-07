import { gql, TypedDocumentNode } from '@apollo/client';

import {
  ASSESSMENT_ATTEMPT_STATUS,
  ASSESSMENT_STATUSES,
  ASSESSMENT_TYPES,
} from '@dc/resources/enums';

export const ASSESSMENT_STEPS_QUERY: TypedDocumentNode<TAssessmentSteps, null> = gql`
  query AssessmentSteps {
    assessmentProgress {
      attempt {
        assessmentType
        id
        status
      }
      interestsAnswers {
        checked
        option {
          id
          group {
            id
          }
        }
      }
      status {
        interests
        studyPreferences
        workValues
        reviewSurvey
      }
      studyPreferencesAnswers {
        option {
          id
        }
        position
      }
      workValuesAnswers {
        option {
          id
        }
        tokens
      }
      reviewSurveyAnswers {
        answer
        id
        question {
          id
        }
      }
    }
  }
`;

type InterestOption = {
  id: string;
  group: {
    id: string;
  };
};

type StudyPreferencesOption = {
  id: string;
};

type WorkValuesOption = {
  id: string;
};

type TAssessmentSteps = {
  assessmentProgress: {
    attempt: {
      assessmentType: ASSESSMENT_TYPES;
      id: string;
      status: ASSESSMENT_ATTEMPT_STATUS;
    };
    interestsAnswers: {
      checked: boolean;
      option: InterestOption;
    };
    status: {
      interests: ASSESSMENT_STATUSES;
      studyPreferences: ASSESSMENT_STATUSES;
      workValues: ASSESSMENT_STATUSES;
      reviewSurvey: ASSESSMENT_STATUSES;
    };
    studyPreferencesAnswers: {
      option: StudyPreferencesOption;
      position: number;
    };
    workValuesAnswers: {
      option: WorkValuesOption;
      tokens: number;
    };
    reviewSurveyAnswers: {
      answer: string;
      id: string;
      question: {
        id: string;
      };
    };
  };
};
