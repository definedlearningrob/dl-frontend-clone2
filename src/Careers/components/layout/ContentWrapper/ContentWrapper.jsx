import cx from 'classnames';
import PropTypes from 'prop-types';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { usePresentationState } from '@shared/hooks/usePresentationState';

LayoutContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  isBlurred: PropTypes.bool,
};

function LayoutContentWrapper({ header, children, isBlurred }) {
  const { presentationState } = usePresentationState();
  const { isExpanded, isHidden } = useNavigation();

  const isOnPressentation = presentationState.taskId || presentationState.librarySlideId;

  const mainContentClasses = cx('main-wrapper', {
    '-blurred': isBlurred,
    '-expanded-sidebar-left': isExpanded,
    '-animation-open': !isExpanded,
    '-animation-close': isExpanded && !isOnPressentation,
    '-hide-navigation': isHidden,
    '-presentation-fullscreen-mode': presentationState.fullscreenMode,
  });

  return (
    <main className={mainContentClasses}>
      {header}
      {children}
    </main>
  );
}

export default LayoutContentWrapper;
