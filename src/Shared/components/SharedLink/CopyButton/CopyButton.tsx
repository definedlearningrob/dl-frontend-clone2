import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';

type Props = {
  onClick: () => void;
};

export const CopyButton = ({ onClick }: Props) => {
  const { t } = useTranslation();

  return (
    <SharedButton
      className='user-project-share__link-copy'
      data-testid='copy-shared-code'
      type='button'
      variant='primary'
      onClick={onClick}>
      {t('sharedCommon.copy')}
    </SharedButton>
  );
};
