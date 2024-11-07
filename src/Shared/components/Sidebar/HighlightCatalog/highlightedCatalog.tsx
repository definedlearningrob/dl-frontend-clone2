import { ReactNode } from 'react';

import { Tooltip } from '@shared/components/Tooltip';
import { SidebarNavItem } from '@shared/components/Sidebar/NavItem/NavItem';

type Props = {
  catalog: {
    id: string;
    icon: ReactNode;
    path: string;
    text: string;
  };
};
export const HighlightedCatalog = ({ catalog }: Props) => {
  const highlightedCatalogsLength = 17;
  const baseTooltipOffset = 6;

  return catalog?.text.length > highlightedCatalogsLength ? (
    <Tooltip
      delayDuration={500}
      message={catalog.text}
      side='right'
      sideOffset={baseTooltipOffset + 12}>
      <SidebarNavItem {...catalog} />
    </Tooltip>
  ) : (
    <SidebarNavItem {...catalog} />
  );
};
