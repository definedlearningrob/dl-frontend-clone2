import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ltiResourceQuery from '@pbl/graphql/user/queries/ltiResource';

import { useLti } from '@shared/components/LtiProvider/LtiProvider';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

export const LtiRelay = () => {
  const history = useHistory();
  const { ltiResourceLinkId, contextId, isLtiSearch } = useLti();
  const { data, loading } = useQuery(ltiResourceQuery, {
    variables: { ltiResourceLinkId, contextId },
  });

  if (loading) return <SharedLoadingSpinner size='full-screen' />;
  const ltiResourceData = data?.ltiResource;

  if (isLtiSearch) {
    history.push('/lti-search');
  } else if (ltiResourceData?.taskId) {
    history.push(`/projects/${ltiResourceData.taskId}/product/${ltiResourceData.productId}`);
  } else {
    history.push('/dashboard');
  }

  return null;
};
