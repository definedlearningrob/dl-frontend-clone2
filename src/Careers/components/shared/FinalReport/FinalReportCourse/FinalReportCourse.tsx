import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash-es';
import { FinalReportCourseFragment } from '@graphql/dc/shared/operations';

import { formatExternalLink } from '@shared/utils/formatExternalLink';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

type Props = {
  course: FinalReportCourseFragment;
};

const FinalReportCourse = ({ course }: Props) => {
  const { t } = useTranslation();
  const headingClassname = 'text-font-primary text-sm mb-sm leading-lg';

  const isReviewSurveyPerformed = course.reviewSurvey?.questions.some(
    (question) => !isEmpty(question.answer)
  );

  return (
    <li>
      <h3 className={headingClassname}>
        {t('student.finalReport.courses.title', { name: course.name })}
      </h3>
      {course.description && (
        <InjectedContent className='leading-lg mb-sm' content={course.description} />
      )}
      <h4 className='text-xs'>{t('student.finalReport.courses.projectsTitle')}</h4>
      <ul className='ml-sm'>
        {course.assignments?.map((assignment) => (
          <li key={assignment.id} className='mb-sm'>
            {assignment.displayName}
            {assignment.submission && (
              <ul className='mt-xs list-disc list-inside'>
                {assignment.submission.files.map((file) => (
                  <li key={file.id} className='mb-xs last:mb-base'>
                    <Link
                      rel='noopener noreferrer'
                      target='_blank'
                      to={{ pathname: formatExternalLink(file.url) }}>
                      {file.filename}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {isReviewSurveyPerformed && (
        <>
          <h4 className='text-xs'>{t('student.finalReport.courses.summary')}</h4>
          <ul className='leading-lg mb-sm'>
            {course.reviewSurvey!.questions.map((question, index) => {
              const answerText = `${index + 1}. ${question.question.split('?')[0]}?`;

              return (
                <li
                  key={question.id}
                  className='rounded-sm p-sm border border-neutral-300 bg-neutral-200 mb-base'>
                  <p className='font-bold mb-xxs'>{answerText}</p>
                  <ul className='list-disc pl-base marker:text-font-secondary text-xs'>
                    {question.answer.map((answer, index) => (
                      <li key={index}>{answer}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </li>
  );
};

export default FinalReportCourse;
