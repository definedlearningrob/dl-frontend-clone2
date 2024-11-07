import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';
import { isEmpty, isNumber } from 'lodash-es';

import { STUDENT_COURSE_ACTIVITY } from '@dc/graphql/user/queries/studentCourseActivity';
import { GRADE_STATUSES } from '@dc/resources/constants';

const CourseActivityContext = createContext();

export const CourseActivityProvider = ({ children, courseId, refetchQuery, studentUuid }) => {
  const [itemsToGrade, setItemsToGrade] = useState([]);
  const [itemToGradeIndex, setItemToGradeIndex] = useState(null);
  const [withQuery, setWithQuery] = useState(false);

  const [isSimplifiedGradingEnabled, setIsSimplifiedGradingEnabled] = useState(
    !!itemsToGrade[itemToGradeIndex]?.submission?.grade
  );

  useEffect(() => {
    if (isNumber(itemToGradeIndex)) {
      const itemToGrade = itemsToGrade[itemToGradeIndex];

      const hasAcceptanceGrade = !isEmpty(itemToGrade?.submission?.grade);
      const hasRubricGrade = !isEmpty(itemToGrade?.submission?.rubricGrade);

      const hasBothGrades = hasAcceptanceGrade && hasRubricGrade;

      const hasRubricGradeAfterAcceptanceGrade =
        hasBothGrades &&
        dayjs(itemToGrade.submission.rubricGrade.updatedAt).isAfter(
          itemToGrade.submission.grade.updatedAt
        );

      setIsSimplifiedGradingEnabled(!hasRubricGradeAfterAcceptanceGrade && hasAcceptanceGrade);
    }
  }, [itemsToGrade, itemToGradeIndex]);

  const [callQuery, { data, loading, refetch }] = useLazyQuery(STUDENT_COURSE_ACTIVITY, {
    fetchPolicy: 'no-cache',
    variables: { courseId, uuid: studentUuid },
  });

  useEffect(() => {
    if (withQuery) {
      callQuery();
    }
  }, [withQuery]);

  useEffect(() => {
    if (data) {
      const {
        student: {
          course: { lessons },
        },
      } = data;

      const sortedLessons = lessons.slice().sort((a, b) => a.step - b.step);

      const lessonItems = sortedLessons.reduce((acc, lesson) => {
        const sortedLessonItems = [...lesson.assignments].sort((a, b) => a.step - b.step);

        const sortedCheckins = [...lesson.checkInQuestions, ...lesson.checkInGroups].sort(
          (a, b) => a.step - b.step
        );

        const mappedCheckins = [...sortedCheckins].reduce((innerAcc, checkIn) => {
          if (checkIn.__typename === 'CheckInGroup') {
            const questions = [...checkIn.questions]
              .map((question) => ({ ...question, group: checkIn.displayName || 'Group' }))
              .sort((a, b) => a.step - b.step);

            return [...innerAcc, ...questions];
          }

          return [...innerAcc, checkIn];
        }, []);

        const withLesson = [...sortedLessonItems, ...mappedCheckins].map((item) => ({
          ...item,
          lesson,
        }));

        return [...acc, ...withLesson];
      }, []);

      const itemsWithStatus = (lessonItems || []).map((lessonItem) => {
        const studentInput = lessonItem?.submission || lessonItem?.answer;

        const hasBeenGradedByRubric = !isEmpty(studentInput?.rubricGrade);
        const grade = hasBeenGradedByRubric ? studentInput?.rubricGrade : studentInput?.grade;

        const status = () => {
          if (!studentInput) {
            return 'not-answered';
          }
          if (!grade) {
            return 'not-graded';
          }
          const studentUpdateDate = dayjs(studentInput.updatedAt);
          const teacherGradeDate = dayjs(grade.updatedAt);

          if (teacherGradeDate.isBefore(studentUpdateDate)) {
            return 'updated';
          }
          if (grade.status === GRADE_STATUSES.NOT_ACCEPTED) return 'not-accepted';

          return hasBeenGradedByRubric ? 'graded' : grade.status.toLowerCase();
        };

        return {
          ...lessonItem,
          status: status(),
        };
      });

      setItemsToGrade(itemsWithStatus);
    }
  }, [data]);

  const isCurrentItemFirst = itemToGradeIndex === 0;
  const isCurrentItemLast = itemToGradeIndex === itemsToGrade.length - 1;

  const selectNextItemToGrade = () => {
    const itemsLength = itemsToGrade.length;
    const isCurrentItemLast = itemToGradeIndex === itemsLength - 1;
    const nextItemIndex = isCurrentItemLast ? 0 : itemToGradeIndex + 1;

    setItemToGradeIndex(nextItemIndex);
  };

  const selectPreviousItemToGrade = () => {
    const itemsLength = itemsToGrade.length;
    const isCurrentItemFirst = itemToGradeIndex === 0;
    const nextItemIndex = isCurrentItemFirst ? itemsLength - 1 : itemToGradeIndex - 1;

    setItemToGradeIndex(nextItemIndex);
  };

  const setItemToGrade = (index) => setItemToGradeIndex(index);

  const triggerRefetchQueries = () => (refetchQuery ? refetchQuery() : () => {});

  const value = useMemo(
    () => ({
      itemsToGrade,
      itemToGrade: itemsToGrade[itemToGradeIndex],
      setItemToGradeByIndex: setItemToGrade,
      isCurrentItemFirst,
      isCurrentItemLast,
      loading,
      isSimplifiedGradingEnabled,
      setIsSimplifiedGradingEnabled,
      selectNextItemToGrade,
      selectPreviousItemToGrade,
      courseId,
      studentUuid,
      triggerRefetchQueries,
      refetchGrading: refetch,
      withQuery,
      setWithQuery,
    }),
    [
      itemsToGrade,
      itemToGradeIndex,
      setItemToGrade,
      isCurrentItemFirst,
      isCurrentItemLast,
      loading,
      selectNextItemToGrade,
      selectPreviousItemToGrade,
      setIsSimplifiedGradingEnabled,
      isSimplifiedGradingEnabled,
      courseId,
      studentUuid,
      triggerRefetchQueries,
      refetch,
      withQuery,
      setWithQuery,
    ]
  );

  return <CourseActivityContext.Provider value={value}>{children}</CourseActivityContext.Provider>;
};

CourseActivityProvider.propTypes = {
  children: PropTypes.node,
  courseId: PropTypes.string,
  refetchQuery: PropTypes.func,
  studentUuid: PropTypes.string,
};

function useCourseActivity(options) {
  const contextValue = useContext(CourseActivityContext);

  useEffect(() => {
    if (options) {
      contextValue.setWithQuery(options.withQuery);
    }
  }, [options]);

  return contextValue;
}

export default useCourseActivity;
