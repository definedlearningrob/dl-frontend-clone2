import { motion, AnimatePresence } from 'framer-motion';

import { TStudentsAssignedToProjectData } from '@pbl/graphql/user/queries/studentsAssignedToProject';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import { useGradingContext } from '../GradingContext/GradingContext';
import {
  getCustomStudents,
  getStudentsAndTeamsForSubcategory,
} from '../helpers/parseGradingStudents';
import { subcategories } from '../helpers/constants';

import styles from './GradingSubcategories.module.sass';
import GradingSidebarSubcategory from './GradingSubcategory';

type Props = {
  uuid: string;
  students?: TStudentsAssignedToProjectData;
};

const GradingSidebarSubcategories = ({ uuid, students }: Props) => {
  const {
    navigation: { classId },
    studentsList: { data, loading, error },
  } = useGradingContext();
  const isOtherStudents = uuid === 'other';
  const isOpen = uuid === classId;

  const properParseFn = isOtherStudents ? getCustomStudents : getStudentsAndTeamsForSubcategory;
  const properData = isOtherStudents ? students : data;

  const hasStudents = (!loading && !error && data) || students;

  const shouldShowList = hasStudents && isOpen;
  const shouldShowLoading = !hasStudents && isOpen;

  return (
    <AnimatePresence>
      {shouldShowList && (
        <motion.ul
          key='content'
          animate='open'
          className={styles.accordion}
          exit='collapsed'
          initial='collapsed'
          transition={{ duration: 0.6 }}
          variants={{
            open: { height: 'auto' },
            collapsed: { height: 0 },
          }}>
          {subcategories.map((subcategory) => (
            <GradingSidebarSubcategory
              key={subcategory}
              //@ts-ignore
              items={properParseFn(subcategory, properData)}
              subcategory={subcategory}
            />
          ))}
        </motion.ul>
      )}
      {shouldShowLoading && <SharedLoadingSpinner size='small' />}
    </AnimatePresence>
  );
};

export default GradingSidebarSubcategories;
