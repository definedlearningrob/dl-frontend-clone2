import { cx } from '@shared/utils/cx';
type Props = {
  colorClassName: string;
  label: string;
};

export const LegendItem = ({ colorClassName, label }: Props) => (
  <div className='flex gap-xs items-center py-xxs xxxl:py-xs px-xs xxxl:px-sm rounded-xs border border-neutral-200'>
    <div className={cx('w-sm h-sm rounded-xs bg-neutral-600', colorClassName)} />
    <span className='text-xxs xxxl:text-xs font-medium text-font-secondary'>{label}</span>
  </div>
);
