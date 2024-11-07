import { NetworkStatus, useQuery } from '@apollo/client';
import { useField } from 'formik';
import { MultiValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

import {
  ENTITIES_WITH_CHILDREN,
  EntitiesWithChildrenData,
} from '@dc/graphql/user/queries/entitiesWithChildrens';
import { VISIBILITY_SCOPE } from '@dc/resources/enums';
import useUserInfo from '@dc/hooks/useUserInfo';

import { TreeSelect, TreeSelectOption } from '@shared/components/TreeSelect/TreeSelect';
import Checkbox from '@shared/components/Checkbox/Checkbox';

type EntitiesData = Pick<EntitiesWithChildrenData['entities'], 'nodes'>;

const PER_PAGE = 10;

type Props = {
  checkboxLabel?: string;
};

export const EntitySelect = ({ checkboxLabel = 'user.opportunities.globalOpportunity' }: Props) => {
  const [page, setPage] = useState(1);
  const { data, fetchMore, refetch, loading, networkStatus } = useQuery(ENTITIES_WITH_CHILDREN, {
    variables: { perPage: PER_PAGE, infiniteScroll: true },
    notifyOnNetworkStatusChange: true,
  });
  const { t } = useTranslation();
  const { isSystemAdminUser } = useUserInfo();

  const [entityUuidsField, meta, entityUuidHelpers] = useField('entityUuids');
  const [visibilityScopeField, , visibilityScopeHelpers] = useField('visibilityScope');
  const errorMessage = meta.error && meta.touched ? meta.error : undefined;
  const [internalValue, setInternalValue] = useState<MultiValue<TreeSelectOption>>(
    entityUuidsField.value
  );

  const entities = data?.entities?.nodes || [];

  const hasOneEntityWithoutChildren = entities.length === 1 && isEmpty(entities[0].children.nodes);

  useEffect(() => {
    if (!isEmpty(entities)) {
      if (isEmpty(internalValue) && hasOneEntityWithoutChildren) {
        setInternalValue([{ value: entities[0].uuid, label: entities[0].name, children: [] }]);
        entityUuidHelpers.setValue([{ value: entities[0].uuid, label: entities[0].name }]);
      }
    }
  }, [data]);

  const mapEntities = (entities: EntitiesData): TreeSelectOption[] => {
    if (isEmpty(entities.nodes)) {
      return [];
    }

    return entities.nodes.map((entity) => ({
      value: entity.uuid,
      label: entity.name,
      children: mapEntities(entity.children),
    }));
  };

  const handleSelect = () => {
    entityUuidHelpers.setValue(internalValue);
  };

  const handleFilter = (inputValue: string) => {
    refetch({ page: 1, filter: { nameCont: inputValue } });
    setPage(1);
  };

  const isGlobalOpportunity = visibilityScopeField.value === VISIBILITY_SCOPE.ALL;

  const handleVisibilityScopeChange = () => {
    if (isGlobalOpportunity) {
      visibilityScopeHelpers.setValue(VISIBILITY_SCOPE.ENTITY);
    } else {
      visibilityScopeHelpers.setValue(VISIBILITY_SCOPE.ALL);
    }
  };

  const handleFetchMore = () => {
    if (data && page < data.entities.pagesCount) {
      fetchMore({ variables: { page: page + 1, infiniteScroll: true } });
      setPage((prev) => prev + 1);
    }
  };

  const options = useMemo(() => (data ? mapEntities(data.entities) : []), [data]);

  return (
    <>
      <TreeSelect
        errorMessage={errorMessage}
        isDisabled={isGlobalOpportunity || hasOneEntityWithoutChildren}
        isLoading={loading || networkStatus === NetworkStatus.fetchMore}
        isRequired={true}
        isRootSelectable={true}
        label={t('user.opportunities.entity')}
        limitedWidth={true}
        name='entityUuids'
        options={options}
        placeholder={t('user.opportunities.entityPlaceholder')}
        showError={!!errorMessage}
        value={isGlobalOpportunity ? [] : internalValue}
        onBlur={handleSelect}
        onChange={setInternalValue}
        onFilter={handleFilter}
        onMenuScrollToBottom={handleFetchMore}
      />
      {isSystemAdminUser && (
        <Checkbox
          checked={isGlobalOpportunity}
          className='!text-xs mb-sm'
          label={t(`${checkboxLabel}`)}
          labelClassName='!text-font-secondary'
          name='visibilityScope'
          value={visibilityScopeField.value}
          onChange={handleVisibilityScopeChange}
        />
      )}
    </>
  );
};
