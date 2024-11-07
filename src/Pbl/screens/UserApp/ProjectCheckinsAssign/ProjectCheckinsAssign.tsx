import { useTranslation } from 'react-i18next';

import { CheckinsAssignBody } from '@pbl/components/User/Project/CheckIns/Assign/Body/CheckinsAssignBody';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';

import FullPageCard from '@shared/components/FullPageCard/FullPageCard';
import Heading from '@shared/components/Heading/Heading';

const ProjectCheckinsAssign = () => {
  const { t } = useTranslation();

  return (
    <SharedMainContent>
      <FullPageCard size='md'>
        <Heading className='text-center' size='md'>
          {t('user.project.checkins.assignCheckin.heading')}
        </Heading>
        <CheckinsAssignBody />
      </FullPageCard>
    </SharedMainContent>
  );
};

export default ProjectCheckinsAssign;
