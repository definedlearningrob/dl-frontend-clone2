import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useEffect, useState } from 'react';

import { OpportunityCard } from '@dc/components/Opportunities/OpportunityCard';
import { useClusters } from '@dc/graphql/shared/hooks/useClusters';

import { FormValues } from '../helpers';

type Props = {
  className?: string;
};

export const OpportunityPreview = ({ className }: Props) => {
  const { t } = useTranslation();
  const { values } = useFormikContext<FormValues>();
  const { data } = useClusters();

  const [imageDataField] = useField('imageData');

  const {
    name,
    deadline,
    opportunityType,
    periodStart,
    periodEnd,
    image,
    imageFitToContainer,
    pathways,
    partner,
  } = values;

  const [previewImage, setPreviewImage] = useState({
    src: '',
    file: {},
  });

  const fileReader = new FileReader();

  const hasImage = imageDataField.value.url || imageDataField.value.file;

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

    if (imageDataField.value.file) {
      handleImagePreview(imageDataField.value.file);
    } else {
      setPreviewImage({
        src: imageDataField.value.url,
        file: {},
      });
    }
  }, [imageDataField.value]);

  const cardProps = {
    id: 'preview',
    imageUrl: previewImage.src || image,
    name: isEmpty(name) ? t('user.opportunities.form.unfilled') : name,
    opportunityType: opportunityType?.value,
    deadline: deadline ? deadline.toString() : null,
    periodStart: periodStart ? periodStart.toString() : null,
    periodEnd: periodEnd ? periodEnd.toString() : null,
    isFavorite: false,
    pathways: data
      ? pathways.map((pathway) => ({
          name: pathway.label,
          id: pathway.value,
        }))
      : [],
    partner: partner ? { name: partner.label, id: partner.value } : null,
    imageFitToContainer,
  };

  return <OpportunityCard className={className} isReadOnly={true} {...cardProps} />;
};
