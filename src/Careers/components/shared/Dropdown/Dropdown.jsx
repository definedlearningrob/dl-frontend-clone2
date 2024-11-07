import cx from 'classnames';
import PropTypes from 'prop-types';
import {
  useCallback,
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
  useMemo,
} from 'react';

import './Dropdown.sass';

SharedDropdown.defaultProps = {
  placement: 'bottom',
};

SharedDropdown.propTypes = {
  children: PropTypes.node,
  placement: PropTypes.oneOf(['top', 'bottom']),
};

export const DropdownContext = createContext({});

const CLASS_NAME = 'dropdown-options';
const triggerClass = `${CLASS_NAME}__trigger`;

function SharedDropdown({ children, placement }) {
  const node = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const triggerId = useMemo(
    () => `${Math.random().toString(36).substring(7)}-dropdown-trigger`,
    []
  );

  const handleClickOutsideDropdown = useCallback(
    ({ target }) => {
      const trigger = document.getElementById(triggerId);
      const clickedOutside = !node.current.contains(target);

      if (trigger && trigger.contains(target)) {
        return setIsVisible(!isVisible);
      }

      if (clickedOutside) {
        close();
      }
    },
    [node, isVisible, triggerId]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropdown);

    return () => document.removeEventListener('mousedown', handleClickOutsideDropdown);
  }, [handleClickOutsideDropdown]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleClickOutsideDropdown]);

  const close = () => setIsVisible(false);

  const handleEscapeKey = (event) => {
    const escapeKey = 27;

    if (event.keyCode === escapeKey) {
      close();
    }
  };

  return (
    <DropdownContext.Provider value={{ close, isVisible, node, placement, triggerId }}>
      {children}
    </DropdownContext.Provider>
  );
}

SharedDropdown.Dropdown = function ({ children, className }) {
  const { node, isVisible } = useContext(DropdownContext);

  const classes = cx('dropdown-container', {
    [className]: className,
    '-open': isVisible,
  });

  return (
    <div ref={node} className={classes}>
      {children}
    </div>
  );
};

SharedDropdown.Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

SharedDropdown.Trigger = function ({ children, className, ...attributes }) {
  const { triggerId } = useContext(DropdownContext);

  const classes = cx(triggerClass, { [className]: className });

  return (
    <div className={classes} data-testid='dropdown-container' id={triggerId} {...attributes}>
      {children}
    </div>
  );
};

SharedDropdown.Trigger.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

SharedDropdown.Options = function ({ children, className, onDropdownOpen, ...attributes }) {
  const { isVisible, placement } = useContext(DropdownContext);

  const classes = cx(CLASS_NAME, { [className]: className, '-direction-top': placement === 'top' });

  useEffect(() => {
    if (isVisible && onDropdownOpen) {
      onDropdownOpen();
    }
  }, [isVisible]);

  return (
    isVisible && (
      <div className={classes} {...attributes}>
        <ul className={`${CLASS_NAME}__lists`}>{children}</ul>
      </div>
    )
  );
};

SharedDropdown.Options.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onDropdownOpen: PropTypes.func,
};

SharedDropdown.Option = function ({ children, className, onClick, ...attributes }) {
  const { close } = useContext(DropdownContext);

  const classes = cx(`${CLASS_NAME}__dropdown`, { [className]: className });
  const handleClick = () => {
    onClick();
    close();
  };

  return (
    <li className={classes} role='presentation' onClick={handleClick} {...attributes}>
      {children}
    </li>
  );
};

SharedDropdown.Option.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default SharedDropdown;
