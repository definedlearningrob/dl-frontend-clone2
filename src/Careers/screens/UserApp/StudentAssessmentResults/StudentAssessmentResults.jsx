import { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Interests from '@dc/components/Onboarding/Result/Components/Interests/Interests';
import Preferences from '@dc/components/Onboarding/Result/Components/Preferences/Preferences';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import studentAssessmentResultQuery from '@dc/graphql/user/queries/studentAssessmentResult';
import WorkValues from '@dc/components/Onboarding/Result/Components/WorkValues/WorkValues';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function UserAppStudentAssessmentResults() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true, `/students/${id}`);

    return () => {
      setBackNavButton(false, null);
    };
  }, []);

  return (
    <SharedMainContent>
      <div className='user-student-assessment-results'>
        <SharedDataLoader
          options={{ variables: { uuid: id } }}
          query={studentAssessmentResultQuery}>
          {({ student: { assessmentResult } }) =>
            !assessmentResult ? (
              <Redirect to={`/students/${id}`} />
            ) : (
              <>
                <Interests interestsResult={assessmentResult.interestsResult} />
                <WorkValues workValuesResult={assessmentResult.workValuesResult} />
                <Preferences studyPreferencesResult={assessmentResult.studyPreferencesResult} />
                <div className='user-student-assessment-results__pathways'>
                  <h2 className='user-student-assessment-results__pathways__title'>
                    {t('user.student.assessmentResults.pathwayTitle')}
                  </h2>
                  {[
                    ...assessmentResult.recommendedPathways,
                    ...assessmentResult.additionalPathways,
                  ].map((pw) => (
                    <div className='user-student-assessment-results__pathway'>
                      <h2 className='user-student-assessment-results__pathway__name'>{pw.name}</h2>
                      <span className='user-student-assessment-results__pathway__description'>
                        {pw.description}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )
          }
        </SharedDataLoader>
      </div>
    </SharedMainContent>
  );
}

export default UserAppStudentAssessmentResults;
