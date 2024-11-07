import { isEmpty } from 'lodash-es';
import { useField } from 'formik';

import { TSchoolClass } from '@pbl/graphql/user/queries/schoolClasses';
import { getFilteredSchoolClasses } from '@pbl/components/User/Project/Assign/Body/helpers';

import { useFilterContext } from '@shared/hooks/useFilterContext';

import { AssignedItems } from '../AssignedItems';
import ProjectAssignEmpty from '../Empty/AssignEmpty';

type Props = {
  schoolClasses: TSchoolClass[];
};

const ProjectAssigned = ({ schoolClasses }: Props) => {
  const [studentIdsField] = useField('studentIds');
  const [teamIdsField] = useField('teamIds');
  //@ts-ignore
  const { filter } = useFilterContext();

  const schoolClassesWithAssigned = schoolClasses.reduce((acc, schoolClass) => {
    const newStudents = schoolClass.students.nodes.filter((student) =>
      studentIdsField.value.includes(student.uuid)
    );
    const newTeams = schoolClass.teams.filter((team) => teamIdsField.value.includes(team.uuid));

    if (!isEmpty(newStudents) || !isEmpty(newTeams)) {
      return [...acc, { ...schoolClass, students: { nodes: newStudents }, teams: newTeams }];
    }

    return acc;
  }, [] as TSchoolClass[]);

  const filteredSchoolClasses = getFilteredSchoolClasses({
    assignedTab: true,
    filter,
    schoolClasses: schoolClassesWithAssigned,
  });

  return (
    <>
      {!isEmpty(filteredSchoolClasses) ? (
        <ul>
          {filteredSchoolClasses.map((filteredClass: TSchoolClass) => (
            <AssignedItems key={filteredClass.uuid} schoolClass={filteredClass} />
          ))}
        </ul>
      ) : (
        <ProjectAssignEmpty tab='Assigned' />
      )}
    </>
  );
};

export default ProjectAssigned;
