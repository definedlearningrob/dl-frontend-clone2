import { ChangeEvent } from 'react';
import { MultiValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { Select } from '@shared/components/Select';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as SearchIcon } from '@shared/assets/icons/search.svg';
import { Option } from '@shared/components/MultilineSelect/MultilineSelect';
import { useTagsReportFilters } from '@shared/components/TagsReport/useTagsReportFilters';
import { TAG_OPTIONS } from '@shared/graphql/user/query/tagOptions';
import { ALL_OPTION } from '@shared/components/MultiSelect';

type Props = {
  handleChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeTags: (newValue: MultiValue<Option>) => void;
};

export const TagsTableFilters = ({ handleChangeSearch, handleChangeTags }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const { appliedFilters } = useTagsReportFilters();
  const { data: tagsData } = useQuery(TAG_OPTIONS, { variables: { page: 1, perPage: 1000 } });

  const { tags } = appliedFilters;

  const isAllTagsSelected =
    appliedFilters.tags.length === 1 && appliedFilters.tags[0].value === ALL_OPTION.value;

  const tagOptions = isAllTagsSelected
    ? tagsData?.tags.nodes.map((tag) => ({
        value: tag.id,
        label: tag.name,
      }))
    : tags;

  return (
    <div className='flex gap-sm xxxl:gap-base items-center bg-neutral-200 px-sm py-xs xxxl:px-base xxxl:py-x rounded-t-sm'>
      <TextInput
        Icon={SearchIcon}
        className='!w-[240px] xxxl:w-[320px]'
        iconPlacement='end'
        placeholder={t('reports.tagReport.tableSearchPlaceholder')}
        size={isFullHD ? 'md' : 'sm'}
        onChange={handleChangeSearch}
      />
      <Select
        className='w-[240px] xxxl:w-[320px]'
        isClearable={true}
        isMulti={true}
        options={tagOptions}
        placeholder={t('reports.tagReport.tableTagDropdownPlaceholder')}
        size={isFullHD ? 'md' : 'sm'}
        onChange={handleChangeTags}
      />
    </div>
  );
};
