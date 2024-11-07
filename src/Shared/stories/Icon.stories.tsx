import { ReactComponent as GoogleLogo } from '@dc/svg/google_logo.svg';

import SharedIcon from '@shared/components/Icon/Icon';

export default {
  component: SharedIcon,
  title: 'Icon',
  parameters: {
    componentSubtitle: 'shared svg icon',
  },
};

export const ExtraSmallSize = () => <SharedIcon icon={<GoogleLogo />} size='xs' />;
export const SmallSize = () => <SharedIcon icon={<GoogleLogo />} size='sm' />;
export const LargeSize = () => <SharedIcon icon={<GoogleLogo />} size='lg' />;
