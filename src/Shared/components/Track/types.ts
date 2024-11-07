import {
  Unit as BaseDcUnit,
  Track as BaseDcTrack,
  UnitResource,
  Pathway,
} from '@graphql/dc/shared/types';
import { Track as BaseDlTrack, Unit as BaseDlUnit, Task } from '@graphql/dl/users/types';

type DcUnitResource = Omit<UnitResource, 'step' | 'pathways'> & {
  pathways: Pick<Pathway, 'name'>[];
};

export type DcUnit = Pick<
  BaseDcUnit,
  'id' | 'name' | 'description' | 'imageUrl' | 'thumbnailUrl'
> & { resources: DcUnitResource[] };

export type DlUnit = Pick<
  BaseDlUnit,
  'id' | 'displayName' | 'description' | 'imageUrl' | 'thumbnailUrl'
> & {
  tasks: Pick<Task, 'id' | 'displayName' | 'description' | 'imageUrl' | 'thumbnailUrl'>[];
};

export type Resource = DlUnit['tasks'][number] | DcUnit['resources'][number];

export type DlTrack = Pick<
  BaseDlTrack,
  'id' | 'displayName' | 'description' | 'imageUrl' | 'thumbnailUrl' | 'tasksCount' | 'grades'
> & {
  units: DlUnit[];
};

export type DcTrack = Pick<
  BaseDcTrack,
  'id' | 'name' | 'description' | 'grades' | 'imageUrl' | 'resourcesCount' | 'thumbnailUrl'
> & {
  units: DcUnit[];
};
