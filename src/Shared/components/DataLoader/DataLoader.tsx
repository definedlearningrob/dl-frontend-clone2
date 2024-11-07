import PropTypes from 'prop-types';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ApolloError,
  LazyQueryHookOptions,
  ObservableQueryFields,
  OperationVariables,
  TypedDocumentNode,
  useLazyQuery,
} from '@apollo/client';

import { IS_TEST_ENV } from '@dc/resources/constants';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

SharedDataLoader.propTypes = {
  children: PropTypes.func,
  onError: PropTypes.func,
  options: PropTypes.object,
  query: PropTypes.object,
  SpinnerComponent: PropTypes.element,
  spinnerSize: PropTypes.oneOf(['small', 'medium', 'full-screen']),
};

export type Props<T, K extends OperationVariables> = {
  children: (
    data: T,
    fetchMore: ObservableQueryFields<T, K>['fetchMore'] | undefined,
    refetch: ObservableQueryFields<T, K>['refetch'] | undefined
  ) => ReactNode;
  onError?: (error: ApolloError) => void;
  options?: LazyQueryHookOptions<T, K>;
  query: TypedDocumentNode<T, K>;
  SpinnerComponent?: ReactNode;
  spinnerSize?: 'small' | 'medium' | 'full-screen';
};

function SharedDataLoader<T, K extends OperationVariables = {}>({
  children,
  onError,
  options,
  query,
  SpinnerComponent,
  spinnerSize = 'small',
}: Props<T, K>) {
  const [callQuery, { data, loading, error, fetchMore, refetch }] = useLazyQuery(query, options);
  const { t } = useTranslation();

  const defaultSpinner = (
    <div className='h-100 w-100 flex justify-center items-center p-xl'>
      <SharedLoadingSpinner size={spinnerSize} />
    </div>
  );

  const LoadingPlaceholder = SpinnerComponent || defaultSpinner;

  useEffect(() => {
    callQuery();
  }, [callQuery]);

  if (error && !IS_TEST_ENV) {
    // eslint-disable-next-line no-console
    console.error(error);
    onError && onError(error);
  }

  if (error)
    return (
      <span className='block h-100 w-100 text-center' data-testid='loader-error'>
        {t('shared.dataLoader.error')}
      </span>
    );

  return <>{loading || !data ? LoadingPlaceholder : children(data, fetchMore, refetch)}</>;
}

export default SharedDataLoader;
