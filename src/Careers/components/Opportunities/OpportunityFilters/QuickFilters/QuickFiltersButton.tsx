import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import SharedButton from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import styles from './QuickFilters.module.sass';

type Props = {
  isExpanded: boolean;
  onClick: () => void;
  indicator?: number;
};

export const QuickFiltersButton = ({ isExpanded, onClick, indicator }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const indicatorClasses = cx(
    styles.tagsCount,
    'flex justify-center items-center rounded-s text-xxs font-medium leading-lg px-xs py-xxxs',
    {
      'text-font-primary bg-white': isExpanded,
      'text-white bg-primary-500': !isExpanded,
    }
  );

  const hasIndicator = Boolean(indicator);

  return (
    <SharedButton
      Icon={isExpanded ? ChevronUpIcon : ChevronDownIcon}
      aria-label={t('opportunities.tags')}
      className={cx('!p-xs', { '!py-xxs xxxl:!py-xs': hasIndicator })}
      iconPlacement='end'
      size={isFullHD ? 'md' : 'sm'}
      variant={isExpanded ? 'primary' : 'primary-outlined'}
      onClick={onClick}>
      {t('opportunities.tags')}
      {hasIndicator && <span className={indicatorClasses}>{indicator}</span>}
    </SharedButton>
  );
};
