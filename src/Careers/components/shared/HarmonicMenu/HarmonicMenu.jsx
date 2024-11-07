import cx from 'classnames';
import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ArrowDown } from '@shared/svg/chevron_down.svg';

const HarmonicMenuContext = createContext({});

SharedHarmonicMenu.propTypes = {
  children: PropTypes.func,
  initialToggled: PropTypes.number,
  items: PropTypes.array,
  onToggle: PropTypes.func,
  title: PropTypes.string,
};

function SharedHarmonicMenu({ children, initialToggled, items, title, onToggle }) {
  const [extendedIndex, setExtendedIndex] = useState(initialToggled);

  const toggleExtended = (index) => () => {
    const alreadyExtended = index === extendedIndex;
    const valueToSet = alreadyExtended ? null : index;
    setExtendedIndex(valueToSet);
    onToggle && onToggle(valueToSet);
  };

  return (
    <div className='harmonic-menu'>
      {title && <h3 className='harmonic-menu__title'>{title}</h3>}
      <ul className='harmonic-menu__list'>
        {items.map((item, index) => {
          const isExtended = extendedIndex === index;
          const itemClasses = cx('harmonic-menu__item', {
            '-extended': isExtended,
          });

          return (
            <li key={index} className={itemClasses} data-testid='activity-course-item'>
              <HarmonicMenuContext.Provider value={{ isExtended, toggleExtended, index }}>
                {children({ item, isExtended })}
              </HarmonicMenuContext.Provider>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

SharedHarmonicMenu.Header = function ({ children }) {
  const { toggleExtended, isExtended, index } = useContext(HarmonicMenuContext);

  const iconClasses = cx('harmonic-menu__icon', {
    '-extended': isExtended,
  });

  return (
    <div
      className='harmonic-menu__label'
      data-testid='toggle-harmonic-item'
      onClick={toggleExtended(index)}>
      {children}
      <SharedIcon className={iconClasses} icon={<ArrowDown />} size='sm' />
    </div>
  );
};

SharedHarmonicMenu.Header.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
};

SharedHarmonicMenu.Content = function ({ children }) {
  const { isExtended } = useContext(HarmonicMenuContext);

  const contentClasses = cx('harmonic-menu__content', {
    '-extended': isExtended,
  });

  return <div className={contentClasses}>{children}</div>;
};

SharedHarmonicMenu.Content.propTypes = {
  children: PropTypes.object,
};

export default SharedHarmonicMenu;
