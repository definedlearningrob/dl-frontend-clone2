import { QueryHookOptions, useQuery } from '@apollo/client';

import GRADE_SUBJECTS_BY_STATUS, {
  TGradeSubjectsData,
  TGradeSubjectsVariables,
} from '@pbl/graphql/user/queries/gradeSubjectsByStatus';
import { GRADING_ITEM_TYPES } from '@pbl/resources/enums';

const useGradeSubjectsByStatus = (
  projectId: string,
  itemType: GRADING_ITEM_TYPES,
  itemId: string,
  uuid?: string
) => {
  const queryOptions: QueryHookOptions<TGradeSubjectsData, TGradeSubjectsVariables> = {
    variables: {
      uuid: uuid!,
      itemId,
      itemType,
      projectId,
    },
    skip: !uuid || uuid === 'other',
    fetchPolicy: 'no-cache',
  };

  const studentsGrading = useQuery<TGradeSubjectsData, TGradeSubjectsVariables>(
    GRADE_SUBJECTS_BY_STATUS,
    queryOptions
  );

  return studentsGrading;
};

export type { TGradeSubjectsData as TGradeSubjectsData };

export default useGradeSubjectsByStatus;
