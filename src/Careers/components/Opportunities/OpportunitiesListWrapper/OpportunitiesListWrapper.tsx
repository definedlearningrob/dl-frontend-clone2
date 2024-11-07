import { ReactNode } from 'react';
import { times } from 'lodash-es';

import Card from '@shared/components/Card/Card';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

type Props = {
  name: ReactNode;
  description: string;
  children: ReactNode;
  loading: boolean;
};

export const OpportunitiesListWrapper = ({ name, description, loading, children }: Props) => (
  <Card className='h-full !px-0 flex flex-col'>
    <div className='pl-base xxxl:pl-md'>
      <h3 className='text-sm xxxl:text-base mb-xxs xxxl:mb-xs'>{name}</h3>
      <div className='text-neutral-700 mb-sm xxxl:mb-base'>{description}</div>
    </div>
    <Card.Body
      className='overflow-auto scrollbar pl-base xxxl:pl-md pr-sm xxxl:pr-md py-xs min-h-0 flex flex-col gap-x xxxl:gap-sm '
      withPadding={false}>
      {loading &&
        times(5, (index) => <SkeletonRectangle key={index} className='!h-[147px] shrink-0' />)}
      {!loading && children}
    </Card.Body>
  </Card>
);
