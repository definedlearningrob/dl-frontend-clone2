import dayjs from 'dayjs';
import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import DUPLICATE_PROJECT, {
  type TDuplicateProjectData,
  type TDuplicateProjectVariables,
} from '@pbl/graphql/user/mutations/duplicateProject';
import MyProjects from '@pbl/graphql/user/queries/myProjects';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedModal from '@shared/components/Modal/Modal';

import UserProjectCustomizeModalFooter from './Footer/Footer';

type Props = {
  displayName: string;
  isOpen: boolean;
  onDismiss: () => void;
};

const dateFormat = 'MM/DD/YYYY';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required').min(5, '5 characters minimum'),
});

const UserProjectCustomizeModal = ({ displayName, isOpen, onDismiss }: Props) => {
  const [duplicateProjectMutation] = useMutation<TDuplicateProjectData, TDuplicateProjectVariables>(
    DUPLICATE_PROJECT
  );
  const { t } = useTranslation();
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();

  const inputPlaceholder = `${displayName} ${t('user.project.copy')} ${dayjs().format(dateFormat)}`;

  const initialValues = {
    name: inputPlaceholder,
  };

  const handleOnSubmit = async (values: typeof initialValues) => {
    const { data } = await duplicateProjectMutation({
      variables: { input: { id: projectId, name: values.name, displayName: values.name } },
      refetchQueries: [{ query: MyProjects }],
    });

    if (data?.duplicateTask.project.id) {
      history.push(`/projects/${data.duplicateTask.project.id}`);
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
            <SharedModal.Heading>
              {t('user.project.customize.header', { displayName })}
            </SharedModal.Heading>
          </SharedModal.Header>
          <SharedModal.Body>
            <p>{t('user.project.customize.description')}</p>
            <SharedFormTextInput name='name' placeholder={inputPlaceholder} />
          </SharedModal.Body>
          <UserProjectCustomizeModalFooter onDismiss={onDismiss} />
        </Form>
      </Formik>
    </SharedModal>
  );
};

export default UserProjectCustomizeModal;
