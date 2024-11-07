import { useMutation } from '@apollo/client';

import { TUpdateResumeInput, UPDATE_RESUME } from '@shared/graphql/student/mutations/updateResume';

export const useUpdateResume = () => {
  const [updateStudentResume, { loading }] = useMutation(UPDATE_RESUME);

  const updateResume = async (input: TUpdateResumeInput['input']) =>
    updateStudentResume({ variables: { input } });

  return [updateResume, { loading }] as const;
};
