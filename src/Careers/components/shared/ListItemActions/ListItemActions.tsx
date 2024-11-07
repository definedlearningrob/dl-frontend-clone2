import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { ReactComponent as DuplicateIcon } from '@shared/svg/duplicate.svg';
import { ReactComponent as ArchiveIcon } from '@shared/svg/delete_outlined.svg';
import { ReactComponent as UnArchiveIcon } from '@shared/svg/unarchive.svg';
import { ReactComponent as ShowIcon } from '@shared/svg/eye.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { IconButton } from '@shared/components/IconButton/IconButton';

type Props = {
  editUrl: string;
  onArchiveClick?: () => void;
  onShowClick?: () => void;
  onRestoreClick?: () => void;
  onDuplicateClick?: () => void;
};

export const ListItemActions = ({
  editUrl,
  onArchiveClick,
  onShowClick,
  onRestoreClick,
  onDuplicateClick,
}: Props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const onEditClick = () => {
    history.push(editUrl);
  };

  return (
    <div className='flex gap-xs ml-xs justify-end'>
      {onShowClick && (
        <Tooltip message={t('common.actions.show')}>
          <IconButton
            Icon={ShowIcon}
            aria-label={t('common.actions.show')}
            size='md'
            variant='primary-outlined'
            onClick={onShowClick}
          />
        </Tooltip>
      )}
      <Tooltip message={t('common.actions.edit')}>
        <IconButton
          Icon={EditIcon}
          aria-label={t('common.actions.edit')}
          size='md'
          variant='primary-outlined'
          onClick={onEditClick}
        />
      </Tooltip>
      {onDuplicateClick && (
        <Tooltip message={t('common.actions.duplicate')}>
          <IconButton
            Icon={DuplicateIcon}
            aria-label={t('common.actions.duplicate')}
            size='md'
            variant='primary-outlined'
            onClick={onDuplicateClick}
          />
        </Tooltip>
      )}
      {onArchiveClick && (
        <Tooltip message={t('common.actions.archive')}>
          <IconButton
            Icon={ArchiveIcon}
            aria-label={t('common.actions.archive')}
            size='md'
            variant='danger-outlined'
            onClick={onArchiveClick}
          />
        </Tooltip>
      )}
      {onRestoreClick && (
        <Tooltip message={t('common.actions.unarchive')}>
          <IconButton
            Icon={UnArchiveIcon}
            aria-label={t('common.actions.unarchive')}
            size='md'
            variant='primary-outlined'
            onClick={onRestoreClick}
          />
        </Tooltip>
      )}
    </div>
  );
};
