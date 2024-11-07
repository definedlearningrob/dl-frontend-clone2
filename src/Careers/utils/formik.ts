import { objectMap } from '@dc/utils/object';

export const formatFormikInitialValues = (initialValues: Record<string, unknown>) =>
  objectMap(initialValues, (value: null | unknown) => (value === null ? '' : value));
