import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { countBy } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { ReactComponent as EyeIcon } from '@dc/assets/icons/previewEye.svg';
import { PartnerPreviewCard } from '@dc/components/User/Partners/PartnerForm/PartnerPreview/PartnerPreviewCard';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { TooltipWithHeader } from '@shared/components/Tooltip';

export const PartnerPreviewContainer = () => {
  const { t } = useTranslation();
  const [partnerImage] = useField('imageData');
  const [partnerName] = useField('name');
  const [partnerAbout] = useField('about');
  const [opportunitiesField] = useField('opportunities');

  const [previewImage, setPreviewImage] = useState({
    src: '',
    file: {},
  });

  const fileReader = new FileReader();

  const hasImage = partnerImage.value.url || partnerImage.value.file;

  const handleImagePreview = (file: File) => {
    fileReader.onload = (e) => {
      setPreviewImage({
        src: e.target?.result as string,
        file: file,
      });
    };
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!hasImage) return;

    if (partnerImage.value.file) {
      handleImagePreview(partnerImage.value.file);
    } else {
      setPreviewImage({
        src: partnerImage.value.url,
        file: {},
      });
    }
  }, [partnerImage.value]);

  const counts = countBy(opportunitiesField.value, (opportunity) =>
    opportunity.opportunityType === 'VIRTUAL_INTERNSHIP'
      ? 'virtualInternshipCount'
      : 'opportunitiesCount'
  );

  const { virtualInternshipCount, opportunitiesCount } = counts;

  return (
    <div className='flex gap-sm xxxl:gap-base items-center border-b border-t text-neutral-200 py-sm xxxl:py-base'>
      <TooltipWithHeader
        Icon={EyeIcon}
        content={
          <PartnerPreviewCard
            about={partnerAbout.value}
            name={partnerName.value}
            opportunitiesCount={opportunitiesCount}
            thumbnailUrl={
              partnerImage.value.url || previewImage.src || partnerImage.value?.file?.url
            }
            virtualInternshipsCount={virtualInternshipCount}
          />
        }
        contentClassName='max-w-[444px] xxxl:max-w-[720px]'
        header={t('user.partners.preview.preview')}
        iconClassName='text-neutral-800 bg-transparent border-none'
        side='bottom'>
        <IconContainer
          Icon={EyeIcon}
          className='border text-neutral-400 bg-neutral-200 border-neutral-300 h-fit rounded-xs hover:border-neutral-400 hover:text-neutral-600'
          paddingSize='xs'
          size='2lg'
        />
      </TooltipWithHeader>
      <div>
        <h4 className='text-xs xxxl:text-sm text-neutral-800 font-bold leading-lg mb-xxs'>
          {t('user.partners.preview.title')}
        </h4>
        <p className='text-xxs xxxl:text-xs text-neutral-700 leading-lg font-regular mb-0'>
          {t('user.partners.preview.description')}
        </p>
      </div>
    </div>
  );
};
