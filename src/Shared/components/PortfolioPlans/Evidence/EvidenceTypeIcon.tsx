import { FC, SVGProps } from 'react';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';
import { cx } from '@shared/utils/cx';

type Props = {
  tooltipMessage: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  iconClassname: string;
};

export const EvidenceTypeIcon = ({ Icon, iconClassname, tooltipMessage }: Props) => (
  <Tooltip message={tooltipMessage}>
    <IconContainer
      Icon={Icon}
      className={cx(
        'rounded-sm text-primary-500 group-hover/evidence-item:bg-white',
        iconClassname
      )}
      paddingSize='xxs'
    />
  </Tooltip>
);
