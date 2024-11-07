import { AnimatePresence, motion } from 'framer-motion';
import cx from 'classnames';
import { useState } from 'react';

import { TPlanGroup } from '@dc/graphql/user/queries/plans';

import { ExpandCardButton } from '@shared/components/PortfolioPlans/ExpandCardButton';
import { AlignToFormPlanStatement } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToFormPlanStatement';

type Props = {
  group: TPlanGroup;
  isExpandedPlan: boolean;
};
export const AlignToFormMiddleStepDetailsStatement = ({ group, isExpandedPlan }: Props) => {
  const [isStatementExpanded, setIsStatementExpanded] = useState(false);
  const classContainer = cx('flex flex-col cursor-pointer', {
    'first-of-type:pt-0': isExpandedPlan,
  });
  const groupStatementsLength = group.statements.length;
  const groupNameClass = cx('mb-0 leading-base font-medium text-xs xxxl:text-sm', {
    'text-primary-500': isStatementExpanded,
  });

  const toggleStatementExpand = () => {
    setIsStatementExpanded(!isStatementExpanded);
  };

  return (
    <div className={classContainer} onClick={toggleStatementExpand}>
      <div className='flex items-center gap-xxs w-full border-neutral-300 border-b py-xs px-xxs'>
        <ExpandCardButton
          className='text-primary-500 !ml-xxs'
          isExpanded={isStatementExpanded}
          toggleIsExpanded={toggleStatementExpand}
        />
        <h6 className={groupNameClass}>
          {group.name} <span className='text-neutral-600'>({groupStatementsLength})</span>
        </h6>
      </div>
      <AnimatePresence>
        {isStatementExpanded && (
          <motion.div
            key='content'
            animate='open'
            className='flex flex-col gap-sm xxxl:gap-base'
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
            <div className='flex flex-col text-neutral-700'>
              {group.statements.map((statement) => (
                <AlignToFormPlanStatement key={statement.id} statement={statement} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
