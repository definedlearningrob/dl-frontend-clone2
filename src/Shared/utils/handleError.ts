import { ApolloError } from '@apollo/client';
import { t } from 'i18next';

import { callToast } from '@shared/components/Toaster/Toaster';

export const handleError = (error: unknown, errorMessage?: string) => {
  const commonErrorMessage = errorMessage || t('common.error.unknown');

  if (error instanceof ApolloError || error instanceof Error) {
    const message =
      typeof error === 'object' && 'message' in error ? error.message : commonErrorMessage;

    return callToast('error', message);
  }

  return callToast('error', commonErrorMessage);
};
