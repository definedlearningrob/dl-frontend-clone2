import { TLesson as TStudentLesson } from '@dc/graphql/student/queries/virtualInternshipLesson';
import { TLesson as TUserLesson } from '@dc/graphql/user/queries/virtualInternshipLesson';

export type TLesson = TStudentLesson | TUserLesson;
export type TCheckInQuestion = TLesson['checkInQuestions'][number];
export type TCheckInGroup = TLesson['checkInGroups'][number];
