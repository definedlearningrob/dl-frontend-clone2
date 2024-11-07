import { FC, SVGProps } from 'react';

type Props = {
  title: string;
  description: string;
  Image: FC<SVGProps<SVGSVGElement>>;
};

export const EmptyPartnerSection = ({ title, description, Image }: Props) => (
  <div className='h-full px-base flex flex-col gap-base justify-center items-center text-center'>
    <Image className='w-full' />
    <div>
      <h5 className='text-sm xxxl:text-base mb-xs'>{title}</h5>
      <p className='text-sm leading-lg mb-0'>{description}</p>
    </div>
  </div>
);
