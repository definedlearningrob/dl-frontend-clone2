import { useHistory } from 'react-router-dom';

export type TParams<T> = { [key in keyof Partial<T>]: string };

function useQueryParams<T>() {
  const history = useHistory();

  const getParamsWithRemoved = (paramNames: Array<keyof T>) => {
    const params = new URLSearchParams(history.location.search);
    paramNames.forEach((name) => params.delete(name as string));

    return params.toString();
  };

  const getUpdatedQueryParams = (paramsToAdd: TParams<T>) => {
    const params = new URLSearchParams(history.location.search);

    Object.keys(paramsToAdd).forEach((paramKey: string) => {
      const paramExistsInSearch = history.location.search.includes(paramKey);

      if (paramExistsInSearch) {
        params.delete(paramKey);
        params.append(paramKey, paramsToAdd[paramKey as keyof T]);
      } else {
        params.append(paramKey, paramsToAdd[paramKey as keyof T]);
      }
    });

    return params.toString();
  };

  const getParams = () => {
    const params = new URLSearchParams(history.location.search);

    const paramsEntries = [];

    for (let param of params.entries()) {
      paramsEntries.push(param);
    }

    return paramsEntries.reduce((acc, param) => ({ ...acc, [param[0]]: param[1] }), {});
  };

  const updateQueryParams = (params: TParams<T>, { withPush }: { withPush?: boolean } = {}) => {
    const search = getUpdatedQueryParams(params);
    withPush
      ? history.push({ search, state: history.location.state })
      : history.replace({ search, state: history.location.state });
  };

  const removeQueryParams = (params: Array<keyof T>, { withPush }: { withPush?: boolean } = {}) => {
    const search = getParamsWithRemoved(params);
    withPush
      ? history.push({ search, state: history.location.state })
      : history.replace({ search, state: history.location.state });
  };

  return {
    params: getParams() as T,
    updateQueryParams,
    removeQueryParams,
  };
}

export default useQueryParams;
