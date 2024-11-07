import { GroupBase, MenuProps, components } from 'react-select';

import { cx } from '@shared/utils/cx';

type Props<Option, Group extends GroupBase<Option>> = MenuProps<Option, true, Group> & {
  align?: 'left' | 'right';
};

export const TreeMenu = <Option, Group extends GroupBase<Option>>({
  align = 'left',
  ...rest
}: Props<Option, Group>) => {
  const className = cx('!w-full', {
    'left-0': align === 'left',
    'right-0': align === 'right',
  });

  return <components.Menu {...rest} className={className} />;
};
