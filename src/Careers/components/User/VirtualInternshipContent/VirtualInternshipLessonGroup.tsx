import { useParams } from 'react-router-dom';

import { LessonCard } from '@dc/shared/LessonCard';
import { TLesson } from '@dc/resources/types';

import { cx } from '@shared/utils/cx';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

type Lesson = Pick<TLesson, 'id' | 'thumbnailUrl' | 'type' | 'name'>;

type Props = {
  title: string;
  description: string;
  lessons: Lesson[] | undefined;
  centerItems?: boolean;
  loading?: boolean;
};

export const VirtualInternshipLessonGroup = ({
  title,
  description,
  lessons,
  centerItems,
  loading,
}: Props) => {
  const { opportunityId, virtualInternshipId } =
    useParams<{ opportunityId: string; virtualInternshipId: string }>();

  return (
    <div aria-labelledby='lesson-group-name' data-testid='lesson-group'>
      <h5 className='text-sm xxxl:text-base mb-xxs xxxl:mb-xs' id='lesson-group-name'>
        {title}
      </h5>
      <p className='text-xs xxxl:text-sm leading-lg mb-base xxxl:mb-md'>{description}</p>
      <div
        className={cx('flex flex-wrap gap-y-base gap-x-sm xxxl:gap-y-md', {
          'justify-center': centerItems,
        })}>
        {lessons?.map((lesson) => (
          <LessonCard
            key={lesson.id}
            className='grow-0 shrink-0 basis-[calc(25%-theme(spacing.x))]'
            imageUrl={lesson.thumbnailUrl}
            lessonType={lesson.type}
            name={lesson.name}
            navigationPath={`/opportunities/${opportunityId}/virtual-internship/${virtualInternshipId}/lessons/${lesson.id}`}
            showProgress={false}
            surveyPerformed={false}
          />
        ))}
        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonRectangle
              key={index}
              className='grow-0 shrink-0 basis-[calc(25%-theme(spacing.x))] !h-[230px]'
              height='extra-large'
              radius='sm'
            />
          ))}
      </div>
    </div>
  );
};
