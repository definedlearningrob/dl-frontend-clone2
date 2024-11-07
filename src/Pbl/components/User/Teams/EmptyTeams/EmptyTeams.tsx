import { useTranslation } from 'react-i18next';

import { ReactComponent as NoTeamsIcon } from '@pbl/svg/empty_no-teams.svg';

import { useToggle } from '@shared/hooks/useToggle';
import Button from '@shared/components/Button/Button';

import { CreateTeamModal } from '../CreateTeamModal';

const EmptyTeams = () => {
  const { t } = useTranslation();
  const [isModalOpen, , setModalOpened, setModalClosed] = useToggle(false);

  return (
    <div className='flex flex-col justify-center gap-sm min-h-0 text-center items-center'>
      <NoTeamsIcon />
      <div>
        <h5 className='mb-xs text-xs xxxl:text-sm'>{t('teams.noDataTitle')}</h5>
        <p className='mb-0 text-xxs xxxl:text-sm'>{t('teams.noDataDescription')}</p>
      </div>
      <Button className='my-0 mx-auto' variant='primary' onClick={setModalOpened}>
        {t('teams.createNewTeam')}
      </Button>
      <CreateTeamModal handleClose={setModalClosed} isOpen={isModalOpen} />
    </div>
  );
};

export default EmptyTeams;
