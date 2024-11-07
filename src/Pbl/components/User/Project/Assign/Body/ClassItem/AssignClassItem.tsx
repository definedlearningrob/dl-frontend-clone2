import { useField } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';

import { type TSchoolClass } from '@pbl/graphql/user/queries/schoolClasses';

import { useFilterContext } from '@shared/hooks/useFilterContext';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

import styles from '../ProjectAssignBody.module.sass';
import ProjectAssignStudentsItem from '../StudentItem/AssignStudentItem';

type Props = {
  schoolClass: TSchoolClass;
};

const ProjectAssignClassesItem = ({ schoolClass }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentIdsField, _, fieldHelpers] = useField('studentIds');
  //@ts-ignore
  const { filter } = useFilterContext();

  const students = schoolClass.students.nodes;
  const studentIds = students.map((student) => student.uuid);
  const formikStudentIds = studentIdsField.value || [];

  const hasSomeStudentsEnrolled = formikStudentIds.some((studentId: string) =>
    studentIds.includes(studentId)
  );

  const hasAllStudentsEnrolled = studentIds.every((studentId: string) =>
    formikStudentIds.includes(studentId)
  );

  const indeterminate = !hasAllStudentsEnrolled && hasSomeStudentsEnrolled;

  useEffect(() => {
    if (!isOpen && filter.nameCont) {
      if (
        students.some((student) => {
          const studentName = `${student.firstName} ${student.lastName}`.toLowerCase();

          return studentName.includes(filter.nameCont.toLowerCase());
        })
      ) {
        setIsOpen(true);
      }
    }
  }, [filter.nameCont]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    if (newValue && !indeterminate) {
      const uniqueNewStudentIds = [...new Set([...formikStudentIds, ...studentIds])];
      fieldHelpers.setValue(uniqueNewStudentIds);
    } else {
      fieldHelpers.setValue(
        formikStudentIds.filter((studentId: string) => !studentIds.includes(studentId))
      );
    }
  };

  return (
    <li key={schoolClass.uuid}>
      <div className={styles.listItem}>
        <DeprecatedIconButton
          className={styles.checkbox}
          icon={<ChevronDownIcon />}
          size='sm'
          onClick={() => setIsOpen(!isOpen)}
        />
        <SharedCheckbox
          checked={hasAllStudentsEnrolled}
          className={styles.checkbox}
          id={schoolClass.uuid}
          indeterminate={indeterminate}
          onChange={onChange}
        />
        <label htmlFor={schoolClass.uuid}>{schoolClass.name}</label>
      </div>
      {isOpen && (
        <ul style={{ paddingLeft: '56px' }}>
          {schoolClass.students.nodes.length > 0 &&
            schoolClass.students.nodes.map((student) => (
              <ProjectAssignStudentsItem key={student.uuid} student={student} />
            ))}
        </ul>
      )}
    </li>
  );
};

export default ProjectAssignClassesItem;
