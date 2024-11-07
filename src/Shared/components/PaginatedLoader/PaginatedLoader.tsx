import cx from 'classnames';
import Select, { SingleValue } from 'react-select';
import {
  ApolloError,
  LazyQueryHookOptions,
  PureQueryOptions,
  TypedDocumentNode,
  useLazyQuery,
} from '@apollo/client';
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getByStringKey } from '@dc/utils';
import { isEqual } from '@dc/utils';
import { IS_TEST_ENV } from '@dc/resources/constants';
import { PAGING } from '@dc/resources/constants';

import SharedIcon from '@shared/components/Icon/Icon';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import useQueryParams from '@shared/hooks/useQueryParams';
import { ReactComponent as NextIcon } from '@shared/svg/chevron_right.svg';
import { ReactComponent as PrevIcon } from '@shared/svg/chevron_left.svg';
import { generatePaginationItems } from '@shared/utils/generatePaginationItems';

import './PaginatedLoader.sass';

export type TPaginatedLoaderParams<T> = {
  data: T | undefined;
  refetchQuery: PureQueryOptions;
  selectPage: (page: number) => void;
  selectPageHandler: (page: number) => () => void;
  nextPage: () => void;
  prevPage: () => void;
  page: number;
  omitUrl: boolean;
  perPage: { value: number };
  setPage: (page: number) => void;
  setPerPage: (perPage: { value: number }) => void;
  nodesCount: number;
  loading: boolean;
  error?: ApolloError;
  pagesCount: number;
  onFirstPage: boolean;
  onLastPage: boolean;
  pageUrlName: string;
  perPageUrlName: string;
};

type PagingTypes = {
  page?: number;
  perPage?: number;
};

type QueryVariables = {
  filter?: Record<string, string | string[]>;
};

type Props<T, K extends QueryVariables> = {
  children: (options: TPaginatedLoaderParams<T>) => ReactNode;
  getKey?: string;
  omitUrl?: boolean;
  options?: LazyQueryHookOptions<T, K & PagingTypes>;
  page?: number;
  pageName?: string;
  perPage?: number;
  perPageName?: string;
  query: TypedDocumentNode<T, K & PagingTypes>;
};

type TParams = {
  page: string;
  perPage: string;
  perPageUrlName: string;
  pageUrlName: string;
};

function SharedPaginatedLoader<T, K extends QueryVariables>({
  children,
  getKey,
  omitUrl = false,
  pageName,
  perPageName,
  options,
  query,
  page: passedPage,
  perPage: passedPerPage,
}: Props<T, K>) {
  const variables = options?.variables;
  const perPageUrlName = perPageName || 'perPage';
  const pageUrlName = pageName || 'page';
  const history = useHistory();
  const { params, updateQueryParams } = useQueryParams<TParams>();
  const urlPerPage = omitUrl
    ? ''
    : params[perPageUrlName as keyof TParams] && parseInt(params[perPageUrlName as keyof TParams]);
  const urlPage = omitUrl
    ? 1
    : params[pageUrlName as keyof TParams] && parseInt(params[pageUrlName as keyof TParams]);
  const passedPerPageObject = passedPerPage && { value: passedPerPage };
  const urlPerPageObject = urlPerPage && { value: urlPerPage };
  const initialPerPage = passedPerPageObject || urlPerPageObject || PAGING.PER_PAGE_DEFAULT;
  const [page, setPage] = useState(passedPage || urlPage || PAGING.PAGE_DEFAULT);
  const [perPage, setPerPage] = useState<{ value: number }>(initialPerPage);
  const [nodesCount, setNodesCount] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const paginatedVariables = { ...variables, page, perPage: perPage.value } as K & PagingTypes;
  const [callQuery, { data, loading, error }] = useLazyQuery(query);

  const previousFilters = useRef<object | undefined>(variables);

  const setPageWithParams = useCallback(
    (page) => {
      setPage(page);
      !omitUrl && updateQueryParams({ [pageUrlName]: page });
    },
    [history, omitUrl]
  );

  useEffect(() => {
    let pageToQuery = paginatedVariables.page;

    if (variables && !isEqual(previousFilters.current, variables)) {
      previousFilters.current = variables;
      pageToQuery = 1;
      setPageWithParams(1);
    }

    callQuery({
      ...options,
      variables: { ...paginatedVariables, page: pageToQuery },
    });
  }, [page, variables, perPage]);

  useEffect(() => {
    if (data) {
      const firstKey = Object.keys(data)[0];

      const { nodesCount, pagesCount } = getKey
        ? getByStringKey(data, getKey)
        : (data as any)[firstKey];

      if (nodesCount === undefined && pagesCount === undefined) {
        throw "couldn't extract pages and nodes count, did you forget to add getKey props?";
      }

      setNodesCount(nodesCount);
      setPagesCount(pagesCount);
    }
  }, [data]);

  const nextPage = () => {
    const newPage = page + 1;
    setPageWithParams(newPage);
  };

  const prevPage = () => {
    const newPage = page - 1;
    setPageWithParams(newPage);
  };

  const selectPage = (page: number) => () => {
    setPageWithParams(page);
  };

  const onLastPage = useMemo(() => (pagesCount ? pagesCount <= page : false), [page, pagesCount]);
  const onFirstPage = useMemo(() => page === 1, [page]);

  return (
    <>
      {children({
        data,
        selectPage: setPageWithParams,
        selectPageHandler: selectPage,
        nextPage,
        prevPage,
        page,
        omitUrl,
        perPage,
        setPage,
        setPerPage,
        nodesCount,
        loading,
        error,
        pagesCount,
        onFirstPage,
        onLastPage,
        pageUrlName,
        perPageUrlName,
        refetchQuery: { query, variables: paginatedVariables },
      })}
    </>
  );
}

type TContentProps<T> = {
  children: (data: T) => ReactNode | Element;
  data: T | undefined;
  error?: ApolloError;
  loading: boolean;
  SpinnerComponent: ReactNode;
};

SharedPaginatedLoader.Content = function <T>({
  children,
  data,
  error,
  loading,
  SpinnerComponent,
}: TContentProps<T>) {
  const { t } = useTranslation();

  // eslint-disable-next-line no-console
  if (error && !IS_TEST_ENV) console.error(error);
  if (error)
    return (
      <span className='data-loader__error' data-testid='loader-error'>
        {t('shared.dataLoader.error')}
      </span>
    );

  const shouldRenderSpinner = loading || !data;
  const renderProperSpinner = () =>
    SpinnerComponent ? (
      <>{SpinnerComponent}</>
    ) : (
      <div>
        <SharedLoadingSpinner size='small' />
      </div>
    );

  return shouldRenderSpinner ? renderProperSpinner() : <>{children(data)}</>;
};

type TPerPageSelectorProps = {
  perPage: { value: number };
  setPage: (page: number) => void;
  setPerPage: (page: { value: number }) => void;
  omitUrl: boolean;
  pageUrlName: string;
  perPageUrlName: string;
};

SharedPaginatedLoader.PerPageSelector = function ({
  perPage,
  setPage,
  setPerPage,
  omitUrl,
  pageUrlName,
  perPageUrlName,
}: TPerPageSelectorProps) {
  const { t } = useTranslation();
  const { updateQueryParams } = useQueryParams();

  const changePerPage = (value: SingleValue<{ value: number }>) => {
    setPage(1);

    if (value) {
      setPerPage(value);
    }

    !omitUrl && updateQueryParams({ [pageUrlName]: 1, [perPageUrlName]: value?.value });
  };

  return (
    <div className='pagination__per-page'>
      {t('shared.paginatedLoader.perPage')}
      <Select
        className='pagination-per-page-selector'
        classNamePrefix='pagination__per-page'
        isSearchable={false}
        name='per-page'
        options={Object.values(PAGING.PER_PAGE_VARIANTS)}
        value={perPage}
        onChange={changePerPage}
      />
    </div>
  );
};

type TNextPageProps = {
  loading: boolean;
  nextPage: () => void;
  onLastPage: boolean;
  text: boolean;
  nodesCount: number;
};

SharedPaginatedLoader.NextPage = function ({
  loading,
  nextPage,
  onLastPage,
  nodesCount,
  text = true,
}: TNextPageProps) {
  const { t } = useTranslation();

  if (!nodesCount) {
    return null;
  }

  return (
    <button
      className='pagination__next-page'
      data-testid='pagination-next-page'
      disabled={onLastPage || loading}
      type='button'
      onClick={nextPage}>
      {text && t('shared.paginatedLoader.next')}
      <SharedIcon icon={<NextIcon />} size='xs' />
    </button>
  );
};

type TPreviousPageProps = {
  loading: boolean;
  prevPage: () => void;
  onFirstPage: boolean;
  text: boolean;
  nodesCount: number;
};

SharedPaginatedLoader.PreviousPage = function ({
  loading,
  onFirstPage,
  nodesCount,
  prevPage,
  text = true,
}: TPreviousPageProps) {
  const { t } = useTranslation();

  if (!nodesCount) {
    return null;
  }

  return (
    <button
      className='pagination__prev-page'
      data-testid='pagination-prev-page'
      disabled={onFirstPage || loading}
      type='button'
      onClick={prevPage}>
      <SharedIcon icon={<PrevIcon />} size='xs' />
      {text && t('shared.paginatedLoader.prev')}
    </button>
  );
};

type TRecordsInfoProps = {
  page: number;
  perPage: { value: number };
  nodesCount: number;
};

SharedPaginatedLoader.RecordsInfo = function ({ page, perPage, nodesCount }: TRecordsInfoProps) {
  const { t } = useTranslation();

  if (!nodesCount) {
    return null;
  }

  const getResultsInfo = (nodesCount: number) => {
    const from = nodesCount === 0 ? 0 : `${perPage.value * page - (perPage.value - 1)}`;
    const to = `${perPage.value * page}`;

    return parseInt(to) > nodesCount ? `${from} - ${nodesCount}` : `${from} - ${to}`;
  };

  return (
    <span className='text-neutral-600 m-xs' data-testid='pagination-records-info'>
      {nodesCount &&
        t('shared.paginatedLoader.recordsInfo', {
          results: getResultsInfo(nodesCount),
          totalRecords: nodesCount,
        })}
    </span>
  );
};

type TPagingSliderProps = {
  page: number;
  pagesCount: number;
  selectPageHandler: (page: number) => () => void;
};

SharedPaginatedLoader.PagingSlider = function ({
  page,
  pagesCount,
  selectPageHandler,
}: TPagingSliderProps) {
  const pagesForSlider = useMemo(
    () => generatePaginationItems(pagesCount, page),
    [pagesCount, page]
  );

  return (
    <ul className='flex gap-xs' data-testid='pagination-slider'>
      {pagesForSlider.map((listPage, index) => {
        const clickHandler = typeof listPage === 'number' ? selectPageHandler(listPage) : () => {};
        const kind = typeof listPage === 'number' ? 'page' : 'dots';
        const pageClasses = cx(
          'leading-[24px] rounded-xxs text-center min-w-[24px] h-base px-xxxs',
          `pagination__paging-slider-${kind}`,
          {
            'hover:bg-primary-200': kind === 'page',
            'bg-primary-200 text-primary-500': listPage === page,
          }
        );

        return (
          <li
            key={index}
            className={pageClasses}
            data-testid='pagination-slider-item'
            onClick={clickHandler}>
            {listPage}
          </li>
        );
      })}
    </ul>
  );
};

export default SharedPaginatedLoader;
