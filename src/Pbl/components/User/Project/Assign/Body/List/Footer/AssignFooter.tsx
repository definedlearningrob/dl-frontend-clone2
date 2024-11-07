import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';

type ProjectAssignFooterProps = {
  isLoading: boolean;
};

const ProjectAssignFooter = ({ isLoading }: ProjectAssignFooterProps) => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  const history = useHistory();

  const handleReturnToProject = () => {
    history.push(`/projects/${projectId}`);
  };

  return (
    <footer className='flex gap-sm mt-md'>
      <SharedButton
        disabled={isLoading}
        size='md'
        type='button'
        variant='primary-outlined'
        onClick={handleReturnToProject}>
        {t('common.actions.cancel')}
      </SharedButton>
      <SharedButton isLoading={isLoading} size='md' type='submit' variant='primary'>
        {t('common.actions.save')}
      </SharedButton>
    </footer>
  );
};

export default ProjectAssignFooter;
