import { isArray, isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { cx } from '@shared/utils/cx';
import { formatDateTime } from '@shared/utils/date';
import { EVIDENCE_KIND } from '@shared/resources/enums';
import { getEvidenceAttributes } from '@shared/components/PortfolioPlans/Evidence/helpers';
import { EvidenceActions } from '@shared/components/PortfolioPlans/Evidence/EvidenceActions';
import { ReactComponent as TeamIcon } from '@shared/svg/projectTeam.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';

import { EvidenceTypeIcon } from '../PortfolioPlans/Evidence/EvidenceTypeIcon';
import { EvidenceServiceIcon } from '../PortfolioPlans/Evidence/EvidenceServiceIcon';

import { TEvidenceListItem } from './types';

const commonMarkerClassName =
  'relative after:absolute pe-x xxxl:pe-[20px] after:bg-neutral-300 after:h-xxs after:w-xxs after:rounded-full after:right-xxs xxxl:after:right-xs';

const typeLabelClassName = cx(commonMarkerClassName, 'after:top-xs');

const scoreLabelClassName = cx(
  commonMarkerClassName,
  'flex items-center after:top-[11px]',
  'last-of-type:after:invisible last-of-type:pe-0'
);

const scoreLabel = cx(
  'bg-success-100 !text-success-500 py-xxs px-xs rounded-full me-xxs',
  'group-hover/evidence-item:bg-white transition-colors text-xxs'
);

type Props = TEvidenceListItem & { interactive?: boolean };

export const EvidencesListItem = (props: Props) => {
  const { t } = useTranslation();

  const {
    type,
    service,
    contextType,
    label,
    updatedAt,
    rubricScores,
    isTeamSubmission,
    onDelete,
    onNavigate,
    interactive = true,
  } = props;

  const hasRubricScores = !isEmpty(rubricScores) && isArray(rubricScores);

  const {
    Icon,
    tooltipMessage,
    label: evidenceLabel,
    iconClassname,
  } = getEvidenceAttributes(type, contextType);

  const evidenceDate = updatedAt.toString();

  return (
    <div className='flex justify-between'>
      <div className='flex gap-xs items-start'>
        <EvidenceServiceIcon
          service={type === EVIDENCE_KIND.PORTFOLIO_PROJECT ? 'PERSONAL' : service}
        />
        <div className='leading-lg text-xxs font-medium'>
          <div className='text-primary-500 flex gap-xxs items-center'>
            {isTeamSubmission && (
              <Tooltip delayDuration={300} message={t('components.evidence.teamEvidence')}>
                <IconContainer
                  Icon={TeamIcon}
                  className='rounded-full bg-primary-200'
                  paddingSize='xxs'
                  size='sm'
                />
              </Tooltip>
            )}
            {label}
          </div>
          <div className='text-neutral-800 flex relative'>
            <div className={typeLabelClassName}>{evidenceLabel}</div>
            <Tooltip delayDuration={300} message={formatDateTime(evidenceDate, { withTime: true })}>
              <span className='text-neutral-600'>{formatDateTime(evidenceDate)}</span>
            </Tooltip>
          </div>
          {hasRubricScores && (
            <div className='flex'>
              {rubricScores.map(({ currentScore, maxScore, label }, index) => (
                <div key={`${label}-${index}`} className={scoreLabelClassName}>
                  <div className={scoreLabel}>{`${currentScore}/${maxScore}`}</div>
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='flex gap-xs'>
        <EvidenceTypeIcon
          Icon={Icon}
          iconClassname={iconClassname}
          tooltipMessage={tooltipMessage}
        />
        {interactive && (
          <EvidenceActions evidence={props} onDelete={onDelete} onNavigate={onNavigate} />
        )}
      </div>
    </div>
  );
};
