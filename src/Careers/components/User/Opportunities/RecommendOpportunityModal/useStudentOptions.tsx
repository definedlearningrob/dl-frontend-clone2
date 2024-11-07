import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { SCHOOL_CLASSES_STUDENTS_QUERY } from '@dc/graphql/user/queries/schoolClassesStudents';

import type { TreeSelectOption } from '@shared/components/TreeSelectList';

type Params = {
  skip?: boolean;
};

export const useStudentOptions = ({ skip }: Params) => {
  const { data, loading } = useQuery(SCHOOL_CLASSES_STUDENTS_QUERY, { skip });

  const studentOptions: TreeSelectOption[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.schoolClasses.nodes.map((schoolClass) => ({
      label: schoolClass.name,
      value: schoolClass.uuid,
      children: schoolClass.students.nodes.map((student) => ({
        label: student.fullName,
        value: student.uuid,
        withAvatar: true,
        children: [],
      })),
    }));
  }, [data]);

  return { studentOptions, isLoading: loading };
};
