import { useTranslation } from 'react-i18next';

import { PrintableResults } from '@shared/components/Rubrics/PrintableResults/PrintableResults';

import { RubricsCriteriaLabel } from '../RubricsCriteriaLabel/RubricsCriteriaLabel';
import { RubricsRow } from '../RubricsRow/RubricsRow';
import { useRubric } from '../RubricProvider/RubricProvider';

export const RubricsViewer = () => {
  const { t } = useTranslation();
  const { rubric } = useRubric();

  return (
    <div className='overflow-x-auto w-full'>
      <table
        className='bg-white border-separate border-spacing-0 rounded-xs w-full table-fixed'
        data-testid='rubric-table-builder'>
        <thead>
          <tr>
            <th
              className='border border-neutral-300 p-xs xxxl:p-x text-left text-xs font-bold bg-neutral-200 w-[160px]'
              data-testid='rubrics-reserved-cell'>
              {t('components.rubric.levels')}
            </th>
            {rubric.criteriaLabels.map((label) => (
              <RubricsCriteriaLabel key={label.id} criteriaLabel={label} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rubric.headings.map((heading) => (
            <RubricsRow
              key={heading.id}
              criteria={rubric.criterias}
              criteriaLabels={rubric.criteriaLabels}
              heading={heading}
            />
          ))}
        </tbody>
      </table>
      <div className='pt-md basis-full'>
        <PrintableResults />
      </div>
    </div>
  );
};
