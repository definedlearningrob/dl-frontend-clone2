import SharedImage from '@shared/components/Image/Image';
import { cx } from '@shared/utils/cx';

type Props = {
  counterClassName?: string;
  imageUrl: string;
  counter: number;
};

export const BadgeWithCounter = ({ counterClassName, imageUrl, counter }: Props) => (
  <div className='relative w-lg h-lg'>
    <SharedImage className='object-cover h-full mx-auto' src={imageUrl} />
    {counter > 1 && (
      <div
        className={cx(
          'bg-primary-200 group-hover:bg-white absolute bottom-0 right-0 translate-x-1/2 rounded rounded-lg px-xs py-xxs leading-lg text-primary-500 font-medium text-xxs',
          counterClassName
        )}>
        x{counter}
      </div>
    )}
  </div>
);
