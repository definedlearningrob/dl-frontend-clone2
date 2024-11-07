import { useField } from 'formik';
import { ChangeEvent } from 'react';

import { TSchoolClassStudent } from '@pbl/graphql/user/queries/schoolClasses';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

import styles from '../ProjectAssignBody.module.sass';

type Props = {
  student: TSchoolClassStudent;
};

const ProjectAssignStudentsItem = ({ student }: Props) => {
  const [studentIdsField, , fieldHelpers] = useField('studentIds');

  const fullName = `${student.firstName} ${student.lastName}`;
  const checked = studentIdsField.value.some(
    (formikStudent: string) => formikStudent === student.uuid
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;

    if (newValue) {
      fieldHelpers.setValue([...studentIdsField.value, student.uuid]);
    } else {
      fieldHelpers.setValue(
        studentIdsField.value.filter((studentUuid: string) => studentUuid !== student.uuid)
      );
    }
  };

  return (
    <li key={student.uuid} className={styles.listItem}>
      <SharedCheckbox
        checked={checked}
        className={styles.checkbox}
        id={student.uuid}
        onChange={onChange}
      />
      <label htmlFor={student.uuid}>{fullName}</label>
    </li>
  );
};

export default ProjectAssignStudentsItem;
