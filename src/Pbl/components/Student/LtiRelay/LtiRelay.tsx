import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ltiResourceQuery from '@pbl/graphql/student/queries/ltiResource';
import {
  LOCAL_STORAGE_ORIGINATOR,
  LOCAL_STORAGE_PROJECT_ID,
  LOCAL_STORAGE_PROJECT_TIMESTAMP,
  LOCAL_STORAGE_SKIP_ASSIGN_REDIRECT,
} from '@pbl/resources/localStorageKeys';

import { useLti } from '@shared/components/LtiProvider/LtiProvider';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

export const LtiRelay = () => {
  const history = useHistory();
  const { ltiResourceLinkId, contextId } = useLti();
  const { data, loading } = useQuery(ltiResourceQuery, {
    variables: { ltiResourceLinkId, contextId },
  });

  if (loading) return <SharedLoadingSpinner size='full-screen' />;

  const ltiResourceData = data?.ltiResource;

  if (ltiResourceData?.taskId && ltiResourceData?.productId) {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_ID, ltiResourceData.taskId);
    localStorage.setItem(LOCAL_STORAGE_ORIGINATOR, ltiResourceData.originatorId);
    localStorage.setItem(LOCAL_STORAGE_SKIP_ASSIGN_REDIRECT, JSON.stringify(true));
    localStorage.setItem(LOCAL_STORAGE_PROJECT_TIMESTAMP, JSON.stringify(Date.now()));

    history.push(`/projects/${ltiResourceData.taskId}/product/${ltiResourceData.productId}`);
  } else {
    history.push('/dashboard');
  }

  return null;
};
