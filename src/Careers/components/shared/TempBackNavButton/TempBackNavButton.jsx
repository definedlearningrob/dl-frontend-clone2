import cx from 'classnames';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import useUserInfo from '@dc/hooks/useUserInfo';

import DropDownTrigger from '@shared/components/Dropdown/DropdownTrigger';
import { ReactComponent as LeftArrowIcon } from '@shared/svg/arrow_backward.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

function SharedTempBackNavButton({
  destination,
  onBack,
  presentationDispatch,
  presentationState,
  setShowPresentationSettings,
  text,
}) {
  const {
    userInfo: { isImpersonated },
  } = useUserInfo();
  const history = useHistory();
  const { t } = useTranslation();
  const { taskId, librarySlideId, presentationPreviewMode } = presentationState;
  const dispatchPresentationPreviewMode = () =>
    presentationDispatch({ type: 'SET_PRESENTATION_PREVIEW_MODE', payload: false });

  const classes = cx(
    'flex items-center text-primary-500 font-medium mr-auto cursor-pointer gap-xs',
    {
      '!text-white': isImpersonated,
    }
  );

  const handleClick = () => {
    if (destination) {
      presentationPreviewMode && dispatchPresentationPreviewMode();

      return history.push(destination);
    }

    history.goBack();

    onBack && onBack();
  };

  return (
    <div className={classes}>
      <div
        className='flex gap-xs items-center group'
        data-testid='back-button'
        onClick={handleClick}>
        <IconContainer
          Icon={LeftArrowIcon}
          aria-label={t('common.actions.back')}
          className='group-hover:bg-white rounded-full'
          paddingSize='xxs'
          size='sm'
        />
        <span className='app-header-breadcrumbs__back-text' data-testid='breadcrumbs-back-text'>
          {text || t('navigation.back')}
        </span>
      </div>
      {taskId && !librarySlideId && !presentationPreviewMode && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild={true}>
            <DropDownTrigger
              className='presentation-builder-dropdown-button'
              data-testid='dropdown-icon'
              size='sm'
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align='center '
              className='bg-white rounded-sm py-xxs border border-neutral-300 shadow-200 flex flex-col'
              sideOffset={8}>
              <DropdownMenu.Item asChild={true}>
                <button
                  className='p-xs border-primary-500 hover:bg-primary-200'
                  onClick={() => setShowPresentationSettings(true)}>
                  {t('admin.tasks.presentation.presentationSettings')}
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )}
    </div>
  );
}

SharedTempBackNavButton.propTypes = {
  action: PropTypes.func,
  destination: PropTypes.string,
  onBack: PropTypes.func,
  presentationDispatch: PropTypes.func,
  presentationPreviewModeTaskId: PropTypes.string,
  presentationState: PropTypes.object,
  setShowPresentationSettings: PropTypes.func,
  text: PropTypes.string,
};

export default SharedTempBackNavButton;
