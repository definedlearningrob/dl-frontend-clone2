import { NetworkStatus, useQuery } from '@apollo/client';
import { GroupBase, MultiValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

import {
  ENTITIES_WITH_CHILDREN,
  EntitiesWithChildrenData,
} from '@dc/graphql/user/queries/entitiesWithChildrens';

import { TreeSelect, TreeSelectOption } from '@shared/components/TreeSelect/TreeSelect';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { SelectProps } from '@shared/components/Select';

type EntitiesData = Pick<EntitiesWithChildrenData['entities'], 'nodes'>;

const PER_PAGE = 10;

const getEntitiesOptions = (entities: EntitiesData | undefined): TreeSelectOption[] =>
  !isEmpty(entities)
    ? entities.nodes.map((entity) => ({
        value: entity.uuid,
        label: entity.name,
        children: getEntitiesOptions(entity.children),
      }))
    : [];

export const EntitiesSelect = ({
  isDisabled,
  value,
  onChange,
  errorMessage,
  isRequired,
}: SelectProps<TreeSelectOption, true, GroupBase<TreeSelectOption>> & {
  isRequired?: boolean;
  isDisabled?: boolean;
  value?: MultiValue<TreeSelectOption>;
  onChange: (values: MultiValue<TreeSelectOption>) => void;
  errorMessage?: string;
  initialValue?: MultiValue<TreeSelectOption>;
}) => {
  const [page, setPage] = useState(1);

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { data, fetchMore, refetch, loading, networkStatus } = useQuery(ENTITIES_WITH_CHILDREN, {
    variables: { perPage: PER_PAGE, page: 1, filter: { nameCont: '' } },
    notifyOnNetworkStatusChange: true,
  });

  const { t } = useTranslation();

  const entities = data?.entities?.nodes || [];

  const firstEntity = entities[0];

  const hasOneEntityWithoutChildren = entities.length === 1 && isEmpty(firstEntity.children.nodes);

  useEffect(() => {
    if (hasOneEntityWithoutChildren) {
      onChange([{ value: firstEntity.uuid, label: firstEntity.name, children: [] }]);
    }
  }, [data]);

  const handleFilter = (inputValue: string) => {
    refetch({ page: 1, filter: { nameCont: inputValue } });
    setPage(1);
  };

  const handleFetchMore = () => {
    if (data && page < data.entities.pagesCount) {
      fetchMore({ variables: { page: page + 1, infiniteScroll: true } });
      setPage((prev) => prev + 1);
    }
  };

  const options = useMemo(() => getEntitiesOptions(data?.entities), [data]);

  return (
    <TreeSelect
      errorMessage={errorMessage}
      isDisabled={isDisabled || hasOneEntityWithoutChildren}
      isLoading={loading || networkStatus === NetworkStatus.fetchMore}
      isRequired={isRequired}
      isRootSelectable={true}
      label={t('user.opportunities.entityLabel')}
      name='entityUuids'
      options={options}
      placeholder={t('user.opportunities.entityPlaceholder')}
      showError={!!errorMessage}
      size={isFullHD ? 'md' : 'sm'}
      value={value}
      onChange={onChange}
      onFilter={handleFilter}
      onMenuScrollToBottom={handleFetchMore}
    />
  );
};
