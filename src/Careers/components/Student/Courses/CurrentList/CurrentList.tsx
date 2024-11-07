import { Trans, useTranslation } from 'react-i18next';
import { Course } from '@graphql/shared/shared/types';
import { isEmpty, times } from 'lodash-es';

import { ReactComponent as ChevronIcon } from '@shared/svg/chevron_right.svg';
import { ReactComponent as CourseIcon } from '@shared/svg/book_opened.svg';
import SharedCarousel from '@shared/components/Carousel/Carousel';
import { GenericCard } from '@shared/components/GenericCard/GenericCard';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { cx } from '@shared/utils/cx';

type Props = {
  currentCourses?: Pick<Course, 'id' | 'thumbnailUrl' | 'name' | 'pathway' | 'match'>[];
  teacherView: boolean;
  loading: boolean;
};

const listItemClassname = 'h-[180px] xxxl:h-[268px] w-[240px] xxxl:w-[356px]';

const carouselClassName = cx(
  '[&_.menu-wrapper]:!py-0 [&_.scroll-menu-arrow]:!top-0 [&_.scroll-menu-arrow]:!bottom-0',
  '[&_.menu-item-wrapper.menu-item-wrapper:not(:last-child)>:first-child]:!mr-sm',
  'xxxl:[&_.menu-item-wrapper.menu-item-wrapper:not(:last-child)>:first-child]:!mr-base'
);

export const CurrentList = ({ currentCourses, teacherView, loading }: Props) => {
  const { t } = useTranslation();

  const carouselData =
    currentCourses?.map((course) => {
      const cardConfig = {
        Icon: ChevronIcon,
        TypeIcon: CourseIcon,
        backgroundUrl: course.thumbnailUrl,
        pathways: course.pathway ? [course.pathway] : undefined,
        title: course.name,
        to: `/courses/${course.id}`,
        typeIconTooltipMessage: t('common.fields.common.course'),
      };

      return (
        <li key={course.id} className={listItemClassname}>
          <GenericCard {...cardConfig} />
        </li>
      );
    }) || [];

  return (
    <>
      <h2 className='text-sm xxxl:text-base mb-xxs xxxl:mb-xs'>
        <Trans
          components={{
            neutralText: <span className='text-font-secondary' />,
          }}
          i18nKey='student.courses.current'
          values={{ count: currentCourses?.length ?? '-' }}
        />
      </h2>
      <div className='text-xs xxxl:text-sm mb-sm'>
        {teacherView
          ? t('user.student.courses.currentSubtitle')
          : t('student.courses.currentSubtitle')}
      </div>
      <ul>
        {!loading && isEmpty(carouselData) && (
          <div className='h-[200px] flex justify-center items-center'>
            {teacherView
              ? t('user.student.courses.emptyCurrentInfo')
              : t('student.courses.emptyCurrentInfo')}
          </div>
        )}
        {!loading && !isEmpty(carouselData) && (
          <SharedCarousel
            backgroundColor='white'
            className={carouselClassName}
            data={carouselData}
          />
        )}
        {loading && (
          <li className='flex gap-base'>
            {times(4, (index) => (
              <div key={index} className={listItemClassname}>
                <SkeletonRectangle className={listItemClassname} height='full-height' radius='sm' />
              </div>
            ))}
          </li>
        )}
      </ul>
    </>
  );
};
