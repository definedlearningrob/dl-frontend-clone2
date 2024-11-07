import { match } from 'ts-pattern';
import { UnitResourceTypes } from '@graphql/dc/shared/types';

import { Resource } from './types';

export const getResourcePath = (resource: Resource, unitId: string) =>
  'resourceType' in resource
    ? match(resource.resourceType)
        .with(UnitResourceTypes.COURSE, () => `/courses/${resource.resourceId}`)
        .with(UnitResourceTypes.OPPORTUNITY, () => `/opportunities/${resource.resourceId}`)
        .exhaustive()
    : `/lessons/${unitId}/projects/${resource.id}`;
