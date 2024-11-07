import { TSharedResource } from './types';

export const getAuthResourceLink = (
  resourceId: string,
  resourceType: TSharedResource['resource_type'],
  code: string
) => {
  const resourceLink = {
    Task: `/projects/${resourceId}?code=${code}`,
    Course: `/courses/${resourceId}?code=${code}`,
  }[resourceType];

  return resourceLink;
};

export const getPublicResourceLink = (
  resourceId: string,
  resourceType: TSharedResource['resource_type'],
  code: string,
  role: TSharedResource['target_role']
) => {
  const resourceLink = {
    Task: `/shared/${role}/projects/${resourceId}?code=${code}`,
    Course: `/shared/${role}/courses/${resourceId}?code=${code}`,
  }[resourceType];

  return resourceLink;
};
