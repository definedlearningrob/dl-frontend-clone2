/* eslint-disable camelcase */
import { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { LOCAL_STORAGE_SHARED_CONFIG } from '@shared/resources/localStorageKeys';
import useAllowLogin from '@shared/hooks/useAllowLogin';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import useQueryParams from '@shared/hooks/useQueryParams';

import { useFetchSharedResource } from './api';
import { getPublicResourceLink, parseSharedResource } from './utils';

type QueryParams = {
  code: string;
  defined_learning_uuid?: string;
  reference_code?: string;
};

function GuestAppSharedMiddleware() {
  const { setLoginState } = useAllowLogin();
  const history = useHistory();
  const {
    params: { code, defined_learning_uuid, reference_code },
  } = useQueryParams<QueryParams>();
  const { getSharedResource, postSharedResource } = useFetchSharedResource();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isMarketingLink = !!defined_learning_uuid;

        const { response, data } = isMarketingLink
          ? await postSharedResource()
          : await getSharedResource();

        if (!response.ok) {
          history.replace('/');
        }

        const {
          allowLogin,
          resourceCode,
          creatorId,
          resourceType,
          resource,
          targetRole,
          resourceId,
        } = parseSharedResource(data.shared_resource);

        const config = {
          allowLogin,
          creatorId,
        };

        localStorage.setItem(LOCAL_STORAGE_SHARED_CONFIG, JSON.stringify(config));
        setLoginState(resourceId, config);

        const shareUrl = getPublicResourceLink(
          resource.share_id,
          resourceType,
          resourceCode,
          targetRole
        );

        history.replace(shareUrl);
      } catch (e) {
        history.replace('/');
      }
    };

    fetchData();
  }, [code, defined_learning_uuid, reference_code]);

  return <SharedLoadingSpinner size='full-screen' />;
}

export default memo(GuestAppSharedMiddleware);
