import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CoursesActivity from '@dc/components/User/Student/CoursesActivity/CoursesActivity';
import CurrentCourses from '@dc/components/User/Student/CurrentCourses/CurrentCourses';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import studentCurrentCoursesPreviewQuery from '@dc/graphql/user/queries/studentCurrentCoursesPreview';
import type {
  TStudent,
  TStudentCurrentCoursesPreviewData,
  TStudentCurrentCoursesPreviewDataVariable,
} from '@dc/graphql/user/queries/studentCurrentCoursesPreview';
import { StudentInfo } from '@dc/components/User/Student/StudentInfo/StudentInfo';
import StudentPortfolioCard from '@dc/components/User/Student/PortfolioCard/PortfolioCard';
import { ConversationContextTypes } from '@dc/resources/enums';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useMessaging } from '@shared/hooks/useMessaging';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

type TContext = {
  type: ConversationContextTypes;
  id: string;
  title: string;
};

function UserAppStudent() {
  const { id } = useParams<{ id: string }>();
  const { setBackNavButton } = useNavigation();
  const { messagingState, setMessagingState } = useMessaging();

  const setupMessageModal = (context: TContext, student: TStudent) => {
    setMessagingState({
      ...messagingState,
      show: true,
      actionContext: context,
      receiver: { ...student, name: `${student.firstName} ${student.lastName}` },
    });
  };

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <div className='user-student'>
        <SharedDataLoader<
          TStudentCurrentCoursesPreviewData,
          TStudentCurrentCoursesPreviewDataVariable
        >
          options={{ variables: { uuid: id, studentUuid: id } }}
          query={studentCurrentCoursesPreviewQuery}>
          {({ student }) => (
            <>
              <div className='user-student__main-content'>
                <CurrentCourses courses={student.currentCourses} student={student} />
                <CoursesActivity
                  courses={student.currentCourses}
                  setupMessageModal={(context) => setupMessageModal(context, student)}
                />
              </div>
              <div className='user-student__side-content'>
                <StudentInfo student={student} />
                <StudentPortfolioCard />
              </div>
            </>
          )}
        </SharedDataLoader>
      </div>
    </SharedMainContent>
  );
}

export default UserAppStudent;
