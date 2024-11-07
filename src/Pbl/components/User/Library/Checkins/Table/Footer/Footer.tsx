import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

import styles from './Footer.module.sass';

type CheckinsTableFooterProps = {
  loading: boolean;
  onFirstPage: boolean;
  nextPage: () => void;
  onLastPage: boolean;
  page: number;
  pagesCount: number;
  prevPage: () => void;
  selectPageHandler: (page: number) => () => void;
  text: boolean;
  nodesCount: number;
};

const CheckinsTableFooter = (props: CheckinsTableFooterProps) => {
  const shouldHidePagination = props.pagesCount < 2;

  if (shouldHidePagination) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <SharedPaginatedLoader.PreviousPage {...props} />
      <SharedPaginatedLoader.PagingSlider {...props} />
      <SharedPaginatedLoader.NextPage {...props} />
    </div>
  );
};

export default CheckinsTableFooter;
