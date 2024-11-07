/* eslint-disable react/no-danger */
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import EditButton from '@pbl/components/Project/EditButton/EditButton';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import UPDATE_PROJECT_TEACHING_RESOURCES, {
  type TUpdateTeachingResourcesData,
  type TUpdateTeachingResourcesVariables,
} from '@pbl/graphql/user/mutations/updateProjectTeachingResources';

import Card from '@shared/components/Card/Card';
import { cleanInjection } from '@shared/utils/cleanInjection';

import UserProjectTeachingResourcesForm from './Form/Form';
import styles from './TeachingResources.module.sass';

type Props = {
  teachingResources: string;
};

function UserProjectTeachingResources({ teachingResources }: Props) {
  const [updateProjectMutation] = useMutation<
    TUpdateTeachingResourcesData,
    TUpdateTeachingResourcesVariables
  >(UPDATE_PROJECT_TEACHING_RESOURCES);
  const { projectId } = useParams<{ projectId: string }>();
  const { editMode } = useCustomizeProject();
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();

  const initialValues = {
    teachingResources: teachingResources,
  };

  const toggleIsEditing = () => setIsEditing((isEditing) => !isEditing);
  const handleOnSubmit = async (values: any) => {
    await updateProjectMutation({
      variables: { input: { id: projectId, teachingResources: values.teachingResources } },
    });
    setIsEditing(false);
  };

  const isEditMode = editMode && isEditing;

  const renderEditButton = () =>
    editMode && <EditButton size='sm' type='button' onClick={toggleIsEditing} />;

  return (
    <Card dataTestId='user-project-teaching-resources'>
      <Card.Header>
        <Card.Title size='medium'>{t('user.project.teachingResources')}</Card.Title>
        {renderEditButton()}
      </Card.Header>
      <Card.Body>
        {isEditMode && (
          <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleOnSubmit}>
            <UserProjectTeachingResourcesForm onDismiss={toggleIsEditing} />
          </Formik>
        )}
        {!isEditMode && (
          <span
            className={styles.content}
            dangerouslySetInnerHTML={cleanInjection(teachingResources)}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default UserProjectTeachingResources;
