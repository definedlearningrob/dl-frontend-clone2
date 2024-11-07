import { PathwayVisitResult } from '@graphql/dc/shared/types';
import { CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { Badge } from '@shared/components/Badge/Badge';
import { TooltipWithHeader } from '@shared/components/Tooltip';

export const PathwaysCell = (props: CellContext<PathwayVisitResult, unknown>) => {
  const { t } = useTranslation();

  const { getValue } = props;

  const pathways = getValue() as string[];

  const pathwaysCount = pathways.length;

  if (pathwaysCount === 1) {
    return <span className='text-xxs break-words'>{pathways[0]}</span>;
  }

  return (
    <div className='flex'>
      <TooltipWithHeader
        content={
          <ul className='ps-sm !list-disc'>
            {pathways.map((pathway) => (
              <li key={pathway}>{pathway}</li>
            ))}
          </ul>
        }
        header={t('careerExplorationReport.fullDataTable.pathways')}>
        <Badge className='whitespace-nowrap' size='small' type='neutral'>
          {t('careerExplorationReport.pathwaysCount', { count: pathwaysCount })}
        </Badge>
      </TooltipWithHeader>
    </div>
  );
};
