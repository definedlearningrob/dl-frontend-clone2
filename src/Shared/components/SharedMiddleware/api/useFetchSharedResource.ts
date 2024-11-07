/* eslint-disable camelcase */
import { TOKEN_KEY as DC_TOKEN_KEY } from '@dc/resources/constants';

import { TOKEN_KEY as DL_TOKEN_KEY } from '@pbl/resources/constants';

import { TSharedResource } from '@shared/components/SharedMiddleware/utils/types';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useDetectApplicationType } from '@shared/hooks/useDetectApplicationType';

type QueryParams = {
  code: string;
  defined_learning_uuid?: string;
  reference_code?: string;
};

type ResponseData = {
  shared_resource: TSharedResource;
};

export const useFetchSharedResource = () => {
  const { appType, isPblApp } = useDetectApplicationType();
  const {
    params: { code, defined_learning_uuid, reference_code },
  } = useQueryParams<QueryParams>();

  const apiPath = isPblApp
    ? `${import.meta.env.VITE_DL_API_HOST}/api/learning/v1/shared_resource`
    : `${import.meta.env.VITE_DC_API_HOST}/api/v1/shared_resource`;

  const getSharedResource = async () => {
    const tokenKey = isPblApp ? DL_TOKEN_KEY : DC_TOKEN_KEY;
    const token = localStorage.getItem(tokenKey);
    const optionalHeaders = token && {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${apiPath}?code=${code}`, {
      headers: {
        ...optionalHeaders,
        'Service-Name': appType,
      },
    });
    const data = (await response.json()) as ResponseData;

    return {
      response,
      data,
    };
  };

  const postSharedResource = async () => {
    const response = await fetch(apiPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        defined_learning_uuid,
        ...(reference_code && { reference_code }),
      }),
    });
    const data = (await response.json()) as ResponseData;

    return {
      response,
      data,
    };
  };

  return { getSharedResource, postSharedResource };
};
