import { ReactNode } from 'react';
import cx from 'classnames';

import SharedCard from '@shared/components/Card/Card';
import { cleanInjection } from '@shared/utils/cleanInjection';

import styles from './LessonItemCard.module.sass';

type Props = {
  title?: string;
  action?: ReactNode;
  description?: string;
  children: ReactNode;
  id?: string;
  headerIcon?: ReactNode;
};

export const LessonItemCard = ({ title, action, description, id, children, headerIcon }: Props) => {
  const shouldDisplayHeader = title || action;

  const headerClasses = cx(styles.cardHeader, {
    [styles.cardWithDescriptionHeader]: !!description,
  });

  return (
    <SharedCard className={styles.lessonCard} dataTestId='lesson-element-card' id={id}>
      {shouldDisplayHeader && (
        <div className={headerClasses}>
          <div className='flex items-center gap-x xxxl:gap-sm'>
            {headerIcon && headerIcon}
            <h5 className={styles.cardTitle}>{title}</h5>
          </div>
          {action}
        </div>
      )}
      {description && (
        <p
          className={styles.cardDescription}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={cleanInjection(description)}
        />
      )}
      {children}
    </SharedCard>
  );
};
