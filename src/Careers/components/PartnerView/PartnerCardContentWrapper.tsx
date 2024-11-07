import { ForwardedRef, forwardRef, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  header: ReactNode;
};

export const PartnerCardContentWrapper = forwardRef(
  ({ children, header }: Props, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref} className='bg-white rounded-sm max-h-full flex flex-col min-h-0 grow'>
      <div className='px-base py-sm'>
        <h2 className='text-base xxxl:text-lg mb-0'>{header}</h2>
      </div>
      <div className='w-full border border-neutral-300 h-[1px] rounded-full' />
      <div className='h-full overflow-auto scrollbar'>{children}</div>
    </div>
  )
);
