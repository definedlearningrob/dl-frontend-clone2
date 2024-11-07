import { isEmpty } from 'lodash-es';

import { ReactComponent as PathwayIcon } from '@dc/svg/pathway.svg';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  pathways: (string | undefined)[];
  name: string;
};

export const PartnerPathwayAndName = ({ pathways, name }: Props) => (
  <div className='flex gap-xs items-center'>
    <div className='flex gap-xxs flex-col min-w-0 max-w-[260px]'>
      {!isEmpty(pathways) && (
        <div className='text-neutral-700 flex items-start gap-xxs leading-lg w-full'>
          <IconContainer Icon={PathwayIcon} className='self-start' paddingSize='none' size='sm' />
          <span className='inline-block truncate'>{pathways.join(', ')}</span>
        </div>
      )}
      <h6 className='mb-0 text-neutral-800 font-bold text-xs xxxl:text-sm inline-block truncate'>
        {name}
      </h6>
    </div>
  </div>
);
