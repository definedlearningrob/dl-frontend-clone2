import { SingleValue } from 'react-select';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SharedCard from '@shared/components/Card/Card';
import { ReactComponent as EmptyReports } from '@shared/assets/images/empty-reports.svg';
import {
  PlanStatementSelect,
  SelectOption,
} from '@shared/components/PlanReport/PlanStatementSelect';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import Button from '@shared/components/Button/Button';

type Props = {
  onSubmit: (value: SingleValue<SelectOption>) => void;
};

export const StatementSelectCard = ({ onSubmit }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const [value, setValue] = useState<SelectOption | null>(null);

  const handleSubmit = () => {
    onSubmit(value);
  };

  const size = isFullHD ? 'lg' : 'md';

  return (
    <SharedCard className='absolute top-[56px] xxxl:top-[96px] inset-x-0 w-fit mx-auto flex flex-col items-center gap-sm xxxl:gap-base shadow-400 !p-2lg'>
      <EmptyReports className='w-[320px] xxxl:w-[380px]' />
      <div className='w-[440px]'>
        <h5 className='text-center text-xs xxxl:text-sm mb-xs'>
          {t('planReport.detailedItemReporting')}
        </h5>
        <p className='text-center text-xxs xxxl:text-xs leading-lg tracking-[0.12px]'>
          {t('planReport.detailedItemReportingEmptyInfo')}
        </p>
        <PlanStatementSelect size={size} value={value} onChange={setValue} />
      </div>
      <Button
        className='self-stretch'
        disabled={!value}
        size={size}
        variant='primary'
        onClick={handleSubmit}>
        {t('planReport.showItemDetails')}
      </Button>
    </SharedCard>
  );
};
