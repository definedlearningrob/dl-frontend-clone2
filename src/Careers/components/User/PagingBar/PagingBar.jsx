import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as LeftIcon } from '@shared/svg/chevron_left.svg';
import { ReactComponent as RightIcon } from '@shared/svg/chevron_right.svg';

UserPagingBar.propTypes = {
  pagingProps: PropTypes.shape({
    nextPage: PropTypes.func,
    onFirstPage: PropTypes.bool,
    onLastPage: PropTypes.bool,
    page: PropTypes.number,
    pagesCount: PropTypes.number,
    prevPage: PropTypes.func,
  }),
};

function UserPagingBar({ pagingProps }) {
  const { t } = useTranslation();

  return (
    pagingProps.pagesCount > 1 && (
      <div className='user-paging-bar'>
        <span className='user-paging-bar__page-info'>
          {t('shared.paginatedLoader.pageStatus', {
            page: pagingProps.page,
            pagesCount: pagingProps.pagesCount,
          })}
        </span>
        <button
          className='user-paging-bar__button user-paging-bar__button-prev'
          disabled={pagingProps.onFirstPage}
          onClick={pagingProps.prevPage}>
          <SharedIcon icon={<LeftIcon />} size='sm' />
        </button>
        <button
          className='user-paging-bar__button user-paging-bar__button-next'
          disabled={pagingProps.onLastPage}
          onClick={pagingProps.nextPage}>
          <SharedIcon icon={<RightIcon />} size='sm' />
        </button>
      </div>
    )
  );
}

export default UserPagingBar;
