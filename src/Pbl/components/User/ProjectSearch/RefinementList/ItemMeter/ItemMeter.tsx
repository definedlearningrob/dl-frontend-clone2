import { Hit } from 'react-instantsearch-core';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

type Props = {
  item: Hit<{ count: number; isRefined: boolean; label: string; value: string[] }>;
};

function UserProjectSearchRefinementListItemMeter({ item }: Props) {
  return (
    <div>
      <div className='refinement-list__item'>
        <div className='refinement-list__item-label'>
          <SharedCheckbox className='search-checkbox' />
          {item.label}{' '}
        </div>
        <span>{item.count}</span>
      </div>
    </div>
  );
}

export default UserProjectSearchRefinementListItemMeter;
