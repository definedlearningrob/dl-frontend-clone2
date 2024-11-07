import { useState } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash-es';

import { ReactComponent as EmptyListIcon } from '@shared/svg/empty_data.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';

import styles from './EntityInfoList.module.sass';

type Item = {
  id: string;
  name: string;
};

type Props = {
  items: Item[];
  title: string;
  emptyLabel: string;
};

export const EntityInfoList = ({ items, title, emptyLabel }: Props) => {
  const [isActive, setActive] = useState(false);

  const hasItems = !isEmpty(items);

  const accordionClasses = {
    button: cx(styles.button, {
      [styles.buttonDisabled]: !hasItems,
    }),
    icon: cx(styles.icon, {
      [styles.iconActive]: isActive,
      [styles.iconDisabled]: !hasItems,
    }),
    list: cx(styles.list, { [styles.listActive]: isActive }),
  };

  const emptyAccordionClasses = cx(accordionClasses.list, { [styles.emptyList]: isActive });
  const toggleAccordion = () => setActive(!isActive);

  return (
    <div className={styles.entityInfoList} data-testid='entity-info-list'>
      <button className={accordionClasses.button} onClick={toggleAccordion}>
        {title}
        <SharedIcon className={accordionClasses.icon} icon={<ChevronDownIcon />} size='sm' />
      </button>
      {isEmpty(items) && (
        <div className={emptyAccordionClasses}>
          <div className={styles.emptyIconWrapper}>
            <EmptyListIcon />
          </div>
          {emptyLabel}
        </div>
      )}
      {!isEmpty(items) && (
        <ul className={accordionClasses.list}>
          {items.map(({ name }, index) => (
            <li
              key={`${name}-${index}`}
              className={styles.listItem}
              data-testid='entity-info-list-item'>
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
