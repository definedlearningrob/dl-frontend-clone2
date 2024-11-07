import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';

import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as TeamIcon } from '@shared/svg/projectTeam.svg';
import { ReactComponent as LaptopIcon } from '@shared/svg/laptop.svg';
import { ReactComponent as MatchIcon } from '@shared/svg/match.svg';

type Props = {
  isVirtualInternship: boolean;
  isTeamSubmission: boolean;
  isOpportunity: boolean;
};

const TOOLTIP_DELAY_DURATION = 300;

export const EvidenceListItemImageIcon = (props: Props) => {
  const { t } = useTranslation();

  const { Icon, tooltipMessage, dataTestId } = match(props)
    .with({ isTeamSubmission: true }, () => ({
      Icon: TeamIcon,
      tooltipMessage: t('components.evidence.teamEvidence'),
      dataTestId: 'evidence-team-icon',
    }))
    .with({ isVirtualInternship: true }, () => ({
      Icon: LaptopIcon,
      tooltipMessage: t('components.evidence.viEvidence'),
      dataTestId: 'evidence-vi-icon',
    }))
    .with({ isOpportunity: true }, () => ({
      Icon: MatchIcon,
      tooltipMessage: t('components.evidence.opportunityEvidence'),
      dataTestId: 'evidence-opportunity-icon',
    }))
    .otherwise(() => ({ Icon: null, tooltipMessage: '', dataTestId: '' }));

  if (!Icon) return null;

  return (
    <Tooltip delayDuration={TOOLTIP_DELAY_DURATION} message={tooltipMessage}>
      <IconContainer
        Icon={Icon}
        className='bg-primary-200 text-primary-500 rounded-sm'
        data-testid={dataTestId}
        paddingSize='xxs'
        size='sm'
      />
    </Tooltip>
  );
};
