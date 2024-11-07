import { Slide, useReveal, Reveal } from '@gregcello/revealjs-react';
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';

import type {
  TTaskPresentationSlide,
  TTaskPresentation,
} from '@dc/graphql/user/queries/taskPresentation';
import { getFlattenedSlides } from '@dc/utils/getFlattenedSlides';
import { TRootState } from '@dc/redux/reducers';

import useTrackSlideVisitedMutation from '@pbl/graphql/shared/hooks/useTrackSlideVisited';

import useQueryParams from '@shared/hooks/useQueryParams';
import { usePresentationState } from '@shared/hooks/usePresentationState';
import { useDetectApplicationType } from '@shared/hooks/useDetectApplicationType';

import Template from '../Template/Template';

type Props = {
  presentation:
    | TTaskPresentation
    | {
        slides: TTaskPresentationSlide[];
      };
  userPreview?: boolean;
  projectId?: string;
};

const isRevealApi = (revealContext: any): revealContext is Reveal.Api =>
  !!revealContext && typeof revealContext.initialize === 'function';

const handleTrackVisit = (
  slides: TTaskPresentationSlide[],
  index: number,
  trackFn: ReturnType<typeof useTrackSlideVisitedMutation>[0],
  isLoggedIn: boolean,
  projectId?: string,
  code?: string
) => {
  const slideId = slides.at(index)?.id;

  if (slideId) {
    const optionalCode = !isLoggedIn && code && { code };
    trackFn({
      variables: { input: { slideId, ...(projectId && { taskId: projectId }), ...optionalCode } },
    });
  }
};

export type RevealRef = {
  reveal: Reveal.Api | undefined;
};

const PresentationPreviewSlides = forwardRef(
  ({ presentation, projectId }: Props, ref: ForwardedRef<RevealRef>) => {
    const revealContext = useReveal();
    const { isPblApp } = useDetectApplicationType();
    const { presentationState } = usePresentationState();
    const flattenedSlides: TTaskPresentationSlide[] = getFlattenedSlides(presentation.slides);
    const [trackSlideVisited] = useTrackSlideVisitedMutation();
    const {
      params: { code },
    } = useQueryParams<{ code?: string }>();
    const { user } = useSelector((state: TRootState) => state.session);

    // start preview from first slide
    if (presentationState.librarySlideId) {
      revealContext.reveal?.slide(0);
    }

    useEffect(() => {
      if (isPblApp) {
        handleTrackVisit(flattenedSlides, 0, trackSlideVisited, !!user, projectId, code);
      }
    }, [isPblApp]);

    useEffect(() => {
      if (revealContext.reveal && isPblApp) {
        const handleSlideChange = (slides: { indexh: number }) => {
          handleTrackVisit(
            flattenedSlides,
            slides.indexh,
            trackSlideVisited,
            !!user,
            projectId,
            code
          );
        };

        revealContext.reveal.on('slidechanged', handleSlideChange);

        return () => {
          //@ts-ignore This ***** package doesn't even have correct types
          revealContext.reveal?.off('slidechanged', handleSlideChange);
        };
      }
    }, [revealContext, isPblApp]);

    useImperativeHandle(
      ref,
      () => ({
        reveal: isRevealApi(revealContext.reveal) ? revealContext.reveal : undefined,
      }),
      [revealContext]
    );

    return (
      <>
        {flattenedSlides.map((slide) => (
          <Slide
            key={slide.id}
            backgroundColor={slide?.backgroundColor}
            backgroundImage={slide?.backgroundImage}>
            <Template presentation={presentation} role='preview' slide={slide} />
            {/* eslint-disable-next-line react/no-danger */}
            <aside dangerouslySetInnerHTML={{ __html: slide.notes }} />
          </Slide>
        ))}
      </>
    );
  }
);

export default PresentationPreviewSlides;
