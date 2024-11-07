import PropTypes from 'prop-types';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

export const PaginationBar = ({ pagingProps }) => {
  if (!pagingProps.nodesCount) {
    return null;
  }

  return (
    <div className='bg-white justify-between text-xs py-xs border-t border-neutral-300 mt-auto'>
      <div className='flex gap-xxs items-center'>
        <SharedPaginatedLoader.PreviousPage {...pagingProps} />
        <SharedPaginatedLoader.PagingSlider {...pagingProps} />
        <SharedPaginatedLoader.NextPage {...pagingProps} />
      </div>
      <SharedPaginatedLoader.RecordsInfo {...pagingProps} />
    </div>
  );
};

PaginationBar.propTypes = {
  pagingProps: PropTypes.object,
};
