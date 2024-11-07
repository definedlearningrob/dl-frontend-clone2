import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { cx } from '@shared/utils/cx';
import { TPlanStatusOption } from '@shared/hooks/usePlanStatusOptions';

type Props = {
  item: TPlanStatusOption;
};

export const PlanGroupProgressIcon = ({ item }: Props) => (
  <IconContainer
    Icon={item.Icon}
    className={cx('bg-white outline outline-1 outline-neutral-300 rounded-xs mr-xxs', {
      'text-neutral-700': item.variant === 'neutral',
      'text-secondary-500': item.variant === 'secondary',
      'text-success-500': item.variant === 'success',
      'text-danger-500': item.variant === 'danger',
    })}
    paddingSize='xxs'
    size='sm'
  />
);
