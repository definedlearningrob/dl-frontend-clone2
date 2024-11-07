import { useTranslation } from 'react-i18next';

import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { CommonAppAllProfilesCompleted } from '@dc/screens/UserApp/CommonApp/CommonAppProfileBar/CommonAppAllProfilesCompleted';
import { CommonAppMultipleProfilesCompleted } from '@dc/screens/UserApp/CommonApp/CommonAppProfileBar/CommonAppMultipleProfilesCompleted';
import { CommonAppSingleProfileCompleted } from '@dc/screens/UserApp/CommonApp/CommonAppProfileBar/CommonAppSingleProfileCompleted';

export const CommonAppProfileBar = () => {
  const { t } = useTranslation();

  const { userInfo } = useUserInfo<TUserInfo>();

  if (!userInfo) {
    return null;
  }

  const {
    commonAppData: {
      hasTeacherInvitation,
      hasCounselorInvitation,
      hasCounselorProfileFormCompleted,
      hasTeacherProfileFormCompleted,
    },
  } = userInfo;

  const counselor = {
    type: 'counselor' as const,
    isProfileCompleted: hasCounselorProfileFormCompleted,
    isInvitation: hasCounselorInvitation,
    profileTitle: hasCounselorProfileFormCompleted
      ? t('user.postSecondary.commonAppRequests.completedSingleProfileCounselor')
      : t('user.postSecondary.commonAppRequests.completeCounselorProfile'),
    profileText: hasCounselorProfileFormCompleted
      ? t('user.postSecondary.commonAppRequests.manageSingleApplicationCounselor')
      : t('user.postSecondary.commonAppRequests.completeCounselorText'),
    profileLink: '/forms/counselorprofile',
  };
  const teacher = {
    type: 'teacher' as const,
    isProfileCompleted: hasTeacherProfileFormCompleted,
    isInvitation: hasTeacherInvitation,
    profileTitle: hasTeacherProfileFormCompleted
      ? t('user.postSecondary.commonAppRequests.completedSingleProfileTeacher')
      : t('user.postSecondary.commonAppRequests.completeTeacherProfile'),
    profileText: hasTeacherProfileFormCompleted
      ? t('user.postSecondary.commonAppRequests.manageSingleApplicationTeacher')
      : t('user.postSecondary.commonAppRequests.completeTeacherText'),
    profileLink: '/forms/teacherprofile',
  };

  if (hasCounselorProfileFormCompleted && hasTeacherProfileFormCompleted) {
    return <CommonAppAllProfilesCompleted />;
  }

  if (
    (hasCounselorProfileFormCompleted && hasTeacherInvitation) ||
    (hasTeacherProfileFormCompleted && hasCounselorInvitation)
  ) {
    return (
      <CommonAppMultipleProfilesCompleted counselorProfile={counselor} teacherProfile={teacher} />
    );
  }

  if (hasCounselorProfileFormCompleted) {
    return <CommonAppSingleProfileCompleted commonAppUserProfile={counselor} />;
  }

  if (hasTeacherProfileFormCompleted) {
    return <CommonAppSingleProfileCompleted commonAppUserProfile={teacher} />;
  }

  return null;
};
