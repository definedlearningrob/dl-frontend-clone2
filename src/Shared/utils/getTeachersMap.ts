import { compact, map } from 'lodash-es';

type SchoolClassesNodes =
  | {
      uuid: string;
      name: string | null;
      users: { nodes: { fullName: string | null }[] } | null;
    }[]
  | undefined;

export const getTeachersMap = (schoolClassesNodes: SchoolClassesNodes) => {
  if (!schoolClassesNodes) return {};

  return schoolClassesNodes.reduce((acc, schoolClass) => {
    if (!schoolClass.users) return acc;

    acc[schoolClass.uuid] = compact(map(schoolClass.users?.nodes, 'fullName'));

    return acc;
  }, {} as Record<string, string[]>);
};
