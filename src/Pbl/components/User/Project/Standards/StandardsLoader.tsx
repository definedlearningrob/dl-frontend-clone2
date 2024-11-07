import { useParams } from 'react-router-dom';
import { useProjectStandardsQuery } from '@graphql/dl/users/hooks';
import { usePublicProjectStandardsQuery } from '@graphql/dl/public/hooks';
import { useTranslation } from 'react-i18next';

import StandardsList from '@pbl/components/Project/Standards/StandardsList/StandardsList';
import useUserInfo from '@pbl/hooks/useUserInfo';

import useQueryParams from '@shared/hooks/useQueryParams';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

type Props = {
  setId: string;
};

function UserProjectStandardsLoader({ setId }: Props) {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo();
  const { projectId } = useParams<{ projectId: string }>();
  const {
    params: { code },
  } = useQueryParams<{ code: string }>();

  const {
    data: projectData,
    loading: isProjectLoading,
    error: projectError,
  } = useProjectStandardsQuery({
    variables: { projectId, setId, code },
    skip: !userInfo,
  });

  const {
    data: publicProjectData,
    loading: isPublicProjectLoading,
    error: publicProjectError,
  } = usePublicProjectStandardsQuery({
    variables: { code, setId, shareId: projectId },
    skip: !!userInfo,
  });

  if (isProjectLoading || isPublicProjectLoading) {
    return <SharedLoadingSpinner size='small' />;
  }

  const project = projectData?.project ?? publicProjectData?.project;

  if (projectError || publicProjectError || !project) {
    return <div className='text-center'>{t('common.messages.dataLoadingError')}</div>;
  }

  return <StandardsList standards={project.standards} />;
}

export default UserProjectStandardsLoader;
