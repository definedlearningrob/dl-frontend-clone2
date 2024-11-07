import { useRef } from 'react';
import { map, sum } from 'lodash-es';

import { Tooltip } from '@shared/components/Tooltip';

import { PlanGroupChart } from './PlanGroupChart';
import { PlanGroupLegendItem, Status } from './PlanGroupLegendItem';
import { PlanGroupData } from './types';

type Props = {
  chartType?: 'bar' | 'pie';
  title: string;
  data: PlanGroupData;
};

export const PlanGroupCard = ({ title, chartType = 'pie', data }: Props) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const totalStudents = sum(Object.values(data ?? {}));
  const isTitleOverflowing =
    titleRef.current && titleRef.current.scrollHeight > titleRef.current.clientHeight;

  return (
    <li
      aria-label={title}
      className='bg-white p-base xxxl:p-md outline outline-neutral-300 outline-1'>
      <div className='flex justify-center mb-base xxxl:mb-sm'>
        <Tooltip delayDuration={500} disabled={!isTitleOverflowing} message={title}>
          <h6 ref={titleRef} className='font-bold text-xs xxxl:text-sm line-clamp-2'>
            {title}
          </h6>
        </Tooltip>
      </div>
      <div className='flex justify-center mb-md xxxl:mb-base'>
        <PlanGroupChart chartType={chartType} data={data} total={totalStudents} />
      </div>
      <div className='flex justify-center'>
        <div className='gap-y-xs xxxl:gap-y-x gap-x-sm grid grid-cols-2 auto-cols-min grid-flow-row'>
          {map(data, (studentsCount, status) => (
            <PlanGroupLegendItem
              key={status}
              status={status as Status}
              studentsCount={studentsCount}
              total={totalStudents}
            />
          ))}
        </div>
      </div>
    </li>
  );
};
