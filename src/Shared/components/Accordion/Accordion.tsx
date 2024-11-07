import cx from 'classnames';
import PropTypes from 'prop-types';
import { useState, ReactNode } from 'react';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';

import './Accordion.sass';

SharedAccordion.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

type Props = {
  children: ReactNode | ReactNode[];
  classNamePrefix?: string;
  title: string;
};

function SharedAccordion(props: Props) {
  const { children, classNamePrefix, title } = props;
  const [isActive, setActive] = useState(false);
  const accordionClasses = {
    accordion: cx('accordion', classNamePrefix),
    button: cx('accordion__button', `${classNamePrefix}__button`, { '-active': isActive }),
    title: cx('accordion__title', `${classNamePrefix}__title`, { '-active': isActive }),
    icon: cx('accordion__icon', `${classNamePrefix}__icon`, { '-active': isActive }),
    contentWrapper: cx('accordion__content-wrapper', `${classNamePrefix}__content-wrapper`, {
      '-active': isActive,
    }),
  };

  const toggleAccordion = () => setActive(!isActive);

  return (
    <div className={accordionClasses.accordion}>
      <button className={accordionClasses.button} type='button' onClick={toggleAccordion}>
        <h4 className={accordionClasses.title}>{title}</h4>
        <SharedIcon className={accordionClasses.icon} icon={<ChevronRightIcon />} size='sm' />
      </button>
      <div className={accordionClasses.contentWrapper}>
        <div className='accordion__content'>{children}</div>
      </div>
    </div>
  );
}

export default SharedAccordion;
