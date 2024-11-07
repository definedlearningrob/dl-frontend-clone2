import { SortDirection } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ArrowUpIcon } from '@shared/svg/arrow_upward.svg';
import { ReactComponent as ArrowDownIcon } from '@shared/svg/arrow_downward.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  sortingDirection: SortDirection | false;
};

export const SortIcon = ({ sortingDirection }: Props) => {
  const { t } = useTranslation();

  if (!sortingDirection) {
    return null;
  }

  const Icon = sortingDirection === 'asc' ? ArrowUpIcon : ArrowDownIcon;
  const tooltipMessage =
    sortingDirection === 'asc'
      ? t('components.table.sortingAsc')
      : t('components.table.sortingDesc');

  return (
    <Tooltip message={tooltipMessage}>
      <IconContainer Icon={Icon} className='text-primary-500' paddingSize='none' size='sm' />
    </Tooltip>
  );
};
