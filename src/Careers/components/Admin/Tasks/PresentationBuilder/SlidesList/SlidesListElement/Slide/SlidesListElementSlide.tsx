import cx from 'classnames';
import fontColorContrast from 'font-color-contrast';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import type {
  TTaskPresentationSlide,
  TTaskPresentation,
} from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ShareIcon } from '@shared/assets/icons/shared_slide.svg';
import { ReactComponent as SubSlidesIcon } from '@shared/assets/icons/sub_slides.svg';
import { Tooltip } from '@shared/components/Tooltip';

import Template from '../../../Template/Template';
import DeleteModal from '../DeleteModal/DeleteModal';

import Dropdown from './Dropdown/Dropdown';

import './SlidesListElementSlide.sass';

type Props = {
  addingSubSlide?: boolean;
  closeModal?: () => void;
  disabled?: boolean;
  slide: TTaskPresentationSlide;
  navElement?: boolean;
  presentation?: TTaskPresentation;
  style: {
    backgroundColor: string;
    backgroundImage?: string;
  };
};

function AdminTasksPresentationBuilderSlidesListELementSlide({
  addingSubSlide,
  closeModal,
  disabled,
  presentation,
  navElement,
  slide,
  style,
}: Props) {
  const { currentSlide, handleArchiveSlide, taskId } = usePresentationBuilder();
  const revealClasses = cx('reveal center list-element-slide', {
    '-selected-slide': currentSlide && parseInt(currentSlide?.id) === parseInt(slide.id),
    '-disabled': disabled,
  });
  const { t } = useTranslation();
  const hasSubslides = slide.subslides?.length > 0;

  const closeDeleteModal = () => setSlideToDelete(null);
  const [slideToDelete, setSlideToDelete] = useState<TTaskPresentationSlide | null>(null);
  const history = useHistory();

  const CustomTooltip = ({ message }: { message: string }) => (
    // Custom tooltip because it is rendered in portal modal
    <div className='list-element-slide-tooltip'>
      <div className='list-element-slide-tooltip-content'>{message}</div>
    </div>
  );

  const archiveSlide = () => {
    if (slideToDelete) {
      handleArchiveSlide(slideToDelete.id);
      closeDeleteModal();
    }
  };

  const handleDelete = () => setSlideToDelete(slide);

  const handleGoToLibrary = () => {
    closeModal && closeModal();

    history.push({
      pathname: '/admin/slides/presentation-builder',
      state: {
        librarySlideId: slide.id,
        taskId,
      },
    });
  };

  return (
    <>
      <div className='list-element-slide-wrapper'>
        {disabled && <CustomTooltip message={t('admin.tasks.presentation.slideInUse')} />}
        {!disabled && hasSubslides && addingSubSlide && (
          <CustomTooltip message={t('admin.tasks.presentation.onlyMainInfo')} />
        )}
        <div className={revealClasses}>
          <div
            className='slides'
            style={{
              backgroundColor: style.backgroundColor,
              backgroundImage: `url(${style.backgroundImage})`,
            }}>
            <section
              className='present has-light-background'
              style={{ color: fontColorContrast(style.backgroundColor) }}>
              <Template
                // @ts-ignore
                presentation={presentation}
                role='nav'
                slide={slide}
              />
            </section>
          </div>
        </div>
        {slide.isShared && (
          <>
            <div className='list-element-slide-shared-icon'>
              <Tooltip message={t('admin.tasks.presentation.sharedSlide')}>
                <SharedIcon icon={<ShareIcon />} size='xs' />
              </Tooltip>
            </div>
            {!navElement && (
              <div className='list-element-slide-shared-dropdown'>
                <Dropdown onDeleteClick={handleDelete} onGoToLibraryClick={handleGoToLibrary} />
              </div>
            )}
            {hasSubslides && !navElement && (
              <div className='list-element-slide-subslide-icon'>
                <SharedIcon icon={<SubSlidesIcon />} size='xs' />
              </div>
            )}
          </>
        )}
      </div>
      {slideToDelete && <DeleteModal onDelete={archiveSlide} onDismiss={closeDeleteModal} />}
    </>
  );
}

export default AdminTasksPresentationBuilderSlidesListELementSlide;
