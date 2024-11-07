import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { TeamAvatars } from '@pbl/components/User/Teams/TeamAvatars/TeamAvatars';
import type { TTeam } from '@pbl/graphql/user/fragments/team';

import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { ReactComponent as DeleteIcon } from '@shared/svg/delete_outlined.svg';
import Dropdown from '@shared/components/Dropdown/Dropdown';
import { TeamHeader } from '@shared/components/TeamHeader';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import { ModalTypes } from '../TeamModal';

import styles from './TeamItem.module.sass';

type Props = {
  team: TTeam;
  handleTeamModalOpen: (type: ModalTypes, team: TTeam) => void;
};

export const TeamItem = ({ handleTeamModalOpen, team }: Props) => {
  const { t } = useTranslation();

  const handleEditModalOpen = () => {
    handleTeamModalOpen(ModalTypes.EDIT, team);
  };

  const handleDeleteModalOpen = () => {
    handleTeamModalOpen(ModalTypes.DELETE, team);
  };

  const teamWrapperClassnames = cx(
    styles.team,
    'flex items-center relative font-bold overflow-hidden py-x px-xs xxxl:p-sm hover:bg-primary-200',
    'border-b border-neutral-300 last:border-b-0'
  );

  return (
    <div className={teamWrapperClassnames}>
      <TeamHeader memberCount={team.students.nodesCount} teamName={team.name} />
      <div className='flex items-center absolute right-xs gap-xs'>
        <TeamAvatars teamId={team.uuid} users={team.students.nodes} />
        <Dropdown>
          <Dropdown.Dropdown>
            <Dropdown.Trigger />
            <Dropdown.Options>
              <Dropdown.Option onClick={handleEditModalOpen}>
                <IconContainer Icon={EditIcon} paddingSize='none' size='sm' />
                {t('common.actions.edit')}
              </Dropdown.Option>
              <Dropdown.Option className='!text-danger-500' onClick={handleDeleteModalOpen}>
                <IconContainer Icon={DeleteIcon} paddingSize='none' size='sm' />
                {t('common.actions.delete')}
              </Dropdown.Option>
            </Dropdown.Options>
          </Dropdown.Dropdown>
        </Dropdown>
      </div>
    </div>
  );
};
