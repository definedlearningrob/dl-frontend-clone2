import { QueryHookOptions, useQuery } from '@apollo/client';

import STUDENTS_ASSGINED_TO_PROJECT_BY_STATUS, {
  TStudentsAssignedToProjectData,
  TStudentsAssignedToProjectVariables,
} from '@pbl/graphql/user/queries/studentsAssignedToProject';
import { GRADING_ITEM_TYPES } from '@pbl/resources/enums';

const useStudentsAssginedToProject = (
  projectId: string,
  itemType: GRADING_ITEM_TYPES,
  itemId: string,
  uuid?: string
) => {
  const queryOptions: QueryHookOptions<
    TStudentsAssignedToProjectData,
    TStudentsAssignedToProjectVariables
  > =
    uuid && uuid === 'other'
      ? {
          variables: {
            itemId,
            itemType,
            projectId,
          },
        }
      : {
          skip: true,
        };

  const studentsGrading = useQuery<
    TStudentsAssignedToProjectData,
    TStudentsAssignedToProjectVariables
  >(STUDENTS_ASSGINED_TO_PROJECT_BY_STATUS, {
    ...queryOptions,
    fetchPolicy: 'no-cache',
  });

  return studentsGrading;
};

export type { TStudentsAssignedToProjectData as TStudentsAssginedToProjectData };

export default useStudentsAssginedToProject;
