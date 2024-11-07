import { TTag } from '@dc/graphql/user/queries/tag';

import { ReactComponent as TagIcon } from '@shared/svg/tag_icon.svg';
import { Badge } from '@shared/components/Badge/Badge';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  tags: TTag[];
};

export const TagsCell = ({ tags }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const badgeSize = isFullHD ? 'base' : 'small';

  return (
    <div className='flex flex-col gap-xxs xxxl:gap-xs'>
      {tags.map((item) => (
        <Badge key={item.id} Icon={TagIcon} className='self-start' size={badgeSize} type='neutral'>
          {item.name}
        </Badge>
      ))}
    </div>
  );
};
