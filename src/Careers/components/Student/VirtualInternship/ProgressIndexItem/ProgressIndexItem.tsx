import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { compact, sortBy, isEmpty, isNull } from 'lodash-es';
import { useMemo } from 'react';

import type {
  TLessonItem,
  TVirtualInternshipContent,
} from '@dc/graphql/student/queries/virtualInternshipContent';
import { LESSON_TYPES } from '@dc/resources/constants';
import {
  COMPLETABLE_ITEMS,
  GROUPABLE_ITEMS,
} from '@dc/components/VirtualInternship/VirtualInternshipLesson/constants';

import { ReactComponent as PlayIcon } from '@shared/assets/icons/play.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as CheckmarkIcon } from '@shared/svg/checkmark.svg';
import { ReactComponent as LockIcon } from '@shared/svg/padlock.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Tooltip } from '@shared/components/Tooltip';

import styles from './ProgressIndexItem.module.sass';
import { ProgressItemContent } from './ProgressItemContent';

type Props = {
  expandLesson: (lessonId: string) => void;
  isExpanded: boolean;
  isDisabled: boolean;
  lesson: TVirtualInternshipContent | null;
  lessonNumber: number;
  surveyPerformed: boolean;
};

export const ProgressIndexItem = ({
  expandLesson,
  isExpanded,
  isDisabled,
  lesson,
  lessonNumber,
  surveyPerformed,
}: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { opportunityId } = useParams<{ opportunityId: string }>();

  const isEmptyLesson = isNull(lesson);

  const getItemName = (item: TLessonItem) => {
    switch (item.type) {
      case 'Vocabulary': {
        return t('lessons.lessonItem.vocabulary');
      }
      case 'ResearchLink': {
        return t('student.lesson.items.researchLink');
      }
      default: {
        return item.name;
      }
    }
  };

  const lessonItems = useMemo(() => {
    if (isEmptyLesson) {
      return [];
    }

    const allLessonItems = [...lesson.items, ...lesson.checkIns];

    const mappedItems = allLessonItems.map((item, index) => {
      const isGroupable = GROUPABLE_ITEMS.includes(item.type);
      const isCompletable = COMPLETABLE_ITEMS.includes(item.type);
      const previousItem = lesson.items[index - 1];
      if (isGroupable && item.type === previousItem?.type) {
        return null;
      }

      return { ...item, isCompletable, name: getItemName(item) };
    });

    return sortBy(compact(mappedItems), (item) => item.type !== 'ExternalPresentation');
  }, [lesson]);

  const isFinished = useMemo(() => {
    if (isEmptyLesson) {
      return false;
    }

    if (lesson.type === LESSON_TYPES.CAREER_REVIEW_SURVEY) {
      return surveyPerformed;
    }

    return lessonItems.every((item) => item.completed || !item.isCompletable);
  }, [lesson, surveyPerformed]);

  const isStarted = !isFinished && !isDisabled && lessonItems.some((item) => item.completed);

  const IconComponent = isFinished ? CheckmarkIcon : PlayIcon;

  const iconClassName = cx('text-primary-500', {
    '!text-white': isFinished || isStarted,
    '!text-font-secondary group-hover:!text-primary-500': isDisabled,
  });
  const iconWrapperClassName = cx(styles.statusWrapper, 'bg-neutral-300 p-xs rounded-xxs', {
    '!bg-success-500': isFinished,
    '!bg-secondary-500': isStarted,
  });
  const lessonLabelClassName = cx('flex text-primary-500 gap-xxs leading-lg text-xs xxxl:text-sm', {
    '!text-success-500': isFinished,
    '!text-secondary-500': isStarted,
    '!text-font-secondary group-hover:!text-primary-500': isDisabled,
  });

  const lessonName = lesson ? lesson.name : t(`virtualInternship.emptyLesson.title`);

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const iconSize = isFullHD ? 'sm' : 'xs';

  const handleLessonClick = () => {
    if (isEmptyLesson) {
      return;
    }

    expandLesson(lesson.id);

    if (isEmpty(lesson.items) && !isDisabled) {
      history.push(`/opportunities/${opportunityId}/virtual-internship/lesson/${lesson.id}`);
    }
  };

  // TODO: handle case when same lesson is added to more than one section

  const tooltipMessage = isEmptyLesson
    ? t('virtualInternship.chooseExperienceToAccessLesson')
    : t('virtualInternship.lockedLessonMessage');

  return (
    <div
      className='group bg-neutral-200 p-xs rounded-sm mb-xs xxxl:mb-x last:!mb-0'
      data-testid='lesson-progress-item'>
      <Tooltip disabled={!isEmptyLesson && !isDisabled} message={tooltipMessage}>
        <div
          className='flex items-center gap-xs cursor-pointer xxxl:gap-x'
          onClick={handleLessonClick}>
          <div className={iconWrapperClassName}>
            <SharedIcon
              className={iconClassName}
              icon={isDisabled ? <LockIcon /> : <IconComponent />}
              size={iconSize}
            />
          </div>
          <div className={lessonLabelClassName}>
            <span>{`${lessonNumber}. `}</span>
            <span>{lessonName}</span>
          </div>
        </div>
        {!isEmptyLesson && isExpanded && (
          <ProgressItemContent
            isDisabled={isDisabled}
            lessonId={lesson.id}
            lessonItems={lessonItems}
          />
        )}
      </Tooltip>
    </div>
  );
};
