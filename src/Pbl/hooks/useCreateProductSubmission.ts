import useCreateProductSubmissionMutation from '@pbl/graphql/student/hooks/useCreateProductSubmission';
import useCreateStudentSubmission from '@pbl/graphql/user/hooks/useCreateStudentSubmission';
import { useCreateTeamSubmission } from '@pbl/graphql/user/hooks/useCreateTeamSubmission';

type Props = {
  isUser?: boolean;
  projectId: string;
  productId: string;
  studentId?: string;
  teamId?: string;
};

export const useCreateProductSubmission = ({
  projectId,
  productId,
  teamId,
  studentId,
  isUser,
}: Props) => {
  const createSubmission = useCreateProductSubmissionMutation({
    projectId,
    productId,
    teamId,
  });
  const createStudentSubmission = useCreateStudentSubmission(projectId, productId, studentId!);
  const createTeamSubmission = useCreateTeamSubmission(projectId, productId, teamId!);

  if (!isUser) {
    return createSubmission;
  }

  if (teamId) {
    return createTeamSubmission;
  }

  return createStudentSubmission;
};
