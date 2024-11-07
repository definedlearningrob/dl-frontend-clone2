import { CommonAppSingleProfileCompleted } from '@dc/screens/UserApp/CommonApp/CommonAppProfileBar/CommonAppSingleProfileCompleted';

type Profile = {
  type: 'counselor' | 'teacher';
  isProfileCompleted: boolean;
  isInvitation: boolean;
  profileTitle: string;
  profileText: string;
  profileLink: string;
};

type Props = {
  counselorProfile: Profile;
  teacherProfile: Profile;
};

export const CommonAppMultipleProfilesCompleted = ({ counselorProfile, teacherProfile }: Props) => (
  <div className='flex w-full flex-col gap-base'>
    <CommonAppSingleProfileCompleted commonAppUserProfile={counselorProfile} isHorizontal={true} />
    <CommonAppSingleProfileCompleted commonAppUserProfile={teacherProfile} isLogo={false} />
  </div>
);
