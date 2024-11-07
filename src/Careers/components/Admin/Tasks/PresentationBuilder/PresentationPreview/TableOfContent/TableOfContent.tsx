import cx from 'classnames';
import { RevealContext } from '@gregcello/revealjs-react';
import React, { useContext, useEffect, useRef, useState } from 'react';

import type {
  TTaskPresentation,
  TTaskPresentationSlide,
} from '@dc/graphql/user/queries/taskPresentation';
import { getFlattenedSlides } from '@dc/utils/getFlattenedSlides';
import { setSlideIndex } from '@dc/utils/setSlideIndex';
import { withoutHtmlTag } from '@dc/utils/withoutHtmlTag';
import { ReactComponent as IconColor } from '@dc/assets/icons/icon_color.svg';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

import PresentationPortal from '../../PresentationPortal';

import styles from './TableOfContent.module.sass';

type TPresentationState = {
  taskId: string | null;
  librarySlideId: string | null;
  sharedSlideVisited: boolean;
  isOnSharedSlide: boolean;
  isPresentationSaving: boolean;
  showPresentationSettings: boolean;
  fullscreenMode: boolean;
};

type Props = {
  presentation: TTaskPresentation;
  presentationState: TPresentationState;
  wrapperRef?: React.RefObject<HTMLDivElement>;
};

function AdminTasksPresentationBuilderPresentationPreviewTableOfContent({
  presentation,
  presentationState,
}: Props) {
  const tocRef = useRef<HTMLDivElement | null>(null);
  const revealContext = useContext(RevealContext);
  const [showTableOfContent, setShowTableOfContent] = useState<boolean>(false);
  const flattenedSlides: TTaskPresentationSlide[] = getFlattenedSlides(presentation.slides);
  const tocWrapperClasses = cx([styles.tableOfContentWrapper], {
    [styles.tableOfContentFullScreenMode]: presentationState.fullscreenMode,
  });
  const iconClasses = cx([styles.toggleTableOfContentIcon], {
    [styles.fillColorBackground]: showTableOfContent,
  });
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideTableOfContent);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideTableOfContent);
    };
  }, []);

  const handleClickOutsideTableOfContent = (event: any) => {
    const { target } = event;

    if (tocRef.current && !tocRef.current.contains(target)) {
      setShowTableOfContent(false);

      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }
  };

  const toggleTableOfContent = () => setShowTableOfContent(!showTableOfContent);

  const handleSlideSelect = (slideId: string) => {
    const selectedSlideIndex = flattenedSlides.findIndex(
      (slide) => parseInt(slide.id) === parseInt(slideId)
    );

    revealContext.reveal?.slide(selectedSlideIndex);
  };

  const setValidSlideName = (slide: TTaskPresentationSlide) => {
    const defaultSlideName = 'Slide name';
    const slideContentTextWithValue = slide.content.texts[0].value;
    const validSlideName =
      slide.name === defaultSlideName ? withoutHtmlTag(slideContentTextWithValue) : slide.name;

    return validSlideName;
  };

  const renderTableOfContent = () => (
    <ul className={styles.tableOfContentList}>
      {presentation.slides.map((slide, slideIndex) => (
        <li key={slide.id} className={styles.tableOfContentSlide}>
          <span className={styles.slideIndex}>{setSlideIndex(-1, slideIndex)}</span>
          <span onClick={() => handleSlideSelect(slide.id)}>{setValidSlideName(slide)}</span>
          {slide.subslides.length ? (
            <ul>
              {slide.subslides.map((subslide, subslideIndex) => (
                <li key={subslide.id} className={styles.tableOfContentSubslide}>
                  <span className={styles.slideIndex}>
                    {setSlideIndex(subslideIndex, slideIndex)}
                  </span>
                  <span onClick={() => handleSlideSelect(subslide.id)}>
                    {setValidSlideName(subslide)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );

  return (
    <PresentationPortal id='presentation-table-of-content'>
      <div ref={tocRef} className={tocWrapperClasses}>
        <DeprecatedIconButton
          className={iconClasses}
          data-testid='toggle-full-screen-button'
          icon={<IconColor />}
          iconSize='xs'
          size='sm'
          onClick={toggleTableOfContent}
        />
        {showTableOfContent && renderTableOfContent()}
      </div>
    </PresentationPortal>
  );
}

export default AdminTasksPresentationBuilderPresentationPreviewTableOfContent;
