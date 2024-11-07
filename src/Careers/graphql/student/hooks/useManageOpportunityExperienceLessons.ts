import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import {
  MANAGE_OPPORTUNITY_EXPERIENCE_LESSONS,
  TManageOpportunityExperienceLessonsInput,
} from '@dc/graphql/student/mutations/manageOpportunityExperienceLessons';
import { OPPORTUNITY_QUERY } from '@dc/graphql/student/queries/opportunity';
import { VIRTUAL_INTERNSHIP_CONTENT_QUERY } from '@dc/graphql/student/queries/virtualInternshipContent';

export const useManageOpportunityExperienceLessons = () => {
  const [mutate, { loading, error }] = useMutation(MANAGE_OPPORTUNITY_EXPERIENCE_LESSONS);

  const { opportunityId } = useParams<{ opportunityId: string }>();

  const manageOpportunityExperienceLessons = ({
    virtualInternshipId,
    lessonIds,
  }: TManageOpportunityExperienceLessonsInput) =>
    mutate({
      variables: {
        input: { virtualInternshipId, lessonIds },
      },
      refetchQueries: [
        { query: OPPORTUNITY_QUERY, variables: { id: opportunityId } },
        { query: VIRTUAL_INTERNSHIP_CONTENT_QUERY, variables: { opportunityId } },
      ],
    });

  return [manageOpportunityExperienceLessons, { loading, error }] as const;
};
