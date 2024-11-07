import { useTranslation } from 'react-i18next';
import { SVGProps } from 'react';
import { FC } from 'react';

import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';
import { ReactComponent as NotMetIcon } from '@shared/svg/clear_circle_outlined.svg';
import { ReactComponent as CompletedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import { ReactComponent as InProgressIcon } from '@shared/svg/in_progress.svg';
import { ReactComponent as NotStartedIcon } from '@shared/svg/not_started.svg';

export type TPlanStatusOption = {
  status?: EVALUATION_RESULTS_VALUES;
  variant: 'neutral' | 'secondary' | 'success' | 'danger';
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
};

export const usePlanStatusOptions = () => {
  const { t } = useTranslation();

  const options = [
    {
      status: EVALUATION_RESULTS_VALUES.NOT_STARTED,
      variant: 'neutral' as const,
      label: t('common.statuses.notStarted'),
      Icon: NotStartedIcon,
    },
    {
      status: EVALUATION_RESULTS_VALUES.IN_PROGRESS,
      variant: 'secondary' as const,
      label: t('common.statuses.inProgress'),
      Icon: InProgressIcon,
    },
    {
      status: EVALUATION_RESULTS_VALUES.COMPLETED,
      variant: 'success' as const,
      label: t('common.statuses.completed'),
      Icon: CompletedIcon,
    },
    {
      status: EVALUATION_RESULTS_VALUES.NOT_MET,
      variant: 'danger' as const,
      label: t('common.statuses.notMet'),
      Icon: NotMetIcon,
    },
  ];

  const getOption = (status: EVALUATION_RESULTS_VALUES) =>
    options.find((option) => option.status === status);

  return { options, getOption };
};
