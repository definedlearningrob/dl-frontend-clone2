/*eslint-disable camelcase */
import { memo, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { TUserInfo as DCUserInfo } from '@dc/graphql/user/queries/userInfo';
import { TStudentInfo as DCStudentInfo } from '@dc/graphql/student/queries/userInfo';

import { TUserInfo as DLUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { TStudentInfo as DLStudentInfo } from '@pbl/graphql/student/queries/userInfo';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import useQueryParams from '@shared/hooks/useQueryParams';
import { Roles } from '@shared/resources/enums';

import { useFetchSharedResource } from './api';
import { getAuthResourceLink, parseSharedResource } from './utils';
import { TSharedResourceType } from './utils/types';

type QueryParams = {
  code: string;
  defined_learning_uuid?: string;
  reference_code?: string;
};

type OnFetchParams = {
  resourceId: string;
  creatorId: string;
  resourceType: TSharedResourceType;
};

type UserInfo = DCUserInfo | DLUserInfo;
type StudentInfo = DCStudentInfo | DLStudentInfo;

type Props = {
  userInfo: UserInfo | StudentInfo;
  onFetch?: ({ resourceId, creatorId, resourceType }: OnFetchParams) => void;
};

const MARKETING_LINK_ALLOWED_ROLES = [Roles.TEACHER, Roles.ENTITY_ADMIN];

export const SharedMiddleware = memo(({ userInfo, onFetch }: Props) => {
  const history = useHistory();
  const { getSharedResource, postSharedResource } = useFetchSharedResource();
  const {
    params: { defined_learning_uuid },
  } = useQueryParams<QueryParams>();

  const isUser = 'role' in userInfo;

  const fetchSharedResource = useCallback(async () => {
    try {
      const isMarketingLink = !!defined_learning_uuid;
      const shouldSendMarketingLink =
        isUser && isMarketingLink && MARKETING_LINK_ALLOWED_ROLES.includes(userInfo.role);

      const { response, data } = shouldSendMarketingLink
        ? await postSharedResource()
        : await getSharedResource();

      if (!response.ok) {
        history.replace('/');
      }

      const { creatorId, resourceCode, resourceType, resourceId } = parseSharedResource(
        data.shared_resource
      );

      const shareUrl = getAuthResourceLink(resourceId, resourceType, resourceCode);

      if (onFetch) {
        await onFetch({ resourceId, creatorId, resourceType });
      }

      history.replace(shareUrl);
    } catch (e) {
      history.replace('/');
    }
  }, []);

  useEffect(() => {
    fetchSharedResource();
  }, [fetchSharedResource]);

  return <SharedLoadingSpinner size='full-screen' />;
});
