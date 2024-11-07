import { ApolloQueryResult, FetchMoreOptions } from '@apollo/client';
import { type ReactElement } from 'react';

import SharedCard from '@shared/components/Card/Card';

import { type TActivityItem } from './Body/Item/Item';
import ActivityLogBody from './Body/Body';

export { TActivityItem };

type ActivityLogProps = {
  className?: string;
  classNameList?: string;
  data?: TActivityItem[];
  loading: boolean;
  pageInfo?: {
    hasNextPage: boolean;
    endCursor: string;
  };
  title: string;
  fetchMore?: (options: FetchMoreOptions) => Promise<ApolloQueryResult<any>>;
  loader?: ReactElement;
};
const ActivityLog = ({
  className,
  classNameList,
  data,
  fetchMore,
  loading,
  loader,
  pageInfo,
  title,
}: ActivityLogProps) => (
  <SharedCard className={className}>
    <SharedCard.Header>
      <SharedCard.Title className='!text-base xxxl:!text-base'>{title}</SharedCard.Title>
    </SharedCard.Header>
    <SharedCard.Body className='min-h-0 grow'>
      <ActivityLogBody
        className={classNameList}
        data={data}
        fetchMore={fetchMore}
        loader={loader}
        loading={loading}
        pageInfo={pageInfo}
      />
    </SharedCard.Body>
  </SharedCard>
);

export default ActivityLog;
