import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

UserStudentGradingModalCheckInBody.propTypes = {
  checkIn: PropTypes.shape({
    answer: PropTypes.shape({
      answer: PropTypes.string,
    }),
    question: PropTypes.string,
  }),
};

function UserStudentGradingModalCheckInBody({ checkIn: { answer, question } }) {
  const { t } = useTranslation();

  return (
    <div className='h-full flex flex-col'>
      <p className='font-bold' data-testid='check-in-title'>
        {question}
      </p>
      {answer ? (
        <div
          className='p-x bg-neutral-200 border border-neutral-300 rounded-sm grow'
          data-testid='check-in-answer'>
          {answer.answer}
        </div>
      ) : (
        <div
          className='border border-secondary-500 text-secondary-500 p-sm text-center my-auto'
          data-testid='unsubmitted-input'>
          {t('user.student.coursesActivity.checkInNoInputInfo')}
        </div>
      )}
    </div>
  );
}

export default UserStudentGradingModalCheckInBody;
