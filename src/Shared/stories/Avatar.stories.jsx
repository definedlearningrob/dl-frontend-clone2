import temporaryAvatar from '@dc/images/student-login.jpg';

import SharedAvatar from '@shared/components/Avatar/Avatar';

export default {
  component: SharedAvatar,
  title: 'Avatar',
  parameters: {
    componentSubtitle: 'shared avatar',
  },
};

export const Default = () => <SharedAvatar image={temporaryAvatar} />;
