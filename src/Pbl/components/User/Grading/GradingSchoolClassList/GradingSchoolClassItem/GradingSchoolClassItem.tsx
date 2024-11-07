import { TAssginedSchoolClass } from '@pbl/graphql/user/queries/schoolClassesAssignedToProject';
import useStudentsAssginedToProject from '@pbl/graphql/user/hooks/useStudentsAssignedToProject';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';

import { useGradingContext } from '../../GradingContext/GradingContext';
import GradingSidebarSubcategories from '../../GradingSubcategories/GradingSubcategories';

import styles from './GradingSchoolClassItem.module.sass';

type Props = {
  isInitiallyOpen: boolean;
  schoolClass: TAssginedSchoolClass;
};

const GradingSchoolClassItem = ({ schoolClass, isInitiallyOpen }: Props) => {
  const {
    navigation: { openSection, classId, itemId, projectId },
    gradingType,
  } = useGradingContext();

  const { data, loading, error } = useStudentsAssginedToProject(
    projectId,
    gradingType,
    itemId,
    schoolClass.uuid //will be skipped when schoolClass uuid is other than 'other'
  );

  if (loading || error) return null;

  const setOpen = () => {
    if (classId === schoolClass.uuid) return;
    openSection(schoolClass.uuid);
  };

  if (!classId && isInitiallyOpen) {
    setOpen();
  }

  const otherStudentGradingNeeded = data?.studentsToBeGraded.edges.length;
  const gradingNeeded = schoolClass.gradingNeeded ?? otherStudentGradingNeeded;

  return (
    <li className={styles.projectContainer}>
      <header className={styles.header} role='button' onClick={setOpen}>
        <h4 className={styles.heading}>{schoolClass.name}</h4>
        <div className={styles.actions}>
          {gradingNeeded && <div className={styles.gradingNeeded} />}
          <SharedIcon icon={<ChevronDownIcon />} size='md' />
        </div>
      </header>
      <GradingSidebarSubcategories students={data} uuid={schoolClass.uuid} />
    </li>
  );
};

export default GradingSchoolClassItem;
