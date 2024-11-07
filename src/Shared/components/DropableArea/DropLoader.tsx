import { useTranslation } from 'react-i18next';

import { CircleStatusIndicator } from '@shared/components/CircleStatusIndicator/CircleStatusIndicator';

type Props = {
  assetType: string;
  progress?: number;
};

export const DropLoader = ({ assetType, progress }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col justify-center items-center'>
      {progress && <CircleStatusIndicator value={progress} />}
      <span className='relative -bottom-xs text-xs' data-testid='uploading-image'>
        {t('dropableArea.loading', { asset: assetType })}
      </span>
    </div>
  );
};
