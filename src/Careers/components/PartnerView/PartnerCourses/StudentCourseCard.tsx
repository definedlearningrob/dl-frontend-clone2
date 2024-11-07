import { Course } from '@graphql/dc/students/types';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { useHistory } from 'react-router-dom';

import EnrollInCourseModal from '@dc/components/Onboarding/Result/CourseModal/CourseModal';

import { ReactComponent as ChevronIcon } from '@shared/svg/chevron_right.svg';
import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import { ReactComponent as CourseIcon } from '@shared/svg/book_opened.svg';
import { GenericCard } from '@shared/components/GenericCard/GenericCard';
import { BadgeType } from '@shared/components/Badge/Badge';

type Props = {
  course: Pick<
    Course,
    | 'id'
    | 'name'
    | 'thumbnailUrl'
    | 'isEnrolled'
    | 'match'
    | 'status'
    | 'type'
    | 'metadata'
    | 'description'
    | 'imageUrl'
  > & {
    pathway: { name: string } | null;
    collection: { name: string } | null;
  };
};

export const StudentCourseCard = ({ course }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);

  const { isEnrolled, pathway, match, collection } = course;

  const hasMatchValue = typeof match === 'number';
  const CardIcon = isEnrolled ? ChevronIcon : AddIcon;
  const pathways = pathway ? [pathway] : undefined;
  const badge = collection ? { type: 'primary' as BadgeType, text: collection?.name } : undefined;

  const handleClick = () => {
    if (isEnrolled) {
      history.push(`/courses/${course.id}`);
    } else {
      toggleIsModalOpen();
    }
  };

  return (
    <>
      <GenericCard
        Icon={CardIcon}
        TypeIcon={CourseIcon}
        backgroundUrl={course.thumbnailUrl}
        badge={badge}
        pathways={pathways}
        subTitle={hasMatchValue ? t('courses.match', { percentage: match }) : undefined}
        title={course.name}
        typeIconTooltipMessage={t('common.fields.common.course')}
        onClick={handleClick}
      />
      {isModalOpen && <EnrollInCourseModal closeModal={toggleIsModalOpen} course={course} />}
    </>
  );
};
