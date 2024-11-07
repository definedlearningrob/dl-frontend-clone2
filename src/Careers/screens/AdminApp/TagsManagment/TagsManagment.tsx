import { useEffect } from 'react';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { TagsManagementContent } from '@dc/components/Admin/TagsManagement/TagsManagementContent';
import { TagFilter } from '@dc/components/Admin/TagsManagement/TagsFilters/TagFilter';
import { TagFiltersProvider } from '@dc/components/Admin/TagsManagement/TagsFilters/TagFiltersProvider';

import SharedCard from '@shared/components/Card/Card';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

export const TagsManagment = () => {
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <TagFiltersProvider>
      <SharedMainContent>
        <TagFilter />
        <SharedCard className='flex flex-col h-full' withoutPadding={true}>
          <TagsManagementContent />
        </SharedCard>
      </SharedMainContent>
    </TagFiltersProvider>
  );
};
