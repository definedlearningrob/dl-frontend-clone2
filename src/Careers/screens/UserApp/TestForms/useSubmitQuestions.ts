import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { RECOMMENDATION_REQUEST_QUERY } from '@dc/graphql/user/queries/recommendationRequest';
import { RECOMMENDATION_REQUESTS_QUERY } from '@dc/graphql/user/queries/recommendationRequests';
import { STUDENT_APPLICATIONS_QUERY } from '@dc/graphql/user/queries/studentApplications';

import { SUBMIT_QUESTIONS } from './commonAppQueries';

export const useSubmitQuestions = () => {
  const { studentUuid } = useParams<{ studentUuid: string }>();

  return useMutation(SUBMIT_QUESTIONS, {
    refetchQueries: [
      { query: RECOMMENDATION_REQUEST_QUERY, variables: { studentUuid } },
      { query: STUDENT_APPLICATIONS_QUERY, variables: { studentUuid } },
      RECOMMENDATION_REQUESTS_QUERY,
    ],
  });
};
