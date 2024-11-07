import { ApolloError } from '@apollo/client';

import SharedLoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import type { PropsWithChildren, ReactNode } from 'react';

type ErrorSuspenseProps = PropsWithChildren<{
  fallback?: ReactNode;
  error?: ApolloError;
}>;

const ErrorSuspense = ({ children, error, fallback }: ErrorSuspenseProps) => {
  if (error) {
    return <>{fallback || <SharedLoadingSpinner size='small' />}</>;
  }

  return <>{children}</>;
};

export default ErrorSuspense;
