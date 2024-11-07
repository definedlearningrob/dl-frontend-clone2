import { ApolloError, DocumentNode, TypedDocumentNode, useLazyQuery } from '@apollo/client';
import { get } from 'lodash-es';
import { GroupBase } from 'react-select';
import { useTranslation } from 'react-i18next';

import { callToast } from '@shared/components/Toaster/Toaster';

import { AsyncSelect, AsyncSelectProps } from './AsyncSelect';

type Props<
  Option extends { label: string; value: string | number },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<AsyncSelectProps<Option, IsMulti, Group>, 'loadOptions'> & {
  filterName?: string;
  query: DocumentNode | TypedDocumentNode;
  dataKey: string;
  optionValueKey?: string;
  optionLabelKey?: string;
};

export const QueryAsyncSelect = <
  Option extends { label: string; value: string | number },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  query,
  dataKey,
  optionLabelKey = 'name',
  optionValueKey = 'id',
  filterName = 'nameCont',
  isMulti,
  showAllOption,
  ...props
}: Props<Option, IsMulti, Group>) => {
  const { t } = useTranslation();
  const [callQuery] = useLazyQuery(query, { fetchPolicy: 'network-only' });

  const loadOptions = async (inputValue: string) => {
    try {
      const { data } = await callQuery({
        variables: { perPage: 100, filter: { [filterName]: inputValue } },
      });

      return get(data, dataKey).map((option: Record<string, unknown>) => ({
        label: option[optionLabelKey],
        value: option[optionValueKey],
      }));
    } catch (error) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return (
    <AsyncSelect
      isMulti={isMulti}
      loadOptions={loadOptions}
      showAllOption={showAllOption}
      {...props}
    />
  );
};
