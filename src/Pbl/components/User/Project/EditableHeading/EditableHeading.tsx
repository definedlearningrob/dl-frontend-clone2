import { Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import UPDATE_PROJECT_DISPLAY_NAME, {
  TUpdateDisplayNameData,
  TUpdateDisplayNameVariables,
} from '@pbl/graphql/user/mutations/updateProjectDisplayName';
import EditButton from '@pbl/components/Project/EditButton/EditButton';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedButton from '@shared/components/Button/Button';
import { useToggle } from '@shared/hooks/useToggle';

import styles from './EditableHeading.module.sass';

type Props = {
  displayName: string;
};

export const EditableHeading = ({ displayName }: Props) => {
  const { editMode } = useCustomizeProject();
  const { projectId } = useParams<{ projectId: string }>();
  const [updateProjectMutation, { loading }] = useMutation<
    TUpdateDisplayNameData,
    TUpdateDisplayNameVariables
  >(UPDATE_PROJECT_DISPLAY_NAME);
  const { t } = useTranslation();
  const [isEditing, toggleEditing, , setIsNotEditing] = useToggle(false);

  if (!editMode) {
    return (
      <h1 className={styles.heading} data-testid='user-project-name'>
        {displayName}
      </h1>
    );
  }

  if (!isEditing) {
    return (
      <h1 className={styles.heading} data-testid='user-project-name'>
        {displayName}
        <EditButton iconSize='xs' size='xs' type='button' onClick={toggleEditing} />
      </h1>
    );
  }

  const handleOnSubmit = async (values: { displayName: string }) => {
    await updateProjectMutation({
      variables: { input: { id: projectId, displayName: values.displayName } },
    });
    setIsNotEditing();
  };

  return (
    <Formik enableReinitialize={true} initialValues={{ displayName }} onSubmit={handleOnSubmit}>
      <Form>
        <div className={styles.buttonsWrapper}>
          <SharedFormTextInput
            name='displayName'
            placeholder={t('portfolioProjects.modifyProjectModal.projectNameWithDots')}
          />
          <SharedButton
            className={styles.button}
            type='button'
            variant='danger'
            onClick={toggleEditing}>
            {t('common.actions.discard')}
          </SharedButton>
          <SharedButton
            className={styles.button}
            disabled={loading}
            type='submit'
            variant='success'>
            {t('common.actions.save')}
          </SharedButton>
        </div>
      </Form>
    </Formik>
  );
};
