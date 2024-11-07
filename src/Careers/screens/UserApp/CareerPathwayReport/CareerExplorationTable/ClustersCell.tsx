import { PathwayVisitResult } from '@graphql/dc/shared/types';
import { CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { Badge } from '@shared/components/Badge/Badge';
import { TooltipWithHeader } from '@shared/components/Tooltip';

export const ClustersCell = (props: CellContext<PathwayVisitResult, unknown>) => {
  const { t } = useTranslation();

  const { getValue } = props;

  const clusters = getValue() as string[];

  const clustersCount = clusters.length;

  if (clustersCount === 1) {
    return <span className=''>{clusters[0]}</span>;
  }

  return (
    <div className='flex'>
      <TooltipWithHeader
        content={
          <ul className='ps-sm !list-disc'>
            {clusters.map((cluster) => (
              <li key={cluster}>{cluster}</li>
            ))}
          </ul>
        }
        header={t('careerExplorationReport.fullDataTable.clusters')}>
        <Badge className='whitespace-nowrap' size='small' type='neutral'>
          {t('careerExplorationReport.clustersCount', { count: clustersCount })}
        </Badge>
      </TooltipWithHeader>
    </div>
  );
};
