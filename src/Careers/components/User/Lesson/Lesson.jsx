/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Assignment from '@dc/components/Student/Lesson/Assignment/Assignment';
import Attachment from '@dc/components/Student/Lesson/Attachment/Attachment';
import CheckInQuestion from '@dc/components/Student/Lesson/CheckInQuestion/CheckInQuestion';
import CheckInGroup from '@dc/components/Student/Lesson/CheckInGroup/CheckInGroup';
import Description from '@dc/components/Student/Lesson/Description/Description';
import Presentation from '@dc/components/Student/Lesson/ExternalPresentation/ExternalPresentation';
import ResearchLink from '@dc/components/Student/Lesson/ResearchLink/ResearchLink';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import Text from '@dc/components/Student/Lesson/Text/Text';
import Video from '@dc/components/Student/Lesson/Video/Video';
import Vocabulary from '@dc/components/Student/Lesson/Vocabulary/Vocabulary';
import { LESSON_TYPES } from '@dc/resources/constants';
import LessonExtensionFields from '@dc/components/Extensions/Lessons/DeepDive/ExtensionFields';
import { CareerReviewSurvey } from '@dc/components/Student/Lesson/Survey/CareerReviewSurvey';

UserAppLesson.propTypes = {
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
};

function UserAppLesson({ lesson }) {
  const { courseId } = useParams();

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

    return [
      ...externalPresentations,
      ...vocabularies,
      ...texts,
      ...attachments,
      ...videos,
      ...assignments,
      ...researchLinks,
    ].sort((a, b) => a.step - b.step);
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
            assignment: (
              <Assignment key={item.step + item.id} assignment={item} previewOnly={true} />
            ),
            attachment: (
              <Attachment key={item.step + item.id} attachment={item} previewOnly={true} />
            ),
            externalpresentation: <Presentation key={item.step + item.id} presentation={item} />,
            researchlink: (
              <ResearchLink
                key={
                  (item.items ? item.items[0].step : item.step) +
                  (item.items ? item.items[0].id : item.id)
                }
                previewOnly={true}
                researchLinks={item.items || [item]}
              />
            ),
            text: <Text key={item.step + item.id} text={item} />,
            video: <Video key={item.step + item.id} video={item} />,
            vocabulary: (
              <Vocabulary
                key={
                  (item.items ? item.items[0].step : item.step) +
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
            <CheckInQuestion
              key={`check-in-${checkin.question}`}
              checkInQuestion={checkin}
              previewOnly={true}
            />
          ),
          checkingroup: (
            <CheckInGroup
              key={`check-in-group-${checkin.displayName}`}
              checkInGroup={checkin}
              previewOnly={true}
            />
          ),
        }[checkin.__typename.toLowerCase()])
    );
  };

  const isLessonTypeOfSurvey = useMemo(
    () => lesson.type === LESSON_TYPES.CAREER_REVIEW_SURVEY.toLowerCase(),
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

  const isLessonTypeOfDigDeeper = useMemo(
    () => lesson.type === LESSON_TYPES.DIG_DEEPER_INTO_CAREER.toLowerCase(),
    [lesson]
  );

  return (
    <SharedMainContent>
      <section className='lesson'>
        <h2 className='lesson__title'>{lesson.name}</h2>
        <section className='presentation'>{presentationCards}</section>
        <Description lesson={lesson} />
        {isLessonTypeOfDigDeeper && <LessonExtensionFields />}
        {withoutPresentationCards}
        {renderCheckins()}
        {isLessonTypeOfSurvey && (
          <CareerReviewSurvey
            careerReviewSurvey={lesson.careerReviewSurvey}
            courseName={lesson.name}
            previewOnly={true}
            resourceId={courseId}
          />
        )}
      </section>
    </SharedMainContent>
  );
}

export default UserAppLesson;