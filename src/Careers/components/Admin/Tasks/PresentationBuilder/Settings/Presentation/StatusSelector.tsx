import { capitalize } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { Badge } from '@shared/components/Badge/Badge';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import SharedButton from '@shared/components/Button/Button';
import { ContentStatusesTypes } from '@shared/resources/enums';
import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import { ReactComponent as DraftIcon } from '@shared/svg/file.svg';

export const StatusSelector = () => {
  const { currentPresentation, handleUpdatePresentation } = usePresentationBuilder();
  const { t } = useTranslation();

  const isDraft = currentPresentation.status === ContentStatusesTypes.DRAFT;

  const changeStatusButtonText =
    currentPresentation.status === ContentStatusesTypes.DRAFT
      ? t('admin.tasks.presentation.publish')
      : t('admin.tasks.presentation.draft');

  const handlePresentationStatusChange = () => {
    const newStatus =
      currentPresentation.status === ContentStatusesTypes.DRAFT
        ? ContentStatusesTypes.PUBLISHED
        : ContentStatusesTypes.DRAFT;

    handleUpdatePresentation({
      status: newStatus,
    });
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-sm'>
        <span>{t('admin.tasks.presentation.presentationStatus')}:</span>
        <Badge type={isDraft ? 'secondary' : 'primary'}>
          <div className='flex items-center gap-xxs'>
            <IconContainer Icon={isDraft ? DraftIcon : DoneIcon} paddingSize='none' size='sm' />
            {capitalize(currentPresentation.status)}
          </div>
        </Badge>
      </div>
      <SharedButton
        className='w-full'
        data-testid='archive-modal-accept'
        size='md'
        type='button'
        variant='primary'
        onClick={handlePresentationStatusChange}>
        {changeStatusButtonText}
      </SharedButton>
    </div>
  );
};
