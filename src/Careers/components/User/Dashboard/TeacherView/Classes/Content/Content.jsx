import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AnnouncementModal from '@dc/components/Announcements/Modal/Modal';
import ListItem from '@dc/components/User/Dashboard/TeacherView/Classes/Content/ListItem/ListItem';
import schoolClassPlansQuery from '@dc/graphql/user/queries/schoolClassPlans';
import SharedEmptyContainerPlaceholder from '@dc/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';
import UserReportModal from '@dc/components/User/Report/Modal/Modal';
import { ReportLevels } from '@dc/resources/enums';

UserDashboardTeacherViewClassesContent.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      enrolledCoursesCount: PropTypes.number,
      entityName: PropTypes.string,
      finishedAssessmentsCount: PropTypes.number,
      finishedCoursesCount: PropTypes.number,
      gradingNeeded: PropTypes.bool,
      schoolClassName: PropTypes.string,
      schoolClassUuid: PropTypes.string,
      studentsCount: PropTypes.number,
    })
  ),
};

function UserDashboardTeacherViewClassesContent({ classes }) {
  const [selectedACtionClass, setSelectedActionClass] = useState({});
  const { action, schoolClass } = selectedACtionClass;
  const { t } = useTranslation();

  const { data: plansData } = useQuery(schoolClassPlansQuery, {
    variables: { uuid: selectedACtionClass?.schoolClass?.schoolClassUuid },
    skip: !(action === 'report'),
  });

  const closeModal = useCallback(() => setSelectedActionClass({}));

  const actionModal =
    action &&
    {
      announcement: (
        <AnnouncementModal
          receiver={{ ...schoolClass, uuid: schoolClass.schoolClassUuid }}
          onModalClose={closeModal}
        />
      ),
      report: (
        <UserReportModal
          level={ReportLevels.SCHOOL_CLASS}
          levelUuid={schoolClass.schoolClassUuid}
          plans={plansData?.schoolClass.entity.plans}
          onClose={closeModal}
        />
      ),
    }[action];

  const tableHeader = (
    <>
      <div className='teacher-dashboard__classes__header-cell table-cell-1'>
        {t('user.dashboard.classes.className')}
      </div>
      <div className='teacher-dashboard__classes__header-cell table-cell-2'>
        {t('user.dashboard.classes.students')}
      </div>
      <div className='teacher-dashboard__classes__header-cell table-cell-3'>
        {t('user.dashboard.classes.assessments')}
      </div>
      <div className='teacher-dashboard__classes__header-cell table-cell-4'>
        {t('user.dashboard.classes.courses')}
      </div>
    </>
  );

  if (!classes.length)
    return <SharedEmptyContainerPlaceholder message={t('user.dashboard.classes.emptyList')} />;

  return (
    <>
      <header className='teacher-dashboard__classes__table-header'>{tableHeader}</header>
      <div className='teacher-dashboard__classes__scroll-container transparent-scrollbar'>
        <ul className='teacher-dashboard__classes__list dashboard-scroll'>
          {classes.map((schoolClass) => (
            <ListItem
              key={schoolClass.schoolClassUuid}
              schoolClass={schoolClass}
              setSelectedClass={setSelectedActionClass}
            />
          ))}
        </ul>
      </div>
      {actionModal && actionModal}
    </>
  );
}

export default UserDashboardTeacherViewClassesContent;
