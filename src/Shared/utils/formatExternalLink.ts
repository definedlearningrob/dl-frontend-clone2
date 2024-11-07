import { trim } from 'lodash-es';

export const formatExternalLink = (url: string) => {
  if (url.match(/^http[s]?:\/\//)) {
    return url;
  }

  return 'https://' + trim(url, '/');
};
