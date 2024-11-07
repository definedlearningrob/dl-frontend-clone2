import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { FinalReportQuery } from '@graphql/dc/students/operations';
import { Get } from 'type-fest';
import { StudentFinalReportQuery } from '@graphql/dc/users/operations';

import { FinalReportCourses } from '@dc/shared/FinalReport/FinalReportCourses/FinalReportCourses';

type Props = {
  courses:
    | FinalReportQuery['finalReport']['currentCourses']
    | Get<StudentFinalReportQuery, 'student.finalReport.currentCourses'>;
};

export const FinalReportExploredCourses = ({ courses }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className='text-neutral-800 text-base mb-sm leading-lg' id='explored'>
        {t('student.finalReport.exploredTitle')}
      </h2>
      <p>{t('student.finalReport.exploredText')}</p>
      {isEmpty(courses) ? (
        <p className='text-primary-500 font-medium my-lg text-center'>
          {t('student.finalReport.courses.empty')}
        </p>
      ) : (
        <FinalReportCourses courses={courses!} />
      )}
    </>
  );
};
