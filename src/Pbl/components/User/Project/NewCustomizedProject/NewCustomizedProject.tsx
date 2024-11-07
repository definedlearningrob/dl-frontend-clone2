import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useDuplicateTask } from '@pbl/graphql/user/hooks/useDuplicateTask';
import { TTaskTemplatesData } from '@pbl/graphql/user/queries/taskTemplates';

import FormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedModal from '@shared/components/Modal/Modal';
import SharedButton from '@shared/components/Button/Button';

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  tasks: TTaskTemplatesData;
};

export const NewCustomizedProject = ({ isOpen, onDismiss, tasks }: Props) => {
  const { duplicateTask } = useDuplicateTask();
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Required')
      .min(5, t('validation.messages.minLength', { min: 5 })),
  });
  const initialValues = {
    name: '',
  };

  const handleOnSubmit = async (values: typeof initialValues) => {
    const data = await duplicateTask({
      name: values.name,
      id: tasks.taskTemplates[0].id,
    });

    if (data?.duplicateTask.task.id) {
      history.push(`/projects/${data.duplicateTask.task.id}`);
    }
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={onDismiss}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}>
        <Form>
          <SharedModal.Header>
            <SharedModal.Heading>{t('user.myProjects.newProjectTitle')}</SharedModal.Heading>
          </SharedModal.Header>
          <SharedModal.Body>
            <p>{t('user.myProjects.newProjectDescription')}</p>
            <FormTextInput isRequired={true} label='Project name' name='name' />
          </SharedModal.Body>
          <SharedModal.Footer className='flex justify-end gap-xs'>
            <SharedButton
              className='min-w-[140px]'
              size='sm'
              type='button'
              variant='primary-outlined'
              onClick={onDismiss}>
              {t('common.actions.back')}
            </SharedButton>
            <SharedButton className='min-w-[140px]' size='sm' type='submit' variant='primary'>
              {t('user.myProjects.createProject')}
            </SharedButton>
          </SharedModal.Footer>
        </Form>
      </Formik>
    </SharedModal>
  );
};
