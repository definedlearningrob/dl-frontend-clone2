import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import cx from 'classnames';

import SharedEmptyContainer from '@dc/components/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';
import { withoutHtmlTag } from '@dc/utils/withoutHtmlTag';

import SharedButton from '@shared/components/Button/Button';
import { Tooltip } from '@shared/components/Tooltip';

type Course = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  status: string;
};

type Props = {
  middleSchoolCourses: Course[];
  enrolledCourses: Course[];
  selectCourse: (course: Course) => void;
};

export const MiddleSchoolOverview = ({
  middleSchoolCourses,
  enrolledCourses,
  selectCourse,
}: Props) => {
  const { t } = useTranslation();

  if (isEmpty(middleSchoolCourses)) {
    return (
      <SharedEmptyContainer
        message={t('student.onboarding.pathway.noMiddleSchoolCoursesPlaceholder')}
      />
    );
  }
  const hasSingleCourse = middleSchoolCourses.length === 1;

  const courseCardClassnames = cx(
    'flex flex-col basis-[calc(50%-12px)] shrink-0',
    'p-md rounded-base text-font-primary bg-white text-left',
    {
      '!text-center': hasSingleCourse,
    }
  );
  const buttonWrapperClassNames = cx('mt-auto', {
    'mx-auto': hasSingleCourse,
  });

  return (
    <div className='flex gap-base max-w-[1100px] justify-center mx-auto flex-wrap'>
      {middleSchoolCourses?.map((course) => {
        const isAlreadyEnrolled = enrolledCourses.map(({ id }) => id).includes(course.id);

        return (
          <section
            key={course.id}
            className={courseCardClassnames}
            data-testid='onboarding-result-middleSchool-overview'>
            <h2 className='text-2xl font-regular mb-m-sm'>{course.name}</h2>
            <p className='mb-md max-w-[800px]'>{withoutHtmlTag(course.description)}</p>
            <div className={buttonWrapperClassNames}>
              <Tooltip
                className='inline-block'
                disabled={!isAlreadyEnrolled}
                message={t('student.onboarding.pathway.alreadyEnrolled')}>
                <SharedButton
                  className='font-regular w-[180px]'
                  disabled={isAlreadyEnrolled}
                  variant='primary'
                  onClick={() => selectCourse(course)}>
                  {t('student.onboarding.pathway.middleSchoolEnroll')}
                </SharedButton>
              </Tooltip>
            </div>
          </section>
        );
      })}
    </div>
  );
};
