import { useTranslation } from 'react-i18next';

import { ReactComponent as StudentEmptyOpportunities } from '@dc/images/opportunity_cards_with_search.svg';
import { ReactComponent as UserEmptyOpportunities } from '@dc/images/opportunity_cards.svg';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { Roles } from '@dc/resources/enums';

import { EmptyPartnerSection } from '../EmptyPartnerSection';

const opportunitiesEmptyState = {
  user: {
    title: 'partners.emptyOpportunities',
    description: 'partners.assignOpportnitiesInfo',
    Image: UserEmptyOpportunities,
  },
  student: {
    title: 'partners.opportunitiesNotFound',
    description: 'partners.noOpportunitiesAssigned',
    Image: StudentEmptyOpportunities,
  },
};

export const EmptyPartnerOpportunities = () => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TUserInfo | TStudentInfo>();

  const isWBLAdmin = 'permissions' in userInfo && userInfo.permissions.wblAdmin;
  const isSystemAdmin = 'role' in userInfo && userInfo?.role === Roles.SYSTEM_ADMIN;

  const { title, description, Image } =
    opportunitiesEmptyState[isWBLAdmin || isSystemAdmin ? 'user' : 'student'];

  return <EmptyPartnerSection Image={Image} description={t(description)} title={t(title)} />;
};
