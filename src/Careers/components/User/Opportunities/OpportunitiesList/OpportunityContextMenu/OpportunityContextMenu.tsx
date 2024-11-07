import { FC, SVGProps } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { compact, isEmpty } from 'lodash-es';

import { ReactComponent as RecommendIcon } from '@dc/svg/thumbs-up.svg';
import { ReactComponent as ReviewIcon } from '@dc/svg/review.svg';
import { TOpportunity } from '@dc/graphql/user/queries/opportunities';
import { VISIBILITY_SCOPE } from '@dc/resources/enums';
import { ROLES } from '@dc/resources/constants';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import SharedDropdown from '@shared/components/Dropdown/Dropdown';
import { ReactComponent as ArchiveIcon } from '@shared/svg/archive.svg';
import { ReactComponent as DotsIcon } from '@shared/svg/three_dots.svg';
import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { cx } from '@shared/utils/cx';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { getIsExpired } from '@shared/utils/date';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import { RecommendOpportunityModal } from '../../RecommendOpportunityModal';

type Opportunity = Pick<TOpportunity, 'id' | 'visibilityScope' | 'opportunityType' | 'periodEnd'>;

type Props = {
  opportunity: Opportunity;
  onArchive: () => void;
};

type ContextMenuOption = {
  guarded?: boolean;
  className?: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
  onClick: () => void;
};

export const OpportunityContextMenu = ({ opportunity, onArchive }: Props) => {
  const history = useHistory();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TUserInfo>();
  const [isRecommendModalOpen, toggleRecommendModal] = useToggle(false);

  const isSystemAdmin = userInfo.role === ROLES.SYSTEM_ADMIN;
  const isWBLAdmin = userInfo.permissions.wblAdmin;

  const isExpired = opportunity.periodEnd && getIsExpired(opportunity.periodEnd);

  const canEdit =
    isSystemAdmin || (opportunity.visibilityScope === VISIBILITY_SCOPE.ENTITY && isWBLAdmin);

  const handleShowApplications = () =>
    history.push(`/opportunities/${opportunity.id}/manage-applications`);
  const handleEditOpportunity = () => history.push(`/opportunities/${opportunity.id}/edit`);

  const contextMenuOptions: ContextMenuOption[] = compact([
    !isExpired && {
      Icon: ReviewIcon,
      label: t('opportunities.contextMenuOptions.showApplications'),
      onClick: handleShowApplications,
    },
    !isExpired && {
      Icon: RecommendIcon,
      label: t('opportunities.contextMenuOptions.recommend'),
      onClick: toggleRecommendModal,
    },
    canEdit && {
      Icon: EditIcon,
      label: t('common.actions.edit'),
      onClick: handleEditOpportunity,
    },
    canEdit && {
      Icon: ArchiveIcon,
      label: t('common.actions.archive'),
      onClick: onArchive,
      className: '!text-danger-500',
    },
  ]);

  if (isEmpty(contextMenuOptions)) {
    return null;
  }

  return (
    <div className='ml-auto w-fit'>
      <SharedDropdown>
        <SharedDropdown.Dropdown>
          <SharedDropdown.Trigger className='opacity-0 group-hover/row:opacity-100 group-focus/row:opacity-100 focus-within:opacity-100'>
            <IconButton
              Icon={DotsIcon}
              aria-label={t('sharedCommon.actions')}
              className='text-primary-500 !bg-white'
              size={isFullHD ? 'md' : 'sm'}
              onClick={(event) => event.stopPropagation()}
            />
          </SharedDropdown.Trigger>
          <SharedDropdown.Options>
            {contextMenuOptions.map((option) => (
              <SharedDropdown.Option
                key={option.label}
                aria-label={option.label}
                className={cx('!text-font-primary !text-xxs xxxl:!text-xs', option.className)}
                onClick={option.onClick}>
                <IconContainer
                  Icon={option.Icon}
                  paddingSize='none'
                  size={isFullHD ? 'base' : 'sm'}
                />
                {option.label}
              </SharedDropdown.Option>
            ))}
          </SharedDropdown.Options>
        </SharedDropdown.Dropdown>
      </SharedDropdown>
      {isRecommendModalOpen && (
        <RecommendOpportunityModal
          isOpen={true}
          opportunityId={opportunity.id}
          onClose={() => toggleRecommendModal(false)}
        />
      )}
    </div>
  );
};
