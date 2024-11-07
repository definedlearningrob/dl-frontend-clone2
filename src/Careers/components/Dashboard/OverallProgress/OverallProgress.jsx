import { useTranslation } from 'react-i18next';

import DashboardCard from '@dc/components/layout/Dashboard/Card/Card';
import overallProgressQuery from '@dc/graphql/student/queries/overallProgress';
import Step from '@dc/components/Dashboard/OverallProgress/Step/Step';
import StudentOverallProgressSkeleton from '@dc/components/Student/Dashboard/Skeleton/OverallProgress/OverallProgress';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function DashboardOverallProgress() {
  const { t } = useTranslation();

  const getProgressSteps = (overallProgress) => [
    {
      name: t('dashboard.overallProgress.completeAssessment'),
      status: overallProgress.assessmentFinished ? 'done' : 'incomplete',
    },
    {
      name: t('dashboard.overallProgress.choosePathwayAndCourse'),
      status: overallProgress.enrolledInCourse ? 'done' : 'incomplete',
    },
    {
      name: t('dashboard.overallProgress.completeFirstCourse'),
      status: overallProgress.courseCompleted ? 'done' : 'active',
    },
    {
      name: t('dashboard.overallProgress.reviewFinalReport'),
      status: overallProgress.finalReportSeen ? 'done' : 'incomplete',
    },
  ];

  return (
    <DashboardCard className='overall-progress' white={true}>
      <header className='overall-progress__header'>
        <h2 className='overall-progress__heading'>{t('dashboard.overallProgress.heading')}</h2>
        <p className='overall-progress__sub-heading'>{t('dashboard.overallProgress.subHeading')}</p>
      </header>
      <div className='overall-progress__steps-container transparent-scrollbar'>
        <SharedDataLoader
          SpinnerComponent={<StudentOverallProgressSkeleton />}
          options={{ fetchPolicy: 'no-cache' }}
          query={overallProgressQuery}>
          {({ overallProgress }) =>
            getProgressSteps(overallProgress).map(({ name, status }, index) => (
              <Step key={name} name={name} number={index + 1} status={status} />
            ))
          }
        </SharedDataLoader>
      </div>
    </DashboardCard>
  );
}

export default DashboardOverallProgress;
