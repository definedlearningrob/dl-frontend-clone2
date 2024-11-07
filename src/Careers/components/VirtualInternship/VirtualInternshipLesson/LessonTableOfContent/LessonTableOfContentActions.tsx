import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { isEmpty, isNull } from 'lodash-es';

import { useVirtualInternshipContent } from '@dc/graphql/student/hooks/useVirtualInternshipContent';
import { useVirtualInternshipLessonProgress } from '@dc/hooks/useVirtualInternshipLessonProgress';
import { OpportunityExperiencesModal } from '@dc/components/Student/VirtualInternship/OpportunityExperiencesModal/OpportunityExperiencesModal';
import { TVirtualInternshipLesson } from '@dc/resources/types';

import { ReactComponent as ArrowLeftIcon } from '@shared/svg/arrow_backward.svg';
import { ReactComponent as ArrowRightIcon } from '@shared/svg/arrow_forward.svg';
import SharedButton from '@shared/components/Button/Button';

import styles from './LessonTableOfContentActions.module.sass';

export const LessonTableOfContentActions = () => {
  const { lessonId, opportunityId } = useParams<{ lessonId: string; opportunityId: string }>();
  const { t } = useTranslation();
  const history = useHistory();
  const [isOpportunityModalOpen, toggleOpportunityModal] = useToggle(false);
  const { data, loading } = useVirtualInternshipContent({ opportunityId });
  const { virtualInternshipContent, getIsLessonEnabled, getUnfinishedPreviousLessons } =
    useVirtualInternshipLessonProgress(opportunityId);

  const currentLessonIndex = virtualInternshipContent.findIndex(
    (lesson) => lesson?.id === lessonId
  );

  const isLastLesson = currentLessonIndex === virtualInternshipContent.length - 1;
  const isFirstLesson = currentLessonIndex === 0;
  const nextLesson = virtualInternshipContent[currentLessonIndex + 1];
  const isNextLessonAvailable = getIsLessonEnabled(nextLesson);
  const isNextButtonEnabled = !isLastLesson && (isNextLessonAvailable || isNull(nextLesson));

  const isPreviousButtonEnabled =
    !isFirstLesson && getIsLessonEnabled(virtualInternshipContent[currentLessonIndex - 1]);

  const navigateFromCurrentLesson = (index: number) => {
    const navigatedLesson = virtualInternshipContent[currentLessonIndex + index];

    if (isNull(navigatedLesson)) {
      toggleOpportunityModal();
    } else {
      history.push(
        `/opportunities/${opportunityId}/virtual-internship/lesson/${navigatedLesson?.id}`
      );
    }
  };

  const handleModalSave = (selectedLessons: TVirtualInternshipLesson[]) => {
    const currentLesson = virtualInternshipContent[currentLessonIndex];
    const unfinishedPreviousLessons = getUnfinishedPreviousLessons(currentLesson!.id);

    if (isEmpty(unfinishedPreviousLessons)) {
      const nextLessonIndex =
        selectedLessons.findIndex((lesson) => lesson.id === currentLesson!.id) + 1;
      const nextLesson = selectedLessons[nextLessonIndex];

      history.push(`/opportunities/${opportunityId}/virtual-internship/lesson/${nextLesson.id}`);
    }
  };

  if (loading || !data) {
    return null;
  }

  return (
    <>
      <div className={styles.progressButtons}>
        <SharedButton
          Icon={ArrowLeftIcon}
          className={styles.progressButton}
          disabled={!isPreviousButtonEnabled}
          variant='primary-outlined'
          onClick={() => navigateFromCurrentLesson(-1)}>
          {t('lessons.lessonItem.progress.previous')}
        </SharedButton>
        <SharedButton
          Icon={ArrowRightIcon}
          className={styles.progressButton}
          disabled={!isNextButtonEnabled}
          iconPlacement='end'
          variant='primary-outlined'
          onClick={() => navigateFromCurrentLesson(1)}>
          {t('lessons.lessonItem.progress.next')}
        </SharedButton>
      </div>
      <OpportunityExperiencesModal
        isOpen={isOpportunityModalOpen}
        onClose={toggleOpportunityModal}
        onSave={handleModalSave}
      />
    </>
  );
};
