import PropTypes from 'prop-types';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';

import SharedAvatar from '@shared/components/Avatar/Avatar';

StudentPortfolioStudentInfo.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    schoolClasses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
};

function StudentPortfolioStudentInfo({
  userInfo,
  userInfo: { firstName, lastName, schoolClasses },
}) {
  return (
    <Card className='portfolio-student-info' data-testid='portfolio-student-info'>
      <SharedAvatar className='portfolio-student-info__avatar' user={userInfo} />
      <h4 className='portfolio-student-info__heading'>
        {firstName} {lastName}
      </h4>
      {schoolClasses && (
        <p className='portfolio-student-info__description'>{schoolClasses[0].name}</p>
      )}
    </Card>
  );
}

export default StudentPortfolioStudentInfo;
