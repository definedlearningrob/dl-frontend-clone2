import { useTranslation } from 'react-i18next';
import { FinalReportQuery } from '@graphql/dc/students/operations';
import { StudentFinalReportQuery } from '@graphql/dc/users/operations';
import { Get } from 'type-fest';

import Interests from '@dc/components/Onboarding/Result/Components/Interests/Interests';
import WorkValues from '@dc/components/Onboarding/Result/Components/WorkValues/WorkValues';
import Preferences from '@dc/components/Onboarding/Result/Components/Preferences/Preferences';

import { formatDateTime } from '@shared/utils/date';

type Props = {
  finalReport:
    | FinalReportQuery['finalReport']
    | Get<StudentFinalReportQuery, 'student.finalReport'>;
  studentName: string;
};

export const FinalReportAssessmentResults = ({ finalReport, studentName }: Props) => {
  const headingClassname = 'text-neutral-800 text-base mb-sm leading-lg';
  const { t } = useTranslation();

  const title = studentName
    ? t('student.finalReport.overview.studentName', { name: studentName })
    : t('student.finalReport.overview.defaultStudentName');

  if (!finalReport) {
    return null;
  }

  return (
    <>
      <h2 className={headingClassname}>{title}</h2>
      <p className='mb-base'>{t('student.finalReport.overviewText')}</p>
      <h2 className={headingClassname} id='assessment'>
        {t('student.finalReport.assessmentResults.title')}
      </h2>
      <p className='mb-sm'>{t('student.finalReport.assessmentResults.subTitle')}</p>
      <ul className='pl-base marker:text-neutral-700 leading-lg list-disc mb-sm'>
        <li>{t('student.finalReport.assessmentResults.firstOption')}</li>
        <li>{t('student.finalReport.assessmentResults.secondOption')}</li>
        <li>{t('student.finalReport.assessmentResults.thirdOption')}</li>
      </ul>
      <p>
        {t('student.finalReport.assessmentResults.datePart', {
          date: formatDateTime(finalReport.assessmentAttempt!.updatedAt),
        })}
      </p>
      <h2 className={headingClassname}>
        {t('student.finalReport.assessmentResults.eachTitle', {
          name: studentName,
        })}
      </h2>
      <div className='page-break' />
      <Interests interestsResult={finalReport.interestsResult} />
      <div className='page-break' />
      <WorkValues workValuesResult={finalReport.workValuesResult} />
      <div className='page-break' />
      <Preferences studyPreferencesResult={finalReport.studyPreferencesResult} />
      <div className='page-break' />
      <div className='px-md mt-base'>
        <h2 className={headingClassname}>{t('student.finalReport.recommendedPathways.title')}</h2>
        <p>{t('student.finalReport.recommendedPathways.text')}</p>
        <div className='flex flex-col gap-base'>
          <div className='flex gap-base'>
            {finalReport.recommendedPathways.map((pw) => (
              <div
                key={pw.id}
                className='rounded-base border border-neutral-300 leading-lg overflow-hidden flex-1'>
                <div className='h-[164px] w-full'>
                  <img
                    alt={t('student.finalReport.recommendedPathways.alt')}
                    className='w-full h-full object-cover'
                    src={pw.imageUrl}
                  />
                </div>

                <div className='p-sm'>
                  <h2 className='text-sm mb-xs'>{pw.name}</h2>
                  <p className='text-xs mb-0 text-font-secondary'>{pw.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='page-break' />
          <div className='flex gap-base'>
            {finalReport.additionalPathways.map((pw) => (
              <div
                key={pw.id}
                className='rounded-base border border-neutral-300 leading-lg overflow-hidden flex-1'>
                <div className='h-[164px] w-full'>
                  <img
                    alt={t('student.finalReport.recommendedPathways.alt')}
                    className='w-full h-full object-cover'
                    src={pw.imageUrl}
                  />
                </div>
                <div className='p-sm'>
                  <h2 className='text-sm mb-xs'>{pw.name}</h2>
                  <p className='text-xs mb-0 text-font-secondary'>{pw.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
