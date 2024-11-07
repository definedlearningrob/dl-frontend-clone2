import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import useSchoolClassesAssignedToProject from '@pbl/graphql/user/hooks/useSchoolClassesAssignedToProject';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import { useGradingContext } from '../GradingContext/GradingContext';

import GradingSidebarClassItem from './GradingSchoolClassItem';
import styles from './GradingSchoolClassList.module.sass';

const OTHER_TAB_ID = 'other';

const GradingSchoolClassList = () => {
  const {
    gradingType,
    navigation: { itemId, projectId },
  } = useGradingContext();
  const { data, loading, error } = useSchoolClassesAssignedToProject(
    projectId,
    itemId,
    gradingType
  );
  const { t } = useTranslation();

  if (loading || !data || error) return <SharedLoadingSpinner size='small' />;

  const hasSchoolClassesAssigned = Boolean(!isEmpty(data.schoolClassesAssignedToProject.nodes));
  const schoolClasses = data.schoolClassesAssignedToProject.nodes;

  return (
    <ul className={styles.list}>
      {hasSchoolClassesAssigned &&
        schoolClasses.map((schoolClass, index) => (
          <GradingSidebarClassItem
            key={schoolClass.uuid}
            isInitiallyOpen={index === 0}
            schoolClass={schoolClass}
          />
        ))}
      <GradingSidebarClassItem
        isInitiallyOpen={isEmpty(schoolClasses)}
        schoolClass={{
          uuid: OTHER_TAB_ID,
          name: t('user.grading.sidebar.otherStudents'),
          gradingNeeded: false,
        }}
      />
    </ul>
  );
};

export default GradingSchoolClassList;
