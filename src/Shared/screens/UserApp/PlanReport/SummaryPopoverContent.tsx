import { Option } from '@shared/components/FiltersSummarizer/FiltersSummarizer';

type Props = {
  options: Option[];
};

export const SummaryPopoverContent = ({ options }: Props) => (
  <ul className='list-disc px-x py-xs'>
    {options.map(({ label }) => (
      <li key={label} className='text-font-primary text-xxs leading-lg'>
        {label}
      </li>
    ))}
  </ul>
);
