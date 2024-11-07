import { useMutation } from '@apollo/client/react';
import { ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { ContactLink } from '@shared/resources/types';
import { callToast } from '@shared/components/Toaster/Toaster';

import { CREATE_CONTACT_LINK } from '../mutations/createContactLink';

export const useCreateContactLinks = () => {
  const [createContactLink] = useMutation(CREATE_CONTACT_LINK);
  const { t } = useTranslation();

  const createContactLinks = async (contactLinks: Omit<ContactLink, 'id'>[]) => {
    const contactLinksPromises = contactLinks.map((contactLink) =>
      createContactLink({
        variables: {
          input: {
            type: contactLink.type,
            value: contactLink.value,
            visible: contactLink.visible,
          },
        },
      })
    );

    try {
      await Promise.all(contactLinksPromises);
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error);
      } else {
        callToast('error', t('common.notifications.error.unknown'));
      }
    }
  };

  return [createContactLinks] as const;
};
