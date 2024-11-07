import { useTranslation } from 'react-i18next';

import camelize from '@shared/utils/camelize';

type Props = {
  options: object;
  defaultOption: string;
  baseKey: string;
};

function useHardcodedOptions<T>({ options, defaultOption, baseKey }: Props) {
  const { t } = useTranslation();

  const parsedOptions = Object.keys(options).map((key) => ({
    value: key as any as T,
    label: t(`${baseKey}.${camelize(key)}`),
  }));

  const parsedDefaultOption = {
    value: defaultOption as any as T,
    label: t(`${baseKey}.${camelize(defaultOption)}`),
  };

  return {
    options: parsedOptions,
    defaultOption: parsedDefaultOption,
  };
}

export default useHardcodedOptions;
