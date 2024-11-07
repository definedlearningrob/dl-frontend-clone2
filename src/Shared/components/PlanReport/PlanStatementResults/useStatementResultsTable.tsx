import { compact, first, isArray, isEmpty } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TableColumns } from '@shared/components/NewTable/NewTable';
import { StatementResult } from '@shared/graphql/user/query/planStatementResults';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { usePlanStatusOptions } from '@shared/hooks/usePlanStatusOptions';
import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';
import { StatementStatusBadge } from '@shared/components/StatementStatusBadge';
import { Tooltip } from '@shared/components/Tooltip';
import { formatDateTime } from '@shared/utils/date';

import { StatementQuestion } from './types';

type Params = {
  question?: StatementQuestion | null;
};

export const useStatementResultsTable = ({ question }: Params) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const { getOption } = usePlanStatusOptions();

  const getQuestionAnswer = useCallback(
    (statement: StatementResult) => {
      if (!statement.answer) {
        return '-';
      }

      const answer = statement.answer;
      const hasOptions = !isEmpty(question?.options);

      if (question && hasOptions && isArray(statement.answer)) {
        const availableOptions = question.options.map((option) => option.option);

        return answer.filter((option) => availableOptions?.includes(option)).join(', ');
      }

      return first(answer);
    },
    [question]
  );

  const hasQuestion = question && !isEmpty(question.text);

  const columns: TableColumns<StatementResult> = useMemo(
    () =>
      compact([
        {
          accessorKey: 'studentSisId',
          header: t('planReport.statementResults.id'),
          size: 80,
          meta: { className: 'text-font-secondary' },
        },
        {
          accessorKey: 'studentName',
          header: t('planReport.statementResults.student'),
          meta: { ellipsis: true },
          size: 150,
        },
        {
          accessorKey: 'status',
          cell: (params) => (
            <StatementStatusBadge
              {...getOption(params.getValue<EVALUATION_RESULTS_VALUES>())!}
              size={isFullHD ? 'base' : 'small'}
            />
          ),
          header: t('planReport.statementResults.status'),
          size: 110,
        },
        hasQuestion && {
          id: 'answer',
          accessorKey: 'answer',
          accessorFn: (statement: StatementResult) => getQuestionAnswer(statement),
          header: () => (
            <div className='flex flex-col'>
              <span>{t('planReport.statementResults.answerToQuestion')}</span>
              <Tooltip
                className='truncate font-regular'
                delayDuration={500}
                message={question.text}>
                "{question.text}"
              </Tooltip>
            </div>
          ),
          size: 300,
          enableSorting: false,
        },
        {
          accessorKey: 'evidencesCount',
          header: t('planReport.statementResults.evidence'),
          size: 80,
          meta: { className: 'text-center', headerClassName: 'justify-center' },
        },
        {
          accessorKey: 'lastUpdatedAt',
          accessorFn: (statement: StatementResult) =>
            statement.lastUpdatedAt
              ? formatDateTime(statement.lastUpdatedAt)
              : t('common.labels.notApplicable'),
          header: t('planReport.statementResults.lastUpdated'),
          size: 110,
        },
      ]),
    [hasQuestion, getQuestionAnswer]
  );

  return { columns };
};
