import cx from 'classnames';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as GoogleDrive } from '@shared/svg/google_drive.svg';
import { ReactComponent as UploadFile } from '@shared/svg/upload_on_cloud.svg';
import { UPLOAD_FILE_TYPE } from '@shared/resources/enums';

import styles from './UploadTypeButton.module.sass';

type SharedUploadTypeButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  selected?: boolean;
  text: string;
  type: UPLOAD_FILE_TYPE;
};

function SharedUploadTypeButton({
  className,
  disabled,
  onClick,
  selected,
  text,
  type,
}: SharedUploadTypeButtonProps) {
  const classes = cx(styles.wrapper, className, {
    [styles.selected]: selected,
  });
  const properIcon = type === UPLOAD_FILE_TYPE.GOOGLE ? <GoogleDrive /> : <UploadFile />;

  return (
    <button className={classes} disabled={disabled} type='button' onClick={onClick}>
      <SharedIcon className={styles.icon} icon={properIcon} size='sm' />
      <span className={styles.text}>{text}</span>
    </button>
  );
}

export default SharedUploadTypeButton;
