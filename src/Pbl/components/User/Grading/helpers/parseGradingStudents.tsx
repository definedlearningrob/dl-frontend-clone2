import { TGradeSubjectsData } from '@pbl/graphql/user/hooks/useGradeSubjectsByStatus';
import { TStudentsAssginedToProjectData } from '@pbl/graphql/user/hooks/useStudentsAssignedToProject';
import { GRADING_STATUS } from '@pbl/resources/enums';

const parseCustomStudents = (
  edges: TStudentsAssginedToProjectData[
    | 'studentsGraded'
    | 'studentsToBeGraded'
    | 'studentsNotSubmitted']['edges']
) => edges.map((edge) => edge.node);

export const getStudentsAndTeamsForSubcategory = (
  subcategory: GRADING_STATUS,
  data: TGradeSubjectsData
) => {
  switch (subcategory) {
    case GRADING_STATUS.ALREADY_GRADED:
      return [...data.schoolClass.studentsGraded.nodes, ...data.schoolClass.teamsGraded];
      break;
    case GRADING_STATUS.WAITING_FOR_GRADING:
      return [...data.schoolClass.studentsToBeGraded.nodes, ...data.schoolClass.teamsToBeGraded];
      break;
    case GRADING_STATUS.NOT_YET_SUBMITTED:
      return [
        ...data.schoolClass.studentsNotSubmitted.nodes,
        ...data.schoolClass.teamsNotSubmitted,
      ];
      break;
  }
};

export const getCustomStudents = (
  subcategory: GRADING_STATUS,
  data: TStudentsAssginedToProjectData
) => {
  switch (subcategory) {
    case GRADING_STATUS.ALREADY_GRADED:
      return parseCustomStudents(data.studentsGraded.edges);
      break;
    case GRADING_STATUS.WAITING_FOR_GRADING:
      return parseCustomStudents(data.studentsToBeGraded.edges);
      break;
    case GRADING_STATUS.NOT_YET_SUBMITTED:
      return parseCustomStudents(data.studentsNotSubmitted.edges);
      break;
  }
};
