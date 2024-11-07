import { DotLottiePlayer } from '@dotlottie/react-player';

import archiveDrawerAnimationPath from '@shared/assets/lottie/archiveDrawerAnimation.lottie?url';

export const FileLoader = () => (
  <DotLottiePlayer autoplay={true} loop={true} src={archiveDrawerAnimationPath} />
);
