import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';

import Assignment from '@dc/components/Student/Lesson/Assignment/Assignment';
import Attachment from '@dc/components/Student/Lesson/Attachment/Attachment';
import CheckInQuestion from '@dc/components/Student/Lesson/CheckInQuestion/CheckInQuestion';
import Description from '@dc/components/Student/Lesson/Description/Description';
import NextButton from '@dc/components/Student/Lesson/NextButton/NextButton';
import ExternalPresentation from '@dc/components/Student/Lesson/ExternalPresentation/ExternalPresentation';
import ResearchLink from '@dc/components/Student/Lesson/ResearchLink/ResearchLink';
import TableOfContent from '@dc/components/Student/Lesson/TableOfContent/TableOfContent';
import Text from '@dc/components/Student/Lesson/Text/Text';
import Video from '@dc/components/Student/Lesson/Video/Video';
import Vocabulary from '@dc/components/Student/Lesson/Vocabulary/Vocabulary';
import { CONVERSATION_CONTEXT_TYPES } from '@dc/resources/constants';
import { LESSON_TYPES } from '@dc/resources/constants';
import { FutureColleges } from '@dc/components/Student/Lesson/FutureColleges/FutureColleges';
import { CareerReviewSurvey } from '@dc/components/Student/Lesson/Survey/CareerReviewSurvey';

import { useMessaging } from '@shared/hooks/useMessaging';

import LessonExtensionFields from '../../Extensions/Lessons/DeepDive/ExtensionFields';

import CheckInGroup from './CheckInGroup/CheckInGroup';
import { getIsSurveyEnabled } from './helpers';

StudentLesson.propTypes = {
  course: PropTypes.shape({
    careerName: PropTypes.string,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        checkIns: PropTypes.arrayOf(
          PropTypes.shape({
            completed: PropTypes.bool,
          })
        ),
        items: PropTypes.arrayOf(
          PropTypes.shape({
            completed: PropTypes.bool,
            type: PropTypes.string,
          })
        ),
      })
    ),
    hasInstitutionsInStudentState: PropTypes.bool,
    id: PropTypes.string,
    lesson: PropTypes.shape({
      assignments: PropTypes.array,
      attachments: PropTypes.array,
      careerReviewSurvey: PropTypes.object,
      checkInGroups: PropTypes.array,
      checkInQuestions: PropTypes.array,
      externalPresentations: PropTypes.array,
      id: PropTypes.string,
      name: PropTypes.string,
      researchLinks: PropTypes.array,
      texts: PropTypes.array,
      type: PropTypes.string,
      videos: PropTypes.array,
      vocabularies: PropTypes.array,
    }),

    lessons: PropTypes.array,
    name: PropTypes.string,
    progress: PropTypes.shape({
      submitted: PropTypes.number,
      total: PropTypes.number,
    }),
  }),
};

function StudentLesson({ course }) {
  const { messagingState, setMessagingState } = useMessaging();
  const {
    careerName,
    hasInstitutionsInStudentState,
    name,
    lesson,
    lessons,
    progress,
    id,
    content,
  } = course;

  useEffect(() => {
    setMessagingState({
      ...messagingState,
      context: {
        id: lesson.id,
        title: lesson.name,
        type: CONVERSATION_CONTEXT_TYPES.LESSON,
      },
    });

    return () => {
      setMessagingState({
        ...messagingState,
        context: null,
      });
    };
  }, []);

  const sortedLessonItems = useMemo(() => {
    const {
      externalPresentations,
      vocabularies,
      texts,
      attachments,
      videos,
      assignments,
      researchLinks,
    } = lesson;

    const sortedWithoutCheckins = [
      ...externalPresentations,
      ...vocabularies,
      ...texts,
      ...attachments,
      ...videos,
      ...assignments,
      ...researchLinks,
    ].sort((a, b) => a.step - b.step);

    return [...sortedWithoutCheckins];
  }, [lesson]);

  const groupedItems = useMemo(() => {
    const itemsThatShouldBeGroupes = ['researchlink', 'vocabulary'];

    return sortedLessonItems.reduce((acc, item, index, array) => {
      const nextItem = array[index + 1];
      const previousItem = array[index - 1];
      const previousItemType = previousItem && previousItem.__typename.toLowerCase();
      const nextItemType = nextItem && nextItem.__typename.toLowerCase();
      const itemType = item.__typename.toLowerCase();
      const itemIsGroupable = itemsThatShouldBeGroupes.includes(itemType);
      const nextItemIsSameType = nextItemType === itemType;
      const previousItemIsSameType = previousItemType === itemType;

      if (itemIsGroupable && nextItemIsSameType && !previousItemIsSameType) {
        return [...acc, { __typename: item.__typename, items: [item] }];
      }

      if (itemIsGroupable && previousItemIsSameType) {
        acc[acc.length - 1].items.push(item);

        return acc;
      }

      return [...acc, item];
    }, []);
  }, [sortedLessonItems]);

  const lessonItemCards = useMemo(
    () =>
      groupedItems.map(
        (item) =>
          ({
            assignment: <Assignment key={item.__typename + item.id} assignment={item} />,
            attachment: <Attachment key={item.__typename + item.id} attachment={item} />,
            externalpresentation: (
              <ExternalPresentation key={item.__typename + item.id} presentation={item} />
            ),
            researchlink: (
              <ResearchLink
                key={
                  (item.items ? item.items[0].__typename : item.__typename) +
                  (item.items ? item.items[0].id : item.id)
                }
                researchLinks={item.items || [item]}
              />
            ),
            text: <Text key={item.__typename + item.id} text={item} />,
            video: <Video key={item.__typename + item.id} video={item} />,
            vocabulary: (
              <Vocabulary
                key={
                  (item.items ? item.items[0].__typename : item.__typename) +
                  (item.items ? item.items[0].id : item.id)
                }
                vocabularies={item.items || [item]}
              />
            ),
          }[item.__typename.toLowerCase()])
      ),
    [groupedItems]
  );

  const renderCheckins = () => {
    const { checkInQuestions, checkInGroups } = lesson;

    const checkins = [...checkInGroups, ...checkInQuestions];

    const sortedCheckins = checkins.sort((a, b) => parseInt(a.step) - parseInt(b.step));

    return sortedCheckins.map(
      (checkin) =>
        ({
          checkinquestion: (
            <CheckInQuestion key={`check-in-${checkin.question}`} checkInQuestion={checkin} />
          ),
          checkingroup: (
            <CheckInGroup key={`check-in-${checkin.displayName}`} checkInGroup={checkin} />
          ),
        }[checkin.__typename.toLowerCase()])
    );
  };

  const isLessonTypeOfSurvey = useMemo(
    () => lesson.type === LESSON_TYPES.CAREER_REVIEW_SURVEY.toLowerCase(),
    [lesson]
  );

  const isLessonTypeOfDigDeeper = useMemo(
    () => lesson.type === LESSON_TYPES.DIG_DEEPER_INTO_CAREER.toLowerCase(),
    [lesson]
  );

  const presentationCards = useMemo(
    () => lessonItemCards.filter((item) => item.props.presentation),
    [lessonItemCards]
  );

  const withoutPresentationCards = useMemo(
    () => lessonItemCards.filter((item) => !item.props.presentation),
    [lessonItemCards]
  );

  const isSurveyEnabled = getIsSurveyEnabled(content);

  return (
    <div className='flex-container max-container student-lesson-container'>
      {!isLessonTypeOfSurvey && (
        <>
          <p className='lesson__course-name'>{name}</p>
          <h3 className='lesson__title'>{lesson.name}</h3>
        </>
      )}
      <section className='presentation' data-testid='presentation-container'>
        {presentationCards}
      </section>
      <div className='flex gap-base items-start xxxl:gap-md'>
        <section
          className='bg-neutral-200 rounded-sm xxxl:mb-x w-2/3'
          data-testid='items-container'>
          <Description lesson={lesson} />
          {isLessonTypeOfDigDeeper && <LessonExtensionFields />}
          {withoutPresentationCards}
          {renderCheckins()}
          {isLessonTypeOfSurvey && (
            <CareerReviewSurvey
              careerReviewSurvey={lesson.careerReviewSurvey}
              courseName={name}
              previousItemsCompleted={isSurveyEnabled}
              resourceId={id}
            />
          )}
          {!isLessonTypeOfSurvey && <NextButton lessons={lessons} />}
        </section>
        <div className='w-1/3 sticky top-lg'>
          <TableOfContent progress={progress} />
          {careerName && (
            <FutureColleges
              careerName={careerName}
              hasInstitutionsInStudentState={hasInstitutionsInStudentState}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentLesson;
