import Image from '@shared/components/Image/Image';

type Props = {
  url?: string;
  customClassName: string;
};
export const BrandedItem = ({ url, customClassName }: Props) => (
  <>
    <Image className={customClassName} src={url} />
    <div className='border-b-2 border-neutral-200 w-full' />
  </>
);
