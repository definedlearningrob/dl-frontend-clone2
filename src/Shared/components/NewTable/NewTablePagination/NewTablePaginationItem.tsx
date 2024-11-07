import cx from 'classnames';

import { PaginationItem } from '@shared/utils/generatePaginationItems';

type Props = {
  paginationItem: PaginationItem;
  selectedPage: number;
  onClick: (pageIndex: number) => void;
};

export const NewTablePaginationItem = ({ paginationItem, selectedPage, onClick }: Props) => {
  const paginationItemClasses = 'w-md py-xs text-center rounded-xxs text-xs xxxl:text-sm';

  if (paginationItem === '...') {
    return <li className={paginationItemClasses}>{paginationItem}</li>;
  }

  const pageIndex = paginationItem - 1;
  const isSelected = selectedPage === pageIndex;

  return (
    <li>
      <button
        className={cx(paginationItemClasses, 'hover:bg-primary-200', {
          'bg-primary-200 text-primary-500': isSelected,
        })}
        onClick={() => onClick(pageIndex)}>
        {paginationItem}
      </button>
    </li>
  );
};
