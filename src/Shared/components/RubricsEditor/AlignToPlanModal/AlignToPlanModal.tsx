import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';

import { usePlansWithAlignmentStatement } from '@dc/graphql/user/hooks/usePlansWithAlignmentStatement';

import SharedModal from '@shared/components/Modal/Modal';
import { useRubricEditor } from '@shared/components/RubricsEditor/RubricsEditorProvider';
import { RubricHeading } from '@shared/components/RubricsEditor/utils/types';
import { useAlignPlanGroupStatementToRubricHeading } from '@shared/graphql/user/hooks/useAlignPlanGroupStatementToRubricHeading';
import { useAlignToPlan } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToPlanProvider';
import { AlignedPlansSummary } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignedPlansSummary';
import { AlignToFormMiddleStep } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToFormMiddleStep';
import { Tooltip } from '@shared/components/Tooltip';
import { callToast } from '@shared/components/Toaster/Toaster';

type Props = {
  onClose: () => void;
};

export type StatementValues = {
  statementIds: string[];
};

export const AlignToPlanModal = ({ onClose }: Props) => {
  const { alignPlanGroupStatementToRubricHeading } = useAlignPlanGroupStatementToRubricHeading();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const { headingId, isDisabledAlignButton } = useAlignToPlan();
  const { rubric } = useRubricEditor();
  const headingContent = rubric.headings.find(
    (heading) => heading.id === headingId
  ) as RubricHeading;

  const { data } = usePlansWithAlignmentStatement({
    rubricHeadingId: headingId,
  });

  if (!data) {
    return null;
  }

  const normalizedStatements = data.plans.nodes.flatMap((plan) => {
    const planName = plan.name;

    return plan.groups.flatMap((group) => {
      const groupName = group.name;

      return group.statements.map((statement) => ({ planName, groupName, statement }));
    });
  });

  const initialValues = {
    statementIds: headingContent.statements.map((statement) => statement.id),
  };

  const handleOnConfirm = async (values: StatementValues) => {
    await alignPlanGroupStatementToRubricHeading(values.statementIds, headingId);
    callToast('success', t('components.rubric.alignPlans.successAlignment'));
    onClose();
  };

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goBack = () => setStep((prev) => prev - 1);

  const goToSecondStep = () => {
    setStep(2);
  };

  const buttonsMap = [
    <SharedModal.Button variant='primary' onClick={onClose}>
      {t('common.actions.close')}
    </SharedModal.Button>,
    <>
      <SharedModal.Button
        data-testid='save-settings-button'
        variant='primary-outlined'
        onClick={goBack}>
        {t('common.actions.back')}
      </SharedModal.Button>
      <Tooltip
        disabled={isDisabledAlignButton}
        message={t('components.rubric.alignPlans.saveTooltip')}>
        <SharedModal.Button
          data-testid='save-settings-button'
          disabled={isDisabledAlignButton}
          type='submit'
          variant='primary'
          onClick={goToNextStep}>
          {t('common.actions.align')}
        </SharedModal.Button>
      </Tooltip>
    </>,
    <SharedModal.Button type='submit' variant='primary'>
      {t('common.actions.confirm')}
    </SharedModal.Button>,
  ];

  const isAdding = step === 2;

  return (
    <SharedModal data-testid='settings-modal' isOpen={true} variant='wide' onDismiss={onClose}>
      <Formik initialValues={initialValues} onSubmit={handleOnConfirm}>
        <Form className='h-full flex flex-col'>
          <SharedModal.Header>
            <div>
              <SharedModal.Heading className='mb-xxs'>
                {isAdding ? t('components.rubric.alignPlans.secondStepTitle') : rubric.name}
              </SharedModal.Heading>
              <p className='text-neutral-800mb-0 font-regular leading-lg text-xs xxxl:text-sm text-neutral-700'>
                {t('components.rubric.alignPlans.headerTitle')}{' '}
                <span className='font-medium'>{headingContent.name}</span>
              </p>
            </div>
          </SharedModal.Header>
          <SharedModal.Body>
            {isAdding ? (
              <AlignToFormMiddleStep />
            ) : (
              <AlignedPlansSummary
                normalizedStatements={normalizedStatements}
                onAction={goToSecondStep}
                onAdd={goToSecondStep}
              />
            )}
          </SharedModal.Body>
          <SharedModal.Footer>{buttonsMap[step - 1]}</SharedModal.Footer>
        </Form>
      </Formik>
    </SharedModal>
  );
};
