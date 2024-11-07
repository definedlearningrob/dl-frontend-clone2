import { useMutation } from '@apollo/client/react';
import { ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { ContactLink } from '@shared/resources/types';
import { callToast } from '@shared/components/Toaster/Toaster';
import { UPDATE_CONTACT_LINK } from '@shared/graphql/student/mutations/updateContactLink';

export const useUpdateContactLinks = () => {
  const [updateContactLink] = useMutation(UPDATE_CONTACT_LINK);

  const { t } = useTranslation();

  const updateContactLinks = async (contactLinks: ContactLink[]) => {
    const contactLinksPromises = contactLinks.map((contactLink) =>
      updateContactLink({
        variables: {
          input: contactLink,
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

  return [updateContactLinks] as const;
};
