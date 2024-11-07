import { useTranslation } from 'react-i18next';
import { useField, useFormikContext } from 'formik';

import { TRubricHeadingPlanStatement } from '@dc/graphql/user/queries/rubric';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as TableIcon } from '@shared/assets/icons/table.svg';
import { ReactComponent as ArchiveIcon } from '@shared/assets/icons/archive.svg';
import { ReactComponent as ChevronRight } from '@shared/assets/icons/chevron_right.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Kicker } from '@shared/components/Kicker';
import { useAlignToPlan } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToPlanProvider';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { Tooltip } from '@shared/components/Tooltip';
import { useAlignPlanGroupStatementToRubricHeading } from '@shared/graphql/user/hooks/useAlignPlanGroupStatementToRubricHeading';
import { callToast } from '@shared/components/Toaster/Toaster';
import { StatementValues } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToPlanModal';

type Props = {
  statement: TRubricHeadingPlanStatement;
  planName: string;
  groupName: string;
  isNewAligned?: boolean;
};

export const AlignToFormAlignmentDetails = ({
  statement,
  planName,
  groupName,
  isNewAligned,
}: Props) => {
  const { alignPlanGroupStatementToRubricHeading } = useAlignPlanGroupStatementToRubricHeading();
  const { headingId } = useAlignToPlan();
  const { initialValues } = useFormikContext<StatementValues>();
  const [statementIdsField, , helpers] = useField('statementIds');
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  const { id, name } = statement;

  const handleArchivePlanGroupStatement = async () => {
    const filteredIds = statementIdsField.value.filter((value: string) => value !== id);

    if (initialValues.statementIds.includes(id)) {
      await alignPlanGroupStatementToRubricHeading(filteredIds, headingId);
    }

    helpers.setValue(filteredIds);

    callToast('success', t('components.rubric.alignPlans.archivedAlignment'));
  };

  return (
    <div className='border-neutral-300 border-b'>
      <div className='flex gap-base p-sm'>
        <div className='flex flex-col flex-grow'>
          {isNewAligned && (
            <Kicker className='!mb-xxs !text-secondary-500'>
              {t('components.rubric.alignPlans.newAlignment')}
            </Kicker>
          )}
          <div className='flex gap-xxs items-center pb-xxs leading-lg'>
            <span className='text-xxs text-neutral-700 font-regular tracking-normal'>
              {planName}
            </span>
            <IconContainer Icon={ChevronRight} paddingSize='none' size='sm' />
            <span className='text-xxs text-neutral-700 font-regular tracking-normal'>
              {groupName}
            </span>
          </div>
          <h6 className='m-0 text-neutral-800 text-xs font-bold leading-base'>{name}</h6>
        </div>
        <div className='flex items-start justify-center gap-xs'>
          <Tooltip message={t('components.rubric.alignPlans.rubricRow')}>
            <IconContainer
              Icon={TableIcon}
              className='text-primary-500 bg-primary-200 rounded-sm'
              paddingSize='xxs'
              size={isFullHD ? 'base' : 'sm'}
            />
          </Tooltip>
          <Tooltip message={t('components.rubric.alignPlans.archiveTooltip')}>
            <IconButton
              Icon={ArchiveIcon}
              size={isFullHD ? 'md' : 'sm'}
              variant='danger'
              onClick={handleArchivePlanGroupStatement}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
