import { AnimatePresence, motion } from 'framer-motion';
import cx from 'classnames';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { TPlan } from '@dc/graphql/user/queries/plansWithAlignmentStatement';

import { Badge } from '@shared/components/Badge/Badge';
import { AlignToFormMiddleStepDetailsStatement } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToFormMiddleStepDetailsStatement';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ExpandCardButton } from '@shared/components/PortfolioPlans/ExpandCardButton';
import { ReactComponent as CertificateIcon } from '@shared/svg/certificate.svg';
import { ReactComponent as CompletedIcon } from '@shared/svg/checkmark_circle_outlined.svg';

type Props = {
  isExpandedPlan: boolean;
  toggleExpandSinglePlan: () => void;
  plan: TPlan;
};

export const AlignToFormMiddleStepDetails = ({
  isExpandedPlan,
  toggleExpandSinglePlan,
  plan,
}: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  const containerClass = cx(
    'flex flex-col gap-xs border border-neutral-300 rounded-xs justify-between cursor-pointer',
    {
      'text-primary-500 gap-0 pb-0': isExpandedPlan,
    }
  );
  const [statementCheckedInputs] = useField('statementIds');

  const classContent = cx('flex justify-between py-xs p-x w-full', {
    'pb-0': isExpandedPlan,
  });

  const groupStatementsLength = plan.groups.reduce((acc, group) => {
    const groupStatements = group.statements.filter((statement) =>
      statementCheckedInputs.value.includes(statement.id)
    );

    return acc + groupStatements.length;
  }, 0);

  const selectedStatements = groupStatementsLength ? groupStatementsLength : '';
  const groupStatements = groupStatementsLength
    ? `${groupStatementsLength} ${t('components.rubric.alignPlans.selected')}`
    : '';

  return (
    <div className={containerClass}>
      <div className={classContent} onClick={toggleExpandSinglePlan}>
        <div className='flex items-center gap-xs h-[40px]'>
          <IconContainer
            Icon={CertificateIcon}
            className='text-primary-500 bg-primary-200 rounded-xs'
            paddingSize='xxs'
            size={isFullHD ? 'base' : 'sm'}
          />
          <h6 className='mb-0 leading-base font-bold text-xs xxxl:text-sm'>{plan.name}</h6>
          {selectedStatements && (
            <Badge className='flex items-center text-xs xxxl:text-sm' type='success'>
              <IconContainer
                Icon={CompletedIcon}
                className='rounded-xs'
                paddingSize='xxs'
                size={isFullHD ? 'base' : 'sm'}
              />
              {groupStatements}
            </Badge>
          )}
        </div>
        <div>
          <ExpandCardButton
            className='group-hover:text-primary-500'
            isExpanded={isExpandedPlan}
            toggleIsExpanded={toggleExpandSinglePlan}
          />
        </div>
      </div>
      <AnimatePresence>
        {isExpandedPlan && (
          <motion.div
            key='content'
            animate='open'
            className='flex gap-sm xxxl:gap-base'
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
            <div className='grow text-neutral-700'>
              {plan.groups.map((group) => (
                <AlignToFormMiddleStepDetailsStatement
                  key={group.id}
                  group={group}
                  isExpandedPlan={isExpandedPlan}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
