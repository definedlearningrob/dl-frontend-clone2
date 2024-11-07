import { TSharedResource } from './types';

export const parseSharedResource = (sharedResource: TSharedResource) => {
  const {
    allow_login: allowLogin,
    code: resourceCode,
    creator_id: creatorId,
    resource_type: resourceType,
    resource,
    target_role: targetRole,
    resource_id: resourceId,
  } = sharedResource;

  return {
    allowLogin,
    creatorId,
    resourceCode,
    resourceId,
    resourceType,
    resource,
    targetRole,
  };
};
