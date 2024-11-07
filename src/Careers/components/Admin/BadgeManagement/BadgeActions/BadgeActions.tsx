import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useArchiveBadge } from '@dc/graphql/user/hooks/useArchiveBadge';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { ReactComponent as ArchiveIcon } from '@shared/svg/delete_outlined.svg';

type Props = {
  badge: {
    id: string;
    original: { id: string };
  };
};

export const BadgeActions = ({ badge }: Props) => {
  const { t } = useTranslation();
  const { archiveBadge } = useArchiveBadge();
  const history = useHistory();
  const onEditClick = () => {
    history.push(`/admin/badges/${badge.id}/edit`);
  };

  const onArchiveClick = async () => {
    const { id } = badge.original;
    await archiveBadge(id);
  };

  return (
    <div className='flex gap-xs ml-xs justify-end'>
      <Tooltip message={t('common.actions.edit')}>
        <DeprecatedIconButton
          aria-label={t('common.actions.edit')}
          icon={<EditIcon />}
          size='sm'
          square={true}
          variant='primary-outlined'
          onClick={onEditClick}
        />
      </Tooltip>
      <Tooltip message={t('common.actions.archive')}>
        <DeprecatedIconButton
          aria-label={t('common.actions.archive')}
          icon={<ArchiveIcon />}
          size='sm'
          square={true}
          variant='danger-outlined'
          onClick={onArchiveClick}
        />
      </Tooltip>
    </div>
  );
};
