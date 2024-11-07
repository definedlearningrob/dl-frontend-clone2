import { useDefinedLearningUuidQuery } from '@graphql/shared/shared/hooks';
import { omit } from 'lodash-es';
import qs from 'qs';
import { useEffect, useRef, useCallback } from 'react';

import { useRole } from './useRole';

type Props = {
  iframeUrl: string | null | undefined;
};

const customizationParams = ['externalApp', 'mic', 'cam', 'uuid'];

export const useCustomizeIframe = ({ iframeUrl }: Props) => {
  const { isPublic } = useRole();

  const { data } = useDefinedLearningUuidQuery({ skip: isPublic });

  const definedLearningUuid = data?.userInfo?.definedLearningUuid;

  if (!iframeUrl) {
    return { iframeRef: () => {}, iframeSrc: iframeUrl };
  }

  const url = new URL(iframeUrl);

  const query = qs.parse(url.search, { ignoreQueryPrefix: true });
  const customizations = customizationParams.filter((param) => param in query);

  const queryParamsWithoutCustom = omit(query, customizationParams);

  const hasExternalAppParam = customizations.includes('externalApp');
  const hasMicParam = customizations.includes('mic');
  const hasCamParam = customizations.includes('cam');
  const hasUuidParam = customizations.includes('uuid');

  const shouldIncludeUuid = definedLearningUuid && (hasUuidParam || hasExternalAppParam);

  const mergedParams = {
    ...queryParamsWithoutCustom,
    ...(shouldIncludeUuid && { definedLearningUuid }),
  };

  url.search = qs.stringify(mergedParams, { addQueryPrefix: true });

  const ref = useRef<HTMLIFrameElement | null>(null);

  const setRef = useCallback((node: HTMLIFrameElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    if (ref.current) {
      const permissions = [];

      if ((hasCamParam || hasExternalAppParam) && !ref.current.allow.includes('camera')) {
        permissions.push('camera');
      }

      if ((hasMicParam || hasExternalAppParam) && !ref.current.allow.includes('microphone')) {
        permissions.push('microphone');
      }

      ref.current.allow = `${ref.current.allow || ''} ${permissions.join('; ')}`.trim();

      ref.current.src = url.href;
    }
  }, [ref.current]);

  return { iframeRef: setRef, iframeSrc: url.href };
};
