import { useQuery } from '@apollo/client';
import { useRef } from 'react';

import MY_PROJECTS, {
  type TMyProjectsData,
  type TMyProjectsVariables,
} from '@pbl/graphql/student/queries/myProjects';

import DataSuspense from '@shared/components/DataSuspense/DataSuspense';

import AssignedProjects from '../AssignedProjects/AssignedProjects';
import StudentDashboardMyClasses from '../MyClasses/MyClasses';
import StudentDashboardPortfolio from '../Portfolio/Portfolio';
import StudentDashboardGrid from '../Grid/Grid';

const StudentDashboardLoader = () => {
  const { data, loading, error } = useQuery<TMyProjectsData, TMyProjectsVariables>(MY_PROJECTS, {
    fetchPolicy: 'no-cache',
  });

  const contentWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <DataSuspense error={error} loading={loading}>
      <div ref={contentWrapperRef}>
        <StudentDashboardGrid>
          <AssignedProjects
            contentWrapperRef={contentWrapperRef}
            projects={data?.myProjects.nodes}
          />
          <StudentDashboardMyClasses />
          <StudentDashboardPortfolio />
        </StudentDashboardGrid>
      </div>
    </DataSuspense>
  );
};

export default StudentDashboardLoader;
