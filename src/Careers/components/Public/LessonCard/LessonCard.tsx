import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { ReactComponent as Flag } from '@shared/assets/icons/flag_outlined.svg';
import SharedButton from '@shared/components/Button/Button';
import Icon from '@shared/components/Icon/Icon';
import SharedImage from '@shared/components/Image/Image';
import useQueryParams from '@shared/hooks/useQueryParams';

type Props = {
  id: string;
  className?: string;
  imageUrl: string;
  name: string;
  step: number;
  thumbnailUrl: string;
  type: string;
};

export function PublicLessonCard({
  id,
  imageUrl,
  className,
  name,
  step,
  thumbnailUrl,
  type,
}: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const { shareId } = useParams<{ shareId: string }>();
  const {
    params: { code },
  } = useQueryParams<{ code: string }>();

  const lessonCardClasses = cx(
    'flex flex-col',
    'relative overflow-hidden radius-sm bg-white',
    'lesson-card',
    className
  );

  const handleRedirectToLesson = () => {
    history.push(`/shared/student/courses/${shareId}/lessons/${id}?code=${code}`);
  };

  return (
    <div className={lessonCardClasses}>
      {type === 'project' && (
        <div className='lesson-card__project-label'>
          <Icon icon={<Flag />} size='xs' />
        </div>
      )}
      <div className='lesson-card__image-wrapper'>
        <SharedImage
          alt={t('course.lessonCard.altImage')}
          className='lesson-card__image'
          fallbackSrc={imageUrl}
          src={thumbnailUrl}
          width='100%'
        />
      </div>
      <div className='flex flex-col flex-1 justify-between items-stretch p-sm'>
        <div className='flex justify-between leading-md'>
          <h3 className='mb-0 text-sm text-font-primary break-normal [overflow-wrap:anywhere]'>{`${step}. ${name}`}</h3>
          <SharedButton
            className='lesson-card__button'
            variant='primary'
            onClick={handleRedirectToLesson}>
            {t('course.lessonCard.button.show')}
          </SharedButton>
        </div>
      </div>
    </div>
  );
}
