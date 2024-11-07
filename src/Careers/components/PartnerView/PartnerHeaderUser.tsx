import {
  useArchivePartnerMutation,
  usePartnerOverviewQuery as usePartnerOverviewQueryUser,
  useRestorePartnerMutation,
  useUpdatePartnerStatusMutation,
} from '@graphql/dc/users/hooks';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { PartnerStatuses } from '@graphql/dc/users/types';
import { match } from 'ts-pattern';
import { SVGProps } from 'react';
import { FC } from 'react';
import { useToggle } from 'react-use';

import { ReactComponent as ArchiveIcon } from '@shared/assets/icons/archive.svg';
import { ReactComponent as UnarchiveIcon } from '@shared/svg/unarchive.svg';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import Link from '@shared/components/Link';
import { formatExternalLink } from '@shared/utils/formatExternalLink';
import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as FileIcon } from '@shared/svg/file.svg';
import { ReactComponent as WorldIcon } from '@shared/svg/world_icon.svg';
import { Badge, BadgeType } from '@shared/components/Badge/Badge';
import { ReactComponent as PublishedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import SharedSwitch from '@shared/components/Switch/Switch';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { Tooltip } from '@shared/components/Tooltip';
import { cx } from '@shared/utils/cx';
import { ConfirmationModal } from '@shared/components/ConfirmationModal/ConfirmationModal';
import { callToast } from '@shared/components/Toaster/Toaster';
import { handleError } from '@shared/utils/handleError';

export const PartnerHeaderUser = () => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [isConfirmationModalOpen, toggleIsConfirmationModalOpen] = useToggle(false);

  const { data, loading } = usePartnerOverviewQueryUser({ variables: { id } });

  const canManagePartner = data?.partner?.canEdit;

  const [archivePartner] = useArchivePartnerMutation();
  const [restorePartner] = useRestorePartnerMutation();
  const [updatePartnerStatus] = useUpdatePartnerStatusMutation();

  const status = data?.partner?.status;
  const isArchived = !!data?.partner?.isArchived;

  const { badgeType, badgeText, badgeIcon } = match({ canManagePartner, isArchived, status })
    .returnType<{
      badgeType: BadgeType;
      badgeText: string | null;
      badgeIcon: FC<SVGProps<SVGSVGElement>>;
    }>()
    .with({ canManagePartner: true, isArchived: true }, () => ({
      badgeType: 'danger',
      badgeText: t('partners.archived'),
      badgeIcon: UnarchiveIcon,
    }))
    .with({ canManagePartner: true, isArchived: false, status: PartnerStatuses.PUBLISHED }, () => ({
      badgeType: 'primary',
      badgeText: t('partners.published'),
      badgeIcon: PublishedIcon,
    }))
    .with({ canManagePartner: true, isArchived: false, status: PartnerStatuses.DRAFT }, () => ({
      badgeType: 'secondary',
      badgeText: t('partners.draft'),
      badgeIcon: FileIcon,
    }))
    .otherwise(() => ({
      badgeType: 'primary',
      badgeText: null,
      badgeIcon: PublishedIcon,
    }));

  const togglePartnerStatus = () => {
    if (data) {
      updatePartnerStatus({
        variables: {
          input: {
            id,
            entityUuids: data.partner.entities.map((entity) => entity.uuid),
            status:
              status === PartnerStatuses.DRAFT ? PartnerStatuses.PUBLISHED : PartnerStatuses.DRAFT,
          },
        },
      });
    } else {
      callToast('error', t('common.error.unknown'));
    }
  };

  const handleArchivePartner = async () => {
    try {
      await archivePartner({ variables: { input: { id } } });

      callToast('success', t('partners.partnerSuccessfullyArchived'));
    } catch (error) {
      handleError(error);
    }

    toggleIsConfirmationModalOpen();
  };

  const handleRestorePartner = async () => {
    try {
      await restorePartner({ variables: { input: { id } } });

      callToast('success', t('partners.partnerSuccessfullyRestored'));
    } catch (error) {
      handleError(error);
    }
  };

  const isDataLoaded = !loading && data?.partner;

  return (
    <>
      <div className='w-min mb-xxs'>
        {loading && !badgeText && (
          <div className='w-[120px] h-[22px]'>
            <SkeletonRectangle height='full-height' size='full-width' />
          </div>
        )}
        {badgeText && (
          <Badge Icon={badgeIcon} size='small' type={badgeType}>
            {badgeText}
          </Badge>
        )}
      </div>
      <div className='flex justify-between items-center h-md xxxl:h-[40px]'>
        {!isDataLoaded && (
          <div className='w-[300px]'>
            <SkeletonRectangle height='extra-small' size='full-width' />
          </div>
        )}
        {isDataLoaded && (
          <h1 className='text-base xxxl:text-lg mb-0 truncate'>{data?.partner?.name}</h1>
        )}
        <div className='flex'>
          {canManagePartner && !isArchived && (
            <>
              <SharedSwitch
                additionalLabel={t('partners.draft')}
                className='bg-white px-xs py-xxs xxxl:py-xs border-primary-500 rounded-sm h-md xxxl:h-[40px] mr-sm xxxl:mr-base shrink-0'
                label={t('partners.published')}
                labelClassName='!text-xxs xxxl:!text-xs'
                name='portfolio'
                value={status === PartnerStatuses.PUBLISHED}
                onChange={togglePartnerStatus}
              />
              <Tooltip
                className='mr-xs xxxl:mr-sm'
                delayDuration={300}
                message={t('sharedCommon.edit')}>
                <IconButton
                  Icon={EditIcon}
                  size={isFullHD ? 'lg' : 'md'}
                  onClick={() => history.push(`/partner/${id}/edit`)}
                />
              </Tooltip>
            </>
          )}
          {canManagePartner && (
            <Tooltip
              className='mr-xs xxxl:mr-sm'
              delayDuration={300}
              message={isArchived ? t('partners.restore') : t('partners.archive')}>
              <IconButton
                Icon={isArchived ? UnarchiveIcon : ArchiveIcon}
                className={cx({ 'bg-white': !isArchived })}
                size={isFullHD ? 'lg' : 'md'}
                variant={isArchived ? 'success' : 'danger'}
                onClick={isArchived ? handleRestorePartner : toggleIsConfirmationModalOpen}
              />
            </Tooltip>
          )}
          {data?.partner?.url && (
            <Link
              Icon={WorldIcon}
              size={isFullHD ? 'md' : 'sm'}
              target='_blank'
              to={{ pathname: formatExternalLink(data.partner.url!) }}
              variant='primary'>
              {t('partners.website')}
            </Link>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        title={t('partners.archivePartner')}
        onClose={toggleIsConfirmationModalOpen}
        onConfirm={handleArchivePartner}>
        <Trans
          components={{ mediumText: <span className='font-medium' /> }}
          i18nKey='partners.archivePartnerDetails'
          values={{
            partnerName: data?.partner?.name,
          }}
        />
      </ConfirmationModal>
    </>
  );
};
