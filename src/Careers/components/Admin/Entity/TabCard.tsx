import { FC, ForwardedRef, forwardRef, ReactNode, SVGProps } from 'react';

import Card from '@shared/components/Card/Card';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  children: ReactNode;
  onAdditional?: () => void;
  hasAdditionalActions?: boolean;
  actions?: ReactNode;
};

export const TabCard = forwardRef(
  ({ icon, title, description, children, actions }: Props, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref}>
      <Card>
        <div className='mb-md'>
          <div className='flex gap-sm items-center'>
            <IconContainer Icon={icon} className='bg-neutral-200 rounded-xs !text-neutral-800' />
            <h5 className='mb-0 text-neutral-800 text-sm xxxl:text-base'>{title}</h5>
          </div>
          <div className='pl-md flex justify-between'>
            <span className='pl-base mb-0 font-regular text-neutral-700 text-xs xxxl:text-sm'>
              {description}
            </span>
            <div className='flex gap-xs'>{actions}</div>
          </div>
        </div>
        {children}
      </Card>
    </div>
  )
);
