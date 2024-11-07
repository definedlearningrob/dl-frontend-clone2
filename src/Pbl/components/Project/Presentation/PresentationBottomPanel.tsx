import { useTranslation } from 'react-i18next';

import { ReactComponent as FullScreenIcon } from '@dc/assets/icons/full-screen-icon.svg';

import Button from '@shared/components/Button/Button';
import { IconButton } from '@shared/components/IconButton/IconButton';

type Props = {
  handlePreviousSlide: () => void;
  handleNextSlide: () => void;
  toggleFullscreenMode: () => void;
  openModal: () => void;
};

export const PresentationBottomPanel = ({
  handlePreviousSlide,
  handleNextSlide,
  toggleFullscreenMode,
  openModal,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className='grow min-h-[72px] bg-white rounded-b-sm p-sm'>
      <div className='flex justify-between items-center'>
        <Button variant='primary-outlined' onClick={openModal}>
          {t('common.fields.common.resources')}
        </Button>
        <div className='flex gap-sm items-center'>
          <Button variant='primary-outlined' onClick={handlePreviousSlide}>
            {t('common.actions.previous')}
          </Button>
          <Button variant='primary-outlined' onClick={handleNextSlide}>
            {t('common.actions.next')}
          </Button>
          <IconButton Icon={FullScreenIcon} size='md' onClick={toggleFullscreenMode} />
        </div>
      </div>
    </div>
  );
};
