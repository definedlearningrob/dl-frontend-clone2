import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import UserProjectIntroductionForm from '@pbl/components/User/Project/Introduction/EditForm';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import UPDATE_PROJECT_INTRODUCTION, {
  type TUpdateIntroductionData,
  type TUpdateIntroductionVariables,
} from '@pbl/graphql/user/mutations/updateProjectIntroduction';

import Card from '@shared/components/Card/Card';
import useDeleteImages from '@shared/hooks/useDeleteImages';
import useImagesPresence from '@shared/hooks/useImagesPresence';
import { cleanInjection } from '@shared/utils/cleanInjection';

import EditButton from '../EditButton/EditButton';

import styles from './Introduction.module.sass';

ProjectIntroduction.propTypes = {
  introduction: PropTypes.string,
};

type Props = {
  introduction: string;
};

function ProjectIntroduction({ introduction }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateProjectMutation] = useMutation<
    TUpdateIntroductionData,
    TUpdateIntroductionVariables
  >(UPDATE_PROJECT_INTRODUCTION);
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  const { editMode } = useCustomizeProject();
  const { deleteImages, getRemovedImages } = useDeleteImages();
  const { allImagesUsed, setImagesUsedWithUuuidExtract, setAllImagesUsed } =
    useImagesPresence(introduction);

  const initialValues = {
    introduction: introduction,
  };

  const toggleIsEditing = () => setIsEditing((isEditing) => !isEditing);

  const handleOnSubmit = async (values: any) => {
    const images = getRemovedImages(values.introduction, allImagesUsed);

    await updateProjectMutation({
      variables: { input: { id: projectId, introduction: values.introduction } },
    });

    if (images) {
      await deleteImages(images);
    }

    setIsEditing(false);
    setImagesUsedWithUuuidExtract(values.introduction);
  };

  const renderEditButton = () =>
    editMode && <EditButton size='sm' type='button' onClick={toggleIsEditing} />;

  const renderFormOnEdit = () =>
    editMode && isEditing ? (
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleOnSubmit}>
        <UserProjectIntroductionForm
          allImagesUsed={allImagesUsed}
          setAllImageUuidsPresentatedInIntroduction={setAllImagesUsed}
          onDismiss={toggleIsEditing}
        />
      </Formik>
    ) : (
      // eslint-disable-next-line react/no-danger
      <span className={styles.content} dangerouslySetInnerHTML={cleanInjection(introduction)} />
    );

  return (
    <Card className='user-project__introduction' dataTestId='user-project-introduction'>
      <Card.Header>
        <Card.Title size='medium'>{t('project.introduction')}</Card.Title>
        {renderEditButton()}
      </Card.Header>
      <Card.Body>{renderFormOnEdit()}</Card.Body>
    </Card>
  );
}

export default ProjectIntroduction;
