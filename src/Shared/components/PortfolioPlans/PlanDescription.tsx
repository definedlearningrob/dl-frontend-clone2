import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

type Props = {
  description?: string;
};

export const PlanDescription = ({ description }: Props) => {
  if (!description) {
    return <SkeletonRectangle className='mb-base xxxl:mb-md' height='large' radius='sm' />;
  }

  return (
    <InjectedContent className='mb-base xxxl:mb-md text-xs xxxl:text-sm' content={description} />
  );
};
