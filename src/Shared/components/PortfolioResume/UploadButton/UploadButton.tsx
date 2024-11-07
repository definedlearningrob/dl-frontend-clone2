import { useTranslation } from 'react-i18next';

import { ReactComponent as UploadFile } from '@shared/svg/upload_on_cloud.svg';
import SharedButton from '@shared/components/Button/Button';

type Props = {
  disabled?: boolean;
  testId: string;
  onClick: () => void;
  size?: 'lg';
};

const UploadButton = (props: Props) => {
  const { disabled, testId, onClick, size } = props;
  const { t } = useTranslation();

  return (
    <SharedButton
      Icon={UploadFile}
      data-testid={testId}
      disabled={disabled}
      size={size}
      variant='primary'
      onClick={onClick}>
      {t('portfolioResume.upload')}
    </SharedButton>
  );
};

export default UploadButton;
