import { AcademyCourse } from '@graphql/dc/shared/types';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { ReactComponent as ProjectsIcon } from '@pbl/svg/projects.svg';

import Button from '@shared/components/Button/Button';
import Card from '@shared/components/Card/Card';
import { removeTags } from '@shared/utils/removeTags';
import { cx } from '@shared/utils/cx';

import { IconContainer } from '../IconContainer/IconContainer';

type Props = {
  course: AcademyCourse;
};

const ACADEMY_URL = import.meta.env.VITE_ACADEMY_URL;

export const AcademyCourseCard = ({ course }: Props) => {
  const { t } = useTranslation();

  const courseUrl = `${ACADEMY_URL}/course/view.php?id=${course.id}`;
  const hasDescription = !isEmpty(course.description);

  return (
    <Card className='border border-neutral-300 !p-sm xxxl:!p-base  hover:!bg-primary-200 hover:border-primary-500'>
      <a className='text-font-primary hover:text-font-primary' href={courseUrl} target='_blank'>
        <div className='flex gap-sm xxxl:gap-base h-full'>
          <IconContainer
            Icon={ProjectsIcon}
            className='text-primary-500'
            paddingSize='none'
            size='md'
          />
          <div className='grow flex flex-col'>
            <h5
              className={cx('mb-base text-sm xxxl:text-base line-clamp-2', {
                grow: !hasDescription,
              })}>
              {course.name}
            </h5>
            {hasDescription && (
              <div className='mb-sm grow text-xs line-clamp-3'>
                {removeTags(course.description!)}
              </div>
            )}
            <div className='flex justify-between items-center'>
              <div className='text-xs font-medium'>
                {course.progress &&
                  t('welcomeMessage.progress', {
                    completed: course.progress?.completed,
                    total: course.progress?.total,
                  })}
              </div>
              <Button size='sm' variant='primary'>
                {t('welcomeMessage.startCourse')}
              </Button>
            </div>
          </div>
        </div>
      </a>
    </Card>
  );
};
