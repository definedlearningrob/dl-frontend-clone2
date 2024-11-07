import { PartnerOverviewQuery as UserPartnerOverviewQuery } from '@graphql/dc/users/operations';
import { PartnerOverviewQuery as StudentPartnerOverviewQuery } from '@graphql/dc/students/operations';
import { Trans } from 'react-i18next';
import { ForwardedRef, forwardRef } from 'react';

import { PartnerCardContentWrapper } from '../PartnerCardContentWrapper';

import { StudentCourseCard } from './StudentCourseCard';
import { UserCourseCard } from './UserCourseCard';

export type Courses =
  | UserPartnerOverviewQuery['partner']['courses']
  | StudentPartnerOverviewQuery['partner']['courses'];

type Props = {
  courses: Courses;
};

export const PartnerCourses = forwardRef(
  ({ courses }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const coursesCount = courses?.length ?? 0;

    return (
      <PartnerCardContentWrapper
        ref={ref}
        header={
          <Trans
            components={{ neutralText: <span className='text-neutral-600' /> }}
            i18nKey={coursesCount === 0 ? 'partners.courses' : 'partners.coursesWithCount'}
            values={{ count: coursesCount }}
          />
        }>
        <ul className='px-base py-sm grid grid-cols-3 gap-x xxxl:gap-base'>
          {courses.map((course) => (
            <li key={course.id} aria-label={course.name} className='h-[180px] xxxl:h-[268px]'>
              {'match' in course ? (
                <StudentCourseCard course={course} />
              ) : (
                <UserCourseCard course={course} />
              )}
            </li>
          ))}
        </ul>
      </PartnerCardContentWrapper>
    );
  }
);
