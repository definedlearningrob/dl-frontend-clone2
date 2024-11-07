/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import courseGradingSchoolClassWithStudentsQuery from '@dc/graphql/user/queries/courseGradingSchoolClassWithStudents';
import GradingSchoolClass from '@dc/components/User/GradingSchoolClass/GradingSchoolClass';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { getListItemsWithGradingNeededByCourse } from '@dc/utils/gradingByCourse';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function UserAppGradingSchoolClass() {
  const { courseId, schoolClassUuid } = useParams();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <SharedDataLoader
        options={{ variables: { uuid: schoolClassUuid, courseId } }}
        query={courseGradingSchoolClassWithStudentsQuery}>
        {({ schoolClass }, fetchMore, refetch) => {
          const { gradingNeededStudents, name, parentName, withoutGradingNeededStudents } =
            schoolClass;
          const students = getListItemsWithGradingNeededByCourse(
            gradingNeededStudents.nodes,
            withoutGradingNeededStudents.nodes
          );

          return (
            <GradingSchoolClass
              name={name}
              parentName={parentName}
              refetchSchoolClass={refetch}
              students={students}
            />
          );
        }}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default UserAppGradingSchoolClass;
