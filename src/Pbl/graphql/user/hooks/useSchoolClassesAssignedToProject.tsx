import { useQuery } from '@apollo/client';

import SCHOOL_CLASSES_ASSIGNED_TO_PROJECT, {
  TSchoolClassesData,
  TSchoolClassesVariables,
} from '@pbl/graphql/user/queries/schoolClassesAssignedToProject';
import { GRADING_ITEM_TYPES } from '@pbl/resources/enums';

const MAX_PER_PAGE = 1000;

const useSchoolClassesAssignedToProject = (
  taskId: string,
  itemId: string,
  itemType: GRADING_ITEM_TYPES
) => {
  const schoolClassesAssignedToProject = useQuery<TSchoolClassesData, TSchoolClassesVariables>(
    SCHOOL_CLASSES_ASSIGNED_TO_PROJECT,
    {
      variables: {
        perPage: MAX_PER_PAGE,
        page: 1,
        taskId,
        itemId,
        itemType,
      },
    }
  );

  return schoolClassesAssignedToProject;
};

export type { TSchoolClassesData };

export default useSchoolClassesAssignedToProject;
