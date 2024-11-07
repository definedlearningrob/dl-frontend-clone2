import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import DropDownTrigger from '@shared/components/Dropdown/DropdownTrigger';
import SharedDropdown from '@shared/components/Dropdown/Dropdown';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import { ReactComponent as StartIcon } from '@shared/assets/icons/star_outlined.svg';
import { ReactComponent as RemoveIcon } from '@shared/svg/delete_outlined.svg';

import '@dc/components/shared/Dropdown/Dropdown.sass';

type Props = {
  handleRemoveSlide: (slide: TTaskPresentationSlide) => void;
  isSubslide: boolean;
  isParentShared?: boolean;
  setSlideToDelete?: (slide: TTaskPresentationSlide) => void;
  handleAddToLibrary: (slideId: string) => void;
  slide: TTaskPresentationSlide;
  toggleNewSubSlideModal?: (slideId: string, value: boolean) => void;
};

function AdminTasksPresentationBuilderSlidesListDropdown({
  handleAddToLibrary,
  handleRemoveSlide,
  isParentShared,
  isSubslide,
  setSlideToDelete,
  slide,
  toggleNewSubSlideModal,
}: Props) {
  const history = useHistory();
  const { t } = useTranslation();
  const { taskId } = useParams<{ taskId: string }>();
  const { projectId } = useParams<{ projectId: string }>();
  const { isSystemAdminUser } = usePresentationBuilder();

  const destination = taskId
    ? '/admin/slides/presentation-builder'
    : '/slides/presentation-builder';

  const goToSlidesBuilder = () =>
    history.push({
      pathname: destination,
      state: {
        librarySlideId: slide.id,
        taskId,
      },
    });

  const shouldShowAddToLibraryOption = !slide.isShared && !isSubslide && isSystemAdminUser;
  const shouldShowOpenInLibraryOption = isSystemAdminUser && (slide.isShared || isParentShared);
  const shouldShowRemoveOption =
    !(isParentShared && isSubslide) || (isParentShared && isSubslide && isSystemAdminUser);

  const renderBuilderOptions = () => (
    <>
      {shouldShowAddToLibraryOption && (
        <SharedDropdown.Option
          className='sub-slide'
          data-testid='presentation-builder-dropdown-option'
          onClick={() => handleAddToLibrary(slide.id)}>
          <SharedIcon
            className='sub-slide_icon'
            icon={<StartIcon />}
            placeholder={t('admin.tasks.presentation.addToLibrary')}
            size='sm'
          />
        </SharedDropdown.Option>
      )}
      {shouldShowOpenInLibraryOption && (
        <SharedDropdown.Option
          className='sub-slide'
          data-testid='presentation-builder-dropdown-option'
          onClick={goToSlidesBuilder}>
          <SharedIcon
            className='sub-slide_icon'
            icon={<StartIcon />}
            placeholder={t('admin.tasks.presentation.openInLibrary')}
            size='sm'
          />
        </SharedDropdown.Option>
      )}
      {toggleNewSubSlideModal && (!slide.isShared || (slide.isShared && isSystemAdminUser)) && (
        <SharedDropdown.Option
          className='sub-slide'
          data-testid='presentation-builder-dropdown-option'
          onClick={() => toggleNewSubSlideModal(slide.id, true)}>
          <SharedIcon
            className='sub-slide_icon'
            icon={<AddIcon />}
            placeholder={t('admin.tasks.presentation.addSubSlide')}
            size='sm'
          />
        </SharedDropdown.Option>
      )}
      {shouldShowRemoveOption && (
        <SharedDropdown.Option
          className='delete-slide'
          data-testid='presentation-builder-dropdown-option'
          onClick={() => handleRemoveSlide(slide)}>
          <SharedIcon
            className='delete-slide_icon'
            icon={<RemoveIcon />}
            placeholder={t('common.actions.remove')}
            size='sm'
          />
        </SharedDropdown.Option>
      )}
    </>
  );

  const renderSlidesLibraryOptions = () => (
    <>
      {shouldShowAddToLibraryOption && (
        <SharedDropdown.Option
          className='sub-slide'
          data-testid='presentation-builder-dropdown-option'
          onClick={() => handleAddToLibrary(slide.id)}>
          <SharedIcon
            className='sub-slide_icon'
            icon={<StartIcon />}
            placeholder={t('admin.tasks.presentation.addToLibrary')}
            size='sm'
          />
        </SharedDropdown.Option>
      )}
      {toggleNewSubSlideModal && (
        <SharedDropdown.Option
          className='sub-slide'
          data-testid='presentation-builder-dropdown-option'
          onClick={() => toggleNewSubSlideModal(slide.id, true)}>
          <SharedIcon
            className='sub-slide_icon'
            icon={<AddIcon />}
            placeholder={t('admin.tasks.presentation.addSubSlide')}
            size='sm'
          />
        </SharedDropdown.Option>
      )}
      {setSlideToDelete && (
        <SharedDropdown.Option
          className='delete-slide'
          data-testid='presentation-builder-dropdown-option'
          onClick={() => setSlideToDelete(slide)}>
          <SharedIcon
            className='delete-slide_icon'
            icon={<RemoveIcon />}
            placeholder={t('common.actions.delete')}
            size='sm'
          />
        </SharedDropdown.Option>
      )}
    </>
  );

  return (
    <div className='slides-list-dropdown'>
      <SharedDropdown>
        <SharedDropdown.Dropdown>
          <SharedDropdown.Trigger>
            <DropDownTrigger
              className='presentation-builder-dropdown__open-dropdown'
              data-testid='dropdown-icon'
              size='sm'
            />
          </SharedDropdown.Trigger>
          <SharedDropdown.Options>
            {projectId || taskId ? renderBuilderOptions() : renderSlidesLibraryOptions()}
            {/* TODO prepared for future development */}
            {/*
            <SharedDropdown.Option
              data-testid='presentation-builder-dropdown-option'
              onClick={() => console.log('Duplicate')}>
              {t('admin.tasks.presentation.duplicate')}
            </SharedDropdown.Option>
            <SharedDropdown.Option
              data-testid='presentation-builder-dropdown-option'
              onClick={() => console.log('Hide')}>
              {t('admin.tasks.presentation.hide')}
            </SharedDropdown.Option> */}
          </SharedDropdown.Options>
        </SharedDropdown.Dropdown>
      </SharedDropdown>
    </div>
  );
}

export default AdminTasksPresentationBuilderSlidesListDropdown;
