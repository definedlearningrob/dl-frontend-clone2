import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { Kicker } from '@shared/components/Kicker';
import { StatementStatusBadge } from '@shared/components/StatementStatusBadge';
import { usePlanStatusOptions } from '@shared/hooks/usePlanStatusOptions';
import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';
import { formatDateTime } from '@shared/utils/date';
import { Tooltip } from '@shared/components/Tooltip';
import { TPlanGroupStatement } from '@shared/graphql/student/query/studentReportProgressByStudent';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { Question } from './Question';
import { EvidenceList } from './EvidenceList';

type Props = {
  statement: TPlanGroupStatement;
};

export const Statement = ({ statement }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { name, isRequired, results, question, evidences } = statement;

  const { getOption } = usePlanStatusOptions();

  const hasResults = !isEmpty(results);

  const latestEvaluationResult = hasResults
    ? results[0]?.result
    : EVALUATION_RESULTS_VALUES.NOT_STARTED;

  const lastUpdated = hasResults ? formatDateTime(results[0].createdAt) : null;

  const statementHasContent = !isEmpty(question) || !isEmpty(evidences);

  return (
    <>
      <div className='bg-neutral-200 rounded-sm xxxl:px-md px-base py-sm flex justify-between'>
        <div>
          {isRequired && (
            <Kicker className='!mb-xxs' size={isFullHD ? 'md' : 'sm'} variant='secondary'>
              {t('sharedCommon.required')}
            </Kicker>
          )}
          <h6 className='font-bold text-xs xxxl:text-sm leading-base mb-xs'>{name}</h6>
          <div className='flex items-center'>
            <div className='text-xs xxxl:text-sm mr-xs font-medium'>
              {t('studentGoalReport.status')}
            </div>
            <StatementStatusBadge
              {...getOption(latestEvaluationResult)!}
              badgeClassName='bg-white'
              size={isFullHD ? 'big' : 'base'}
            />
          </div>
        </div>
        {lastUpdated && (
          <Tooltip
            delayDuration={300}
            message={formatDateTime(lastUpdated, { dateFormat: 'MMMM D, YYYY' })}>
            <div className='text-xxs xxxl:text-xs leading-lg tracking-[0.12px] whitespace-nowrap'>
              {[t('studentGoalReport.lastUpdated'), lastUpdated].join(' ')}
            </div>
          </Tooltip>
        )}
      </div>
      {statementHasContent && (
        <div className='pl-lg xxxl:pl-2lg flex flex-col gap-sm xxxl:gap-base'>
          <Question question={question} />
          <EvidenceList evidence={evidences} />
        </div>
      )}
    </>
  );
};
