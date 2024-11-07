import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import useUserInfo from '@pbl/hooks/useUserInfo';

import DropDownTrigger from '@shared/components/Dropdown/DropdownTrigger';
import { ReactComponent as LeftArrowIcon } from '@shared/svg/arrow_backward.svg';
import SharedDropdown from '@shared/components/Dropdown/Dropdown';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import styles from './TempBackNavButton.module.sass';

function SharedTempBackNavButton({
  destination,
  presentationDispatch,
  presentationState,
  setShowPresentationSettings,
  text,
  onClick,
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const { taskId, librarySlideId, presentationPreviewMode } = presentationState;
  const {
    userInfo: { isImpersonated },
  } = useUserInfo();

  const classes = cx(styles.breadcrumbs, {
    [styles.whiteText]: isImpersonated,
  });

  const dispatchPresentationPreviewMode = () =>
    presentationDispatch({ type: 'SET_PRESENTATION_PREVIEW_MODE', payload: false });

  const handleGoBack = () => {
    if (destination) {
      presentationPreviewMode && dispatchPresentationPreviewMode();

      return history.push(destination);
    }

    if (typeof onClick === 'function') {
      return onClick();
    }

    history.goBack();
  };

  return (
    <div className={classes} data-testid='back-button'>
      <div
        className='flex gap-xs items-center group'
        data-testid='back-button'
        onClick={handleGoBack}>
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
        <SharedDropdown>
          <SharedDropdown.Dropdown>
            <SharedDropdown.Trigger>
              <DropDownTrigger
                className='presentation-builder-dropdown-button'
                data-testid='dropdown-icon'
                size='sm'
              />
            </SharedDropdown.Trigger>
            <SharedDropdown.Options className='presentation-builder-dropdown-options'>
              <SharedDropdown.Option
                data-testid='presentation-builder-dropdown-option'
                onClick={() => setShowPresentationSettings(true)}>
                {t('admin.tasks.presentation.presentationSettings')}
              </SharedDropdown.Option>
            </SharedDropdown.Options>
          </SharedDropdown.Dropdown>
        </SharedDropdown>
      )}
    </div>
  );
}

SharedTempBackNavButton.propTypes = {
  action: PropTypes.func,
  destination: PropTypes.string,
  onClick: PropTypes.func,
  presentationDispatch: PropTypes.func,
  presentationState: PropTypes.object,
  setShowPresentationSettings: PropTypes.func,
  text: PropTypes.string,
};

export default SharedTempBackNavButton;
