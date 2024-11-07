/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Table from '@dc/components/Onboarding/Result/Courses/Table/Table';
import Tabs from '@dc/components/Onboarding/Result/Courses/Tabs/Tabs';
import { pathwayShape } from '@dc/resources/typeDefs';
import '@dc/components/Onboarding/Result/Courses/Courses.sass';

const STUDY_DURATION = {
  ONE_YEAR_PERIOD: 1,
  ONE_TO_THREE_YEARS_PERIOD: 2,
  FOUR_YEARS_PERIOD: 3,
  FIVE_YEARS_PERIOD: 4,
};

const TABS = {
  ...STUDY_DURATION,
};

const coursesShape = PropTypes.arrayOf(
  PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
  })
);

OnboardingResultCourses.propTypes = {
  courses: coursesShape,
  enrolledCourses: coursesShape,
  selectCourse: PropTypes.func,
  selectedPathway: pathwayShape,
};

function OnboardingResultCourses({ courses, enrolledCourses, selectCourse, selectedPathway }) {
  const initialTab = () =>
    [
      TABS.ONE_YEAR_PERIOD,
      TABS.ONE_TO_THREE_YEARS_PERIOD,
      TABS.FOUR_YEARS_PERIOD,
      TABS.FIVE_YEARS_PERIOD,
    ].find((period) => getCoursesForPeriod(period).length);

  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [activePeriodCourses, setActivePeriodCourses] = useState(() =>
    getCoursesForPeriod(selectedTab)
  );

  const availableTabs = {
    [TABS.ONE_YEAR_PERIOD]: getCoursesForPeriod(TABS.ONE_YEAR_PERIOD).length,
    [TABS.ONE_TO_THREE_YEARS_PERIOD]: getCoursesForPeriod(TABS.ONE_TO_THREE_YEARS_PERIOD).length,
    [TABS.FOUR_YEARS_PERIOD]: getCoursesForPeriod(TABS.FOUR_YEARS_PERIOD).length,
    [TABS.FIVE_YEARS_PERIOD]: getCoursesForPeriod(TABS.FIVE_YEARS_PERIOD).length,
  };

  useEffect(() => {
    setActivePeriodCourses(getCoursesForPeriod(selectedTab));
  }, [selectedTab, courses]);

  useEffect(() => {
    setSelectedTab(initialTab);
  }, [selectedPathway]);

  function getCoursesForPeriod(period) {
    const jobZonesForPeriod = {
      [STUDY_DURATION.ONE_YEAR_PERIOD]: [1, 2],
      [STUDY_DURATION.ONE_TO_THREE_YEARS_PERIOD]: [3],
      [STUDY_DURATION.FOUR_YEARS_PERIOD]: [4],
      [STUDY_DURATION.FIVE_YEARS_PERIOD]: [5],
    }[period];

    return courses.filter(({ metadata: { jobZone } }) =>
      jobZonesForPeriod?.includes(parseInt(jobZone))
    );
  }

  const PathwayHeading = () => (
    <>
      <h2 className='assessment-result-courses__pathway-title'>{selectedPathway.name}</h2>
      <p className='assessment-result-courses__pathway-description'>
        {selectedPathway.description}
      </p>
    </>
  );

  return (
    <section
      className='assessment-result-courses'
      data-testid='onboarding-result-courses-table'
      id='course-table'>
      <PathwayHeading />
      <Tabs
        availableTabs={availableTabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Table
        activePeriodCourses={activePeriodCourses}
        enrolledCourses={enrolledCourses}
        selectCourse={selectCourse}
      />
    </section>
  );
}

export default OnboardingResultCourses;
