import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SharedDropdown from '@shared/components/Dropdown/Dropdown';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as DotsIcon } from '@shared/svg/three_dots.svg';

import ProjectStatusModal from './ProjectStatusModal/ProjectStatusModal';
import styles from './Actions.module.sass';

type TDropdownOption = {
  guarded?: boolean;
  hide?: boolean;
  label: string;
  onClick: () => void;
};

type Props = {
  isSystemProject: boolean;
  projectId: string;
  projectName: string;
  isArchived?: boolean;
};

const UserMyProjectsActions = ({
  isArchived = false,
  isSystemProject,
  projectId,
  projectName,
}: Props) => {
  const [archiveModalState, setArchiveModalState] = useState<{ name: string; id: string } | null>(
    null
  );
  const { t } = useTranslation();

  const redirectToProject = () => () => {
    window.open(`/projects/${projectId}`, '_blank');
  };
  const dropdownOptions: TDropdownOption[] = [
    {
      hide: isArchived,
      label: t('common.actions.edit'),
      onClick: redirectToProject(),
    },
    {
      hide: isArchived || isSystemProject,
      label: t('common.actions.archive'),
      onClick: () => {
        setArchiveModalState({
          name: projectName,
          id: projectId,
        });
      },
    },
    {
      hide: !isArchived,
      label: t('common.actions.unarchive'),
      onClick: () => {
        setArchiveModalState({
          name: projectName,
          id: projectId,
        });
      },
    },
  ].filter((option: TDropdownOption) => option.hide !== true);

  const onDismiss = () => {
    setArchiveModalState(null);
  };

  const renderOption = (option: TDropdownOption) => (
    <SharedDropdown.Option
      key={option.label}
      className={styles.dropdownOption}
      onClick={option.onClick}>
      {option.label}
    </SharedDropdown.Option>
  );

  return (
    <>
      <div className={styles.wrapper}>
        <SharedDropdown>
          <SharedDropdown.Dropdown>
            <SharedDropdown.Trigger>
              <DeprecatedIconButton icon={<DotsIcon />} size='sm' />
            </SharedDropdown.Trigger>
            <SharedDropdown.Options>
              {!isArchived && dropdownOptions.map((option) => renderOption(option))}
              {isArchived &&
                renderOption({
                  label: t('common.actions.unarchive'),
                  onClick: () => {
                    setArchiveModalState({
                      name: projectName,
                      id: projectId,
                    });
                  },
                })}
            </SharedDropdown.Options>
          </SharedDropdown.Dropdown>
        </SharedDropdown>
      </div>
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

export default UserMyProjectsActions;
