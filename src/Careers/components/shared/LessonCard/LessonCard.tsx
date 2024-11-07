import { Link } from 'react-router-dom';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { clamp } from 'lodash-es';

import { LESSON_TYPES } from '@dc/resources/constants';

import { ReactComponent as FlagIcon } from '@shared/assets/icons/flag_outlined.svg';
import { ReactComponent as ChevronIcon } from '@shared/svg/chevron_right.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import styles from './LessonCard.module.sass';
import { LessonCardImage } from './LessonCardImage';

type Props = {
  name: string;
  imageUrl?: string;
  progress?: {
    submitted: number;
    total: number;
  };
  navigationPath: string;
  step?: number;
  disabled?: boolean;
  className?: string;
  surveyPerformed: boolean;
  lessonType: string;
  showProgress?: boolean;
};

export const LessonCard = ({
  className,
  disabled,
  imageUrl,
  lessonType,
  name,
  navigationPath,
  progress = { submitted: 0, total: 1 },
  step,
  showProgress = true,
  surveyPerformed,
}: Props) => {
  const { t } = useTranslation();
  const { submitted, total } = progress;
  const isCareerReviewSurvey = lessonType === LESSON_TYPES.CAREER_REVIEW_SURVEY.toLowerCase();
  const isProject = lessonType === LESSON_TYPES.PROJECT.toLowerCase();

  const isEmptyLesson = total === 0;
  const isDone = isCareerReviewSurvey ? surveyPerformed : submitted === total;
  const statusClasses = {
    [styles.started]: submitted > 0,
    [styles.done]: isDone,
  };
  const disabledClass = {
    [styles.disabled]: disabled,
  };
  const footerClasses = cx(
    'relative bg-primary-200 rounded-b-sm text-primary-500 before:h-xxxs before:bg-neutral-400 before:inset-0 before:absolute',
    {
      'bg-secondary-200 text-secondary-500': submitted > 0,
      'bg-success-100 text-success-500': isDone,
      'bg-neutral-200 text-neutral-700': disabled,
      'before:bg-primary-500': !showProgress,
    }
  );

  const progressValue = useMemo(() => {
    if (!isCareerReviewSurvey) {
      const percentageValue = isEmptyLesson ? 100 : (submitted / total) * 100;

      const clampedValue = clamp(percentageValue, 0, 100);

      return `${clampedValue.toFixed()}%`;
    }

    return surveyPerformed ? '100%' : '0%';
  }, [progress, surveyPerformed, isCareerReviewSurvey]);

  const footerLabelKey = useMemo(() => {
    if (!showProgress) {
      return 'lessons.card.showMore';
    }
    if (!isCareerReviewSurvey && submitted > 0 && !isDone) {
      return 'lessons.card.continue';
    }

    return isDone ? 'lessons.card.done' : 'lessons.card.startLearning';
  }, [progress, surveyPerformed]);

  return (
    <Link
      aria-label={name}
      className={cx(styles.card, disabledClass, className)}
      to={navigationPath}>
      {step && <div className={cx(styles.step, statusClasses, disabledClass)}>{step}</div>}
      <div className={cx(styles.imageWrapper, disabledClass)}>
        <LessonCardImage alt={name} imageUrl={imageUrl} />
      </div>
      {isProject && (
        <IconContainer
          Icon={FlagIcon}
          className='absolute top-xs left-xs bg-success-500 rounded-full text-white'
          paddingSize='xs'
          size='sm'
        />
      )}
      <section className='flex flex-col justify-between flex-1 pt-xs px-xs pb-xxs min-h-[100px]'>
        <h5 className={cx(styles.name, disabledClass)}>{name}</h5>
        {showProgress && <p className={styles.progressValue}>{progressValue}</p>}
      </section>
      <section className={footerClasses}>
        {showProgress && (
          <div className={cx(styles.progressBar, statusClasses)} style={{ width: progressValue }} />
        )}
        <div className='flex items-center text-xxs p-xs xxxl:text-xs xxxl:py-sm xxxl:px-xs leading-lg'>
          {t(footerLabelKey)}
          <SharedIcon className={styles.footerIcon} icon={<ChevronIcon />} size='xs' />
        </div>
      </section>
    </Link>
  );
};
