import { t } from 'i18next';
import { match } from 'ts-pattern';

import { EVIDENCE_CONTEXT_KIND, EVIDENCE_KIND } from '@shared/resources/enums';
import { ReactComponent as TableIcon } from '@shared/svg/table.svg';
import { ReactComponent as LaptopIcon } from '@shared/svg/laptop.svg';
import { ReactComponent as MatchIcon } from '@shared/svg/match.svg';
import { ReactComponent as CheckmarkIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import { ReactComponent as StudentIcon } from '@shared/svg/student.svg';

export const getEvidenceAttributes = (
  type: EVIDENCE_KIND,
  contextType: EVIDENCE_CONTEXT_KIND | null
) =>
  match({ type, contextType })
    .with(
      {
        type: EVIDENCE_KIND.RUBRIC_GRADE,
      },
      () => ({
        Icon: TableIcon,
        iconClassname: 'bg-primary-200 text-primary-500',
        label: t('components.evidence.kind.rubricRow'),
        tooltipMessage: t('components.evidence.kind.rubricRow'),
      })
    )
    .with(
      {
        type: EVIDENCE_KIND.ASSIGNMENT_SUBMISSION,
        contextType: EVIDENCE_CONTEXT_KIND.VIRTUAL_INTERNSHIP,
      },
      () => ({
        Icon: LaptopIcon,
        iconClassname: 'bg-primary-200 text-primary-500',
        label: t('components.evidence.kind.virtualInternship'),
        tooltipMessage: t('components.evidence.kind.virtualInternship'),
      })
    )
    .with(
      {
        type: EVIDENCE_KIND.PRODUCT_SUBMISSION,
      },
      () => ({
        Icon: CheckmarkIcon,
        iconClassname: 'bg-success-100 text-success-500',
        label: t('components.evidence.kind.product'),
        tooltipMessage: t('components.evidence.kind.product'),
      })
    )
    .with(
      {
        type: EVIDENCE_KIND.ASSIGNMENT_SUBMISSION,
      },
      () => ({
        Icon: CheckmarkIcon,
        iconClassname: 'bg-success-100 text-success-500',
        label: t('components.evidence.kind.product'),
        tooltipMessage: t('components.evidence.kind.product'),
      })
    )
    .with(
      {
        type: EVIDENCE_KIND.PORTFOLIO_PROJECT,
      },
      () => ({
        Icon: StudentIcon,
        iconClassname: 'bg-primary-200 text-primary-500',
        label: t('components.evidence.kind.personalProject'),
        tooltipMessage: t('components.evidence.kind.personalProject'),
      })
    )
    .with(
      {
        type: EVIDENCE_KIND.OPPORTUNITY_APPLICATION,
      },
      () => ({
        Icon: MatchIcon,
        iconClassname: 'bg-primary-200 text-primary-500',
        label: t('components.evidence.kind.opportunity'),
        tooltipMessage: t('components.evidence.kind.opportunity'),
      })
    )
    .otherwise(() => ({
      Icon: CheckmarkIcon,
      iconClassname: 'bg-success-100 text-success-500',
      label: '',
      tooltipMessage: '',
    }));
