import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useState } from 'react';

import {
  InterestsItem,
  HighSchoolStudyPreferences,
  WorkValuesItem,
  MiddleSchoolStudyPreferences,
} from '@dc/graphql/user/queries/reportsAssessmentReport';
import { ASSESSMENT_TYPES } from '@dc/resources/constants';

import SharedCard from '@shared/components/Card/Card';
import { Tab, Tabs } from '@shared/components/Tabs/Tabs';
import { cx } from '@shared/utils/cx';

import { ComponentResultCharts } from './ComponentResultCharts';
import { ComponentResultChartsSkeleton } from './ComponentResultChartsSkeleton';

const COMPONENT_RESULT_TABS = {
  ...ASSESSMENT_TYPES,
  ALL: 'ALL',
};

type Props = {
  isLoading: boolean;
  highSchoolInterests: InterestsItem[] | undefined;
  middleSchoolInterests: InterestsItem[] | undefined;
  highSchoolWorkValues: WorkValuesItem[] | undefined;
  middleSchoolWorkValues: WorkValuesItem[] | undefined;
  highSchoolStudyPreferences: HighSchoolStudyPreferences | undefined;
  middleSchoolStudyPreferences: MiddleSchoolStudyPreferences | undefined;
};

export const ComponentResult = ({
  isLoading,
  highSchoolInterests,
  middleSchoolInterests,
  highSchoolWorkValues,
  middleSchoolWorkValues,
  middleSchoolStudyPreferences,
  highSchoolStudyPreferences,
}: Props) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(COMPONENT_RESULT_TABS.ALL);

  const hasBothCategories = !isEmpty(highSchoolInterests) && !isEmpty(middleSchoolInterests);

  const tabs: Tab[] = [
    { tabId: COMPONENT_RESULT_TABS.ALL, label: t('assessmentReport.tabs.all') },
    { tabId: COMPONENT_RESULT_TABS.MIDDLE_SCHOOL, label: t('assessmentReport.tabs.middleSchool') },
    { tabId: COMPONENT_RESULT_TABS.HIGH_SCHOOL, label: t('assessmentReport.tabs.highSchool') },
  ];

  const handleTabChange = (tab: Tab) => {
    setSelectedTab(tab.tabId);
  };

  const isMiddleSchoolEnabled = hasBothCategories
    ? selectedTab !== COMPONENT_RESULT_TABS.HIGH_SCHOOL
    : !isEmpty(middleSchoolInterests);
  const isHighSchoolEnabled = hasBothCategories
    ? selectedTab !== COMPONENT_RESULT_TABS.MIDDLE_SCHOOL
    : !isEmpty(highSchoolInterests);

  return (
    <SharedCard>
      <h5 className='text-sm xxxl:text-base mb-xs xxxl:mb-sm'>
        {t('assessmentReport.componentResult')}
      </h5>
      <p className='text-xs xxxl:text-sm leading-lg xxxl:mb-base'>
        {t('assessmentReport.componentResultDescription')}
      </p>
      {isLoading && <ComponentResultChartsSkeleton />}
      {!isLoading && (
        <Tabs defaultTabId={COMPONENT_RESULT_TABS.ALL}>
          {hasBothCategories && (
            <Tabs.List
              className='!mb-base xxxl:!mb-md'
              tabs={tabs}
              withPadding={false}
              withQueryParams={false}
              onTabsChange={handleTabChange}
            />
          )}
          <div className='flex flex-col gap-base'>
            {isMiddleSchoolEnabled && (
              <ComponentResultCharts
                className={cx({ 'rounded-b-none': isHighSchoolEnabled })}
                interestsData={middleSchoolInterests}
                studyPreferencesData={middleSchoolStudyPreferences}
                type={ASSESSMENT_TYPES.MIDDLE_SCHOOL}
                workValuesData={middleSchoolWorkValues}
              />
            )}
            {isHighSchoolEnabled && (
              <ComponentResultCharts
                className={cx({ 'rounded-t-none': isMiddleSchoolEnabled })}
                interestsData={highSchoolInterests}
                studyPreferencesData={highSchoolStudyPreferences}
                type={ASSESSMENT_TYPES.HIGH_SCHOOL}
                workValuesData={highSchoolWorkValues}
              />
            )}
          </div>
        </Tabs>
      )}
    </SharedCard>
  );
};
