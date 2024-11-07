import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { TeamItem } from '@pbl/components/User/Teams/TeamItem/TeamItem';
import type { TTeam } from '@pbl/graphql/user/fragments/team';

import { useToggle } from '@shared/hooks/useToggle';
import Button from '@shared/components/Button/Button';

import { ModalTypes, TeamModal } from '../TeamModal';

import styles from './TeamsModule.module.sass';

type Props = {
  teams: TTeam[];
};

const TeamsModule = ({ teams }: Props) => {
  const { t } = useTranslation();
  const [isModalOpen, , setModalOpen, setModalClose] = useToggle(false);
  const [modalType, setModalType] = useState<ModalTypes>();
  const [selectedTeam, setSelectedTeam] = useState<TTeam>();

  const activeTeams = useMemo(() => teams.filter(({ isArchived }) => !isArchived), [teams]);

  const handleModalOpen = useCallback((type: ModalTypes, team?: TTeam) => {
    setSelectedTeam(team);
    setModalType(type);
    setModalOpen();
  }, []);

  const handleModalClose = useCallback(() => {
    setModalClose();
    setSelectedTeam(undefined);
    setModalType(undefined);
  }, []);

  return (
    <>
      <div className={styles.head}>
        <h4 className={styles.title}>{t('teams.teams')}</h4>
        <Button variant='primary' onClick={() => handleModalOpen(ModalTypes.CREATE)}>
          {t('teams.createATeam')}
        </Button>
      </div>
      <div className={styles.teamsList}>
        {activeTeams.map((team) => (
          <TeamItem key={team.uuid} handleTeamModalOpen={handleModalOpen} team={team} />
        ))}
      </div>
      <TeamModal
        handleClose={handleModalClose}
        isOpen={isModalOpen}
        team={selectedTeam}
        type={modalType}
      />
    </>
  );
};

export default TeamsModule;
