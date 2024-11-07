import { splitTemplate } from './helpers';
import { SummarizerItem } from './SummarizerItem';

export type Option = { label: string; value: string | number | Date | null };

export type Filter = Option | Option[] | number | null;

type Props = {
  filters: Record<string, Filter>;
  template: string;
  summaryConfig: Record<string, { popoverHeader?: string; isHighlighted: boolean }>;
};

export const FiltersSummarizer = ({ filters, template, summaryConfig }: Props) => {
  const templateArray = splitTemplate(template);

  return (
    <>
      {templateArray.map(({ content, replaceable }, index) => {
        if (!replaceable) return content;

        const filterValue = filters[content];
        const filterConfig = summaryConfig[content];

        return (
          <SummarizerItem
            key={index}
            filterConfig={filterConfig}
            filterName={content}
            filterValue={filterValue}
          />
        );
      })}
    </>
  );
};
