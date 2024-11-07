import { FC, SVGProps } from 'react';

import { Badge, BadgeType } from '@shared/components/Badge/Badge';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { cx } from '@shared/utils/cx';

type Props = {
  variant: BadgeType;
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  size?: 'small' | 'base' | 'big';
  badgeClassName?: string;
};

export const StatementStatusBadge = ({ variant, Icon, label, size, badgeClassName }: Props) => (
  <Badge
    className={cx('inline-flex items-center gap-xxs', badgeClassName)}
    size={size}
    type={variant}>
    <IconContainer Icon={Icon} paddingSize='none' size='sm' />
    {label}
  </Badge>
);
