import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { useArchiveVirtualInternship } from '@dc/graphql/user/hooks/useArchiveVirtualInternship';

import { removeFromCache } from '@shared/utils/graphql';
import { callToast } from '@shared/components/Toaster/Toaster';
import { Tooltip } from '@shared/components/Tooltip';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as EditIcon } from '@shared/assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '@shared/assets/icons/delete_outlined.svg';

import { TVirtualInternship } from '../types';
type Props = {
  virtualInternship: TVirtualInternship;
  handleRowEdit: (event: MouseEvent<HTMLButtonElement>, id: string) => void;
};

export const VirtualInternshipActions = ({ virtualInternship, handleRowEdit }: Props) => {
  const { t } = useTranslation();
  const [archiveVirtualInternship] = useArchiveVirtualInternship();

  const handleDeleteVirtualInternship = async (
    event: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    try {
      event.stopPropagation();
      event.preventDefault();
      await archiveVirtualInternship({
        variables: { input: { id } },
        update: removeFromCache({ id, __typename: 'VirtualInternship' }),
      });
      callToast('success', t('admin.virtualInternship.formMessages.archiveSuccess'));
    } catch (e) {
      callToast('error', t('admin.virtualInternship.formMessages.archiveFailed'));
    }
  };

  return (
    <div className='admin-list-item__actions justify-self-end'>
      <Tooltip message={t('common.actions.edit')}>
        <DeprecatedIconButton
          data-testid='task-edit-button'
          icon={<EditIcon />}
          size='sm'
          square={true}
          variant='primary-outlined'
          onClick={(event) => handleRowEdit(event, virtualInternship.id)}
        />
      </Tooltip>
      <Tooltip message={t('common.actions.delete')}>
        <DeprecatedIconButton
          data-testid='task-archive-button'
          icon={<DeleteIcon />}
          size='sm'
          square={true}
          variant='danger-outlined'
          onClick={(event) => handleDeleteVirtualInternship(event, virtualInternship.id)}
        />
      </Tooltip>
    </div>
  );
};
