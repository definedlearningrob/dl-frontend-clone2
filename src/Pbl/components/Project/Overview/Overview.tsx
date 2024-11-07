import cx from 'classnames';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import UserProjectDescriptionForm from '@pbl/components/User/Project/Overview/Form';
import UPDATE_PROJECT_DESCRIPTION, {
  type TUpdateDescriptionData,
  type TUpdateDescriptionVariables,
} from '@pbl/graphql/user/mutations/updateProjectDescription';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import ItemsToGrade from '@pbl/components/User/Project/ItemsToGrade';

import Card from '@shared/components/Card/Card';
import { cleanInjection } from '@shared/utils/cleanInjection';
import { useRole } from '@shared/hooks/useRole';

import EditButton from '../EditButton/EditButton';

import UnitsList from './UnitsList/UnitsList';
import ListItem from './ListItem/ListItem';
import styles from './Overview.module.sass';

type Props = {
  checkinsToGrade?: number;
  description: string;
  units: TUnit[];
  submissionsToGrade?: number;
};

type TUnit = {
  displayName: string;
  id: string;
};

function ProjectOverview({ checkinsToGrade, description, units, submissionsToGrade }: Props) {
  const { t } = useTranslation();

  const [updateProjectMutation] = useMutation<TUpdateDescriptionData, TUpdateDescriptionVariables>(
    UPDATE_PROJECT_DESCRIPTION
  );
  const { projectId } = useParams<{ projectId: string }>();
  const { editMode, isOwner } = useCustomizeProject();
  const [isEditing, setIsEditing] = useState(false);
  const hasGradingSection = Boolean(!isOwner && (checkinsToGrade || submissionsToGrade));
  const { isStudent, isUser } = useRole();

  const initialValues = {
    description,
  };

  const toggleIsEditing = () => setIsEditing((isEditing) => !isEditing);
  const handleOnSubmit = async (values: any) => {
    await updateProjectMutation({
      variables: { input: { id: projectId, description: values.description } },
    });
    setIsEditing(false);
  };

  const renderFormOnEdit = () =>
    editMode && isEditing ? (
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleOnSubmit}>
        <UserProjectDescriptionForm onDismiss={toggleIsEditing} />
      </Formik>
    ) : (
      <p
        className={styles.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={cleanInjection(description)}
        data-testid='user-project-description'
      />
    );

  const renderEditButton = () =>
    editMode && <EditButton size='sm' type='button' onClick={toggleIsEditing} />;

  const showUnits = !isEmpty(units) && !isStudent && isUser;

  return (
    <Card dataTestId='user-project-overview' withoutPadding={true}>
      <Card.Header withPadding={true}>
        <Card.Title size='medium'>{t('project.overview')}</Card.Title>
        {renderEditButton()}
      </Card.Header>
      <Card.Body withPadding={true}>
        {renderFormOnEdit()}
        {showUnits && (
          <ul className={styles.list}>
            <ListItem title={t('project.units')}>
              <UnitsList units={units} />
            </ListItem>
          </ul>
        )}
      </Card.Body>
      <Card.Footer className={cx(hasGradingSection && styles.grading)} withPadding={true}>
        {hasGradingSection && (
          <ItemsToGrade
            checkinsGradingCount={checkinsToGrade!}
            submissionsGradingCount={submissionsToGrade!}
          />
        )}
      </Card.Footer>
    </Card>
  );
}

export default ProjectOverview;
