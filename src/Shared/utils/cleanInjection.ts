import DOMPurify, { Config } from 'dompurify';

type TDirty = string | Node;

const initialConfig: Config = {
  ADD_ATTR: ['target', 'longdesc', 'allowfullscreen', 'frameborder'],
  ADD_TAGS: ['iframe'],
};

export const cleanInjection = (dirty: TDirty, config: Config = {}) => ({
  __html: DOMPurify.sanitize(dirty, { ...initialConfig, ...config }) as string,
});
