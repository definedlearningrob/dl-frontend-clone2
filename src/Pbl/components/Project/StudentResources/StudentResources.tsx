/* eslint-disable react/no-danger */
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UPDATE_PROJECT_STUDENT_RESOURCES, {
  type TUpdateStudentResourcesData,
  type TUpdateStudentResourcesVariables,
} from '@pbl/graphql/user/mutations/updateProjectStudentResources';
import UserProjectStudentResourcesForm from '@pbl/components/User/Project/StudentResources/Form';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';

import Card from '@shared/components/Card/Card';
import { cleanInjection } from '@shared/utils/cleanInjection';

import EditButton from '../EditButton/EditButton';

import styles from './StudentResources.module.sass';

type Props = {
  studentResources: string;
};

function ProjectStudentResources({ studentResources }: Props) {
  const { t } = useTranslation();

  const [updateProjectMutation] = useMutation<
    TUpdateStudentResourcesData,
    TUpdateStudentResourcesVariables
  >(UPDATE_PROJECT_STUDENT_RESOURCES);
  const { projectId } = useParams<{ projectId: string }>();
  const { editMode } = useCustomizeProject();
  const [isEditing, setIsEditing] = useState(false);

  const initialValues = {
    studentResources,
  };

  const toggleIsEditing = () => setIsEditing((isEditing) => !isEditing);

  const handleOnSubmit = async (values: any) => {
    await updateProjectMutation({
      variables: { input: { id: projectId, studentResources: values.studentResources } },
    });
    setIsEditing(false);
  };

  const renderFormOnEdit = () =>
    editMode && isEditing ? (
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleOnSubmit}>
        <UserProjectStudentResourcesForm onDismiss={toggleIsEditing} />
      </Formik>
    ) : (
      <span className={styles.content} dangerouslySetInnerHTML={cleanInjection(studentResources)} />
    );

  const renderEditButton = () =>
    editMode && <EditButton size='sm' type='button' onClick={toggleIsEditing} />;

  return (
    <Card className={styles.card} dataTestId='user-project-student-resources'>
      <Card.Header>
        <Card.Title size='medium'>{t('project.studentResources')}</Card.Title>
        {renderEditButton()}
      </Card.Header>
      <Card.Body>{renderFormOnEdit()}</Card.Body>
    </Card>
  );
}

export default ProjectStudentResources;
