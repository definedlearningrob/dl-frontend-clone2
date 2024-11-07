import { gql } from '@apollo/client';

export default gql`
  mutation SaveAssessmentProgress(
    $async: Boolean
    $attemptId: ID!
    $interestsAnswers: [InterestsAnswerAttributes!]!
    $studyPreferencesAnswers: [StudyPreferencesAnswerAttributes!]!
    $workValuesAnswers: [WorkValuesAnswerAttributes!]!
  ) {
    createInterestsAnswers(
      input: { attemptId: $attemptId, async: $async, answers: $interestsAnswers }
    ) {
      status
    }

    createWorkValuesAnswers(
      input: { attemptId: $attemptId, async: $async, answers: $workValuesAnswers }
    ) {
      status
    }

    createStudyPreferencesAnswers(
      input: { attemptId: $attemptId, async: $async, answers: $studyPreferencesAnswers }
    ) {
      status
    }
  }
`;
