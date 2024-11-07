import { TTeam } from '@pbl/graphql/user/fragments/team';

import { CreateTeamModal } from '../CreateTeamModal';
import { DeleteTeamModal } from '../DeleteTeamModal';
import { EditTeamModal } from '../EditTeamModal';

import { ModalTypes } from './ModalTypes';

type Props = {
  team?: TTeam;
  type?: ModalTypes;
  isOpen: boolean;
  handleClose: () => void;
};

export const TeamModal = ({ team, type, isOpen, handleClose }: Props) => {
  if (!isOpen || !type) {
    return null;
  }

  switch (type) {
    case ModalTypes.CREATE:
      return <CreateTeamModal handleClose={handleClose} isOpen={isOpen} />;
    case ModalTypes.DELETE:
      return <DeleteTeamModal handleClose={handleClose} isOpen={isOpen} team={team!} />;
    case ModalTypes.EDIT:
      return <EditTeamModal handleClose={handleClose} isOpen={isOpen} team={team!} />;
  }
};
