import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useToggle } from 'react-use';

import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import useUserInfo from '@dc/hooks/useUserInfo';
import { RecommendOpportunityModal } from '@dc/components/User/Opportunities/RecommendOpportunityModal';

import Link from '@shared/components/Link';
import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  virtualInternshipId?: string;
};

export const OpportunityDetailsActions = ({ virtualInternshipId }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [isRecommendModalOpen, toggleRecommendModal] = useToggle(false);

  const {
    userInfo: { permissions },
  } = useUserInfo<TUserInfo>();

  const { id } = useParams<{ id: string }>();

  const isVirtualInternship = !!virtualInternshipId;
  const isWBLAdmin = permissions?.wblAdmin;

  const buttonVariant = isWBLAdmin ? 'primary-outlined' : 'primary';
  const buttonSize = isFullHD ? 'md' : 'sm';

  return (
    <>
      <div className='flex gap-xs xxxl:gap-sm'>
        {isWBLAdmin && (
          <Link
            size={buttonSize}
            to={`/opportunities/${id}/manage-applications`}
            variant={isVirtualInternship ? 'secondary' : 'primary'}>
            {t('user.opportunities.applications')}
          </Link>
        )}
        {isVirtualInternship && (
          <Link
            size={buttonSize}
            to={`/opportunities/${id}/virtual-internship/${virtualInternshipId}`}
            variant='primary'>
            {t('user.opportunities.showInternship')}
          </Link>
        )}
        <Button size={buttonSize} variant={buttonVariant} onClick={toggleRecommendModal}>
          {t('user.opportunities.recommend')}
        </Button>
      </div>
      <RecommendOpportunityModal
        isOpen={isRecommendModalOpen}
        opportunityId={id}
        onClose={() => toggleRecommendModal(false)}
      />
    </>
  );
};
