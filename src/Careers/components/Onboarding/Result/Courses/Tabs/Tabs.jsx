import { useRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import '@dc/components/Onboarding/Result/Courses/Tabs/Tabs.sass';

OnboardingResultCoursesTabs.propTypes = {
  availableTabs: PropTypes.shape({ [PropTypes.string]: PropTypes.number }),
  selectedTab: PropTypes.number,
  setSelectedTab: PropTypes.func,
};
function OnboardingResultCoursesTabs({ selectedTab, setSelectedTab, availableTabs }) {
  const tabsContainerRef = useRef(null);
  const { t } = useTranslation();

  const getTabClasses = (id) =>
    cx({ '-selected': id === selectedTab }, 'assessment-result-courses-tabs__tab');

  const handleTabSelection = (id) => () => {
    setSelectedTab(id);
  };

  const tabsData = [
    {
      id: 1,
      label: t('student.onboarding.pathway.course.firstYearLabel'),
      tooltipMessage: t('student.onboarding.pathway.course.firstSectionTooltip'),
    },
    {
      id: 2,
      label: t('student.onboarding.pathway.course.yearLabel', { year: '1 - 3' }),
      tooltipMessage: t('student.onboarding.pathway.course.secondSectionTooltip'),
    },
    {
      id: 3,
      label: t('student.onboarding.pathway.course.yearLabel', { year: '4' }),
      tooltipMessage: t('student.onboarding.pathway.course.thirdSectionTooltip'),
    },
    {
      id: 4,
      label: t('student.onboarding.pathway.course.yearLabel', { year: '5 +' }),
      tooltipMessage: t('student.onboarding.pathway.course.fourthSectionTooltip'),
    },
  ];

  const Tabs = () =>
    tabsData.map(({ id, label, tooltipMessage }) =>
      availableTabs[id] ? (
        <li
          key={id}
          className={getTabClasses(id)}
          data-testid='course-table-tab'
          onClick={handleTabSelection(id)}>
          <DeprecatedTooltip message={tooltipMessage}>
            <span>{label}</span>
          </DeprecatedTooltip>
        </li>
      ) : (
        <div key={id} />
      )
    );

  return (
    <ul ref={tabsContainerRef} className='assessment-result-courses-tabs'>
      <Tabs />
    </ul>
  );
}

export default OnboardingResultCoursesTabs;
