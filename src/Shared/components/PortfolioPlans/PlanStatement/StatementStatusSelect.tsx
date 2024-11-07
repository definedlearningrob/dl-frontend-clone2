import { useTranslation } from 'react-i18next';

import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';
import { StatusSelect } from '@shared/components/StatusSelect';
import { cx } from '@shared/utils/cx';
import { usePlanStatusOptions } from '@shared/hooks/usePlanStatusOptions';
import { StatementStatusBadge } from '@shared/components/StatementStatusBadge';

type Props = {
  isExpanded: boolean;
  status: EVALUATION_RESULTS_VALUES | null;
  isReadOnly: boolean;
  onChange: (status: EVALUATION_RESULTS_VALUES) => void;
};

export const StatementStatusSelect = ({ isExpanded, status, isReadOnly, onChange }: Props) => {
  const { t } = useTranslation();
  const { options } = usePlanStatusOptions();

  const badgeOptions = options.map((option) => ({ ...option, badgeType: option.variant }));

  const labelClasses = cx(
    'text-xs xxxl:text-sm font-medium',
    'text-font-secondary group-hover/statement:text-font-primary',
    { 'text-font-primary': isExpanded }
  );

  const currentStatus = status ?? EVALUATION_RESULTS_VALUES.NOT_STARTED;
  const currentOption = badgeOptions.find((option) => option.status === currentStatus);

  return (
    <div className='flex items-center gap-xs hover:border-secondary-500'>
      <span className={labelClasses}>{t('components.planGroup.status')}</span>
      {!isReadOnly && (
        <StatusSelect currentStatus={currentStatus} options={badgeOptions} onChange={onChange} />
      )}
      {isReadOnly && currentOption && <StatementStatusBadge {...currentOption} />}
    </div>
  );
};
