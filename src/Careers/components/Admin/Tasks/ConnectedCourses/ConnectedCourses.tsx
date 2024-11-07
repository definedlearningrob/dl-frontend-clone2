import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

import courseOptionsQuery, {
  TCourseOption,
  TCourseOptionsData,
  TCourseOptionsVariables,
} from '@dc/graphql/user/queries/courseOptions';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import { SelectableCourseList } from '@dc/components/Admin/Tasks/ConnectedCourses';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import Card from '@shared/components/Card/Card';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';

type Props = {
  error: string;
};

const ConnectedCourses = ({ error }: Props) => {
  const { t } = useTranslation();
  const [connectedCoursesInput] = useField('courses');

  const handleEditClick = (course: TCourseOption) => {
    window.open(`/admin/courses/${course.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <Card>
      <h4>{t('admin.courses.label')}</h4>
      <div className='flex gap-sm'>
        <FilterProvider omitUrl={true}>
          {({ SearchBar, filter }) => (
            <SharedPaginatedLoader<TCourseOptionsData, TCourseOptionsVariables>
              omitUrl={true}
              options={{
                variables: {
                  filter: { ...filter, statusEq: PUBLISHING_STATUSES.PUBLISHED },
                },
              }}
              query={courseOptionsQuery}>
              {(renderProps) => (
                <SelectableCourseList
                  SearchBar={SearchBar}
                  pagingProps={renderProps}
                  onEditClick={handleEditClick}
                />
              )}
            </SharedPaginatedLoader>
          )}
        </FilterProvider>
        <ListWrapper
          title={`${t('common.statuses.selected')} (${connectedCoursesInput.value.length})`}>
          <SortableSelectedList
            error={error}
            field='courses'
            items={connectedCoursesInput.value}
            onEditClick={handleEditClick}
          />
        </ListWrapper>
      </div>
    </Card>
  );
};

export default ConnectedCourses;
