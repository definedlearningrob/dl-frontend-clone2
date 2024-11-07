import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

type CheckinsAssignPaginationProps = {
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

export const CheckinsAssignPagination = (props: CheckinsAssignPaginationProps) => (
  <div className='flex items-center mt-base justify-center'>
    <SharedPaginatedLoader.PreviousPage {...props} />
    <SharedPaginatedLoader.PagingSlider {...props} />
    <SharedPaginatedLoader.NextPage {...props} />
  </div>
);
