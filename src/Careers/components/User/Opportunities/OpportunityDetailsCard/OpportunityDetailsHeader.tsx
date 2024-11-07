import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import useUserInfo from '@dc/hooks/useUserInfo';
import { VISIBILITY_SCOPE } from '@dc/resources/enums';

import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { ReactComponent as ArchiveIcon } from '@shared/svg/delete_outlined.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Tooltip } from '@shared/components/Tooltip';
import { Kicker } from '@shared/components/Kicker';
import { IconButton } from '@shared/components/IconButton/IconButton';

type Props = {
  visibilityScope: string;
  callArchiveModal: () => void;
  hasPendingApplications: boolean;
};

export const OpportunityDetailsHeader = ({
  visibilityScope,
  callArchiveModal,
  hasPendingApplications,
}: Props) => {
  const history = useHistory();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { id } = useParams<{ id: string }>();
  const { userInfo, isSystemAdminUser } = useUserInfo<TUserInfo>();
  const isWBLAdmin = userInfo.permissions.wblAdmin;
  const { t } = useTranslation();
  const handleEditClick = () => {
    history.push(`/opportunities/${id}/edit`);
  };

  if (!visibilityScope) {
    return null;
  }

  const canEdit = (visibilityScope === VISIBILITY_SCOPE.ENTITY && isWBLAdmin) || isSystemAdminUser;

  if (!canEdit) {
    return null;
  }

  const iconSize = isFullHD ? 'lg' : 'md';

  return (
    <div className='flex justify-between items-end flex-1 gap-xs'>
      {hasPendingApplications && (
        <Kicker className='!mb-0' size={isFullHD ? 'md' : 'sm'} variant='secondary'>
          {t('opportunityDetails.pendingApplications')}
        </Kicker>
      )}
      <div className='flex flex-1 justify-end gap-xs'>
        <Tooltip message={t('common.actions.edit')}>
          <IconButton
            Icon={EditIcon}
            size={iconSize}
            variant='primary-outlined'
            onClick={handleEditClick}
          />
        </Tooltip>
        <Tooltip message={t('common.actions.archive')}>
          <IconButton
            Icon={ArchiveIcon}
            size={iconSize}
            variant='danger-outlined'
            onClick={callArchiveModal}
          />
        </Tooltip>
      </div>
    </div>
  );
};
