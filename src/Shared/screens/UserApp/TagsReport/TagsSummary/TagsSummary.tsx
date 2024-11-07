import { FiltersSummary } from '@shared/screens/UserApp/PerformanceIndicatorsReport/FiltersSummary';
import Card from '@shared/components/Card/Card';
import { PerformanceIndicatorsScoreInfo } from '@shared/components/PerformanceIndicatorsScoreInfo';

type Props = {
  studentsTotal?: number;
};

export const TagsSummary = ({ studentsTotal = 0 }: Props) => (
  <Card className='flex flex-col gap-sm xxxl:gap-base'>
    <FiltersSummary studentsTotal={studentsTotal} />
    <PerformanceIndicatorsScoreInfo />
  </Card>
);
