import { SHARED_LINK_APP_TYPE } from '@shared/resources/enums';

export const createSharedLink = (code: string, appType: SHARED_LINK_APP_TYPE) => {
  const key = `VITE_${appType}_FRONTEND_HOST`;
  const host = import.meta.env[key];

  return `${host}/shared?code=${code}`;
};
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
