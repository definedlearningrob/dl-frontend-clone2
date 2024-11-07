import cx from 'classnames';

import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import UserProjectPresentationEditInfo from '@pbl/components/User/Project/Presentation/EditInfo/EditInfo';
import UserProjectPresentationPlaceholder from '@pbl/components/User/Project/Presentation/Placeholder/Placeholder';

import { useCustomizeIframe } from '@shared/hooks/useCustomizeIframe';

import styles from './ExternalPresentation.module.sass';

type Props = {
  hasDraftStatePresentation: boolean;
  presentationUrl?: string;
};

function ProjectExternalPresentation({ hasDraftStatePresentation, presentationUrl }: Props) {
  const { editMode } = useCustomizeProject();

  const { iframeRef, iframeSrc } = useCustomizeIframe({
    iframeUrl: presentationUrl,
  });

  const presentationClasses = cx(styles.externalPresentation);

  const renderEditMode = () => (
    <>
      <UserProjectPresentationEditInfo editable={hasDraftStatePresentation} />
      <div className={styles.backgroundDimmer} />
    </>
  );

  const renderPresentationWithPlaceholder = () =>
    iframeSrc ? (
      <iframe
        ref={iframeRef}
        allowFullScreen={true}
        data-testid='user-project-presentation'
        sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
        src={iframeSrc}
        title='video'
      />
    ) : (
      <UserProjectPresentationPlaceholder hasDraftStatePresentation={hasDraftStatePresentation} />
    );

  return (
    <div className={presentationClasses}>
      {editMode && renderEditMode()}
      {renderPresentationWithPlaceholder()}
    </div>
  );
}

export default ProjectExternalPresentation;
