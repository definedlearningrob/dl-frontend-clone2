import { isArray } from 'lodash-es';

import { SummaryPopoverContent } from '@shared/screens/UserApp/PlanReport/SummaryPopoverContent';
import { TooltipWithHeader } from '@shared/components/Tooltip';
import { cx } from '@shared/utils/cx';
import { getTextContent } from '@shared/components/FiltersSummarizer/helpers';
import { Filter } from '@shared/components/FiltersSummarizer/FiltersSummarizer';

type Props = {
  filterValue: Filter;
  filterConfig: { popoverHeader?: string; isHighlighted: boolean };
  filterName: string;
};

export const SummarizerItem = ({ filterValue, filterConfig, filterName }: Props) => {
  const isMultiselectableFilter = isArray(filterValue);

  const hasPopover = !!filterConfig.popoverHeader && isMultiselectableFilter;

  const isAllSelected =
    isMultiselectableFilter && !!filterValue.find((option) => option.label === 'All');

  const isPopoverDisabled = !hasPopover || !isMultiselectableFilter || isAllSelected;

  const popoverContent = hasPopover ? <SummaryPopoverContent options={filterValue} /> : null;

  const popoverHeader = hasPopover ? (
    <>
      <span className='mr-xxxs'>{filterConfig.popoverHeader}</span>
      <span className='text-neutral-600'>({filterValue.length})</span>
    </>
  ) : null;

  return (
    <TooltipWithHeader
      className='inline'
      content={popoverContent}
      disabled={isPopoverDisabled}
      header={popoverHeader}>
      <span
        className={cx({
          'text-primary-500 font-medium cursor-default': filterConfig.isHighlighted,
        })}>
        {getTextContent({ filterName, filterValue })}
      </span>
    </TooltipWithHeader>
  );
};
