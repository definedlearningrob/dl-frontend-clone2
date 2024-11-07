import { ReactNode, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';

import { TProductSubmissionGrade } from '@pbl/components/Project/types';
import { createSubmissionPointsSummary } from '@pbl/components/Student/Project/Products/utils/createSubmissionPointsSummary';

import StatusBadge from '@shared/components/StatusBadge/StatusBadge';
import SharedModal from '@shared/components/Modal/Modal';

import './RubricsModal.sass';

import Rubric from './Rubric/Rubric';
import { TRubric } from './types';

type Props = {
  productName: string;
  grade?: TProductSubmissionGrade;
  rubrics: TRubric[];
  isOpen: boolean;
  onClose: () => void;
  renderActions?: (currentRubric: TRubric) => ReactNode;
};

export const RubricsModal = (props: Props) => {
  const { grade, productName, rubrics, isOpen, onClose, renderActions } = props;
  const { t } = useTranslation();

  // TODO: uncomment when we start supporting multiple rubrics

  // const tabs = useMemo(
  //   () => rubrics.map((rubric) => ({ label: rubric.displayName || rubric.name, id: rubric.id })),
  //   [rubrics]
  // );

  const printRef = useRef<HTMLDivElement>(null);
  const onPrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <SharedModal
      ref={printRef}
      className='rubrics-modal'
      isOpen={isOpen}
      variant='ultra-wide'
      onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('components.rubricsModal.header', { name: productName })}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className='rubrics-modal__body'>
        {/* <SharedTabs tabs={tabs}>
          {tabs.length > 1 && <SharedTabs.Tabs className='rubrics-modal__tabs' />} */}
        <Rubric grade={grade} renderActions={renderActions} rubrics={rubrics} onPrint={onPrint} />
        {/* </SharedTabs> */}
      </SharedModal.Body>
      <SharedModal.Footer align={grade ? 'space-between' : 'right'}>
        {grade && (
          <StatusBadge
            className='rubrics-modal__status-badge'
            label='SCORE'
            status={createSubmissionPointsSummary(grade.pointsAvailable, grade.pointsScored)}
          />
        )}
        <SharedModal.Button
          className='user-project__modal-button'
          variant='primary'
          onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
