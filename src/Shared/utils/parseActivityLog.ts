import { History } from 'history';

import { ACTIVITY_TYPE } from '@shared/resources/enums';
import { type TActivityItem } from '@shared/components/ActivityLog/ActivityLog';

type TGenericResource = {
  id: string;
  name: string;
};

type TDynamicEdgeNodeField = {
  schoolClass?: {
    uuid: string;
    name: string;
  };
  student?: {
    uuid: string;
    firstName: string;
    lastName: string;
  };
  team?: {
    name: string;
  };
};

type TGenericEdge = {
  cursor: string;
  node: {
    activity?: string;
    context: TGenericResource | null;
    updatedAt: string;
    target: TGenericResource;
    type: ACTIVITY_TYPE;
  } & {
    [key in keyof TDynamicEdgeNodeField]: TDynamicEdgeNodeField[key];
  };
};

type RedirectableResources =
  | 'student'
  | 'course'
  | 'schoolClass'
  | 'project'
  | 'lesson'
  | 'projectGrade';

type TActivityLogItemNode = TActivityItem['node'];
type TActivityLogItemNodeData = Omit<TActivityLogItemNode, 'updatedAt' | 'type' | 'activity'>;

export const getParsedActivityItems = <T>(
  edges: T extends TGenericEdge[] ? T : TGenericEdge[],
  history: History
): TActivityItem[] =>
  edges.map(({ cursor, node }) => ({
    cursor,
    node: {
      activity: node.activity,
      updatedAt: node.updatedAt,
      type: node.type,
      ...parseActivityLogItemData(node, history),
    },
  }));

const redirectToResource = (
  type: RedirectableResources,
  history: History,
  [firstResourceId, secondResourceId]: [string, string?]
) => {
  switch (type) {
    case 'course':
      return () => history.push(`/courses/${firstResourceId}`);
    case 'lesson':
      return () => history.push(`/courses/${firstResourceId}/grading-schoolclasses`);
    case 'project':
      return () => history.push(`/projects/${firstResourceId}`);
    case 'projectGrade':
      return () => history.push(`/projects/${firstResourceId}/grading/${secondResourceId}`);
    case 'schoolClass':
      return () => history.push(`/my-classes/${firstResourceId}`);
    case 'student':
      return () => history.push(`/students/${firstResourceId}`);
    default:
      break;
  }
};

const createStudentTarget = (
  student: Required<TDynamicEdgeNodeField>['student'],
  team: Required<TDynamicEdgeNodeField>['team'],
  history: History,
  withAction: boolean
) => ({
  id: student!.uuid,
  name: `${student.firstName} ${student.lastName}`,
  ...(team && { teamName: team.name }),
  ...(withAction && { action: redirectToResource('student', history, [student.uuid]) }),
});

const createSubjectTargetPBL = (
  schoolClass: Required<TDynamicEdgeNodeField>['schoolClass'],
  target: TGenericResource,
  history: History
) => ({
  subject: {
    id: schoolClass.uuid,
    name: schoolClass.name,
    action: redirectToResource('schoolClass', history, [schoolClass.uuid]),
  },
  target: {
    id: 'randomId',
    name: target.name,
  },
});

const createTargetClassPBL = (
  schoolClass: Required<TDynamicEdgeNodeField>['schoolClass'],
  history: History
) => ({
  subject: {
    id: 'randomId',
    name: '',
  },
  target: {
    id: schoolClass.uuid,
    name: schoolClass.name,
    action: () => history.push(`/my-classes/${schoolClass.uuid}`),
  },
});

const parseActivityLogItemData = (
  node: TGenericEdge['node'],
  history: History
): TActivityLogItemNodeData => {
  let workNode = {} as TActivityLogItemNodeData;

  switch (node.type) {
    case ACTIVITY_TYPE.COURSE_ENROLLMENT:
      // Student - Student
      // Target - Course
      // Context - null
      workNode = {
        context: null,
        subject: {
          id: node.target.id,
          name: node.target.name,
          action: redirectToResource('course', history, [node.target.id]),
        },
        target: createStudentTarget(node.student!, node.team!, history, true),
      };
      break;

    case ACTIVITY_TYPE.COURSE_ASSIGNMENT:
      // Student - Student
      // Target - Course
      // Context - User | null
      workNode = {
        context: node.context
          ? {
              id: node.context!.id,
              name: node.context!.name,
            }
          : null,
        subject: {
          id: node.target.id,
          name: node.target.name,
          action: redirectToResource('course', history, [node.target.id]),
        },
        target: createStudentTarget(node.student!, node.team!, history, true),
      };
      break;

    case ACTIVITY_TYPE.ASSIGNMENT_SUBMISSION:
      // Student - Student
      // Target - Course
      // Context - Assignment | null
      workNode = {
        context: null,
        subject: node.context
          ? {
              id: node.context!.id,
              name: node.context!.name,
              action: redirectToResource('course', history, [node.target.id]),
            }
          : {
              id: node.target.id,
              name: 'assignment',
              action: redirectToResource('course', history, [node.target.id]),
            },
        target: createStudentTarget(node.student!, node.team!, history, true),
      };
      break;

    case ACTIVITY_TYPE.CHECK_IN_QUESTION_ANSWER:
      // Student - Student
      // Target - Course[DC] | null[PBL]
      // Context - Lesson[DC] | Task[PBL] | null for old entries

      const isDC = !!node.target;

      const createDCTarget = () => ({
        id: node.target.id,
        name: node.target.name,
        action: redirectToResource('lesson', history, [node.target.id, node.context?.id]),
      });

      const createPBLTarget = () => ({
        id: node.context!.id,
        name: node.context!.name,
        action: redirectToResource('project', history, [node.context!.id]),
      });

      const parsedSubject = isDC ? createDCTarget() : createPBLTarget();

      workNode = {
        context: null,
        subject: parsedSubject,
        target: createStudentTarget(node.student!, node.team!, history, !Boolean(node.context)),
      };
      break;

    case ACTIVITY_TYPE.CHECK_IN_QUESTION_ANSWER_SUBMITTED:
      // SchoolClass - SchoolClass
      // Target - Student
      // Context - Task
      workNode = {
        context: null,
        subject: {
          id: node.context!.id,
          name: node.context!.name,
          action: redirectToResource('project', history, [node.context!.id]),
        },
        target: {
          name: node.target.name,
          ...(node.team && { teamName: node.team.name }),
        },
      };
      break;

    case ACTIVITY_TYPE.PRODUCT_SUBMISSION:
      // Student - Student
      // Target - null
      // Context - Task

      workNode = {
        context: null,
        subject: {
          id: node.context!.id,
          name: node.context!.name,
          action: redirectToResource('project', history, [node.context!.id]),
        },
        target: {
          name: `${node.student?.firstName} ${node.student?.lastName}`,
          id: node.student?.uuid,
          ...(node.team && { teamName: node.team.name }),
        },
      };
      break;

    case ACTIVITY_TYPE.PRODUCT_SUBMISSION_SUBMITTED:
      // SchoolClass - SchoolClass
      // Target - Student
      // Context - Task

      workNode = {
        context: null,
        subject: {
          id: node.context!.id,
          name: node.context!.name,
          action: redirectToResource('project', history, [node.context!.id]),
        },
        target: {
          name: node.target.name,
          id: node.student?.uuid,
          ...(node.team && { teamName: node.team.name }),
        },
      };
      break;

    case ACTIVITY_TYPE.STUDENT_ADDED:
      // Target - Stundent
      // SchoolClass -SchollClass
      // context - null
      workNode = {
        context: null,
        ...createSubjectTargetPBL(node.schoolClass!, node.target, history),
      };
      break;

    case ACTIVITY_TYPE.STUDENT_REMOVED:
      // Target - Stundent
      // SchoolClass -SchollClass
      // context - null
      workNode = {
        context: null,
        ...createSubjectTargetPBL(node.schoolClass!, node.target, history),
      };
      break;

    case ACTIVITY_TYPE.USER_ADDED:
      // Target - User
      // SchoolClass -SchollClass
      // context - null
      workNode = {
        context: null,
        ...createTargetClassPBL(node.schoolClass!, history),
      };
      break;

    case ACTIVITY_TYPE.USER_REMOVED:
      // Target - User
      // SchoolClass -SchollClass
      // context - null
      workNode = {
        context: null,
        ...createTargetClassPBL(node.schoolClass!, history),
      };
      break;

    default:
      workNode = {
        context: null,
        subject: {
          id: 'randomId',
          name: 'unexpected error has occured',
        },
        target: {
          id: 'randomId',
          name: `An`,
        },
      };
      break;
  }

  return workNode;
};
