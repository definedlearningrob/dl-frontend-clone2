import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { UnitQuery } from '@graphql/dc/users/operations';
import { Get } from 'type-fest';
import { UnitResourceTypes } from '@graphql/dc/users/types';

import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import coursesQuery, { TCoursesData, TCoursesVariables } from '@dc/graphql/user/queries/courses';
import { AdminCourses } from '@dc/components/Admin/Units/Form/CourseOpportunity/AdminCourses';
import { AdminOpportunity } from '@dc/components/Admin/Units/Form/CourseOpportunity/AdminOpportunity';
import {
  OPPORTUNITIES_QUERY,
  TOpportunitiesData,
  TOpportunitiesVariables,
} from '@dc/graphql/user/queries/opportunities';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import Card from '@shared/components/Card/Card';
import { KickerVariant } from '@shared/components/Kicker';
import { useToggle } from '@shared/hooks/useToggle';

type UnitResource = Get<UnitQuery, 'unit.resources.0'>;
type UnitResourceWithId = UnitResource & { id: string };

export const CourseAndOpportunity = () => {
  const { t } = useTranslation();
  const [resourcesInput] = useField<UnitResourceWithId[]>('unitResources');

  const getKicker = (resource: UnitResourceWithId) => {
    if (resource.resourceType === UnitResourceTypes.COURSE) {
      return {
        text: t(`admin.units.label.course`),
        variant: 'default' as KickerVariant,
      };
    }
    const resourceTypeKey = resource.isVirtualInternship ? 'virtualInternship' : 'opportunity';
    const kickerText = t(`admin.units.label.${resourceTypeKey}`);

    return { text: kickerText, variant: 'default' as KickerVariant };
  };

  const handleEditClick = (resource: UnitResourceWithId) => {
    if (resource.resourceType === 'COURSE') {
      window.open(`/admin/courses/${resource.resourceId}/edit`, '_blank', 'noreferrer');

      return;
    }

    const url = resource.isVirtualInternship
      ? `/opportunities/${resource.resourceId}/edit`
      : `/admin/virtual-internships/${resource.resourceId}/edit`;

    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <Card>
      <h4>{t('admin.units.selectedCoursesAndOpportunities')}</h4>
      <ListWrapper title={`${t('common.statuses.selected')} (${resourcesInput.value.length})`}>
        <SortableSelectedList
          field='unitResources'
          getKicker={getKicker}
          items={resourcesInput.value}
          onEditClick={handleEditClick}
        />
      </ListWrapper>

      <div className='admin-form__details-lists mt-base'>
        <FilterProvider omitUrl={true}>
          {({ SearchBar, filter }) => {
            const [withCopies, toggleIsWithCopies] = useToggle(false);
            const variables = useMemo(() => ({ filter, withCopies }), [filter, withCopies]);

            return (
              <SharedPaginatedLoader<TCoursesData, TCoursesVariables>
                omitUrl={true}
                options={{
                  variables,
                }}
                query={coursesQuery}>
                {(props) => (
                  <AdminCourses
                    SearchBar={SearchBar}
                    pagingProps={props}
                    toggleIsWithCopies={toggleIsWithCopies}
                    withCopies={withCopies}
                  />
                )}
              </SharedPaginatedLoader>
            );
          }}
        </FilterProvider>
        <FilterProvider omitUrl={true}>
          {({ SearchBar, filter }) => {
            const variables = useMemo(() => ({ filter }), [filter]);

            return (
              <SharedPaginatedLoader<TOpportunitiesData, TOpportunitiesVariables>
                omitUrl={true}
                options={{
                  fetchPolicy: 'network-only',
                  variables,
                }}
                query={OPPORTUNITIES_QUERY}>
                {(props) => <AdminOpportunity SearchBar={SearchBar} pagingProps={props} />}
              </SharedPaginatedLoader>
            );
          }}
        </FilterProvider>
      </div>
    </Card>
  );
};
