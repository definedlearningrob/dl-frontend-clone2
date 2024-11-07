import assignmentLessonsQuery from '@dc/graphql/user/queries/assignmentLessons';
import attachmentLessonsQuery from '@dc/graphql/user/queries/attachmentLessons';
import lessonCoursesQuery from '@dc/graphql/user/queries/lessonCourses';
import presentationLessonsQuery from '@dc/graphql/user/queries/externalPresentationLessons';
import productTasksQuery from '@dc/graphql/user/queries/productTasks';
import researchLinkLessonsQuery from '@dc/graphql/user/queries/researchLinkLessons';
import rubricAssignmentsQuery from '@dc/graphql/user/queries/rubricAssignments';
import rubricProductsQuery from '@dc/graphql/user/queries/rubricProducts';
import taskUnitsQuery from '@dc/graphql/user/queries/taskUnits';
import textLessonsQuery from '@dc/graphql/user/queries/textLessons';
import trackCatalogsQuery from '@dc/graphql/user/queries/trackCatalogs';
import unitTracksQuery from '@dc/graphql/user/queries/unitTracks';
import videoLessonsQuery from '@dc/graphql/user/queries/videoLessons';
import vocabularyLessonsQuery from '@dc/graphql/user/queries/vocabularyLessons';
import { AFFECTED_RESOURCES_FILED } from '@dc/resources/constants';

export const affectedResourcesConfig = (recordToArchive) =>
  ({
    assignment: [
      { resourcesField: AFFECTED_RESOURCES_FILED.LESSONS, query: assignmentLessonsQuery },
    ],
    attachment: [
      { resourcesField: AFFECTED_RESOURCES_FILED.LESSONS, query: attachmentLessonsQuery },
    ],
    lesson: [{ resourcesField: AFFECTED_RESOURCES_FILED.COURSES, query: lessonCoursesQuery }],
    externalpresentation: [
      { resourcesField: AFFECTED_RESOURCES_FILED.LESSONS, query: presentationLessonsQuery },
    ],
    product: [{ resourcesField: AFFECTED_RESOURCES_FILED.TASKS, query: productTasksQuery }],
    researchlink: [
      { resourcesField: AFFECTED_RESOURCES_FILED.LESSONS, query: researchLinkLessonsQuery },
    ],
    rubric: [
      {
        resourcesField: AFFECTED_RESOURCES_FILED.PRODUCTS,
        query: rubricProductsQuery,
      },
      {
        resourcesField: AFFECTED_RESOURCES_FILED.ASSIGNMENTS,
        query: rubricAssignmentsQuery,
      },
    ],
    task: [{ resourcesField: AFFECTED_RESOURCES_FILED.UNITS, query: taskUnitsQuery }],
    text: [{ resourcesField: AFFECTED_RESOURCES_FILED.LESSONS, query: textLessonsQuery }],
    track: [{ resourcesField: AFFECTED_RESOURCES_FILED.CATALOGS, query: trackCatalogsQuery }],
    unit: [{ resourcesField: AFFECTED_RESOURCES_FILED.TRACKS, query: unitTracksQuery }],
    video: [{ resourcesField: AFFECTED_RESOURCES_FILED.LESSONS, query: videoLessonsQuery }],
    vocabulary: [
      { resourcesField: AFFECTED_RESOURCES_FILED.LESSONS, query: vocabularyLessonsQuery },
    ],
  }[recordToArchive?.__typename.toLowerCase()]);
