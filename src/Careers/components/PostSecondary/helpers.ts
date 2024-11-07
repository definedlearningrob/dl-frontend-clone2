import { InstitutionApplication } from '@dc/graphql/student/queries/institutionApplications';
import { APPLICATIONS_TYPE, RECOMMENDER_TYPE } from '@dc/resources/enums';

export const checkIfHasEnoughTeachers = (application: InstitutionApplication) => {
  const teachers = application.recommenders.filter(
    (recommender) => recommender.type === RECOMMENDER_TYPE.TEACHER
  );

  return teachers.length >= (application.institution.minTeacherEval || 0);
};

export const checkIfCanBeMovedToCommonApp = (
  application: InstitutionApplication,
  hasAccountConnected: boolean
) =>
  application.type === APPLICATIONS_TYPE.DIRECT &&
  application.institution.commonAppEnabled &&
  hasAccountConnected;
