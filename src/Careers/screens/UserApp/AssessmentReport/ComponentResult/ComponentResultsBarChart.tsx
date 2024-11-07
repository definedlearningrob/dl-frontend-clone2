import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { orderBy } from 'lodash-es';

import { SimpleBarChart } from '@shared/components/SimpleBarChart/SimpleBarChart';

import { CustomCategoryTick } from './CustomCategoryTick';

type Props<T extends string> = {
  title: string;
  description: string;
  data: ({ [key in T]: number } & { category: string })[] | undefined;
  colorClassName: string;
  valueKey: Exclude<T, 'category'>;
};

export const ComponentResultsBarChart = <T extends string>({
  title,
  description,
  data,
  colorClassName,
  valueKey,
}: Props<T>) => {
  const { t } = useTranslation();

  const chartData = useMemo(
    () =>
      orderBy(data, valueKey, 'desc').map((chartItem) => ({
        name: chartItem.category,
        value: chartItem[valueKey],
        colorClassName,
      })),
    [data]
  );

  if (!data) {
    return null;
  }

  return (
    <div className='text-center'>
      <h6 className='text-xs xxxl:text-sm mb-xs'>{title}</h6>
      <p className='text-xxs xxxl:text-xs italic leading-lg xxxl:mb-base'>{description}</p>
      <div className='flex h-[194px]'>
        <div className='relative mb-[30px] text-font-secondary text-xxs font-medium leading-sm w-sm'>
          <div className='absolute top-0 right-0 text-right -rotate-90 origin-top-right'>
            <div className='-translate-y-x'>{t('assessmentReport.highest')}</div>
          </div>
          <div className='absolute bottom-0 left-0 right-0 -rotate-90'>
            {t('assessmentReport.lowest')}
          </div>
        </div>
        <SimpleBarChart
          data={chartData}
          isAnimationActive={true}
          isResponsive={true}
          xAxisProps={{
            axisLine: false,
            interval: 0,
            tickLine: false,
            tick: CustomCategoryTick,
            padding: { left: 4 },
          }}
          yAxisProps={{
            interval: 'preserveStartEnd',
            stroke: '#DADDE6',
            tickCount: 2,
            tickFormatter: () => '',
            width: 12,
          }}
        />
      </div>
    </div>
  );
};
