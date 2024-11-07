import cx from 'classnames';
import { BaseSyntheticEvent, useMemo, useState } from 'react';
import { NetworkStatus } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';
import dayjs from 'dayjs';

import {
  RecommendationRequest,
  RECOMMENDATION_REQUEST_STATUSES,
} from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import SharedTable from '@dc/shared/Table/Table';
import { useRecommendationRequestsQuery } from '@dc/graphql/user/hooks/useRecommendationRequestsQuery';

import { Badge } from '@shared/components/Badge/Badge';
import Card from '@shared/components/Card/Card';
import { DateWithTooltip } from '@shared/components/DateWithTooltip/DateWithTooltip';
import { NeedsAttentionMarker } from '@shared/components/NeedsAttentionMarker/NeedsAttentionMarker';

import styles from './CommonAppRequestsList.module.sass';

const badgeTypesMap = {
  [RECOMMENDATION_REQUEST_STATUSES.NOT_STARTED]: 'neutral',
  [RECOMMENDATION_REQUEST_STATUSES.IN_PROGRESS]: 'secondary',
  [RECOMMENDATION_REQUEST_STATUSES.COMPLETED]: 'success',
} as const;

const getRecommendationRequestStatus = (recommendationRequest: RecommendationRequest) => {
  const { submittedFormsCount, totalFormsCount } = recommendationRequest;

  if (submittedFormsCount === 0) {
    return RECOMMENDATION_REQUEST_STATUSES.NOT_STARTED;
  }

  return submittedFormsCount === totalFormsCount
    ? RECOMMENDATION_REQUEST_STATUSES.COMPLETED
    : RECOMMENDATION_REQUEST_STATUSES.IN_PROGRESS;
};

export const CommonAppRequestsList = () => {
  const { t } = useTranslation();
  const { data, refetch, fetchMore, networkStatus } = useRecommendationRequestsQuery();
  const [page, setPage] = useState(1);
  const history = useHistory();

  if (!data) {
    return null;
  }

  const {
    recommendationRequests: { nodes, nodesCount, pagesCount },
  } = data;
  const hasNextPage = page < pagesCount;
  const hasNoData = nodesCount === 0 && networkStatus === NetworkStatus.ready;

  useUpdateEffect(() => {
    refetch({ page: 1, infiniteScroll: false });
    setPage(1);
  }, [refetch]);

  const columns = useMemo(
    () => [
      {
        title: t('user.postSecondary.commonAppRequests.studentName'),
        render: (recommendationRequest: RecommendationRequest) => {
          const monthBeforeDeadline = dayjs(recommendationRequest.deadline).subtract(1, 'month');
          const allFormsSubmitted =
            recommendationRequest.submittedFormsCount === recommendationRequest.totalFormsCount;

          const needsAttention = !allFormsSubmitted && dayjs().isAfter(monthBeforeDeadline);

          return (
            <div>
              {needsAttention && (
                <NeedsAttentionMarker text={t('user.postSecondary.commonAppRequests.deadline')} />
              )}
              <div className='text-primary-500 text-xs font-bold'>
                {[
                  recommendationRequest.applicant.firstName,
                  recommendationRequest.applicant.lastName,
                ].join(' ')}
              </div>
            </div>
          );
        },
      },
      {
        title: t('user.postSecondary.commonAppRequests.totalFormsCount'),
        render: (recommendationRequest: RecommendationRequest) => (
          <div>{recommendationRequest.totalFormsCount}</div>
        ),
      },
      {
        title: t('user.postSecondary.commonAppRequests.submittedFormsCount'),
        render: (recommendationRequest: RecommendationRequest) => (
          <div>{recommendationRequest.submittedFormsCount}</div>
        ),
      },
      {
        title: t('user.postSecondary.commonAppRequests.deadline'),
        render: ({ deadline }: RecommendationRequest) => <DateWithTooltip date={deadline} />,
      },
      {
        title: t('user.postSecondary.commonAppRequests.status'),
        render: (recommendationRequest: RecommendationRequest) => {
          const status = getRecommendationRequestStatus(recommendationRequest);

          return (
            <Badge type={badgeTypesMap[status]}>
              {t(`user.postSecondary.commonAppRequests.statuses.${status}`)}
            </Badge>
          );
        },
      },
    ],
    []
  );

  const handleRowClick = (
    id: string,
    recommendationRequest: RecommendationRequest,
    event: BaseSyntheticEvent<Event>
  ) => {
    event.preventDefault();

    const {
      applicant: { uuid },
    } = recommendationRequest;
    const path = `/post-secondary/commonapp-requests/${uuid}`;

    history.push(path);
  };

  const handleFetchMore = () => {
    const nextPage = page + 1;

    fetchMore({ variables: { page: nextPage, infiniteScroll: true } });
    setPage(nextPage);
  };

  return (
    <Card withoutPadding={true}>
      <Card.Header withPadding={true}>
        <h4 className='text-base'>
          {t('user.postSecondary.commonAppRequests.applicationRequests')}
        </h4>
      </Card.Header>
      <Card.Body>
        <SharedTable
          tableClassname='!h-full'
          tableWrapperClassname={cx({ [styles.emptyTableWrapper]: hasNoData })}>
          <SharedTable.Head
            cols={columns}
            columnClassname='text-xxs font-regular !py-sm !px-base xxxs:text-xs whitespace-nowrap'
          />
          <SharedTable.Body
            cols={columns}
            columnClassname='relative flex items-center cursor-pointer text-xs !py-sm !px-base xxxl:text-sm'
            data={nodes}
            fetchMore={handleFetchMore}
            hasNextPage={hasNextPage}
            rowClassname={styles.tableRow}
            onRowClick={handleRowClick}
          />
        </SharedTable>
        {hasNoData && (
          <div className={styles.emptyTableMessage}>
            {t('user.postSecondary.commonAppRequests.empty')}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
