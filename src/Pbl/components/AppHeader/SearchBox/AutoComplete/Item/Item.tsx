/* eslint-disable camelcase */
import cx from 'classnames';
import { Hit } from 'react-instantsearch-core';

type Props = {
  hit: Hit;
  activeHintIndex: number;
  index: number;
  setHoveredName: (name: string) => void;
};

function AppHeaderSearchBoxAutoComplete({
  hit: { display_name },
  activeHintIndex,
  index,
  setHoveredName,
}: Props) {
  const classes = cx('search-box-dropdown__list-item', {
    '-active': activeHintIndex === index,
  });

  const handleMouseEnter = () => setHoveredName(display_name);
  const handleMouseLeave = () => setHoveredName('');

  return (
    <li className={classes} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {display_name}
    </li>
  );
}

export default AppHeaderSearchBoxAutoComplete;
