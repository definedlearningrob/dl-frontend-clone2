import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import Tasks from '@dc/components/Admin/Units/Form/Tasks/Tasks';
import tasksQuery from '@dc/graphql/user/queries/tasks';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import { useToggle } from '@shared/hooks/useToggle';
export const AdminTask = () => {
  const [isWithCopies, toggleIsWithCopies] = useToggle(false);

  return (
    <FilterProvider omitUrl={true}>
      {({ SearchBar, filter }) => (
        <SharedPaginatedLoader
          omitUrl={true}
          options={{
            variables: {
              filter,
              scope: ARCHIVABLE_STATUSES.ACTIVE.value,
              withCopies: isWithCopies,
            },
          }}
          query={tasksQuery}>
          {(props) => (
            <Tasks
              SearchBar={SearchBar}
              isWithCopies={isWithCopies}
              pagingProps={props}
              toggleIsWithCopies={toggleIsWithCopies}
            />
          )}
        </SharedPaginatedLoader>
      )}
    </FilterProvider>
  );
};
