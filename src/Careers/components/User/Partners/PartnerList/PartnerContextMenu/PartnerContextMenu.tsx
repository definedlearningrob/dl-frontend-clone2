import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Partner } from '@graphql/dc/users/types';
import { useRestorePartnerMutation } from '@graphql/dc/users/hooks';

import { ReactComponent as ArrowRightIcon } from '@shared/svg/arrow_forward.svg';
import { ReactComponent as ArchiveIcon } from '@shared/svg/archive.svg';
import { ReactComponent as UnarchiveIcon } from '@shared/svg/unarchive.svg';
import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { ReactComponent as DraftIcon } from '@shared/svg/file.svg';
import { ReactComponent as PublishedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import { callToast } from '@shared/components/Toaster/Toaster';
import { DropdownContextMenu } from '@shared/components/DropdownContextMenu';
import { removeFromCache } from '@shared/utils/graphql';

type PartnerContext = Pick<
  Partner,
  | 'id'
  | 'thumbnailUrl'
  | 'name'
  | 'visibilityScope'
  | 'status'
  | 'opportunitiesCount'
  | 'virtualInternshipsCount'
  | 'coursesCount'
  | 'email'
  | 'url'
  | 'isArchived'
  | 'canEdit'
>;

type Props = {
  partner: PartnerContext;
  onArchive: () => void;
  onStatusToggle: () => void;
};

export const PartnerContextMenu = ({ partner, onArchive, onStatusToggle }: Props) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [restorePartner] = useRestorePartnerMutation();

  const canEdit = partner.canEdit;

  const isArchived = partner.isArchived;

  const handleEditPartner = () => {
    history.push(`/partner/${partner.id}/edit`);
  };

  const handleRestorePartner = async () => {
    if (partner) {
      await restorePartner({
        variables: {
          input: {
            id: partner.id,
          },
        },
        update: removeFromCache({ id: partner.id, __typename: 'Partner' }),
      });
      callToast('success', t('partners.partnerSuccessfullyRestored'));
    } else {
      callToast('error', t('common.error.unknown'));
    }
  };

  const isPublished = partner.status === 'PUBLISHED';
  const PartnerEditorIcon = isPublished ? DraftIcon : PublishedIcon;
  const partnerEditorLabel = isPublished
    ? t('user.partners.form.actionDraft')
    : t('user.partners.form.actionPublished');

  const contextMenuOptions = [
    {
      Icon: ArrowRightIcon,
      text: t('user.partners.form.showPartner'),
      show: !canEdit,
      action: () => history.push(`/partner/${partner.id}`),
      iconClassName: '!bg-primary-200',
    },
    {
      Icon: PartnerEditorIcon,
      text: partnerEditorLabel,
      show: canEdit && !isArchived,
      action: onStatusToggle,
    },
    {
      Icon: EditIcon,
      text: t('common.actions.edit'),
      show: canEdit && !isArchived,
      action: handleEditPartner,
    },
    {
      Icon: ArchiveIcon,
      text: t('common.actions.archive'),
      show: canEdit && !isArchived,
      action: onArchive,
      itemClassName: '!text-danger-500',
    },
    {
      Icon: UnarchiveIcon,
      text: t('common.actions.restore'),
      show: canEdit && isArchived,
      action: handleRestorePartner,
      iconClassName: '!text-success-500 hover:!bg-success-500 hover:!text-white',
    },
  ];

  return (
    <div className='ml-auto w-fit'>
      <DropdownContextMenu
        items={contextMenuOptions}
        triggerClassName='group-hover/row:!visible group-hover/row:!bg-white'
      />
    </div>
  );
};
