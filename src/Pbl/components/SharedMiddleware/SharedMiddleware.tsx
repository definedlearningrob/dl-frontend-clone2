import { useMutation } from '@apollo/client';

import ENROLL_IN_PROJECT, {
  TEnrollStudentToProjectData,
  TEnrollToProjectVariables,
} from '@pbl/graphql/student/mutations/enrollInProject';
import { TStudentInfo } from '@pbl/graphql/student/queries/userInfo';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import useUserInfo from '@pbl/hooks/useUserInfo';

import { SharedMiddleware as BaseSharedMiddleware } from '@shared/components/SharedMiddleware/SharedMiddleware';

export const SharedMiddleware = () => {
  const { userInfo } = useUserInfo<TUserInfo | TStudentInfo>();
  const [enrollInProject] = useMutation<TEnrollStudentToProjectData, TEnrollToProjectVariables>(
    ENROLL_IN_PROJECT
  );

  const isUser = 'role' in userInfo;

  const onFetch = async (params: { resourceId: string; creatorId: string }) => {
    const { resourceId, creatorId } = params;

    if (!isUser) {
      await enrollInProject({
        variables: { input: { taskId: resourceId, originatorId: creatorId } },
      });
    }
  };

  return <BaseSharedMiddleware userInfo={userInfo} onFetch={onFetch} />;
};
