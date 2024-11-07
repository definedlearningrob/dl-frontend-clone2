import cx from 'classnames';
import {
  createContext,
  KeyboardEvent,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  HTMLProps,
} from 'react';

import { ReactComponent as MoreIcon } from '@dc/svg/more_horizontal.svg';

import Portal from '@shared/components/Portal/Portal';
import SharedIcon from '@shared/components/Icon/Icon';
import { KeyboardCodes } from '@shared/resources/enums';

import './Dropdown.sass';

type TContext = {
  node: RefObject<HTMLDivElement>;
  triggerRef: RefObject<HTMLDivElement>;
  optionsRef: RefObject<HTMLDivElement>;
  optionsCoordinates: { top: number; left: number } | null;
  computeCoordinates: () => void;
  close: () => void;
  isOpen: boolean;
};

export const DropdownContext = createContext<TContext>({} as TContext);

const OPTIONS_CLASS_NAME = 'dropdown-portal-options';
const triggerClass = `${OPTIONS_CLASS_NAME}__trigger`;

type Props = {
  children: ReactNode;
  position?: 'top' | 'bottom';
};

function SharedDropdown({ children, position = 'bottom' }: Props) {
  const [optionsStateCoordinates, setOptionsStateCoordinates] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const node = useRef<HTMLDivElement>(null);
  const options = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLDivElement>(null);
  const optionsCoordinates = useRef<{ top: number; left: number } | null>(null);

  const close = () => {
    setOptionsStateCoordinates(null);
    optionsCoordinates.current = null;
  };

  const handleClickOutsideDropdown = (event: Event) => {
    const { target } = event;
    const clickedOutside = !node?.current?.contains(target as Node);
    const clickedInside = trigger && trigger.current?.contains(target as Node);
    const clickedInMenu = options && options.current?.contains(target as Node);

    if (clickedInside && optionsCoordinates.current) {
      return close();
    }

    if (clickedInside) {
      return computeCoordinates();
    }

    if (clickedInMenu && target) {
      // Triggering event manually since it has no time to bubb;e because of close
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      close();
    }

    if (clickedOutside) {
      close();
    }
  };

  const computeCoordinates = () => {
    if (!trigger?.current || !options?.current) return;

    const triggerElement = trigger.current.getBoundingClientRect();

    const coords = {
      top: {
        left: triggerElement.x + triggerElement.width - options.current.offsetWidth,
        top: triggerElement.y - options.current.offsetHeight - 18,
      },
      bottom: {
        left: triggerElement.x + triggerElement.width - options.current.offsetWidth,
        top: triggerElement.y + triggerElement.height,
      },
    }[position];

    setOptionsStateCoordinates(coords);
    optionsCoordinates.current = coords;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (optionsCoordinates.current) {
        setOptionsStateCoordinates(null);
        optionsCoordinates.current = null;
      }
    };

    document.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropdown);

    return () => document.removeEventListener('mousedown', handleClickOutsideDropdown);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const isKeyboardEvent = (event: Event | KeyboardEvent): event is KeyboardEvent =>
    !!(event as KeyboardEvent).key;

  const handleEscapeKey = (event: Event) => {
    if (isKeyboardEvent(event)) {
      if (event.key === KeyboardCodes.ESCAPE) {
        close();
      }
    }
  };

  return (
    <DropdownContext.Provider
      value={{
        close,
        node,
        triggerRef: trigger,
        optionsRef: options,
        optionsCoordinates: optionsStateCoordinates,
        computeCoordinates,
        isOpen: !!optionsStateCoordinates,
      }}>
      {children}
    </DropdownContext.Provider>
  );
}

type TDropdownProps = {
  children: ReactNode;
  className?: string;
};

SharedDropdown.Dropdown = function ({ children, className = '' }: TDropdownProps) {
  const { node } = useContext(DropdownContext);

  const classes = cx('dropdown-portal-container', className && { [className]: className });

  return (
    <div ref={node} className={classes}>
      {children}
    </div>
  );
};

type TTriggerProps = {
  children?: ReactNode;
  className?: string;
};

SharedDropdown.Trigger = function ({ children, className }: TTriggerProps) {
  const { optionsCoordinates, triggerRef } = useContext(DropdownContext);

  const classes = cx(triggerClass, className, {
    '-active': optionsCoordinates,
  });

  return (
    <div ref={triggerRef} className={classes} data-testid='dropdown-trigger-container'>
      {children ? (
        children
      ) : (
        <button
          className={`${triggerClass}-icon-wrapper`}
          onClick={(event) => event.stopPropagation()}>
          <SharedIcon className={`${triggerClass}-icon`} icon={<MoreIcon />} size='sm' />
        </button>
      )}
    </div>
  );
};

type TOptionsProps = {
  children: ReactNode;
  className?: string;
};

SharedDropdown.Options = function ({ children, className }: TOptionsProps) {
  const { optionsCoordinates, optionsRef, computeCoordinates } = useContext(DropdownContext);

  const classes = cx(OPTIONS_CLASS_NAME, {
    [className || '']: className,
    '-visible': !!optionsCoordinates,
  });

  return (
    <Portal className='dropdown-portal-container' id='dropdown-portal-container'>
      <div
        ref={optionsRef}
        className={classes}
        data-testid='dropdown-options-container'
        style={{ ...optionsCoordinates }}
        onClick={computeCoordinates}>
        <ul className={`${OPTIONS_CLASS_NAME}__lists`}>{children}</ul>
      </div>
    </Portal>
  );
};

type TOptionProps = HTMLProps<HTMLLIElement> & {
  children: ReactNode;
  className?: string;
  onClick: () => void;
};

SharedDropdown.Option = function ({ children, className, onClick, ...props }: TOptionProps) {
  const { close } = useContext(DropdownContext);

  const classes = cx(`${OPTIONS_CLASS_NAME}__dropdown-option`, className);
  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();

    onClick();
    close();
  };

  return (
    <li className={classes} role='presentation' onClick={handleClick} {...props}>
      {children}
    </li>
  );
};

export default SharedDropdown;
