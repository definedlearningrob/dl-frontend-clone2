import { useTranslation } from 'react-i18next';
import { SetStateAction, Dispatch, MouseEvent } from 'react';

import { cx } from '@shared/utils/cx';
import { Tooltip } from '@shared/components/Tooltip';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { ReactComponent as RemoveIcon } from '@shared/svg/delete_outlined.svg';
import { ReactComponent as ArrowRight } from '@shared/svg/arrow_forward.svg';
import { TEvidence } from '@shared/resources/types';
import { EVIDENCE_KIND } from '@shared/resources/enums';

type Props = {
  evidence: TEvidence;
  onDelete: Dispatch<SetStateAction<TEvidence | null>>;
  onNavigate: (evidence: TEvidence, event: MouseEvent) => void;
};

export const EvidenceActions = ({ evidence, onDelete, onNavigate }: Props) => {
  const { t } = useTranslation();
  const isManualAddedEvidence = evidence.type !== EVIDENCE_KIND.RUBRIC_GRADE;
  const iconWrapperClassname = cx('invisible', {
    'group-hover/evidence-item:visible flex': isManualAddedEvidence,
  });

  return (
    <div className={iconWrapperClassname}>
      {isManualAddedEvidence && (
        <>
          <Tooltip delayDuration={300} message={t('components.evidence.removeEvidence')}>
            <IconButton
              Icon={RemoveIcon}
              aria-label={t('components.evidence.removeEvidence')}
              className='group-hover/evidence-item:bg-white'
              size='md'
              variant='danger'
              onClick={() => onDelete(evidence)}
            />
          </Tooltip>
        </>
      )}
      <Tooltip delayDuration={300} message={t('components.evidence.navigateToItem')}>
        <IconButton
          Icon={ArrowRight}
          className='!bg-primary-200'
          size='md'
          variant='white'
          onClick={(event) => {
            onNavigate(evidence, event);
          }}
        />
      </Tooltip>
    </div>
  );
};
