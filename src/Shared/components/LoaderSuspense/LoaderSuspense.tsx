import SharedLoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import type { PropsWithChildren, ReactNode } from 'react';

type LoaderSuspenseProps = PropsWithChildren<{
  fallback?: ReactNode;
  loading: boolean;
}>;

const LoaderSuspense = ({ children, fallback, loading }: LoaderSuspenseProps) => {
  if (loading) {
    return <>{fallback || <SharedLoadingSpinner size='small' />}</>;
  }

  return <>{children}</>;
};

export default LoaderSuspense;
