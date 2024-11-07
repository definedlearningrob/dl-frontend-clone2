import cx from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef, ReactNode, FunctionComponent } from 'react';

import Portal from '@shared/components/Portal/Portal';

import './DeprecatedTooltip.sass';

DeprecatedTooltip.defaultProps = {
  position: 'top',
  variant: 'light',
};

DeprecatedTooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  Component: PropTypes.func,
  controlled: PropTypes.bool,
  disabled: PropTypes.bool,
  isVisible: PropTypes.bool,
  message: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom']),
  variant: PropTypes.oneOf(['dark', 'light']),
};

type Props = {
  children: ReactNode;
  className?: string;
  Component?: FunctionComponent;
  controlled?: boolean;
  disabled?: boolean;
  isVisible?: boolean;
  message?: string;
  position: 'top' | 'bottom';
  variant: 'dark' | 'light';
};

type TCoords = {
  top: number;
  left: number;
};

function DeprecatedTooltip({
  children,
  className,
  Component,
  controlled,
  disabled,
  isVisible,
  message,
  position,
  variant,
}: Props) {
  const [stateCoordinates, setStateCoordinates] = useState<TCoords | null>(null);
  const coordinates = useRef<TCoords | null>(null);
  const trigger = useRef<HTMLDivElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);

  const classes = cx(
    'shared-tooltip-portal',
    className && {
      [className]: className,
    },
    {
      [`-${variant}`]: variant,
      '-visible': !!stateCoordinates,
    }
  );

  const placeholderClasses = cx('shared-tooltip-portal__placeholder', {
    [`${className}__placeholder`]: className,
  });

  const arrowClasses = cx('shared-tooltip-portal__arrow', {
    '-bottom': position === 'bottom',
    '-top': position === 'top',
  });

  useEffect(() => {
    const handleScroll = () => {
      if (coordinates.current) {
        setStateCoordinates(null);
        coordinates.current = null;
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseOver = () => {
    if (disabled || !trigger.current || !tooltip.current) return;

    const triggerElement = trigger.current.getBoundingClientRect();

    const coords = {
      top: {
        left: triggerElement.x + triggerElement.width / 2 - tooltip.current.offsetWidth / 2,
        top: triggerElement.y - tooltip.current.offsetHeight - 18,
      },
      bottom: {
        left: triggerElement.x + triggerElement.width / 2 - tooltip.current.offsetWidth / 2,
        top: triggerElement.y + triggerElement.height + 18,
      },
    }[position] as TCoords;

    setStateCoordinates(coords);
    coordinates.current = coords;
  };

  const handleMouseOut = () => {
    if (disabled) return;

    setStateCoordinates(null);
    coordinates.current = null;
  };

  useEffect(() => {
    if (controlled) {
      isVisible ? handleMouseOver() : handleMouseOut();
    }
  }, [isVisible]);

  return (
    <>
      {!disabled && (
        <Portal>
          <div
            ref={tooltip}
            className={classes}
            data-testid='tooltip'
            style={{ ...stateCoordinates }}>
            <span className={arrowClasses} />
            {Component ? <Component /> : message}
          </div>
        </Portal>
      )}
      <div
        ref={trigger}
        className={placeholderClasses}
        onMouseEnter={controlled ? () => {} : handleMouseOver}
        onMouseLeave={controlled ? () => {} : handleMouseOut}
        onScroll={handleMouseOut}>
        {children}
      </div>
    </>
  );
}

export default DeprecatedTooltip;
