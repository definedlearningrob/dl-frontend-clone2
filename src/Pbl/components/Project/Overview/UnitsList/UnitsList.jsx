import { useState, useLayoutEffect, useRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './UnitsList.sass';

ProjectOverviewUnitsList.propTypes = {
  units: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};

const MAX_LINES = 2;
const LINE_HEIGHT = 24;

function ProjectOverviewUnitsList({ units }) {
  const listRef = useRef();
  const [isExpandable, setIsExpandable] = useState();
  const [truncatedList, setTruncatedList] = useState(true);
  const { t } = useTranslation();

  const unitsListClasses = cx('user-project-overview-units__list', {
    '-truncated': isExpandable && truncatedList,
  });

  const toggleList = () => setTruncatedList(!truncatedList);

  useLayoutEffect(() => {
    const hasMoreThen2LinesOfText = () => {
      const listHeight = listRef.current.clientHeight;
      const lines = listHeight / LINE_HEIGHT;

      return lines > MAX_LINES;
    };

    setIsExpandable(hasMoreThen2LinesOfText());
  }, []);

  return (
    <div className='user-project-overview-units'>
      <ul ref={listRef} className={unitsListClasses}>
        {units.map(({ displayName, id }) => (
          <li
            key={id}
            className='user-project-overview-units__item'
            data-testid='overview-unit-item'>
            {displayName}
          </li>
        ))}
      </ul>
      {isExpandable && (
        <button className='user-project-overview-units__button' onClick={toggleList}>
          {truncatedList ? t('project.showMore') : t('project.showLess')}
        </button>
      )}
    </div>
  );
}

export default ProjectOverviewUnitsList;
