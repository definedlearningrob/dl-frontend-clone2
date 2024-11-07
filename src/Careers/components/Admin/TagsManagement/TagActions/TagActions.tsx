import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useArchiveTag } from '@dc/graphql/user/hooks/useArchiveTag';
import { TagArchiveModal } from '@dc/components/Admin/TagsManagement/TagArchiveModal/TagArchiveModal';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { ReactComponent as ArchiveIcon } from '@shared/svg/delete_outlined.svg';
import { useToggle } from '@shared/hooks/useToggle';

type Props = {
  tag: {
    id: string;
    original: {
      id: string;
      type?: string;
      hasRubricHeadings: boolean;
    };
  };
};

export const TagActions = ({ tag }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { archiveTag } = useArchiveTag();
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);
  const onEditClick = () => {
    history.push(`/admin/performance-indicators/${tag.id}/edit`);
  };

  const { id, hasRubricHeadings } = tag.original;
  const onArchiveTagClick = async () => {
    await archiveTag(id);

    toggleIsModalOpen();
  };

  return (
    <div className='flex ml-xs justify-end gap-xs'>
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
          onClick={toggleIsModalOpen}
        />
      </Tooltip>
      {isModalOpen && (
        <TagArchiveModal
          archiveSystemTag={onArchiveTagClick}
          hasRubricHeadings={hasRubricHeadings}
          onClose={toggleIsModalOpen}
        />
      )}
    </div>
  );
};
