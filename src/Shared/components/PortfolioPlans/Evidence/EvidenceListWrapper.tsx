import { useState, MouseEvent } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { isEmpty } from 'lodash-es';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Plus } from '@shared/svg/add.svg';
import { EvidencesListItem } from '@shared/components/EvidenceListItem/EvidencesListItem';
import { TEvidence } from '@shared/resources/types';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { EVIDENCE_KIND } from '@shared/resources/enums';
import { ManualAddedEvidenceRecord } from '@shared/components/PortfolioPlans/Evidence/types';
import { useDeleteEvidence } from '@shared/graphql/shared/hooks/useDeleteEvidence';
import { callToast } from '@shared/components/Toaster/Toaster';
import { handleError } from '@shared/utils/handleError';
import { ConfirmationModal } from '@shared/components/ConfirmationModal/ConfirmationModal';

import { AddEvidenceModal } from './AddEvidenceModal/AddEvidenceModal';

type Props = {
  evidence: TEvidence[];
  statementId: string;
};

export const EvidenceListWrapper = ({ evidence, statementId }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const [isEvidenceModalOpen, toggleIsEvidenceModalOpen] = useToggle(false);

  const [evidenceToRemove, setEvidenceToRemove] = useState<TEvidence | null>(null);

  const hasEvidenceToRemove = !isEmpty(evidenceToRemove);

  const [deleteEvidence, { loading }] = useDeleteEvidence();

  const handleSuccess = () => {
    if (!hasEvidenceToRemove) return;

    callToast(
      'success',
      t('components.evidence.itemDeletedSuccessfully'),
      <Trans
        i18nKey='components.evidence.itemDeletedSuccessfullyInfo'
        values={{
          evidenceName: evidenceToRemove.label,
        }}>
        <span className='font-medium' />
      </Trans>
    );
  };

  const handleRemoveEvidence = async () => {
    if (!hasEvidenceToRemove || evidenceToRemove.id === null) return;

    await deleteEvidence({
      id: evidenceToRemove.id,
      onCompleted: handleSuccess,
      onError: handleError,
    });

    setEvidenceToRemove(null);
  };

  const alreadyAddedEvidences = evidence.reduce((acc, curr) => {
    if (curr.type !== EVIDENCE_KIND.RUBRIC_GRADE) {
      return [
        ...acc,
        {
          itemType: curr.type,
          itemId: curr.itemId,
        },
      ];
    }

    return acc;
  }, [] as ManualAddedEvidenceRecord[]);

  const history = useHistory();

  const handleNavigateToItem = (evidence: TEvidence, event: MouseEvent) => {
    sessionStorage.setItem('scrollPosition', window.pageYOffset.toString());
    const portBtn = event.target as HTMLElement;
    const tab =
      evidence.service === 'LEARNING'
        ? evidence.type === 'PORTFOLIO_PROJECT'
          ? 'PERSONAL'
          : 'PBL'
        : 'CAREERS';

    const statementId = portBtn.closest('.plan-statement')?.getAttribute('data-id');
    const groupId = portBtn.closest('.plan-group')?.getAttribute('data-id');

    history.push(
      `portfolio?focusTab=${tab}&tabId=${tab}&evidence=${evidence.itemId}&groupId=${groupId}&statementId=${statementId}`
    );
  };

  return (
    <div className='border border-neutral-300 rounded-xs'>
      <div className='bg-neutral-200 p-x xxxl:p-sm text-xs xxxl:text-sm font-medium leading-lg border-b border-neutral-300'>
        {t('components.evidence.evidence')}{' '}
        <span className='text-neutral-600'>({evidence.length})</span>
      </div>
      <div className='py-xxs xxxl:py-xs'>
        <button
          aria-label={t('components.evidence.newEvidence')}
          className='p-x group/add-item hover:bg-primary-200 cursor-pointer text-start w-full'
          onClick={toggleIsEvidenceModalOpen}>
          <div className='flex gap-xs'>
            <div>
              {isFullHD ? (
                <div className='h-md flex justify-center items-center rounded-sm text-xs font-medium leading-lg w-[80px] border border-primary-500 text-primary-500 group-hover/evidence-item:bg-white group-hover/add-item:bg-white'>
                  {t('common.actions.add')}
                </div>
              ) : (
                <IconContainer
                  Icon={Plus}
                  className='border border-primary-500 rounded-sm text-primary-500 group-hover/add-item:bg-white'
                  paddingSize='xxs'
                  size='base'
                />
              )}
            </div>
            <div className='leading-lg text-xxs font-medium'>
              <div className='text-primary-500'>{t('components.evidence.newEvidence')}</div>
              <div className='text-neutral-800'>
                {t('components.evidence.addNewEvidenceDescription')}
              </div>
            </div>
          </div>
        </button>
        <ul>
          {evidence.map((evidenceItem, index) => (
            <li
              key={`${evidenceItem.label}-${index}`}
              aria-label={evidenceItem.label}
              className='p-x group/evidence-item hover:bg-primary-200'>
              <EvidencesListItem
                {...evidenceItem}
                onDelete={setEvidenceToRemove}
                onNavigate={handleNavigateToItem}
              />
            </li>
          ))}
        </ul>
      </div>
      {isEvidenceModalOpen && (
        <AddEvidenceModal
          alreadyAddedEvidence={alreadyAddedEvidences}
          statementId={statementId}
          onClose={toggleIsEvidenceModalOpen}
        />
      )}
      {hasEvidenceToRemove && (
        <ConfirmationModal
          isLoading={loading}
          isOpen={true}
          title={t('components.evidence.removeEvidenceConfirmationTitle')}
          onClose={() => setEvidenceToRemove(null)}
          onConfirm={handleRemoveEvidence}>
          <Trans
            className='text-font-secondary'
            i18nKey='components.evidence.removeEvidenceConfirmationDescription'
            values={{
              evidenceName: evidenceToRemove.label,
            }}>
            <span className='font-medium text-font-primary' />
          </Trans>
        </ConfirmationModal>
      )}
    </div>
  );
};
