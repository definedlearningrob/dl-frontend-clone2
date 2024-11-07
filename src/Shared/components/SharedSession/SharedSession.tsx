import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { loginSharedSessionAction } from '@dc/redux/session/actions';
import { TRootState } from '@dc/redux/reducers';

import { loginSharedSessionAction as loginSharedSessionActionPBL } from '@pbl/redux/session/actions';

import useQueryParams from '@shared/hooks/useQueryParams';

import SharedLoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const resourceMap = {
  course: '/courses',
};

export type AvailableSharedSessionResources = keyof typeof resourceMap;

type Params = {
  token: string;
  resource?: AvailableSharedSessionResources;
  id?: string;
};

type Props = {
  type: 'DL' | 'DC';
};

/**
  Shared Session component handling the login on /shared-session route
  * @param {String} type
  * @example
  * <SharedSession type='DC' />
  * @returns {JSX.Element} - Loader or Redirect
 */
export const SharedSession = ({ type }: Props) => {
  const { user } = useSelector((state: TRootState) => state.session);
  const { params } = useQueryParams<Params>();
  const dispatch = useDispatch();

  const isResourceIncluded = params.resource && params.id;

  useEffect(() => {
    if (user) return;

    type === 'DC'
      ? dispatch(loginSharedSessionAction(params.token))
      : dispatch(loginSharedSessionActionPBL(params.token));
  }, [user]);

  if (!user) {
    return <SharedLoadingSpinner size='full-screen' />;
  }

  if (isResourceIncluded) {
    return <Redirect push={false} to={`${resourceMap[params.resource!]}/${params.id}`} />;
  }

  return <Redirect push={false} to='/' />;
};

export const SHARED_SESSION_URL_SUFFIX = `/shared-session`;

const SHARED_SESSION_URL_DC = `${
  import.meta.env.VITE_DC_FRONTEND_HOST
}${SHARED_SESSION_URL_SUFFIX}`;

const SHARED_SESSION_URL_DL = `${
  import.meta.env.VITE_PBL_FRONTEND_HOST
}${SHARED_SESSION_URL_SUFFIX}`;

const createParams = (token: string, resource?: AvailableSharedSessionResources, id?: string) => {
  const params = new URLSearchParams();

  params.append('token', token);

  if (resource && id) {
    params.append('resource', resource);
    params.append('id', id);
  }

  return params;
};

/**
  To be used when creating a shared session link from DL to DC
  * @param {String} token
  * @param {AvailableSharedSessionResources} resource (optional)
  * @param {String} id (optional)
  * @example
  * const url = createDCSessionUrl(token, 'course', '123');
  * @returns {String} Returns the value of url with the params
 */
export const createDCSessionUrl = (
  token: string,
  resource?: AvailableSharedSessionResources,
  id?: string
): string => {
  const params = createParams(token, resource, id);

  return `${SHARED_SESSION_URL_DC}?${params.toString()}`;
};

/**
  To be used when creating a shared session link from DC to DL
  * @param {String} token
  * @param {AvailableSharedSessionResources} resource (optional)
  * @param {String} id (optional)
  * @example
  * const url = createDLSessionUrl(token, 'project', '123');
  * @returns {String} Returns the value of url with the params
 */
export const createDLSessionUrl = (
  token: string,
  resource?: AvailableSharedSessionResources,
  id?: string
): string => {
  const params = createParams(token, resource, id);

  return `${SHARED_SESSION_URL_DL}?${params.toString()}`;
};
