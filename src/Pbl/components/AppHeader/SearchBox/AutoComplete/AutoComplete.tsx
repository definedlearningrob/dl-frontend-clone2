import { Hit } from 'react-instantsearch-core';

import Item from './Item/Item';

type Props = {
  hits: Hit[];
  activeHintIndex: number;
  setHoveredName: (name: string) => void;
};

function AppHeaderSearchBoxAutoComplete({ hits, activeHintIndex, setHoveredName }: Props) {
  return (
    <div className='search-box-dropdown'>
      <ul className='search-box-dropdown__list'>
        {hits.slice(0, 8).map((hit, index) => (
          <Item
            key={hit.objectID}
            activeHintIndex={activeHintIndex}
            hit={hit}
            index={index}
            setHoveredName={setHoveredName}
          />
        ))}
      </ul>
    </div>
  );
}

export default AppHeaderSearchBoxAutoComplete;
