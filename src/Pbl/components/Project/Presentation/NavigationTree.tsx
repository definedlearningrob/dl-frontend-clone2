import { ForwardedRef, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import { getFlattenedSlides } from '@dc/utils/getFlattenedSlides';
import { RevealRef } from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationPreview/PresentationPreviewSlides';

import type { TProject } from '@pbl/graphql/user/queries/project';
import { CheckInProgress } from '@pbl/components/Project/Presentation/CheckInProgress';

import { cx } from '@shared/utils/cx';
import { useRole } from '@shared/hooks/useRole';

type Props = {
  presentation: TProject['presentation'];
};

export const NavigationTree = forwardRef(
  ({ presentation }: Props, ref: ForwardedRef<RevealRef>) => {
    const history = useHistory();
    const { isStudent } = useRole();

    const flattenedSlides: TTaskPresentationSlide[] = getFlattenedSlides(presentation.slides);

    const handleSlideSelect = (slideId: string) => {
      const selectedSlideIndex = flattenedSlides.findIndex(
        (slide) => parseInt(slide.id) === parseInt(slideId)
      );

      history.replace({ ...history.location, hash: `#/${selectedSlideIndex}` });
      if (ref && typeof ref !== 'function' && ref.current) {
        ref?.current.reveal?.slide(selectedSlideIndex);
      }
    };

    return (
      <div className='pe-x text-xs xxxl:text-sm min-h-0'>
        <ol className='list-decimal ps-base xxxl:ps-md [counter-reset:mainSection] min-h-0'>
          {presentation.slides.map((slide, index) => {
            const subSlides = slide.subslides.map((subSlide, subIndex) => (
              <li
                key={subSlide.name + subIndex}
                className={
                  "ps-xxs [counter-increment:section] marker:[content:counters(section,'.')] last-of-type:mb-sm"
                }>
                <a onClick={() => handleSlideSelect(subSlide.id)}>{subSlide.name}</a>
              </li>
            ));

            const shouldRenderProgress =
              isStudent && ['checkInGroup', 'checkInQuestion'].includes(slide.template);

            const hasSubslides = !isEmpty(slide.subslides);

            return (
              <li
                key={slide.name + index}
                className="ps-xxss [counter-increment:section] marker:[content:counters(section,'.').]">
                <div
                  className={cx({
                    ['mb-sm']: !shouldRenderProgress,
                    ['mb-xs']: shouldRenderProgress,
                  })}>
                  <a onClick={() => handleSlideSelect(slide.id)}>{slide.name}</a>
                </div>
                {shouldRenderProgress && <CheckInProgress slide={slide} />}
                {hasSubslides && (
                  <ol
                    className='ps-sm xxxl:ps-[18px] flex flex-col gap-sm [counter-reset:section]'
                    type='A'>
                    {subSlides}
                  </ol>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
);
