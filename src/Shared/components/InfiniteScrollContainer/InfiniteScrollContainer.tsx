import cx from 'classnames';
import { PropsWithChildren, useCallback } from 'react';

import styles from './InfiniteScrollContainer.module.sass';

type Props = PropsWithChildren<{
  className?: string;
  fetchMore: () => void;
  hasNextPage: boolean;
  reverse?: boolean;
  withScrollbar?: boolean;
}>;

function SharedInfiniteScrollContainer({
  children,
  className,
  fetchMore,
  hasNextPage,
  reverse,
  withScrollbar,
}: Props) {
  const classNames = cx(
    'flex flex-col scrollbar',
    {
      'transparent-scrollbar': !withScrollbar,
      [styles.reversed]: reverse,
    },
    className && className
  );

  const handleScrollNearEnd = useCallback(
    (event) => {
      const hitBottom =
        event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight;
      const hitTop =
        event.target.offsetHeight - event.target.scrollHeight + 5 >= event.target.scrollTop;
      const hitProperEnd = reverse ? hitTop : hitBottom;

      if (hitProperEnd && hasNextPage) {
        fetchMore();
      }
    },
    [hasNextPage, reverse, fetchMore]
  );

  return (
    <div className={classNames} onScroll={handleScrollNearEnd}>
      {children}
    </div>
  );
}

export default SharedInfiniteScrollContainer;
