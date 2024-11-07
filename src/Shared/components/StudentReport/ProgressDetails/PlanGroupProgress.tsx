import { ReactComponent as CertificateIcon } from '@shared/svg/certificate.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { cx } from '@shared/utils/cx';
import { usePlanStatusOptions } from '@shared/hooks/usePlanStatusOptions';
import { getGroupProgress } from '@shared/components/StudentReport/ProgressDetails/helpers';
import { PlanGroupProgressIcon } from '@shared/components/StudentReport/ProgressDetails/PlanGroupProgressIcon';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

type Props = {
  className?: string;
  progressData: ReturnType<typeof getGroupProgress>;
  isLoading: boolean;
};

const commonMarkerClassName = cx(
  'flex items-center justify-center',
  'relative after:absolute pe-[20px] xxxl:pe-[28px] after:bg-neutral-300',
  'after:h-xxs after:w-xxs after:rounded-full after:right-xs xxxl:after:right-x',
  'last-of-type:after:hidden last-of-type:pe-0'
);

export const PlanGroupProgress = ({ progressData, isLoading }: Props) => {
  const { options } = usePlanStatusOptions();

  const { progress, percentageProgress } = progressData;

  if (isLoading) {
    return (
      <div className='flex'>
        {options.map((item, index) => (
          <div key={index} className={commonMarkerClassName}>
            <PlanGroupProgressIcon item={item} />
            <div className='w-lg'>
              <SkeletonRectangle size='full-width' />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='flex'>
      {options.map((item, index) => {
        const value = progress[item.status];
        const percentageValue = Math.round(percentageProgress[item.status]);

        return (
          <div key={index} className={commonMarkerClassName}>
            <PlanGroupProgressIcon item={item} />
            <div className='font-medium leading-lg mr-xxxs text-xxs xxxl:text-xs'>
              {`${percentageValue}`}%
            </div>
            <div className='text-xxs xxxl:text-xs leading-sm flex items-center text-font-secondary'>
              (
              <IconContainer
                Icon={CertificateIcon}
                className='mr-xxxs'
                paddingSize='none'
                size='x'
              />
              {value})
            </div>
          </div>
        );
      })}
    </div>
  );
};
