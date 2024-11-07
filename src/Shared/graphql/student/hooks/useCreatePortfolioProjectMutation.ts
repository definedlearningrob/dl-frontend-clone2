import { FetchResult, useMutation } from '@apollo/client';

import CREATE_PORTFOLIO_PROJECT, {
  TCreatePortfolioProjectMutationInput,
  TCreatePortfolioProjectData,
} from '@shared/graphql/student/mutations/createPortfolioProject';
import PORTFOLIO_PROJECTS, {
  TPortfolioProjectConnectionData,
} from '@shared/graphql/student/query/portfolioProjects';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';

type Props = {
  input: TCreatePortfolioProjectMutationInput;
  portfolioProjectType: PORTFOLIO_PROJECT_TYPES;
};

export const useCreatePortfolioProjectMutation = () => {
  const [mutate, { error, loading }] =
    useMutation<TCreatePortfolioProjectData>(CREATE_PORTFOLIO_PROJECT);

  const createPortfolioProject = ({
    input,
    portfolioProjectType,
  }: Props): Promise<FetchResult<TCreatePortfolioProjectData>> =>
    mutate({
      variables: {
        input,
      },
      awaitRefetchQueries: true,
      update: (cache, { data }) => {
        const cachedProjects = cache.readQuery<TPortfolioProjectConnectionData>({
          query: PORTFOLIO_PROJECTS,
          variables: { type: portfolioProjectType },
        });

        const createdProject = data?.createPortfolioProject?.portfolioProject;

        cache.writeQuery({
          query: PORTFOLIO_PROJECTS,
          variables: { type: portfolioProjectType },
          data: {
            portfolio: {
              studentId: cachedProjects?.portfolio.studentId,
              projects: {
                edges: [
                  {
                    node: createdProject,
                    __typename: 'PortfolioProjectEdge',
                  },
                  ...[cachedProjects && cachedProjects.portfolio.projects.edges],
                ],
              },
            },
          },
        });
      },
    });

  return [createPortfolioProject, { error, loading }] as const;
};
