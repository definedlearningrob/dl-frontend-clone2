import { useTranslation } from 'react-i18next';

import {
  InterestsItem,
  HighSchoolStudyPreferences,
  WorkValuesItem,
  MiddleSchoolStudyPreferences,
} from '@dc/graphql/user/queries/reportsAssessmentReport';
import { ASSESSMENT_TYPES } from '@dc/resources/constants';
import { StudyPreferencesChart } from '@dc/screens/UserApp/AssessmentReport/StudyPreferencesChart/StudyPreferencesChart';

import { cx } from '@shared/utils/cx';

import { ComponentResultsBarChart } from './ComponentResultsBarChart';

const chartTranslationsByType = {
  [ASSESSMENT_TYPES.MIDDLE_SCHOOL]: {
    interests: {
      title: 'assessmentReport.middleSchoolInterestsTitle',
      description: 'assessmentReport.middleSchoolInterestsDescription',
    },
    workValues: {
      title: 'assessmentReport.middleSchoolWorkValuesTitle',
      description: 'assessmentReport.middleSchoolWorkValuesDescription',
    },
    studyPreferences: {
      title: 'assessmentReport.middleSchoolStudyPreferencesTitle',
      description: 'assessmentReport.studyPreferencesDescription',
    },
  },
  [ASSESSMENT_TYPES.HIGH_SCHOOL]: {
    interests: {
      title: 'assessmentReport.highSchoolInterestsTitle',
      description: 'assessmentReport.highSchoolInterestsDescription',
    },
    workValues: {
      title: 'assessmentReport.highSchoolWorkValuesTitle',
      description: 'assessmentReport.highSchoolWorkValuesDescription',
    },
    studyPreferences: {
      title: 'assessmentReport.highSchoolStudyPreferencesTitle',
      description: 'assessmentReport.studyPreferencesDescription',
    },
  },
};

type AssessmentTypeKeys = keyof typeof ASSESSMENT_TYPES;
type AssessmentType = typeof ASSESSMENT_TYPES[AssessmentTypeKeys];

type Props = {
  className?: string;
  interestsData: InterestsItem[] | undefined;
  workValuesData: WorkValuesItem[] | undefined;
  studyPreferencesData: HighSchoolStudyPreferences | MiddleSchoolStudyPreferences | undefined;
  type: AssessmentType;
};

export const ComponentResultCharts = ({
  className,
  interestsData,
  workValuesData,
  studyPreferencesData,
  type,
}: Props) => {
  const { t } = useTranslation();

  const isHighSchool = type === ASSESSMENT_TYPES.HIGH_SCHOOL;
  const wrapperClasses = cx(
    'grid grid-cols-2 gap-lg p-base',
    'border border-neutral-300 rounded-sm',
    className
  );

  const translationKeys = chartTranslationsByType[type];

  return (
    <div className={wrapperClasses} data-testid='component-result-section'>
      <StudyPreferencesChart
        data={studyPreferencesData}
        description={t(translationKeys.studyPreferences.description)}
        isHighSchool={isHighSchool}
        title={t(translationKeys.studyPreferences.title)}
      />
      <ComponentResultsBarChart
        colorClassName={isHighSchool ? 'fill-chartPrimary-700' : 'fill-chartSecondary-700'}
        data={interestsData}
        description={t(translationKeys.interests.description)}
        title={t(translationKeys.interests.title)}
        valueKey='score'
      />
      <ComponentResultsBarChart
        colorClassName={isHighSchool ? 'fill-chartPrimary-500' : 'fill-chartSecondary-500'}
        data={workValuesData}
        description={t(translationKeys.workValues.description)}
        title={t(translationKeys.workValues.title)}
        valueKey='averageTokens'
      />
    </div>
  );
};
