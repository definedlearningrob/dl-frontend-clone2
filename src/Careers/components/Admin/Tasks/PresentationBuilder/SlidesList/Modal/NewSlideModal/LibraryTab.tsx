import { useQuery } from '@apollo/client';

import AdminTasksPresentationBuilderSlidesListELementSlide from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/SlidesListElement/Slide/SlidesListElementSlide';
import SLIDES from '@dc/graphql/user/queries/slides';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import { cx } from '@shared/utils/cx';

type Props = {
  usedSlideIds: string[];
  closeModal: () => void;
};

export const LibraryTab = ({ usedSlideIds, closeModal }: Props) => {
  const { setCurrentSlide, handleAddSlide } = usePresentationBuilder();
  const { data } = useQuery(SLIDES, { fetchPolicy: 'network-only' });

  if (!data) return null;

  const getElementClasses = (slide: TTaskPresentationSlide) =>
    cx('new-slide-content_element', {
      '-disabled': usedSlideIds.includes(slide.id),
    });

  const handleAddLibrarySlide = async (slide: TTaskPresentationSlide) => {
    await handleAddSlide(slide);

    setCurrentSlide({ ...slide, subSlideSelected: false });

    closeModal();
  };

  return (
    <ul className='new-slide-content'>
      {data.slides.nodes.map((slide: TTaskPresentationSlide) => (
        <li
          key={slide.id}
          className={getElementClasses(slide)}
          onClick={usedSlideIds.includes(slide.id) ? () => {} : () => handleAddLibrarySlide(slide)}>
          <AdminTasksPresentationBuilderSlidesListELementSlide
            closeModal={closeModal}
            disabled={usedSlideIds.includes(slide.id)}
            // @ts-ignore
            presentation={undefined}
            slide={slide}
            style={{
              backgroundColor: slide.backgroundColor!,
              backgroundImage: slide.backgroundImage!,
            }}
          />
        </li>
      ))}
    </ul>
  );
};
