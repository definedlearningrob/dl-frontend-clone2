import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import SharedModal from '@shared/components/Modal/Modal';
import {
  EvidenceRecord,
  ManualAddedEvidenceRecord,
} from '@shared/components/PortfolioPlans/Evidence/types';
import { useCreateEvidence } from '@shared/graphql/shared/hooks/useCreateEvidence';
import { handleError } from '@shared/utils/handleError';

import { AddEvidenceForm } from './AddEvidenceForm';
import { EvidenceCounter } from './EvidenceCounter';

type Props = {
  onClose: () => void;
  statementId: string;
  alreadyAddedEvidence: ManualAddedEvidenceRecord[];
};

type EvidenceFormValues = {
  evidence: EvidenceRecord[];
};

const initialValues = {
  evidence: [],
};

export const AddEvidenceModal = ({ onClose, statementId, alreadyAddedEvidence }: Props) => {
  const { t } = useTranslation();

  const { id: studentUuid } = useParams<{ id?: string }>();

  const [createEvidence, { loading }] = useCreateEvidence({ studentUuid });

  const formRef = useRef<FormikProps<EvidenceFormValues>>(null);

  const handleSubmit = async ({ evidence }: EvidenceFormValues) => {
    const payload = {
      evidences: evidence,
      planGroupStatementId: statementId,
    };

    try {
      await createEvidence(payload);
      onClose();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <SharedModal
      ariaLabel={t('components.rubric.editRubricCriteria')}
      bypassFocusLock={true}
      isOpen={true}
      variant='wide'
      onDismiss={onClose}>
      <Formik initialValues={initialValues} innerRef={formRef} onSubmit={handleSubmit}>
        <>
          <SharedModal.Header>
            <SharedModal.Heading>{t('components.evidence.addNewEvidence')}</SharedModal.Heading>
          </SharedModal.Header>
          <SharedModal.Body className='h-[450px] xxxl:h-[600px] scrollbar'>
            <AddEvidenceForm alreadyAddedEvidence={alreadyAddedEvidence} />
          </SharedModal.Body>
          <SharedModal.Footer>
            <div className='mr-auto'>
              <EvidenceCounter />
            </div>
            <SharedModal.Button
              className='min-w-[120px]'
              variant='primary-outlined'
              onClick={onClose}>
              {t('common.actions.cancel')}
            </SharedModal.Button>
            <SharedModal.Button
              className='min-w-[120px]'
              isLoading={loading}
              type='submit'
              variant='primary'
              onClick={() => {
                formRef.current && formRef.current.submitForm();
              }}>
              {t('components.evidence.addEvidence')}
            </SharedModal.Button>
          </SharedModal.Footer>
        </>
      </Formik>
    </SharedModal>
  );
};
