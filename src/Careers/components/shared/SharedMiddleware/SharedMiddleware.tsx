import { useEnrollInCourse } from '@dc/graphql/student/hooks/useEnrollInCourse';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import useUserInfo from '@dc/hooks/useUserInfo';

import { SharedMiddleware as BaseSharedMiddleware } from '@shared/components/SharedMiddleware/SharedMiddleware';

export const SharedMiddleware = () => {
  const { userInfo } = useUserInfo<TUserInfo | TStudentInfo>();
  const [enrollInCourse] = useEnrollInCourse();

  const isUser = 'role' in userInfo;

  const onFetch = async (params: { resourceId: string; creatorId: string }) => {
    const { resourceId } = params;

    if (!isUser) {
      await enrollInCourse({ courseId: resourceId });
    }
  };

  return <BaseSharedMiddleware userInfo={userInfo} onFetch={onFetch} />;
};
