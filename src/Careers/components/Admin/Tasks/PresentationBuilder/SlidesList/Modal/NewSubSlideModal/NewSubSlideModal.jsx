import cx from 'classnames';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';

import AdminTasksPresentationBuilderSlidesListELementSlide from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/SlidesListElement/Slide/SlidesListElementSlide';
import createSlideMutation from '@dc/graphql/user/mutations/createSlide';
import SLIDES from '@dc/graphql/user/queries/slides';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import SharedModal from '@shared/components/Modal/Modal';
import SharedTabs, { TabsContext } from '@shared/components/DeprecatedTabs/DeprecatedTabs';
import themeSettings from '@shared/components/Presentations/Themes/Themes';

import defaultSlides from '../defaultTemplates';

AdminTasksPresentationBuilderSlidesListNewSubSlideModal.propTypes = {
  closeModal: PropTypes.func,
};

function AdminTasksPresentationBuilderSlidesListNewSubSlideModal({ closeModal }) {
  const { t } = useTranslation();
  const { tab } = useContext(TabsContext);
  const [createSlide] = useMutation(createSlideMutation);
  const { data } = useQuery(SLIDES, { skip: tab.id === 'templates', fetchPolicy: 'network-only' });
  const {
    currentPresentation,
    currentSlide,
    handleAddSubSlide,
    newSubSlideModalState,
    setCurrentSlide,
  } = usePresentationBuilder();

  const handleAddNewSlide = async (template) => {
    try {
      const newStep = ++currentPresentation.slides.slice().length;

      const { data } = await createSlide({
        variables: {
          input: {
            backgroundColor: defaultSlides[template].backgroundColor,
            backgroundImage: themeSettings.backgrounds[currentPresentation?.typography] || null,
            description: defaultSlides[template].description,
            name: defaultSlides[template].name,
            slide: { id: newSubSlideModalState.slideId, step: newStep },
            template: defaultSlides[template].template,
            textItems: defaultSlides[template].content.texts,
            links: [
              { text: 'Go to choice', targetId: '', targetName: '', contentId: '1' },
              { text: 'Skip product', targetId: '', targetName: '', contentId: '2' },
            ],
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
          const parentSlide = currentPresentation.slides.find(
            (slide) => slide.id === newSubSlideModalState.slideId
          );
          cache.modify({
            id: cache.identify(parentSlide),
            fields: {
              subslides(existing) {
                return [...existing, slide];
              },
            },
          });
        },
      });

      setCurrentSlide({
        ...data.createSlide.slide,
        subSlideSelected: true,
        parentSlideId: currentSlide.parentSlideId || currentSlide.id,
      });
      closeModal();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleAddLibrarySlide = (slide) => {
    handleAddSubSlide(slide.id);

    setCurrentSlide({
      ...slide,
      subSlideSelected: true,
      parentSlideId: currentSlide.parentSlideId || currentSlide.id,
    });

    closeModal();
  };

  const subSlideTemplates = Object.values(defaultSlides).filter(
    (slide) =>
      ![
        'twoProductChoice',
        'threeProductChoice',
        'fourProductChoice',
        'fiveProductChoice',
      ].includes(slide.template)
  );

  const usedSlideIds = currentPresentation.slides.reduce((acc, current) => {
    const subSlideIds = current.subSlides?.map((subSlide) => subSlide.id) || [];

    return [...acc, current.id, ...subSlideIds];
  }, []);

  const getElementClasses = (slide) =>
    cx('new-slide-content_element', {
      '-disabled': usedSlideIds.includes(slide.id),
    });

  const renderSlideTemplates = () => (
    <ul className='new-slide-content'>
      {subSlideTemplates.map((slide) => (
        <li
          key={slide.template}
          className='new-slide-content_element'
          onClick={() => handleAddNewSlide(slide.template)}>
          <AdminTasksPresentationBuilderSlidesListELementSlide
            slide={slide}
            style={{
              backgroundColor: slide.backgroundColor,
            }}
          />
        </li>
      ))}
    </ul>
  );

  const renderSlidesLibrary = () =>
    data ? (
      <ul className='new-slide-content'>
        {data.slides.nodes.map((slide) => (
          <li
            key={slide.id}
            className={getElementClasses(slide)}
            onClick={
              usedSlideIds.includes(slide.id) ? () => {} : () => handleAddLibrarySlide(slide)
            }>
            <AdminTasksPresentationBuilderSlidesListELementSlide
              addingSubSlide={true}
              closeModal={closeModal}
              disabled={usedSlideIds.includes(slide.id)}
              slide={slide}
              style={{
                backgroundColor: slide.backgroundColor,
                backgroundImage: slide.backgroundImage,
              }}
            />
          </li>
        ))}
      </ul>
    ) : null;

  return (
    <SharedModal isOpen={true} onDismiss={closeModal}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('admin.tasks.presentation.addSubSlide')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <SharedTabs.Tabs className='new-slide-tabs' />
        <div className='sub-slides-modal'>
          {tab.id === 'templates' ? renderSlideTemplates() : renderSlidesLibrary()}
        </div>
      </SharedModal.Body>
    </SharedModal>
  );
}

export default AdminTasksPresentationBuilderSlidesListNewSubSlideModal;
