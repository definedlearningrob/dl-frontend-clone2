import { ApolloError } from '@apollo/client';
import { PropsWithChildren, ReactNode } from 'react';

import ErrorSuspense from '@shared/components/ErrorSuspense/ErrorSuspense';
import LoaderSuspense from '@shared/components/LoaderSuspense/LoaderSuspense';

type DataSuspenseProps = PropsWithChildren<{
  error?: ApolloError;
  errorFallback?: ReactNode;
  loading: boolean;
  loadingFallback?: ReactNode;
}>;

const DataSuspense = ({
  children,
  error,
  errorFallback,
  loading,
  loadingFallback,
}: DataSuspenseProps) => (
  <ErrorSuspense error={error} fallback={errorFallback}>
    <LoaderSuspense fallback={loadingFallback} loading={loading}>
      {children}
    </LoaderSuspense>
  </ErrorSuspense>
);

export default DataSuspense;
