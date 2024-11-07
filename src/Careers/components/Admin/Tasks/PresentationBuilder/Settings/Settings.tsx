import cx from 'classnames';

import ElementsSettings from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Elements/ElementsSettings';
import PresentationSettings from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Presentation/PresentationSettings';
import SlideSettings from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Slide/SlideSettings';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

type TSetting = {
  name: string;
  selected: boolean;
};

function AdminTasksPresentationBuilderSettings() {
  const {
    currentSlide,
    currentPresentation,
    handleSettingsMenuChange,
    settingsContent,
    isSystemAdminUser,
  } = usePresentationBuilder();
  const parentSlide = currentPresentation.slides.find(
    (slide: TTaskPresentationSlide) => slide.id === currentSlide?.parentSlideId
  );

  const isSharedSlide = currentSlide?.isShared || parentSlide?.isShared;

  const slideEditionDisabled = isSharedSlide && !isSystemAdminUser;

  return (
    <div className='settings' data-testid='slides-panel'>
      <ul className='headers'>
        {settingsContent.map((setting: TSetting, index: number) => (
          <li
            key={index}
            className={cx({ '-selected-setting': setting.selected })}
            onClick={() => handleSettingsMenuChange(index)}>
            {setting.name}
          </li>
        ))}
      </ul>
      <div className='settings__content'>
        {settingsContent[0].selected && (
          <ElementsSettings editionDisabled={!!slideEditionDisabled} />
        )}
        {settingsContent[1].selected && <SlideSettings editionDisabled={slideEditionDisabled} />}
        {settingsContent[2]?.selected && <PresentationSettings />}
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderSettings;
