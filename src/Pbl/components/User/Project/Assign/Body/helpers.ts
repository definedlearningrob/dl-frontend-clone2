import { isEmpty } from 'lodash-es';

import {
  type TSchoolClass,
  type TSchoolClassStudent,
  type TTeam,
} from '@pbl/graphql/user/queries/schoolClasses';

type Props = {
  schoolClasses: TSchoolClass[];
  assignedTab?: boolean;
  filter: {
    nameCont: string;
  };
  filterTeams?: boolean;
};

export const getFilteredSchoolClasses = ({
  assignedTab = false,
  filter,
  filterTeams = true,
  schoolClasses,
}: Props) => {
  const filteredEmptyClasses = schoolClasses.filter(
    (schoolClass) => !isEmpty(schoolClass.students.nodes)
  );
  if (!filter.nameCont) return filteredEmptyClasses;

  return filteredEmptyClasses.reduce((acc: TSchoolClass[], schoolClass: TSchoolClass) => {
    const searchedName = filter.nameCont.toLowerCase();

    if (schoolClass.name.toLowerCase().includes(searchedName)) {
      return [...acc, schoolClass];
    }

    const filteredStudents = schoolClass.students.nodes.filter((student) => {
      const studentName = `${student.firstName} ${student.lastName}`.toLowerCase();

      return studentName.includes(searchedName);
    });

    const filteredTeams = filterTeams
      ? schoolClass.teams.filter((team) => {
          const teamName = team.name.toLowerCase();
          const filteredTeamStudents = team.students.nodes.filter((student) => {
            const studentName = `${student.firstName} ${student.lastName}`.toLowerCase();

            return studentName.includes(searchedName);
          });

          return !isEmpty(filteredTeamStudents) || teamName.includes(searchedName);
        })
      : [];

    const showFilteredTeams = filterTeams ? !isEmpty(filteredTeams) : !isEmpty(filteredStudents);
    const showAllFilteredItems = assignedTab
      ? !isEmpty(filteredTeams) || !isEmpty(filteredStudents)
      : showFilteredTeams;

    if (showAllFilteredItems) {
      return [
        ...acc,
        { ...schoolClass, students: { nodes: filteredStudents }, teams: filteredTeams },
      ];
    }

    return acc;
  }, [] as TSchoolClass[]);
};

export const computeInitialValues = (projectId: string, schoolClasses: TSchoolClass[]) => {
  const students = schoolClasses.map((schoolClass) => schoolClass.students.nodes).flat();
  const enrolledStudents = students
    .filter((student) => student.isAssignedToTask && student.uuid)
    .map((student) => student.uuid);

  const teams = schoolClasses.map((schoolClass) => schoolClass.teams).flat();
  const enrolledTeams = teams
    .filter((team) => team.tasks.some((task) => task.id === projectId))
    .map((team) => team.uuid);

  return {
    teamIds: enrolledTeams,
    studentIds: enrolledStudents,
  };
};

export const computeStudentsDiff = (
  initialIds: string[],
  resultIds: string[]
): {
  toAssign: string[];
  toUnassign: string[];
} => {
  const toAssign = resultIds.filter((id) => !initialIds.includes(id));
  const toUnassign = initialIds.filter((id) => !resultIds.includes(id));

  return { toAssign, toUnassign };
};

export const computeTeamsDiff = (
  initialIds: string[],
  resultIds: string[]
): {
  teamsToAssign: string[];
  teamsToUnassign: string[];
} => {
  const teamsToAssign = resultIds.filter((id) => !initialIds.includes(id));
  const teamsToUnassign = initialIds.filter((id) => !resultIds.includes(id));

  return { teamsToAssign, teamsToUnassign };
};

export const hasIncludedStudent = (students: TSchoolClassStudent[], searchedName: string) =>
  students.some((student) => {
    const studentName = `${student.firstName} ${student.lastName}`.toLowerCase();

    return studentName.includes(searchedName);
  });

export const hasIncludedTeam = (teams: TTeam[], searchedName: string) =>
  teams.some((team) => {
    const teamName = team.name.toLowerCase();
    const filteredTeamStudents = team.students.nodes.filter((student) => {
      const studentName = `${student.firstName} ${student.lastName}`.toLowerCase();

      return studentName.includes(searchedName);
    });

    return !isEmpty(filteredTeamStudents) || teamName.includes(searchedName);
  });

export const hasIncludedStudentsInTeam = (team: TTeam, searchedName: string) =>
  team.students.nodes.some((student) => {
    const studentName = `${student.firstName} ${student.lastName}`.toLowerCase();

    return studentName.includes(searchedName);
  });
