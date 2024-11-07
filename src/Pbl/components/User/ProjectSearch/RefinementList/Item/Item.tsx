import cx from 'classnames';
import { Highlight } from 'react-instantsearch-dom';
import { Hit } from 'react-instantsearch-core';
import { MouseEvent } from 'react';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

type Props = {
  item: Hit<{ count: number; isRefined: boolean; label: string; value: string[] }>;
  isFromSearch: boolean;
  createUrl: (item: string[]) => string;
  refine: (item: string[]) => void;
  searching: boolean;
};

function UserProjectSearchRefinementListItem({
  item,
  refine,
  isFromSearch,
  createUrl,
  searching,
}: Props) {
  const classes = cx('refinement-list__item', {
    '-refined': item.isRefined,
    '-disabled': searching,
  });

  const handleClick = (event: MouseEvent) => {
    if (!searching) {
      event.preventDefault();
      refine(item.value);
    }
  };

  return (
    <li>
      <a className={classes} href={createUrl(item.value)} role='link' onClick={handleClick}>
        <div className='refinement-list__item-label'>
          <SharedCheckbox
            checked={item.isRefined}
            className='search-checkbox'
            onChange={() => {}}
          />
          {isFromSearch ? <Highlight attribute='label' hit={item} /> : item.label}{' '}
        </div>
        <span className='refinement-list__item-count'>{item.count}</span>
      </a>
    </li>
  );
}

export default UserProjectSearchRefinementListItem;
