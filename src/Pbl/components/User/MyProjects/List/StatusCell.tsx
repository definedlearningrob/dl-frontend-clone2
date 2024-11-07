import { capitalize } from 'lodash-es';

import { ContentStatusesTypes } from '@shared/resources/enums';
import { Badge } from '@shared/components/Badge/Badge';

type Props = {
  status: ContentStatusesTypes;
};

const statusMap = {
  [ContentStatusesTypes.PUBLISHED]: 'primary',
  [ContentStatusesTypes.DRAFT]: 'secondary',
  [ContentStatusesTypes.ARCHIVED]: 'danger',
} as const;

export const StatusCell = ({ status }: Props) => (
  <Badge className='!inline-block group-hover/row:bg-white' size='base' type={statusMap[status]}>
    {capitalize(status)}
  </Badge>
);
