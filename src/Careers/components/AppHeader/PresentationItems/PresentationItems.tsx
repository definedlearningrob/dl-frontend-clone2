import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import { ReactComponent as LoadingIcon } from '@dc/svg/loading_icon.svg';
import { Roles } from '@dc/resources/enums';

import { ReactComponent as CheckMarkIcon } from '@shared/svg/done.svg';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { usePresentationState } from '@shared/hooks/usePresentationState';

type Props = {
  isOnPBL?: boolean;
  userRole: Roles;
};

function AppHeaderPresentationItems({ isOnPBL, userRole }: Props) {
  const { presentationDispatch, presentationState } = usePresentationState();
  const { isPresentationSaving, presentationHasPendingChanges, presentationPreviewMode } =
    presentationState;
  const { t } = useTranslation();
  const history = useHistory();

  const savingStatusClasses = cx(
    'header-desktop__saving-status px-base border-x border-neutral-300 text-xs self-stretch',
    {
      '-saving': isPresentationSaving,
      '-pending': presentationHasPendingChanges,
    }
  );

  const correctSlidesPrefix = isOnPBL ? `/slides` : `/admin/slides`;
  const correctTaskPrefix = isOnPBL ? `/projects` : `/admin/tasks`;

  const dispatchPresentationPreviewMode = () =>
    presentationDispatch({ type: 'SET_PRESENTATION_PREVIEW_MODE', payload: true });

  const handlePresentationPreviewMode = () => {
    const url = presentationState.librarySlideId
      ? {
          pathname: `${correctSlidesPrefix}/presentation-preview`,
          state: {
            librarySlideId: presentationState.librarySlideId,
            taskId: presentationState.taskId,
          },
        }
      : `${correctTaskPrefix}/${presentationState.taskId}/presentation-preview`;

    history.push(url);
    dispatchPresentationPreviewMode();
  };

  const goToSlidesLibrary = () => {
    history.push({
      pathname: `${correctSlidesPrefix}/presentation-builder`,
      state: {
        taskId: presentationState.taskId,
        librarySlideId: 1,
      },
    });
  };

  const canViewLibrary = userRole === Roles.SYSTEM_ADMIN;

  const presentationStatusPlaceholder = useMemo(() => {
    if (presentationHasPendingChanges === true) return t('admin.tasks.presentation.pendingChanges');

    if (isPresentationSaving === true) return t('admin.tasks.presentation.savingChanges');

    return t('admin.tasks.presentation.allChangesSaved');
  }, [isPresentationSaving, presentationHasPendingChanges]);

  const sharedSlideInfo =
    userRole === Roles.SYSTEM_ADMIN
      ? t('admin.tasks.presentation.sharedEditInfoSysAdmin')
      : t('admin.tasks.presentation.sharedEditInfo');

  return (
    <>
      {presentationState.isOnSharedSlide && !presentationPreviewMode && (
        <div className='flex flex-end'>
          <p className='flex items-center mb-0 bg-secondary-200 rounded-xs text-secondary-500 text-xs gap-x p-xs'>
            <SharedIcon icon={<InfoIcon />} size='xs' />
            {sharedSlideInfo}
          </p>
        </div>
      )}
      {!presentationState.librarySlideId && canViewLibrary && (
        <SharedButton
          data-testid='preview-button'
          size='sm'
          type='button'
          variant='primary'
          onClick={goToSlidesLibrary}>
          {t('admin.tasks.presentation.slideLibrary')}
        </SharedButton>
      )}
      {!presentationPreviewMode && !presentationState.librarySlideId && (
        <SharedButton
          data-testid='preview-button'
          size='sm'
          type='button'
          variant='primary-outlined'
          onClick={handlePresentationPreviewMode}>
          {t('admin.tasks.presentation.preview')}
        </SharedButton>
      )}
      <div className={savingStatusClasses}>
        <SharedIcon
          icon={
            isPresentationSaving || presentationHasPendingChanges ? (
              <LoadingIcon />
            ) : (
              <CheckMarkIcon />
            )
          }
          size='xs'
        />
        <p className='text-success-500 mb-0 whitespace-nowrap'>{presentationStatusPlaceholder}</p>
      </div>
    </>
  );
}
export default AppHeaderPresentationItems;
