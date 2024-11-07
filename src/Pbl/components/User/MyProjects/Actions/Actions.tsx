import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { ReactComponent as ArchiveIcon } from '@shared/svg/archive.svg';
import { ReactComponent as UnarchiveIcon } from '@shared/svg/unarchive.svg';
import { ReactComponent as AssignIcon } from '@shared/svg/add.svg';
import { DropdownContextMenu } from '@shared/components/DropdownContextMenu';
import { useUserRole } from '@shared/graphql/user/hooks/useUserRole';

import ProjectStatusModal from './ProjectStatusModal/ProjectStatusModal';

type Props = {
  isSystemProject: boolean;
  projectId: string;
  projectName: string;
  isArchived?: boolean;
  isAssignedByOtherTeacher?: boolean;
};

export const UserMyProjectsActions = ({
  isArchived = false,
  isSystemProject,
  isAssignedByOtherTeacher = false,
  projectId,
  projectName,
}: Props) => {
  const [archiveModalState, setArchiveModalState] = useState<{ name: string; id: string } | null>(
    null
  );
  const { isTeacher } = useUserRole();
  const { t } = useTranslation();
  const history = useHistory();

  const redirectToProject = (withEdit: boolean) => {
    history.push(`/projects/${projectId}`, {
      isEditing: withEdit,
    });
  };

  const redirectToAssign = () => {
    history.push(`/projects/${projectId}/assign`);
  };

  const onDismiss = () => {
    setArchiveModalState(null);
  };

  const dropdownOptions = [
    {
      Icon: EditIcon,
      action: () => redirectToProject(true),
      hidden: isArchived || isSystemProject || isAssignedByOtherTeacher,
      text: t('common.actions.edit'),
    },
    {
      Icon: AssignIcon,
      action: redirectToAssign,
      hidden: !isTeacher || isArchived,
      text: t('common.actions.assign'),
    },
    {
      Icon: ArchiveIcon,
      action: () => {
        setArchiveModalState({
          name: projectName,
          id: projectId,
        });
      },
      iconClassName: 'text-danger-500',
      itemClassName: 'text-danger-500 hover:!bg-danger-100',
      hidden: isArchived || isSystemProject,
      text: t('common.actions.archive'),
    },
    {
      Icon: UnarchiveIcon,
      text: t('common.actions.unarchive'),
      action: () => {
        setArchiveModalState({
          name: projectName,
          id: projectId,
        });
      },
      hidden: !isArchived,
    },
  ].filter((option) => option.hidden !== true);

  return (
    <>
      <DropdownContextMenu
        items={dropdownOptions}
        triggerClassName='group-hover/row:!visible group-hover/row:!bg-white'
      />
      {archiveModalState && (
        <ProjectStatusModal
          isArchived={isArchived}
          projectId={archiveModalState.id}
          projectName={archiveModalState.name}
          onDismiss={onDismiss}
        />
      )}
    </>
  );
};
