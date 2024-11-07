import { useTranslation } from 'react-i18next';
import { FieldArrayRenderProps, useField } from 'formik';
import { useMemo, useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { isEmpty, omit, xor } from 'lodash-es';
import { useApolloClient } from '@apollo/client';
import { filter } from 'lodash-es';

import { useTagsQuery } from '@dc/graphql/user/hooks/useTagsQuery';
import { TTag } from '@dc/graphql/user/queries/tag';
import { TagTypes } from '@dc/resources/enums';
import { useCreateTag } from '@dc/graphql/user/hooks/useCreateTag';

import { Select } from '@shared/components/Select';
import {
  MultilineSelect,
  MultilineSelectRef,
} from '@shared/components/MultilineSelect/MultilineSelect';
import { NewTable, NewTableRef, TableColumns } from '@shared/components/NewTable/NewTable';
import { cx } from '@shared/utils/cx';
import { RubricHeadingFormValues } from '@shared/components/RubricsEditor/EditRubricsHeadingModal/EditRubricsHeadingModal';
import { Badge } from '@shared/components/Badge/Badge';
import { Tooltip } from '@shared/components/Tooltip';

type Props = FieldArrayRenderProps;

type Option = {
  label: string;
  value: string;
};

const NEW_TAG_ID = 'addNewTag';

export const TagsSelector = ({ remove, push }: Props) => {
  const [tagsField] = useField<RubricHeadingFormValues['tags']>('tags');

  const { data: tagsData, refetch, fetchMore } = useTagsQuery({ infiniteScroll: true });
  const { t } = useTranslation();
  const { createTag } = useCreateTag();

  const tableRef = useRef<NewTableRef | null>(null);
  const multilineSelectRef = useRef<MultilineSelectRef | null>(null);

  const client = useApolloClient();

  const initialSelectedRows = useMemo(() => tagsField.value.map((tag) => tag.id), []);

  const allCachedTags = filter(
    client.cache.extract(true),
    (cacheElement: Record<string, unknown>) => cacheElement.__typename === 'Tag'
  ) as TTag[];

  const [tagsFilters, setTagsFilters] = useState<{
    nameCont?: string;
    typeEq?: string;
  }>({
    nameCont: undefined,
    typeEq: undefined,
  });

  useUpdateEffect(() => {
    tableRef.current?.setPageIndex(0);
    tableRef.current?.scrollTableTop();

    refetch({ filter: tagsFilters, page: 1, infiniteScroll: true });
  }, [tagsFilters, refetch]);

  const tagTypes = [
    { value: 'SYSTEM', label: t('components.rubric.system') },
    { value: 'ENTITY', label: t('components.rubric.entity') },
  ] as Option[];

  const columns: TableColumns<TTag> = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: t('components.rubric.performanceIndicator'),
        size: 250,
        cell: (params) => (
          <Tooltip delayDuration={400} message={params.row.original.name}>
            <div className='text-ellipsis overflow-hidden'>{params.row.original.name}</div>
          </Tooltip>
        ),
      },
      {
        accessorKey: 'type',
        header: t('components.rubric.type'),
        cell: (params) => {
          const isEntityTag = params.row.original.type === TagTypes.ENTITY;

          const badgeClassname = cx('inline w-fit group-hover/row:!bg-white', {
            '!bg-white': params.row.getIsSelected(),
          });

          return (
            <Badge
              className={badgeClassname}
              size='small'
              type={isEntityTag ? 'primary' : 'secondary'}>
              {isEntityTag ? t('components.rubric.entity') : t('components.rubric.system')}
            </Badge>
          );
        },
      },
    ],
    []
  );

  if (!tagsData) return null;

  const { tags } = tagsData;

  const options = !isEmpty(tagsField.value)
    ? tagsField.value.map((tag) => ({
        label: tag?.name || '',
        value: tag?.id || '',
      }))
    : [{ label: t('components.rubric.addNewPerformanceIndicator'), value: NEW_TAG_ID }];

  const handleTypeChange = (option: Option | null) => {
    setTagsFilters((prev) => ({ ...prev, typeEq: option?.value ?? undefined }));
  };

  const handleKeywordChange = (keyword: string) => {
    setTagsFilters((prev) => ({ ...prev, nameCont: keyword ?? undefined }));
  };

  const handleAddNewTag = async () => {
    const tag = {
      name: tagsFilters.nameCont!,
      isDefault: false,
      type: TagTypes.SYSTEM,
    };

    const res = await createTag(tag);

    const newlyCreatedTag = res.result?.data?.createTag.tag;

    if (newlyCreatedTag) {
      push(newlyCreatedTag);

      tableRef.current?.setRowSelection((current) => ({
        ...omit(current, NEW_TAG_ID),
        [newlyCreatedTag.id]: true,
      }));

      multilineSelectRef.current?.focusTextInput();
      multilineSelectRef.current?.clearTextInput();

      handleKeywordChange('');
    }
  };

  const selectValue = tagsField.value.map((tag) => tag?.id || '');

  const handleSelectRow = async (selectedTags: string[]) => {
    if (selectedTags.includes(NEW_TAG_ID) && !isEmpty(tagsFilters.nameCont)) {
      await handleAddNewTag();

      return;
    }

    const previousTags = tagsField.value.map((tag) => tag.id);

    const [tagId] = xor(previousTags, selectedTags);

    if (!tagId) return;

    const isRemoving = selectedTags.length < previousTags.length;

    if (isRemoving) {
      const indexToRemove = tagsField.value.findIndex((tag) => tag.id === tagId);
      remove(indexToRemove);

      return;
    }

    const tagToAdd = allCachedTags.find((node) => node.id === tagId);

    push(tagToAdd);
  };

  const handleFetchMoreTags = (nextPage: number) => {
    if (tagsFilters.nameCont) return;

    fetchMore({ variables: { page: nextPage + 1, infiniteScroll: true } });
  };

  const handleUnselectTag = (tagId: string) => {
    tableRef.current?.setRowSelection((current) => omit(current, tagId));
  };

  const hasKeywordFilterApplied =
    !isEmpty(tagsFilters.nameCont) && !tags.nodes.find((tag) => tag.name === tagsFilters.nameCont);

  const tableData = hasKeywordFilterApplied
    ? [
        {
          id: NEW_TAG_ID,
          name: t('components.rubric.addNewPlaceholder', {
            performanceIndicatorName: tagsFilters.nameCont,
          }),
        } as TTag,
        ...tags.nodes,
      ]
    : tags.nodes;

  return (
    <div className='flex flex-col grow relative h-0'>
      <div className='flex gap-lg'>
        <h5 className='text-xs mb-xs'>{t('components.rubric.performanceIndicators')}</h5>
        <Select
          className='ms-auto min-w-[200px] !absolute top-0 right-0 z-highest'
          isClearable={true}
          options={tagTypes}
          placeholder={t('components.rubric.selectType')}
          size='sm'
          onChange={handleTypeChange}
        />
      </div>
      <MultilineSelect
        ref={multilineSelectRef}
        isRequired={false}
        label={t('components.rubric.addPerformanceIndicators')}
        options={options}
        placeholder={t('components.rubric.searchByName')}
        value={selectValue}
        onRemove={handleUnselectTag}
        onSearch={handleKeywordChange}
      />
      <NewTable
        apiRef={tableRef}
        columns={columns}
        data={tableData}
        enableRowSelection={true}
        fetchMore={handleFetchMoreTags}
        initialSelectedRows={initialSelectedRows}
        pagesCount={tags.pagesCount}
        selectColumnSize={20}
        onSelectRow={handleSelectRow}
      />
    </div>
  );
};
