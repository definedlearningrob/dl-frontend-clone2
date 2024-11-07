import { useMutation } from '@apollo/client';

import {
  defaultCheckinGroupSlideData,
  defaultCheckinSlideData,
  defaultProductSlideData,
} from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/Modal/defaultTemplates';
import AdminTasksPresentationBuilderSlidesListElementSlide from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/SlidesListElement/Slide/SlidesListElementSlide';
import createSlideMutation from '@dc/graphql/user/mutations/createSlide';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import themeSettings from '@shared/components/Presentations/Themes/Themes';

type Props = {
  closeModal: () => void;
};

export const QuickProjectsTab = ({ closeModal }: Props) => {
  const [createSlide] = useMutation(createSlideMutation);
  const { currentPresentation, setCurrentSlide } = usePresentationBuilder();

  const isPresentationScope = !!currentPresentation.id;

  const handleAddNewSlide = async (slideTemplate: any) => {
    try {
      const newStep = ++currentPresentation.slides.slice().length;
      const bgImage =
        // @ts-ignore
        isPresentationScope && themeSettings.backgrounds[currentPresentation?.typography];

      const { data } = await createSlide({
        variables: {
          input: {
            backgroundColor: slideTemplate.backgroundColor,
            backgroundImage: bgImage || null,
            description: slideTemplate.description,
            name: slideTemplate.name,
            isShared: !isPresentationScope,
            presentation: isPresentationScope
              ? { id: currentPresentation.id, step: newStep }
              : null,
            template: slideTemplate.template,
            textItems: slideTemplate.content.texts,
            links: slideTemplate.content.links,
          },
        },
        update: (
          cache,
          {
            data: {
              createSlide: { slide },
            },
          }
        ) => {
          if (isPresentationScope) {
            cache.modify({
              id: cache.identify(currentPresentation),
              fields: {
                slides(existing = []) {
                  return [...existing, slide];
                },
              },
            });
          } else {
            cache.modify({
              fields: {
                slides(existing = {}) {
                  return { ...existing, nodes: [...existing.nodes, slide] };
                },
              },
            });
          }
        },
      });

      setCurrentSlide({ ...data.createSlide.slide, subSlideSelected: false });
      closeModal();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const slides = [defaultProductSlideData, defaultCheckinSlideData, defaultCheckinGroupSlideData];

  return (
    <ul className='new-slide-content'>
      {slides.map((slide) => (
        <li
          key={slide.template}
          className='new-slide-content_element'
          onClick={() => handleAddNewSlide(slide)}>
          <AdminTasksPresentationBuilderSlidesListElementSlide
            // @ts-ignore
            slide={slide}
            style={{
              backgroundColor: slide?.backgroundColor,
            }}
          />
        </li>
      ))}
    </ul>
  );
};
