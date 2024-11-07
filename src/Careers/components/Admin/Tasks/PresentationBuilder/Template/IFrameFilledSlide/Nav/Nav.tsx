import { isEmpty } from 'lodash-es';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';
import { cleanInjection } from '@shared/utils/cleanInjection';

type Props = {
  slide: TTaskPresentationSlide;
};

export const IFrameFillSlideTemplateNav = ({ slide }: Props) => {
  const hasText = !isEmpty(slide.content.texts);

  return (
    <>
      {!slide.iframeUrl && (
        <>
          <div className='mx-auto w-3/4 h-[450px] flex justify-center items-center bg-neutral-200 relative'>
            {hasText && (
              <div
                //eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={cleanInjection(slide.content?.texts[0]?.value)}
                className='absolute'
              />
            )}
            <ImagePlaceholder className='w-[300px] h-[300px] text-white flex justify-center' />
          </div>
        </>
      )}
      {slide.iframeUrl && (
        <div className='pg-base -m-2lg'>
          <iframe className='pointer-events-none' height={580} src={slide.iframeUrl} width={1600} />
        </div>
      )}
    </>
  );
};
