import { useTranslation } from 'react-i18next';
import { Course } from '@graphql/dc/users/types';
import { CourseTypes } from '@graphql/dc/shared/types';

import { ReactComponent as ChevronIcon } from '@shared/svg/chevron_right.svg';
import { ReactComponent as CourseIcon } from '@shared/svg/book_opened.svg';
import { GenericCard } from '@shared/components/GenericCard/GenericCard';
import { BadgeType } from '@shared/components/Badge/Badge';

type Props = {
  course: Pick<Course, 'id' | 'name' | 'thumbnailUrl' | 'type'> & {
    pathway: { name: string } | null;
    collection: { name: string } | null;
    metadata: Pick<Course['metadata'], 'alternativeTitles'>;
  };
};

export const UserCourseCard = ({ course }: Props) => {
  const { t } = useTranslation();

  const pathways = course.pathway ? [course.pathway] : undefined;

  const badgeMap = {
    [CourseTypes.HIGH_SCHOOL]: {
      type: 'primary' as BadgeType,
      text: t('courses.types.highSchool'),
    },
    [CourseTypes.MIDDLE_SCHOOL]: {
      type: 'secondary' as BadgeType,
      text: t('courses.types.middleSchool'),
    },
  };

  return (
    <GenericCard
      Icon={ChevronIcon}
      TypeIcon={CourseIcon}
      backgroundUrl={course.thumbnailUrl}
      badge={badgeMap[course.type]}
      pathways={pathways}
      subTitle={course.collection?.name}
      title={course.name}
      to={`/courses/${course.id}`}
      typeIconTooltipMessage={t('common.fields.common.course')}
    />
  );
};
