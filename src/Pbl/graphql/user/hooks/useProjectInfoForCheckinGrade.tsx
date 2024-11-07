import { useQuery } from '@apollo/client';

import PROJECT_INFO, {
  TProjectInfoCheckinData,
  TProjectInfoCheckinVariables,
} from '@pbl/graphql/user/queries/projectInfoToCheckinGrade';

const useProjectInfoForCheckinGrade = (projectId: string, checkinId: string, skip?: boolean) => {
  const projectInfo = useQuery<TProjectInfoCheckinData, TProjectInfoCheckinVariables>(
    PROJECT_INFO,
    {
      variables: {
        projectId,
        checkinId,
      },
      skip,
    }
  );

  return projectInfo;
};

export type { TProjectInfoCheckinData };

export default useProjectInfoForCheckinGrade;
