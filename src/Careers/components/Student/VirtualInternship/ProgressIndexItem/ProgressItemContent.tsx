import cx from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import { TLessonItem } from '@dc/graphql/student/queries/virtualInternshipContent';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

import styles from './ProgressItemContent.module.sass';

export type LessonItem = TLessonItem & {
  isCompletable: boolean;
};

type Props = {
  isDisabled: boolean;
  lessonId: string;
  lessonItems: LessonItem[];
};

export const ProgressItemContent = ({ isDisabled, lessonItems, lessonId }: Props) => {
  const { opportunityId } = useParams<{ opportunityId: string }>();

  const showAllAsCompleted = (lessonItem: LessonItem) => {
    if (isDisabled) {
      return false;
    }

    const notCompletedLessonItems = lessonItems.filter(
      (lessonItem) => !lessonItem.completed && lessonItem.isCompletable
    );

    return isEmpty(notCompletedLessonItems) ? true : lessonItem.completed;
  };

  if (isEmpty(lessonItems)) {
    return null;
  }

  return (
    <div className={styles.container}>
      {lessonItems.map((lessonItem) => (
        <Link
          key={lessonItem.id}
          className={cx(styles.lessonItem, { 'pointer-events-none': isDisabled })}
          to={{
            search: `?section=${lessonItem.id}-${lessonItem.type}`,
            pathname: `/opportunities/${opportunityId}/virtual-internship/lesson/${lessonId}`,
          }}>
          <SharedCheckbox
            checked={showAllAsCompleted(lessonItem)}
            className={styles.checkbox}
            disabled={isDisabled || (!lessonItem.isCompletable && !showAllAsCompleted(lessonItem))}
            readOnly={true}
          />
          <span>{lessonItem.name}</span>
        </Link>
      ))}
    </div>
  );
};
