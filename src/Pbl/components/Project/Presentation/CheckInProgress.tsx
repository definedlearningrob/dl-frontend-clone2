import { useMemo } from 'react';
import { isEmpty, sortBy } from 'lodash-es';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import { CourseStatusGraph } from './CourseStatusGraph/CourseStatusGraph';
import { TextStatus } from './TextStatus';

type Props = {
  slide: TTaskPresentationSlide;
};

const MAX_MARKERS_COUNT = 5;

export const CheckInProgress = ({ slide }: Props) => {
  const { t } = useTranslation();
  const { teamId } = useParams<{ teamId?: string }>();

  const { checkInGroups, checkInQuestions } = slide;

  const allCheckInItems = useMemo(() => {
    const filteredCheckInGroups =
      checkInGroups?.filter((checkInGroup) => !isEmpty(checkInGroup.questions)) ?? [];

    return sortBy([...filteredCheckInGroups, ...(checkInQuestions || [])], 'step');
  }, [checkInGroups, checkInQuestions]);

  const allQuestions = useMemo(
    () =>
      allCheckInItems.flatMap((checkIn) => ('questions' in checkIn ? checkIn.questions : checkIn)),
    [allCheckInItems]
  );

  const shouldShowGraph = allQuestions.length <= MAX_MARKERS_COUNT;

  return (
    <div>
      <div className='text-xxxs mb-xxxs font-medium uppercase'>
        {t('components.checkIns.checkInStatus')}
      </div>
      <div className='flex mb-x'>
        {!shouldShowGraph && <TextStatus allQuestions={allQuestions} />}
        {shouldShowGraph &&
          allQuestions.map((question, index) => (
            <CourseStatusGraph
              key={question.id}
              answer={!!teamId ? question.teamSubmission : question.answer}
              index={index}
              questionId={question.id}
              questionsLength={allQuestions.length}
            />
          ))}
      </div>
    </div>
  );
};
