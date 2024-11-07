import { useToggle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ApolloError } from '@apollo/client';
import { useEffect, MouseEvent } from 'react';

import { ReactComponent as LockedIcon } from '@shared/svg/padlock.svg';
import { ReactComponent as UnlockedIcon } from '@shared/svg/padlock-open.svg';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { useRole } from '@shared/hooks/useRole';
import { Kicker } from '@shared/components/Kicker';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { Tooltip } from '@shared/components/Tooltip';
import type {
  StudentInfo,
  TPlanStatement,
  UserInfo,
} from '@shared/components/PortfolioPlans/types';
import { ExpandCardButton } from '@shared/components/PortfolioPlans/ExpandCardButton';
import { cx } from '@shared/utils/cx';
import { useEvaluateStudentMutation } from '@shared/graphql/shared/hooks/useEvaluateStudentMutation';
import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';
import { callToast } from '@shared/components/Toaster/Toaster';
import { useCreateStatementComment } from '@shared/graphql/shared/hooks/useCreateStatementComment';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useTogglePlanStatement } from '@shared/hooks/useTogglePlanStatement';
import { EvidenceListWrapper } from '@shared/components/PortfolioPlans/Evidence/EvidenceListWrapper';
import { IconButton } from '@shared/components/IconButton/IconButton';

import { getCanEvaluate } from '../helpers';

import { StatementStatusSelect } from './StatementStatusSelect';
import { StatementCommentInput } from './StatementCommentInput';
import { ActivityHistory } from './ActivityHistory';
import { StatementQuestion } from './StatementQuestion';

type Props = {
  userInfo: UserInfo | StudentInfo;
  statement: TPlanStatement;
};

export const PlanStatement = ({ statement, userInfo }: Props) => {
  const { t } = useTranslation();
  const {
    params: { planId, statementId },
  } = useQueryParams<{ planId: string; statementId: string }>();
  const { id: studentUuid } = useParams<{ id?: string }>();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [isExpanded, toggleIsExpanded] = useToggle(false);
  const { isUser } = useRole();

  const handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition !== null) {
      window.scrollTo({ top: parseInt(scrollPosition) });
      sessionStorage.removeItem('scrollPosition');
    }
  };

  useEffect(() => {
    if (statementId === id) {
      toggleIsExpanded(true);
      handleScrollPosition();
    }
  }, [statementId]);

  const {
    name,
    isRequired,
    isLocked,
    status,
    id,
    evaluationId,
    question,
    evidences: evidence,
  } = statement;
  const hasEvaluation = !!evaluationId;
  const canEvaluate = getCanEvaluate(userInfo);

  const [evaluateStudent] = useEvaluateStudentMutation({
    evaluationId,
    statementId: id,
    studentUuid,
  });
  const [createStatementComment, { loading: isCreateCommentLoading }] = useCreateStatementComment({
    evaluationId,
    statementId: id,
  });
  const [toggleEvaluationLock] = useTogglePlanStatement({ isLocked });

  const handleEvaluateStudent = async (result: EVALUATION_RESULTS_VALUES) => {
    if (result === status?.result) {
      return;
    }

    try {
      await evaluateStudent({
        result,
        planId,
        previousResult: status?.result,
        isStatementRequired: !!statement.isRequired,
      });
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error);
      } else {
        callToast('error', t('common.notifications.error.unknown'));
      }
    }
  };

  const toggleSelfEvaluation = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      await toggleEvaluationLock({
        input: { statementId: id, studentUuid: studentUuid ?? '' },
        planId,
      });
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error);
      } else {
        callToast('error', t('common.notifications.error.unknown'));
      }
    }
  };

  const cardClasses = cx(
    'group/statement relative p-sm xxxl:p-base bg-white rounded-sm transition-all',
    'border border-neutral-300 plan-statement',
    {
      'border-primary-500 mb-sm xxxl:mb-x pb-base xxxl:pb-md': isExpanded,
      'hover:bg-neutral-200 hover:border-neutral-400': !isExpanded,
    }
  );
  const titleClasses = cx('text-xs xxxl:text-sm mb-0 leading-lg max-w-[680px] xxxl:max-w-[840px]', {
    'text-primary-500': isExpanded,
  });
  const lockButtonClasses = cx(
    '!rounded-xs !bg-white text-neutral-600 group-hover/statement:!visible',
    '!border !border-white !border-solid focus-visible:!border-primary-500',
    {
      invisible: !isExpanded,
    }
  );
  const collapseButtonClasses = cx(
    'absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2',
    '!p-xs !border !border-solid !border-primary-500 !bg-white text-neutral-600',
    'focus-visible:outline !outline-1 !outline-offset-2 !outline-primary-500'
  );

  return (
    <li className={cardClasses} data-id={id}>
      <div
        className={cx({ 'pointer-events-none': !hasEvaluation })}
        role='button'
        onClick={toggleIsExpanded}>
        <div className='flex justify-between gap-xs mb-xxs'>
          <div className='self-center'>
            {isRequired && (
              <Kicker className='mb-xxs' size={isFullHD ? 'md' : 'sm'} variant='secondary'>
                {t('sharedCommon.required')}
              </Kicker>
            )}
            <div className='flex items-center gap-xs'>
              {isLocked && (
                <IconContainer
                  Icon={LockedIcon}
                  className='bg-white border border-neutral-300 rounded-xs text-neutral-700'
                  paddingSize='xxs'
                  size={isFullHD ? 'base' : 'sm'}
                />
              )}
              <h6 className={titleClasses}>{name}</h6>
            </div>
          </div>
          <div className='flex gap-xxs self-start'>
            {isUser && canEvaluate && (
              <Tooltip
                delayDuration={500}
                message={
                  isLocked
                    ? t('components.planGroup.unlockSelfAssignment')
                    : t('components.planGroup.lockSelfAssignment')
                }>
                <DeprecatedIconButton
                  className={lockButtonClasses}
                  icon={isLocked ? <UnlockedIcon /> : <LockedIcon />}
                  iconSize={isFullHD ? 'sm' : 'xs'}
                  size='sm'
                  onClick={toggleSelfEvaluation}
                />
              </Tooltip>
            )}
            {hasEvaluation && (
              <ExpandCardButton
                isExpanded={isExpanded}
                size='sm'
                toggleIsExpanded={toggleIsExpanded}
              />
            )}
          </div>
        </div>
        <StatementStatusSelect
          isExpanded={isExpanded}
          isReadOnly={!canEvaluate || isLocked}
          status={status?.result ?? null}
          onChange={handleEvaluateStudent}
        />
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key='content'
            animate='open'
            className='flex flex-col gap-base xxxl:gap-md'
            exit='collapsed'
            initial='collapsed'
            transition={{
              duration: 0.3,
              opacity: { duration: 0.1, delay: 0.1 },
            }}
            variants={{
              open: {
                height: 'auto',
                opacity: 1,
              },
              collapsed: { height: 0, opacity: 0 },
            }}>
            <div>
              <StatementCommentInput
                currentUser={userInfo}
                isDisabled={isCreateCommentLoading}
                onSubmit={createStatementComment}
              />
              <ActivityHistory activityHistory={statement.activityHistory} />
            </div>
            <StatementQuestion evaluationId={evaluationId} question={question} />
            <IconButton
              Icon={ChevronUpIcon}
              circle={true}
              className={collapseButtonClasses}
              onClick={toggleIsExpanded}
            />
            <EvidenceListWrapper evidence={evidence} statementId={statement.id} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
