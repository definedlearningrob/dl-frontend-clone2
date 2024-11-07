import { useFormikContext } from 'formik';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { type TExtensionAssignment } from '../Edit';

import ExtensionClusters from './Clusters/ExtensionClusters';
import ExtensionPathways from './Pathways/ExtensionPathways';
import ExtensionCourses from './Courses/ExtensionCourses';
import styles from './Assignment.module.sass';

type Props = {
  assignedCourses: {
    id: string;
    name: string;
  }[];
};

const ExtensionEditAssignment = ({ assignedCourses }: Props) => {
  const { values, setValues } = useFormikContext<TExtensionAssignment>();
  const { t } = useTranslation();

  type TParsedExtensionAssignmentFields = Omit<
    TExtensionAssignment,
    'publishedFrom' | 'publishedTo' | 'status'
  >;

  const handleOnChangeCheckbox =
    (type: keyof TParsedExtensionAssignmentFields, value: { id: string; name: string }) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.checked;
      if (newValue) {
        setValues({
          ...values,
          [type]: [...values[type], value],
        });
      } else {
        setValues({
          ...values,
          [type]: values[type]!.filter((element) => element.id !== value.id),
        });
      }
    };

  return (
    <div>
      <h3 className={styles.smallHeader}>
        {t('user.dashboard.extensionFields.settings.editExtension')}
      </h3>
      <div>
        <ExtensionClusters onChange={handleOnChangeCheckbox} />
        <ExtensionPathways onChange={handleOnChangeCheckbox} />
        <ExtensionCourses assignedCourses={assignedCourses} onChange={handleOnChangeCheckbox} />
      </div>
    </div>
  );
};

export default ExtensionEditAssignment;
