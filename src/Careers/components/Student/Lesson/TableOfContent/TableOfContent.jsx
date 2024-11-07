import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';
import COURSE_CONTENT from '@dc/graphql/student/queries/tableOfContents';
import LessonStep from '@dc/components/Student/Lesson/TableOfContent/LessonStep/LessonStep';
import NavigationButton from '@dc/components/Student/Lesson/TableOfContent/NavigationButton/NavigationButton';
import NavigationLink from '@dc/components/Student/Lesson/TableOfContent/NavigationLink/NavigationLink';
import { LESSON_ITEM_TYPES, LESSON_TYPES } from '@dc/resources/constants';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import useQueryParams from '@shared/hooks/useQueryParams';

import { getIsSurveyEnabled } from '../helpers';

export const PROGRESS_STATUS = {
  DONE: 'done',
  IN_PROGRESS: 'in_progress',
  NOT_STARTED: 'not_started',
  INACTIVE: 'inactive',
};

export const COMPLETABLE_ITEMS = {
  ASSIGNMENT: 'Assignment',
  CHECK_IN_QUESTION: 'CheckInQuestion',
  CHECK_IN_GROUP: 'CheckInGroup',
  CAREER_REVIEW_SURVEY: LESSON_ITEM_TYPES.CAREERREVIEWSURVEY,
};

const groupableItems = ['ResearchLink', 'Vocabulary'];

StudentLessonTableOfContent.propTypes = {
  lessons: PropTypes.array,
  progress: PropTypes.shape({
    submitted: PropTypes.number,
    total: PropTypes.number,
  }),
};

function StudentLessonTableOfContent({ progress }) {
  const { lessonId, courseId } = useParams();
  const [activeItemID, setActiveItemID] = useState(lessonId || null);
  const { params } = useQueryParams();
  const location = useLocation();
  const { t } = useTranslation();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      const offset = 104; // aligned with top of table of content card on desktop
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = sectionPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToSection(params?.section);
  }, [location]);

  const handleExpandLesson = (id) => {
    setActiveItemID(id);
  };

  const isCompletable = (type) => Object.values(COMPLETABLE_ITEMS).includes(type);

  const getGroupedNavItems = (lesson) => {
    const parsedExtensions = lesson.extensionFields.map((extension) => ({
      name: extension.name,
      id: extension.id,
      type: 'ExtensionField',
    }));
    const items = [...parsedExtensions, ...lesson.items, ...lesson.checkIns];

    const isSurveyLessonType = lesson.type === LESSON_TYPES.CAREER_REVIEW_SURVEY;
    const isProjectLessonType = lesson.type === LESSON_TYPES.PROJECT;
    const hasPresentation = lesson.items.find((item) => item.type === 'ExternalPresentation');

    if (isSurveyLessonType) {
      return [
        {
          type: LESSON_ITEM_TYPES.CAREERREVIEWSURVEY,
          completed: !!lesson.surveyPerformed,
          name: lesson.name,
        },
      ];
    }

    if (isProjectLessonType && !hasPresentation) {
      items.unshift({
        type: 'intro',
        step: 0,
        id: '',
      });
    } else {
      items.sort((a, b) => {
        if (a.type === 'ExternalPresentation' && b.type !== 'ExternalPresentation') {
          return -1;
        } else if (a.type !== 'ExternalPresentation' && b.type === 'ExternalPresentation') {
          return 1;
        }

        return 0;
      });
    }

    return items.reduce((accumulator, currentValue, index, array) => {
      const item = { ...currentValue };

      const nextItem = array[index + 1];
      const previousItem = array[index - 1];
      const previousItemType = previousItem && previousItem.type;
      const nextItemType = nextItem && nextItem.type;

      const itemType = item.type;
      const itemIsGroupable = groupableItems.includes(itemType);
      const nextItemIsSameType = nextItemType === itemType;
      const previousItemIsSameType = previousItemType === itemType;

      if (itemIsGroupable && nextItemIsSameType && !previousItemIsSameType) {
        return [...accumulator, { ...item }];
      }

      if (itemIsGroupable && previousItemIsSameType) {
        return accumulator;
      }

      return [...accumulator, item];
    }, []);
  };

  const getLessonStatus = (lesson) => {
    const navItems = getGroupedNavItems(lesson);

    const hasSomeDoneItems = navItems.some(
      (item) => item.completed === true && isCompletable(item.type)
    );

    const hasSomeNotStartedItems = navItems.some(
      (item) => item.completed === false && isCompletable(item.type)
    );

    if (hasSomeDoneItems && hasSomeNotStartedItems) return PROGRESS_STATUS.IN_PROGRESS;

    if (hasSomeNotStartedItems) return PROGRESS_STATUS.NOT_STARTED;

    return PROGRESS_STATUS.DONE;
  };

  const getItemStatus = (item) => {
    if (isCompletable(item.type)) {
      return item.completed ? PROGRESS_STATUS.DONE : PROGRESS_STATUS.NOT_STARTED;
    }

    return PROGRESS_STATUS.INACTIVE;
  };

  const createNavLink = (item, id) => {
    const sectionParam = typeof item.id !== 'undefined' ? item.type + item.id : item.type;

    return {
      pathname: `/courses/${courseId}/lessons/${id}`,
      search: `?section=${sectionParam}`,
    };
  };

  const getTableData = (content) =>
    content.map((lesson) => ({
      name: lesson.name,
      id: lesson.id,
      items: getGroupedNavItems(lesson),
      status: getLessonStatus(lesson),
    }));

  const getTableItems = (content) => {
    const isSurveyEnabled = getIsSurveyEnabled(content);

    return getTableData(content).map((lesson) => (
      <LessonStep
        key={lesson.id}
        id={lesson.id}
        isActive={activeItemID === lesson.id}
        name={lesson.name}
        setActive={handleExpandLesson}
        status={lesson.status}>
        {lesson.items.map((item, index, items) => (
          <NavigationLink
            key={index}
            courseProgress={progress}
            displayName={groupableItems.includes(item.type) ? null : item.name}
            isLastItem={index === items.length - 1}
            isSurveyEnabled={isSurveyEnabled}
            status={getItemStatus(item)}
            to={createNavLink(item, lesson.id)}
            typename={item.type}
          />
        ))}
      </LessonStep>
    ));
  };

  return (
    <Card className='table-of-content'>
      <h4 className='table-of-content__title'>{t('course.tableOfContent.heading')}</h4>
      <SharedDataLoader
        options={{
          variables: {
            id: courseId,
          },
          fetchPolicy: 'no-cache',
        }}
        query={COURSE_CONTENT}>
        {({ course: { content } }) => (
          <>
            <div className='table-of-content__list transparent-scrollbar'>
              {getTableItems(content)}
            </div>
            <div className='table-of-content__action-buttons'>
              <NavigationButton direction='previous' lessons={content} />
              <NavigationButton direction='next' lessons={content} />
            </div>
          </>
        )}
      </SharedDataLoader>
    </Card>
  );
}

export default StudentLessonTableOfContent;
