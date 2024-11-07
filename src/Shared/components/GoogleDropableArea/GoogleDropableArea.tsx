import { useTranslation } from 'react-i18next';

import { ReactComponent as UploadFile } from '@dc/svg/upload_on_cloud.svg';

import { GooglePicker } from '@shared/components/GooglePicker';
import { cx } from '@shared/utils/cx';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type GoogleData = {
  data: any;
  token: string;
};

type GoogleDropableAreaProps = {
  disabled?: boolean;
  onChange: (data: GoogleData) => void;
  className?: string;
};

const GoogleDropableArea = ({ disabled, onChange, className }: GoogleDropableAreaProps) => {
  const { t } = useTranslation();

  const containerClasses = cx(
    'group relative bg-white rounded-sm pt-[50%]',
    'border-2 border-dashed border-neutral-300 hover:bg-neutral-200 hover:border-primary-500',
    className
  );

  return (
    <GooglePicker disabled={Boolean(disabled)} onChange={onChange}>
      <div className={containerClasses}>
        <div className='absolute inset-0 flex flex-col items-center justify-center p-sm'>
          <IconContainer
            Icon={UploadFile}
            className='text-primary-500 rounded-full bg-primary-200 group-hover:bg-white mb-xs'
          />
          <p className='text-primary-500 mb-0'>{t('dropableArea.google')}</p>
        </div>
      </div>
    </GooglePicker>
  );
};

export default GoogleDropableArea;
