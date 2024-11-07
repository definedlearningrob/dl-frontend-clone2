import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { useRecommendationRequestsQuery } from '@dc/graphql/user/hooks/useRecommendationRequestsQuery';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { CommonAppRequestsList } from '@dc/components/User/CommonAppRequests/CommonAppRequestsList';
import { CommonAppProfileCard } from '@dc/screens/UserApp/CommonApp/CommonAppProfileCard';
import { RECOMMENDER_TYPE } from '@dc/resources/enums';
import { CommonAppRequestSkeleton } from '@dc/screens/UserApp/CommonApp/CommonAppRequestSkeleton/CommonAppRequestSkeleton';
import { CommonAppProfileBar } from '@dc/screens/UserApp/CommonApp/CommonAppProfileBar';
import { useSyncCommonAppData } from '@dc/graphql/shared/hooks/useSyncCommonAppData';
import { RECOMMENDATION_REQUESTS_QUERY } from '@dc/graphql/user/queries/recommendationRequests';
import { CommonAppStarterSkeleton } from '@dc/screens/UserApp/CommonApp/CommonAppRequestSkeleton/CommonAppStarterSkeleton';
import { CommonAppSyncStatus } from '@dc/screens/UserApp/CommonApp/CommonAppSyncStatus/CommonAppSyncStatus';

import SharedCard from '@shared/components/Card/Card';
import LoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import styles from './CommonAppRequestsScreen.module.sass';

export const CommonAppRequestsScreen = () => {
  const { data, loading: isRecomendationRequestLoading } = useRecommendationRequestsQuery();

  const {
    userInfo: {
      commonAppData: {
        hasTeacherInvitation,
        hasCounselorInvitation,
        hasCounselorProfileFormCompleted,
        hasTeacherProfileFormCompleted,
      },
    },
  } = useUserInfo<TUserInfo>();

  const { isDataRefreshing, syncCommonAppData, lastSyncedAt } = useSyncCommonAppData([
    RECOMMENDATION_REQUESTS_QUERY,
    // TODO: uncomment after fixing useUserInfo hook
    // userInfoQuery,
  ]);

  const isLoading = isRecomendationRequestLoading && !isDataRefreshing;

  if (isLoading && (hasCounselorProfileFormCompleted || hasTeacherProfileFormCompleted)) {
    return <CommonAppRequestSkeleton />;
  }

  if (isLoading) {
    return (
      <SharedMainContent className={styles.container}>
        <CommonAppStarterSkeleton />
      </SharedMainContent>
    );
  }

  if (!data) {
    return null;
  }

  if (!hasCounselorProfileFormCompleted && !hasTeacherProfileFormCompleted) {
    return (
      <SharedMainContent className={styles.container}>
        {hasCounselorInvitation && <CommonAppProfileCard type={RECOMMENDER_TYPE.COUNSELOR} />}
        {hasTeacherInvitation && hasCounselorInvitation && (
          <div className={styles.verticalDivider} />
        )}
        {hasTeacherInvitation && <CommonAppProfileCard type={RECOMMENDER_TYPE.TEACHER} />}
      </SharedMainContent>
    );
  }

  return (
    <SharedMainContent>
      <CommonAppSyncStatus
        isDataRefreshing={isDataRefreshing}
        lastSyncedAt={lastSyncedAt}
        onSync={syncCommonAppData}
      />
      <SharedCard className={styles.card}>
        <SharedCard.Header className={styles.cardHeader}>
          <CommonAppProfileBar />
        </SharedCard.Header>
      </SharedCard>
      <SharedCard.Body>
        {isRecomendationRequestLoading && (
          <SharedCard className='py-lg'>
            <LoadingSpinner color='primary' size='small' />
          </SharedCard>
        )}
        {!isRecomendationRequestLoading && <CommonAppRequestsList />}
      </SharedCard.Body>
    </SharedMainContent>
  );
};
