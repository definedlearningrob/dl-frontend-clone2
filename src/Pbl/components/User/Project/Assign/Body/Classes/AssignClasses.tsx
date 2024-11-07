import { isEmpty } from 'lodash-es';

import { type TSchoolClass } from '@pbl/graphql/user/queries/schoolClasses';
import { getFilteredSchoolClasses } from '@pbl/components/User/Project/Assign/Body/helpers';

import { useFilterContext } from '@shared/hooks/useFilterContext';

import ProjectAssignClassesItem from '../ClassItem/AssignClassItem';
import ProjectAssignEmpty from '../Empty/AssignEmpty';

type Props = {
  schoolClasses: TSchoolClass[];
};

const ProjectAssignClasses = ({ schoolClasses }: Props) => {
  //@ts-ignore
  const { filter } = useFilterContext();
  const filteredSchoolClasses = getFilteredSchoolClasses({
    schoolClasses,
    filter,
    filterTeams: false,
  });

  return (
    <>
      {!isEmpty(filteredSchoolClasses) ? (
        <ul>
          {filteredSchoolClasses.map((classx: TSchoolClass) => (
            <ProjectAssignClassesItem key={classx.uuid} schoolClass={classx} />
          ))}
        </ul>
      ) : (
        <ProjectAssignEmpty tab='Classes' />
      )}
    </>
  );
};

export default ProjectAssignClasses;
