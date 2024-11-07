import { ObservableQueryFields } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { type ReactElement } from 'react';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import SharedInfiniteScrollContainer from '@shared/components/InfiniteScrollContainer/InfiniteScrollContainer';
import EmptyPlaceholder from '@shared/components/EmptyData/EmptyPlaceholder';
import { ReactComponent as TeamIcon } from '@shared/svg/team.svg';
import { cx } from '@shared/utils/cx';

import { type TActivityItem } from '../ActivityLog';

import ActivityListItem from './Item/Item';

type ActivityLogBodyProps = {
  className?: string;
  data?: TActivityItem[];
  loader?: ReactElement;
  loading: boolean;
  fetchMore?: ObservableQueryFields<
    { [key: string]: any },
    { [key: string]: any } & { after: string }
  >['fetchMore'];
  pageInfo?: {
    hasNextPage: boolean;
    endCursor: string;
  };
};

const ActivityLogBody = ({
  className,
  data,
  fetchMore,
  loader,
  loading,
  pageInfo,
}: ActivityLogBodyProps) => {
  const { t } = useTranslation();

  if (loading) {
    return loader || <SharedLoadingSpinner className='my-auto' size='small' />;
  }

  const hasNextPage = Boolean(pageInfo?.hasNextPage);
  const hasData = Boolean(data && data.length > 0);

  const renderActivityItems = (items: TActivityItem[]) =>
    items.map(({ cursor, node }) => <ActivityListItem key={cursor} {...node} />);

  const renderEmptyPlaceholder = () => (
    <EmptyPlaceholder icon={<TeamIcon />} text={t('components.activityLog.noActivity')} />
  );

  const fetchMoreResults = async () => {
    try {
      fetchMore && (await fetchMore({ variables: { after: pageInfo?.endCursor } }));
    } catch (e) {
      // Since it's infinity loader we dont want any user interaction in here
    }
  };

  return (
    <SharedInfiniteScrollContainer
      className={cx('pr-xs', className)}
      fetchMore={fetchMoreResults}
      hasNextPage={hasNextPage}
      withScrollbar={true}>
      <ul>{hasData ? renderActivityItems(data!) : renderEmptyPlaceholder()}</ul>
    </SharedInfiniteScrollContainer>
  );
};

export default ActivityLogBody;
