import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import courseGradingSchoolClassesQuery from '@dc/graphql/user/queries/courseGradingSchoolClasses';
import GradingSchoolClasses from '@dc/components/User/GradingSchoolClasses/GradingSchoolClasses';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { getListItemsWithGradingNeededByCourse } from '@dc/utils/gradingByCourse';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function UserAppGradingSchoolClasses() {
  const { courseId } = useParams();
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
        options={{ fetchPolicy: 'no-cache', variables: { id: courseId } }}
        query={courseGradingSchoolClassesQuery}>
        {({ course: { gradingNeededSchoolClasses, name, withoutGradingNeededSchoolClasses } }) => {
          const schoolClasses = getListItemsWithGradingNeededByCourse(
            gradingNeededSchoolClasses.nodes,
            withoutGradingNeededSchoolClasses.nodes
          );

          return <GradingSchoolClasses courseName={name} schoolClasses={schoolClasses} />;
        }}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default UserAppGradingSchoolClasses;
