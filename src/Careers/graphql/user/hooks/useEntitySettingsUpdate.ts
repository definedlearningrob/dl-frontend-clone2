import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { BrandingFormType } from '@dc/components/Admin/Entity/CustomMessageCreator/BrandingForm';

import { callToast } from '@shared/components/Toaster/Toaster';

import { UPDATE_ENTITY } from '../mutations/updateEntity';

type Props = {
  uuid: string;
  values: BrandingFormType;
};

type BrandingObject = {
  filename: string | null;
  uuid: string | null;
  url: string | null;
};
const serializedFieldUpdate = (image: BrandingObject, name: string) => {
  if (image.url === '') {
    return { [`${name}Filename`]: null, [`${name}Uuid`]: null };
  }

  return {
    ...(image.filename &&
      image.uuid && { [`${name}Filename`]: image.filename, [`${name}Uuid`]: image.uuid }),
  };
};

export const useEntitySettingsUpdate = () => {
  const [updateEntity, { loading }] = useMutation(UPDATE_ENTITY);
  const { t } = useTranslation();

  const handleUpdateEntity = async (uuid: Props['uuid'], values: Props['values']) => {
    const { dcLogo, dlLogo, dcIcon, dlIcon, ...rest } = values;

    try {
      await updateEntity({
        variables: {
          input: {
            uuid,
            ...serializedFieldUpdate(dcLogo, 'dcLogo'),
            ...serializedFieldUpdate(dcIcon, 'dcIcon'),
            ...serializedFieldUpdate(dlLogo, 'dlLogo'),
            ...serializedFieldUpdate(dlIcon, 'dlIcon'),
            ...rest,
          },
        },
      });
      callToast('success', t('admin.entities.settings.saved'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', t('admin.entities.settings.error'));
      } else {
        callToast('error', t('admin.entities.customizeMessage.customizationError'));
      }
    }
  };

  return [handleUpdateEntity, loading] as const;
};
