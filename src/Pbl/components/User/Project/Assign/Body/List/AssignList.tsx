import { Form, Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import { useHistory, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { type TSchoolClass } from '@pbl/graphql/user/queries/schoolClasses';
import ASSIGN_STUDENTS_TO_PROJECT, {
  type TAssignStudentsToProjectData,
  type TAssignStudentsToProjectVariables,
} from '@pbl/graphql/user/mutations/assignStudentsToProject';
import projectProductsQuery from '@pbl/graphql/user/queries/projectProducts';
import UNASSIGN_STUDENTS_FROM_PROJECT, {
  type TUnassignStudentsFromProjectData,
  type TUnassignStudentsFromProjectVariables,
} from '@pbl/graphql/user/mutations/unassignStudentFromProject';
import SCHOOL_CLASSES from '@pbl/graphql/user/queries/schoolClasses';
import { useAssignTeamsToTask } from '@pbl/graphql/user/hooks/useAssignTeamsToTask';
import { useUnassignTeamsFromTask } from '@pbl/graphql/user/hooks/useUnassignTeamsFromTask';
import {
  computeInitialValues,
  computeStudentsDiff,
  computeTeamsDiff,
} from '@pbl/components/User/Project/Assign/Body/helpers';

import { useTabsContext } from '@shared/components/DeprecatedTabs/DeprecatedTabs';
import { callToast } from '@shared/components/Toaster/Toaster';

import ProjectAssigned from '../Assigned/Assigned';
import ProjectAssignClasses from '../Classes/AssignClasses';
import { ProjectAssignSchoolTeams } from '../Teams';

import ProjectAssignFooter from './Footer/AssignFooter';

type TFormikValues = {
  teamIds: string[];
  studentIds: string[];
};

type Props = {
  schoolClasses: TSchoolClass[];
};

const ProjectAssignList = ({ schoolClasses }: Props) => {
  const { projectId } = useParams<{ projectId: string }>();
  const { tab } = useTabsContext();
  const { t } = useTranslation();
  const history = useHistory();

  if (!tab) null;

  const [assignTeamsToTask, { loading: assignTeamsLoading }] = useAssignTeamsToTask(projectId);
  const [unassignTeamsFromTask, { loading: unassignTeamsLoading }] =
    useUnassignTeamsFromTask(projectId);
  const [assignStudentsToProject, { loading: assignLoading }] = useMutation<
    TAssignStudentsToProjectData,
    TAssignStudentsToProjectVariables
  >(ASSIGN_STUDENTS_TO_PROJECT);
  const [unassignStudentsFromProject, { loading: unassignLoading }] = useMutation<
    TUnassignStudentsFromProjectData,
    TUnassignStudentsFromProjectVariables
  >(UNASSIGN_STUDENTS_FROM_PROJECT);

  const isLoading: boolean = [
    assignLoading,
    unassignLoading,
    assignTeamsLoading,
    unassignTeamsLoading,
  ].includes(true);

  const initialValues = useMemo(
    () => computeInitialValues(projectId, schoolClasses),
    [projectId, schoolClasses]
  );

  const handleSubmit = async (values: TFormikValues) => {
    const { toAssign, toUnassign } = computeStudentsDiff(
      initialValues.studentIds,
      values.studentIds
    );

    const { teamsToAssign, teamsToUnassign } = computeTeamsDiff(
      initialValues.teamIds,
      values.teamIds
    );

    const queriesToRefetch = [
      { query: SCHOOL_CLASSES, variables: { projectId } },
      { query: projectProductsQuery, variables: { projectId } },
    ];

    try {
      if (toAssign.length > 0) {
        await assignStudentsToProject({
          variables: {
            input: { taskId: projectId, studentUuids: toAssign },
          },
          refetchQueries: queriesToRefetch,
        });
      }

      if (toUnassign.length > 0) {
        await unassignStudentsFromProject({
          variables: {
            input: { taskId: projectId, studentUuids: toUnassign },
          },
          refetchQueries: queriesToRefetch,
        });
      }

      if (!isEmpty(teamsToAssign)) {
        await assignTeamsToTask({ teamUuids: teamsToAssign });
      }

      if (!isEmpty(teamsToUnassign)) {
        await unassignTeamsFromTask({ teamUuids: teamsToUnassign });
      }

      callToast('success', t('user.project.assignment.success'));
      history.goBack();
    } catch (error) {
      callToast('error', t('user.project.assignment.error'));
      //eslint-disable-next-line
      console.error(error);
    }
  };

  const filteredSchoolClasses = useMemo(() => {
    if (tab?.id === 'project.assign.teams') {
      return schoolClasses.filter(({ teams }) => !isEmpty(teams));
    }

    return schoolClasses;
  }, [tab, schoolClasses]);

  const renderAssignedItems = () =>
    tab &&
    {
      ['project.assign.classes']: <ProjectAssignClasses schoolClasses={filteredSchoolClasses} />,
      ['project.assign.teams']: <ProjectAssignSchoolTeams schoolClasses={filteredSchoolClasses} />,
      ['project.assign.assigned']: <ProjectAssigned schoolClasses={filteredSchoolClasses} />,
    }[tab.id];

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        {renderAssignedItems()}
        {!isEmpty(filteredSchoolClasses) && <ProjectAssignFooter isLoading={isLoading} />}
      </Form>
    </Formik>
  );
};

export default ProjectAssignList;
