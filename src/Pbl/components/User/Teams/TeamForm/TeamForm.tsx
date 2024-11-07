import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

import { useSchoolClass } from '@pbl/graphql/user/hooks/useSchoolClass';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedModal from '@shared/components/Modal/Modal';
import { SelectList } from '@shared/components/SelectList';
import { SelectOption } from '@shared/components/Select';

import styles from './TeamForm.module.sass';

type Props = {
  heading: string;
  submitLabel: string;
  onCancel: () => void;
};

export const TeamForm = ({ heading, submitLabel, onCancel }: Props) => {
  const { classId } = useParams<{ classId: string }>();
  const { t } = useTranslation();
  const { isSubmitting, initialValues } = useFormikContext<{ students: SelectOption[] }>();

  const initallySelectedStudents = useMemo(
    () => initialValues.students.map((student) => student.value),
    [initialValues]
  );

  const { data, loading } = useSchoolClass({
    uuid: classId,
  });

  const studentOptions = useMemo(() => {
    const students = data?.schoolClass.students?.nodes.map(({ firstName, lastName, uuid }) => ({
      label: `${firstName} ${lastName}`,
      value: uuid,
    }));

    students?.sort((a, b) => {
      if (
        initallySelectedStudents.includes(a.value) &&
        !initallySelectedStudents.includes(b.value)
      ) {
        return -1;
      }

      return 0;
    });

    return students;
  }, [data, initallySelectedStudents]);

  return (
    <Form>
      <SharedModal.Header>
        <SharedModal.Heading>{heading}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className='flex flex-col gap-sm'>
        <SharedFormTextInput
          autoFocus={true}
          className={styles.inputWrapper}
          isRequired={true}
          label={t('teams.teamName')}
          name='name'
          placeholder={t('teams.typeNameHere')}
        />
        <SelectList
          isLoading={loading}
          label={t('teams.addTeamMembers')}
          name='students'
          options={studentOptions}
          placeholder={t('teams.searchByName')}
          showAvatar={true}
        />
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={onCancel}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type='submit'
          variant='primary'>
          {submitLabel}
        </SharedModal.Button>
      </SharedModal.Footer>
    </Form>
  );
};
