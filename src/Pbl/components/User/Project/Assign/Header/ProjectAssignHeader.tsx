import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import PROJECT_NAME, {
  type TProjectNameData,
  type TProjectNameVariables,
} from '@pbl/graphql/user/queries/projectName';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

const ProjectAssignHeader = () => {
  const { t } = useTranslation();
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <SharedDataLoader<TProjectNameData, TProjectNameVariables>
      options={{
        variables: {
          id: projectId,
        },
      }}
      query={PROJECT_NAME}>
      {({ project }) => (
        <h1 className='text-base'>
          {t('user.project.assignment.header', { taskName: project.displayName })}
        </h1>
      )}
    </SharedDataLoader>
  );
};

export default ProjectAssignHeader;
