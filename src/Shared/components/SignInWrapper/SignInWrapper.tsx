import { ComponentType, PropsWithChildren, ReactNode } from 'react';

import { ReactComponent as LogoType } from '@dc/svg/logotype.svg';

import SharedBackwardButton from '@shared/components/BackwardButton/BackwardButton';
import SignInFooter from '@shared/components/SignInFooter/SignInFooter';

import './SignInWrapper.sass';

type WelcomeBannerProps = {
  className: string;
};

type Props = PropsWithChildren<{
  backTo?: string;
  children: ReactNode;
  headingText?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  WelcomeBanner: ComponentType<WelcomeBannerProps>;
  showFooter?: boolean;
}>;

function SignInWrapper({
  backTo,
  children,
  headingText,
  showBackButton = true,
  showLogo = false,
  WelcomeBanner,
  showFooter,
}: Props) {
  return (
    <div className='signin' data-testid='signin-wrapper'>
      <WelcomeBanner className='bg-signin-form' />
      <div className='signin__content-wrapper'>
        <div className='signin__content'>
          {showLogo && <LogoType className='signin__logo' />}
          {showBackButton && backTo && <SharedBackwardButton link={backTo} />}
          {headingText && <h2 className='signin__heading'>{headingText}</h2>}
          {children}
          {showFooter && <SignInFooter />}
        </div>
      </div>
    </div>
  );
}

export default SignInWrapper;
