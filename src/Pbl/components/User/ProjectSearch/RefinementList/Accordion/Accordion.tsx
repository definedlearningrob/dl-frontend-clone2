import cx from 'classnames';
import { ReactNode, useState } from 'react';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';

import './Accordion.sass';

type Props = {
  active?: boolean;
  children: ReactNode;
  title: string | number;
  refinementLength: number;
};

function UserProjectSearchRefinementListAccordion({
  active,
  children,
  title,
  refinementLength,
}: Props) {
  const [isActive, setActive] = useState(active);
  const hasRefinement = refinementLength > 0;
  const accordionClasses = {
    icon: cx('refinement-accordion__icon', { '-active': isActive }),
    contentWrapper: cx('refinement-accordion__content-wrapper', { '-active': isActive }),
  };

  const toggleAccordion = () => setActive(!isActive);

  return (
    <div className='refinement-accordion'>
      <button className='refinement-accordion__button' onClick={toggleAccordion}>
        <h4 className='refinement-accordion__title'>
          {title} {hasRefinement && `(${refinementLength})`}
        </h4>
        <SharedIcon className={accordionClasses.icon} icon={<ChevronRightIcon />} size='sm' />
      </button>
      <div className={accordionClasses.contentWrapper} data-testid='content-wrapper'>
        <div className='refinement-accordion__content'>{children}</div>
      </div>
    </div>
  );
}

export default UserProjectSearchRefinementListAccordion;
