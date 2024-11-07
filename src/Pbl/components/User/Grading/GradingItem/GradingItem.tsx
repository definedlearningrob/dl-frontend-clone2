import cx from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { TStudent, TTeam } from '@pbl/graphql/user/queries/gradeSubjectsByStatus';
import { GRADING_STATUS } from '@pbl/resources/enums';

import { ReactComponent as DoneIcon } from '@shared/assets/icons/done_white.svg';
import { ReactComponent as TeamIcon } from '@shared/assets/icons/team_icon.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';

import { useGradingContext } from '../GradingContext/GradingContext';

import styles from './GradingItem.module.sass';

type Props = {
  gradingStatus: GRADING_STATUS;
  isInitiallyOpen: boolean;
  item: TStudent | TTeam;
};

const GradingItem = ({ isInitiallyOpen, item }: Props) => {
  const {
    navigation: { classId, subjectId, navigateTo },
    localGradedSubjects: localGradedStudents,
  } = useGradingContext();
  const { t } = useTranslation();

  const isActive = subjectId === item.uuid;
  const isGraded = localGradedStudents.has(item.uuid);

  const navigate = () => {
    if (classId) {
      navigateTo(item.__typename, { classId, subjectId: item.uuid, name: item.name });
    }
  };

  if (classId && !subjectId && isInitiallyOpen) {
    navigate();
  }

  return (
    <motion.li>
      <motion.button
        animate={{ opacity: 1 }}
        className={cx(styles.studentItem, isActive && styles.studentItemActive)}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        onClick={navigate}>
        <span>{item.name}</span>
        <div className={styles.states}>
          {item.__typename === 'Team' && (
            <DeprecatedTooltip message={t('user.grading.sidebar.team')} variant='dark'>
              <SharedIcon className={styles.icon} icon={<TeamIcon />} size='sm' />
            </DeprecatedTooltip>
          )}
          {isGraded && <SharedIcon className={styles.icon} icon={<DoneIcon />} size='sm' />}
        </div>
      </motion.button>
    </motion.li>
  );
};

export default GradingItem;
