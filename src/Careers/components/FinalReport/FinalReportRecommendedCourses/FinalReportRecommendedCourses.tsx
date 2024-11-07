import { useTranslation } from 'react-i18next';
import { FinalReportQuery } from '@graphql/dc/students/operations';

import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

type Props = {
  recommendedCourses: FinalReportQuery['finalReport']['recommendedCourses'];
};

export const FinalReportRecommendedCourses = ({ recommendedCourses }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className='text-neutral-800 text-base mb-sm leading-lg' id='recommended'>
        {t('student.finalReport.recommendedTitle')}
      </h2>
      <p>{t('student.finalReport.recommendedText')}</p>
      <div>
        {recommendedCourses.slice(0, 5).map((course, index) => {
          const courseName = course.pathway
            ? `${course.pathway.cluster.name}/${course.pathway.name}/${course.name}`
            : course.name;

          return (
            <div key={course.id} className='mb-base last:mb-0'>
              <h4 className='leading-lg mb-xs'>
                {t('student.finalReport.recommendedCourses.optionTitle', {
                  number: index + 1,
                })}
              </h4>
              <h5 className='leading-lg text-sm mb-xs'>{courseName}</h5>
              {course.description && (
                <InjectedContent className='leading-lg' content={course.description} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
