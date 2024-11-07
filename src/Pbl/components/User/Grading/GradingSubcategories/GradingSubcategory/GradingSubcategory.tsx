import cx from 'classnames';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { TStudent, TTeam } from '@pbl/graphql/user/queries/gradeSubjectsByStatus';
import { GRADING_STATUS } from '@pbl/resources/enums';

import SharedIcon from '@shared/components/Icon/Icon';
import { Kicker } from '@shared/components/Kicker';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';

import GradingItem from '../../GradingItem/GradingItem';

import styles from './GradingSubcategory.module.sass';

type Props = {
  items: TStudent[] | TTeam[];
  subcategory: GRADING_STATUS;
};

const GradingSidebarSubcategory = ({ items, subcategory }: Props) => {
  const [isOpen, setOpen] = useState(() => {
    if (subcategory === GRADING_STATUS.WAITING_FOR_GRADING) {
      return !isEmpty(items);
    }

    return false;
  });
  const { t } = useTranslation();

  const toggleSection = () => setOpen((prev) => !prev);

  const needsReview = subcategory === GRADING_STATUS.WAITING_FOR_GRADING;

  return (
    <motion.li animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
      <button
        className={cx(styles.header, isOpen && styles.headerOpen)}
        disabled={!items.length}
        role='button'
        onClick={toggleSection}>
        <Kicker className='!mb-0' variant={needsReview ? 'secondary' : 'default'}>
          {t(`user.grading.sidebar.${subcategory}`, { count: items.length })}
        </Kicker>
        <SharedIcon
          icon={<ChevronDownIcon className={cx(needsReview && styles.needsReview)} />}
          size='xs'
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            key='content'
            animate='open'
            className={styles.list}
            exit='collapsed'
            initial='collapsed'
            transition={{ duration: 0.3 }}
            variants={{
              open: { height: 'auto' },
              collapsed: { height: 0 },
            }}>
            {items.map((item, index) => (
              <GradingItem
                key={item.uuid}
                gradingStatus={subcategory}
                isInitiallyOpen={index === 0 && subcategory === GRADING_STATUS.WAITING_FOR_GRADING}
                item={item}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default GradingSidebarSubcategory;
