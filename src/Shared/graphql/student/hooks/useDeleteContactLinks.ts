import { useMutation } from '@apollo/client/react';
import { ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { ContactLink } from '@shared/resources/types';
import { callToast } from '@shared/components/Toaster/Toaster';
import { DELETE_CONTACT_LINK } from '@shared/graphql/student/mutations/deleteContactLink';

export const useDeleteContactLinks = () => {
  const [deleteContactLink] = useMutation(DELETE_CONTACT_LINK);
  const { t } = useTranslation();

  const deleteContactLinks = async (contactLinks: ContactLink['id'][]) => {
    const contactLinksPromises = contactLinks.map((id) =>
      deleteContactLink({
        variables: {
          input: { id },
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

  return [deleteContactLinks] as const;
};
