import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { NetworkStatus } from '@apollo/client';
import { InputActionMeta } from 'react-select';
import { debounce } from 'lodash-es';
import { PartnerStatuses } from '@graphql/dc/users/types';

import { Select, SelectProps } from '@shared/components/Select';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { useRole } from '@shared/hooks/useRole';

import { usePartnerOptionsQuery } from './usePartnerOptionsQuery';

export type PartnerOption = { label: string; value: string };

export const PartnerSelect = <IsMulti extends boolean>({
  label,
  ...props
}: SelectProps<PartnerOption, IsMulti>) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [page, setPage] = useState(1);
  const { isUser } = useRole();

  const { data, fetchMore, refetch, loading, networkStatus } = usePartnerOptionsQuery();

  const options = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.partners.nodes
      .filter((partner) => {
        if (isUser && 'status' in partner) {
          return partner.status === PartnerStatuses.PUBLISHED;
        }

        return true;
      })
      .map((partner) => ({
        label: partner.name,
        value: partner.id,
      }));
  }, [data]);

  const handleFetchMore = () => {
    if (data && page < data.partners.pagesCount) {
      fetchMore({ variables: { page: page + 1, infiniteScroll: true } });
      setPage((prev) => prev + 1);
    }
  };

  const handleInputChange = (inputValue: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action === 'input-change' || actionMeta.action === 'input-blur') {
      refetch({ page: 1, filter: { nameCont: inputValue } });
      setPage(1);
    }
  };

  const debouncedInputChange = useMemo(() => debounce(handleInputChange, 300), []);

  return (
    <Select
      filterOption={null}
      isLoading={loading || networkStatus === NetworkStatus.fetchMore}
      label={label ?? t('partners.partner')}
      name='partner'
      options={options}
      size={isFullHD ? 'md' : 'sm'}
      onInputChange={debouncedInputChange}
      onMenuScrollToBottom={handleFetchMore}
      {...props}
    />
  );
};
