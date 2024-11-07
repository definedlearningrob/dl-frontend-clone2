import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { ApolloError } from '@apollo/client';

import { useCreateTeam } from '@pbl/graphql/user/hooks/useCreateTeam';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

import { TeamForm } from '../TeamForm';

type FormValues = {
  name: string;
  students: { value: string; label: string }[];
};

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const initialValues = { name: '', students: [] };

export const CreateTeamModal = ({ isOpen, handleClose }: Props) => {
  const { t } = useTranslation();
  const { classId } = useParams<{ classId: string }>();
  const [createTeam] = useCreateTeam(classId);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.messages.required')),
    students: Yup.array().min(2, t('teams.validation.createWithMinTwoStudents')),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      await createTeam({
        name: values.name,
        studentUuids: values.students.map(({ value }) => value),
      });
      callToast('success', t('notifications.success.created', { name: t('teams.team') }));
      handleClose();
    } catch (e) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('teams.validation.createError'));
      }
    }
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={handleClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <TeamForm
          heading={t('teams.createANewTeam')}
          submitLabel={t('teams.createTeam')}
          onCancel={handleClose}
        />
      </Formik>
    </SharedModal>
  );
};
