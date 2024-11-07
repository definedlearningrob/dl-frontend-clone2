import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';

type Props = {
  slide: TTaskPresentationSlide;
};

export const IFrameFillSlideTemplatePreview = ({ slide }: Props) => (
  <>
    {!slide.iframeUrl && (
      <div className='flex justify-center items-center bg-neutral-200 h-[650px]'>
        <ImagePlaceholder className='h-[200px] w-[300px] text-white' />
      </div>
    )}
    {slide.iframeUrl && (
      <section
        data-background-iframe={slide.iframeUrl}
        data-background-interactive={true}
        data-preload={true}
      />
    )}
  </>
);
