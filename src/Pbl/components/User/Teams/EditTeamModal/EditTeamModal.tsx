import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { ApolloError } from '@apollo/client';
import { Formik } from 'formik';
import { t } from 'i18next';

import { useUpdateTeam } from '@pbl/graphql/user/hooks/useUpdateTeam';
import { TTeam } from '@pbl/graphql/user/fragments/team';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

import { TeamForm } from '../TeamForm';

type FormValues = {
  name: string;
  students: { value: string; label: string }[];
};

type Props = {
  team: TTeam;
  isOpen: boolean;
  handleClose: () => void;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(t('validation.messages.required')),
  students: Yup.array().min(2, t('teams.validation.editWithMinTwoStudents')),
});

export const EditTeamModal = ({ team, isOpen, handleClose }: Props) => {
  const { t } = useTranslation();
  const [updateTeam] = useUpdateTeam();

  const { name, students } = team;

  const initialValues = {
    name: name,
    students: students.nodes.map((student) => ({
      label: `${student.firstName} ${student.lastName}`,
      value: student.uuid,
    })),
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      await updateTeam({
        uuid: team.uuid,
        name: values.name,
        studentUuids: values.students.map(({ value }) => value),
      });
      callToast('success', t('notifications.success.updated', { name: t('teams.team') }));
      handleClose();
    } catch (e) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('teams.validation.updateError'));
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
          heading={t('common.actions.editEntity', { name })}
          submitLabel={t('teams.addAndSave')}
          onCancel={handleClose}
        />
      </Formik>
    </SharedModal>
  );
};
