import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { isNull } from 'lodash-es';

import SharedCard from '@shared/components/Card/Card';
import { ReactComponent as CertificateIcon } from '@shared/svg/certificate.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import {
  PlanStatementSelect,
  SelectOption,
} from '@shared/components/PlanReport/PlanStatementSelect';
import { PlanStatementReportDetails } from '@shared/components/PlanReport/PlanStatementReportDetails/PlanStatementReportDetails';
import { PlanStatementResults } from '@shared/components/PlanReport/PlanStatementResults/PlanStatementResults';
import { cx } from '@shared/utils/cx';

import { statementQuestionMock } from '../mocks';

import { StatementSelectCard } from './StatementSelectCard';

type Props = {
  studentsCount?: number;
};

export const PlanStatementReport = ({ studentsCount = 0 }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [selectedPlanStatement, setPlanStatment] = useState<SelectOption | null>(null);

  const statementId = selectedPlanStatement?.value;
  const statementQuestion = selectedPlanStatement?.question;

  const showMockedData = isNull(selectedPlanStatement);

  const separatorClassname = 'text-neutral-200';

  return (
    <SharedCard>
      <h5 className='text-sm xxxl:text-base mb-sm xxxl:mb-base'>
        {t('planReport.detailedItemReporting')}
      </h5>
      <div className='relative'>
        <div
          className={cx('flex flex-col gap-base xxxl:gap-md', {
            'blur-sm opacity-70 pointer-events-none': showMockedData,
          })}>
          <section>
            <div className='rounded-sm border border-neutral-300 overflow-hidden'>
              <div className='px-sm xxxl:px-base py-xs xxxl:py-sm bg-neutral-200 border-b-2 border-neutral-300 text-xs xxxl:text-sm font-bold'>
                {t('planReport.currentlySelected')}
              </div>
              <div className='flex gap-xs xxxl:gap-sm p-sm'>
                <IconContainer
                  Icon={CertificateIcon}
                  className='rounded-sm bg-neutral-200'
                  size={isFullHD ? 'base' : 'sm'}
                />
                <div className='w-[440px]'>
                  <PlanStatementSelect
                    size={isFullHD ? 'md' : 'sm'}
                    value={selectedPlanStatement}
                    onChange={setPlanStatment}
                  />
                </div>
              </div>
            </div>
          </section>
          <hr className={separatorClassname} />
          <PlanStatementReportDetails showMockedData={showMockedData} statementId={statementId} />
          <hr className={separatorClassname} />
          <PlanStatementResults
            question={showMockedData ? statementQuestionMock : statementQuestion}
            showMockedData={showMockedData}
            statementId={statementId}
            studentsCount={studentsCount}
          />
        </div>
        {showMockedData && <StatementSelectCard onSubmit={setPlanStatment} />}
      </div>
    </SharedCard>
  );
};
