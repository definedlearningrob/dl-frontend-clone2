import { useQuery } from '@apollo/client';

import PROJECT_INFO, {
  TProjectInfoProductData,
  TProjectInfoProductVariables,
} from '@pbl/graphql/user/queries/projectInfoToProductGrade';

const useProjectInfoForProductGrade = (projectId: string, productId: string, skip?: boolean) => {
  const projectInfo = useQuery<TProjectInfoProductData, TProjectInfoProductVariables>(
    PROJECT_INFO,
    {
      variables: {
        projectId,
        productId,
      },
      skip,
    }
  );

  return projectInfo;
};

export type { TProjectInfoProductData };

export default useProjectInfoForProductGrade;
