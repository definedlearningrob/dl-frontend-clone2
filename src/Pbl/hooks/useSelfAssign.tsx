import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ENROLL_IN_PROJECT, {
  type TEnrollStudentToProjectData,
  type TEnrollToProjectVariables,
} from '@pbl/graphql/student/mutations/enrollInProject';
import {
  LOCAL_STORAGE_ORIGINATOR,
  LOCAL_STORAGE_PROJECT_ID,
  LOCAL_STORAGE_PROJECT_TIMESTAMP,
  LOCAL_STORAGE_SKIP_ASSIGN_REDIRECT,
} from '@pbl/resources/localStorageKeys';

import { LOCAL_STORAGE_SHARED_CONFIG } from '@shared/resources/localStorageKeys';

const shareCode = localStorage.getItem(LOCAL_STORAGE_PROJECT_ID);
const originatorId = localStorage.getItem(LOCAL_STORAGE_ORIGINATOR);
const projectTimestamp = localStorage.getItem(LOCAL_STORAGE_PROJECT_TIMESTAMP);
const skipAssignRedirect = localStorage.getItem(LOCAL_STORAGE_SKIP_ASSIGN_REDIRECT);
const hasLoadedProject = shareCode !== null && projectTimestamp !== null;

const useSelfAssign = () => {
  const [enrollInProject, { loading }] = useMutation<
    TEnrollStudentToProjectData,
    TEnrollToProjectVariables
  >(ENROLL_IN_PROJECT);
  const history = useHistory();

  useEffect(() => {
    const assignToProject = async () => {
      await enrollInProject({
        variables: { input: { taskId: shareCode!, originatorId: originatorId! } },
      });

      if (skipAssignRedirect !== 'true') {
        history.replace(`/projects/${shareCode}`);
      }
    };

    localStorage.removeItem(LOCAL_STORAGE_SHARED_CONFIG);

    if (hasLoadedProject) {
      localStorage.removeItem(LOCAL_STORAGE_PROJECT_ID);
      localStorage.removeItem(LOCAL_STORAGE_ORIGINATOR);
      localStorage.removeItem(LOCAL_STORAGE_PROJECT_TIMESTAMP);
      localStorage.removeItem(LOCAL_STORAGE_SKIP_ASSIGN_REDIRECT);

      assignToProject();
    }
  }, []);

  return { hasLoadedProject, loading };
};

export default useSelfAssign;
