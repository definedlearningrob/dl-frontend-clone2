import React from 'react';
import { useTranslation } from 'react-i18next';

import { CustomUpload } from '@dc/components/Admin/Entity/CustomMessageCreator/CustomUpload/CustomUpload';
import { CustomEditor } from '@dc/components/Admin/Entity/CustomMessageCreator/CustomEditor/CustomEditor';

type Props = {
  logo: React.ReactNode;
  fallBackLogo: string;
  fallBackIcon: string;
  nameLogo: string;
  nameIcon: string;
  studentMessage: string;
  teacherMessage: string;
};

export const BrandingFields = ({
  logo,
  fallBackLogo,
  fallBackIcon,
  nameLogo,
  nameIcon,
  studentMessage,
  teacherMessage,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col grow p-base gap-base xxxl:gap-md border border-neutral-300 rounded-sm w-1/2'>
      <div className='flex flex-col gap-sm'>
        <div className='w-1/5'>{logo}</div>
        <h5 className='text-sm leading-base font-bold text-neutral-800 mb-0'>
          {t('admin.entities.customizeMessage.bannerTitle')}
        </h5>
        <p className='text-xs font-regular leading-lg text-neutral-700 mb-0'>
          {t('admin.entities.customizeMessage.bannerDetails')}
        </p>
      </div>
      <div className='flex flex-col gap-sm xxxl:gap-md'>
        <CustomUpload
          actionTitle={t('admin.entities.customizeMessage.uploadLogo')}
          description={t('admin.entities.customizeMessage.logoDetails')}
          fallback={fallBackLogo}
          name={nameLogo}
        />
        <CustomUpload
          actionTitle={t('admin.entities.customizeMessage.uploadIcon')}
          description={t('admin.entities.customizeMessage.iconDetails')}
          fallback={fallBackIcon}
          name={nameIcon}
        />
      </div>
      <CustomEditor studentMessage={studentMessage} teacherMessage={teacherMessage} />
    </div>
  );
};
