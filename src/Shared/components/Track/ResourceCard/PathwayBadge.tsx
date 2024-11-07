import { ReactComponent as PathwayIcon } from '@dc/svg/pathway.svg';

import { NewTag } from '@shared/components/NewTag/NewTag';
import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  pathways: { name: string }[];
};

export const PathwayBadge = ({ pathways }: Props) => {
  const label = pathways.map((pathway) => pathway.name).join(', ');

  return (
    <div className='mb-xs max-w-fit'>
      <Tooltip
        delayDuration={500}
        message={pathways.map((pathway, index) => (
          <div key={index}>{pathway.name}</div>
        ))}>
        <NewTag Icon={PathwayIcon}>{label}</NewTag>
      </Tooltip>
    </div>
  );
};
