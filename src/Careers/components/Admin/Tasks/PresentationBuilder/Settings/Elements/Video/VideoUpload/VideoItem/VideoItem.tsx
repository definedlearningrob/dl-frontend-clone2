import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useRef } from 'react';

import { TTaskPresentationVideo } from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as VideoPlaceholder } from '@shared/svg/video_placeholder.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import SharedProgressBar from '@shared/components/ProgressBar/ProgressBar';
import SharedButton from '@shared/components/Button/Button';

import styles from './VideoItem.module.sass';

type Props = {
  onReplace: (event: ChangeEvent) => void;
  progress?: number;
  video?: TTaskPresentationVideo;
  savingVideo?: { contentId: string; name: string; progress: number };
};

// Video index is for multiple choice slide when there will be more than one video inputs in one slide
function AdminTasksPresentationBuilderSettingsElementsVideoUpload({
  onReplace,
  savingVideo,
  video,
}: Props) {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const videoName = video?.filename || savingVideo?.name;

  const openDropable = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const buttonWrapperClasses = cx(styles.buttonWrapper, {
    [styles.hidden]: !video,
  });

  return (
    <>
      <div className={styles.wrapper}>
        <SharedIcon icon={<VideoPlaceholder />} size='sm' />
        <div className={styles.filenameWrapper}>
          <span className={styles.filename}>{videoName}</span>
        </div>
        <div className={buttonWrapperClasses}>
          <SharedButton size='sm' variant='primary-outlined' onClick={openDropable}>
            {t('admin.tasks.presentation.replace')}
          </SharedButton>
        </div>
      </div>
      {savingVideo && <SharedProgressBar progress={savingVideo.progress} />}
      <input
        ref={inputRef}
        accept='video/*'
        className={styles.input}
        type='file'
        onChange={onReplace}
      />
    </>
  );
}

export default AdminTasksPresentationBuilderSettingsElementsVideoUpload;
