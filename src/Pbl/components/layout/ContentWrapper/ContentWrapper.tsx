import cx from 'classnames';
import { ReactNode } from 'react';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { usePresentationState } from '@shared/hooks/usePresentationState';

import styles from './ContentWrapper.module.sass';

type Props = {
  children: ReactNode;
  header: ReactNode;
};

function LayoutContentWrapper({ header, children }: Props) {
  const { presentationState } = usePresentationState();
  const { isExpanded, isHidden } = useNavigation();

  const mainContentClasses = cx(styles.wrapper, {
    [styles.hideNavigation]: isHidden,
    [styles.isExpanded]: isExpanded,
    [styles.presentationFullscreenMode]: presentationState.fullscreenMode,
    [styles.animationOpen]: !isExpanded,
    [styles.animationClose]: isExpanded,
  });

  return (
    <main className={mainContentClasses}>
      {header}
      {children}
    </main>
  );
}

export default LayoutContentWrapper;
