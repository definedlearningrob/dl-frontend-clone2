import { ObservableQueryFields, useApolloClient } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '@dc/components/User/SchoolClass/Header/Header';
import schoolClassQuery from '@dc/graphql/user/queries/schoolClass';
import type { TSchoolClassData, TSchoolClassVariables } from '@dc/graphql/user/queries/schoolClass';
import schoolClassWithStudentsQuery from '@dc/graphql/user/queries/schoolClassWithStudents';
import type {
  TSchoolClassWithStudentsData,
  TSchoolClassWithStudentsVariables,
} from '@dc/graphql/user/queries/schoolClassWithStudents';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import StudentList from '@dc/components/User/SchoolClass/StudentList/StudentList';
import UserSchoolClassHeaderSkeleton from '@dc/components/User/SchoolClass/Header/Skeleton/HeaderSkeleton';
import UserSchoolClassList from '@dc/components/User/SchoolClass/StudentList/Skeleton/StudentListSkeleton';
import useUserInfo from '@dc/hooks/useUserInfo';
import { ArchivableStatusTypes, Roles } from '@dc/resources/enums';
import { SCHOOLCLASS_STUDENTS_PER_PAGE } from '@dc/resources/constants';
import type { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import '@dc/screens/UserApp/SchoolClass/SchoolClass.sass';

import SharedInfiniteScrollContainer from '@shared/components/InfiniteScrollContainer/InfiniteScrollContainer';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function UserAppSchoolClass() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filtering, setFiltering] = useState(false);
  const { userInfo } = useUserInfo<TUserInfo>();
  const { setBackNavButton } = useNavigation();
  const { uuid } = useParams<{ uuid: string }>();
  const client = useApolloClient();
  const history = useHistory();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  const clearCache = () =>
    client.cache.modify({
      id: client.cache.identify({ uuid, __typename: 'SchoolClass' }),
      fields: {
        students: (_, details) => details.DELETE,
      },
    });

  // This is a little hack to force destroy and mount component with cleared cache.
  // This is for infinite scroll to works properly
  const onFilterChange = () => {
    setFiltering(true);
    setCurrentPage(1);
    clearCache();
    setTimeout(() => setFiltering(false), 0);
  };

  const onShowMore =
    (
      fetchMore:
        | ObservableQueryFields<
            TSchoolClassWithStudentsData,
            TSchoolClassWithStudentsVariables
          >['fetchMore']
        | undefined,
      filter: { fullNameCont: string }
    ) =>
    () => {
      const newPage = currentPage + 1;

      fetchMore &&
        fetchMore({
          variables: { page: newPage, perPage: SCHOOLCLASS_STUDENTS_PER_PAGE, filter, uuid },
        });

      setCurrentPage(newPage);
    };

  const onError = () => {
    history.goBack();
  };

  useEffect(() => {
    clearCache();
  }, []);

  const scopeToAsk = [Roles.SYSTEM_ADMIN, Roles.SALES_ADMIN].includes(userInfo.role)
    ? ArchivableStatusTypes.ALL
    : ArchivableStatusTypes.ACTIVE;

  return (
    <SharedMainContent className='user-class'>
      <SharedFilterProvider onFilterChange={onFilterChange}>
        {({ filter, ...props }) => (
          <>
            <SharedDataLoader<TSchoolClassData, TSchoolClassVariables>
              SpinnerComponent={<UserSchoolClassHeaderSkeleton />}
              options={{ variables: { uuid } }}
              query={schoolClassQuery}
              onError={onError}>
              {({ schoolClass }) => <Header schoolClass={schoolClass} searchProps={props} />}
            </SharedDataLoader>
            {!filtering && (
              <SharedDataLoader<TSchoolClassWithStudentsData, TSchoolClassWithStudentsVariables>
                SpinnerComponent={<UserSchoolClassList />}
                options={{
                  variables: {
                    page: currentPage,
                    perPage: SCHOOLCLASS_STUDENTS_PER_PAGE,
                    filter,
                    uuid,
                    scope: scopeToAsk,
                  },
                }}
                query={schoolClassWithStudentsQuery}>
                {({ schoolClass }, fetchMore) => (
                  <SharedInfiniteScrollContainer
                    className='user-class__students'
                    fetchMore={onShowMore(fetchMore, filter)}
                    hasNextPage={schoolClass.students.pagesCount >= currentPage}
                    withScrollbar={true}>
                    <StudentList schoolClass={schoolClass} />
                  </SharedInfiniteScrollContainer>
                )}
              </SharedDataLoader>
            )}
          </>
        )}
      </SharedFilterProvider>
    </SharedMainContent>
  );
}

export default UserAppSchoolClass;
