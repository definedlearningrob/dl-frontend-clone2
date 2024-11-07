import cx from 'classnames';
import PropTypes from 'prop-types';
import { useLayoutEffect, useRef } from 'react';

SharedProgressCircle.defaultProps = {
  size: 'sm',
};

SharedProgressCircle.propTypes = {
  className: PropTypes.string,
  displayPercentageText: PropTypes.bool,
  size: PropTypes.string,
  target: PropTypes.number,
  value: PropTypes.number,
};

const sizeRadiusMapper = {
  sm: 21,
};

function SharedProgressCircle({
  className,
  displayPercentageText,
  size,
  target,
  value,
  ...attributes
}) {
  const progressCircle = useRef(null);

  useLayoutEffect(() => {
    const circle = progressCircle.current;
    const radius = circle.r ? circle.r.baseVal.value : 10;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setProgress(value) {
      const offset = circumference - (value / target) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    setProgress(value);
  });

  const inProgress = target > 0 && value > 0 && target - value !== 0;

  const radius = sizeRadiusMapper[size];
  const stroke = 3;
  // Size of entire element should take into account stroke which is added to radius
  const elementSize = radius * 2 + stroke * 2;
  const ringClasses = cx('progress-ring', {
    [className]: className,
    '-in-progress': inProgress,
  });

  const progressText = displayPercentageText
    ? `${Math.round((value * 100) / target)}%`
    : `${value}/${target}`;

  return (
    <svg
      className={ringClasses}
      data-testid='progress-circle'
      height={elementSize}
      width={elementSize}
      {...attributes}>
      {/* This circle is responsible for unprogressed color - it is impossible to achieve this with one SVG element */}
      <circle
        className='progress-ring__circle-background'
        cx={elementSize / 2}
        cy={elementSize / 2}
        fill='transparent'
        r={radius}
        strokeWidth={stroke}
      />
      <circle
        ref={progressCircle}
        className='progress-ring__circle'
        cx={elementSize / 2}
        cy={elementSize / 2}
        fill='transparent'
        r={radius}
        strokeWidth={stroke}
      />
      <text dy='.3em' textAnchor='middle' x='50%' y='50%'>
        {progressText}
      </text>
    </svg>
  );
}

export default SharedProgressCircle;
