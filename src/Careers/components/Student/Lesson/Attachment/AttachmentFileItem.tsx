import { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import createStudentItemMutation from '@dc/graphql/student/mutations/createStudentItem';
import SharedFileExtensionIcon from '@dc/shared/FileExtensionIcon/FileExtensionIcon';
import { LESSON_ITEM_TYPES } from '@dc/resources/constants';
import { ReactComponent as Download } from '@dc/svg/download_to.svg';

import debounce from '@shared/utils/debounce';
import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { Tooltip } from '@shared/components/Tooltip';

import styles from './AttachmentFileItem.module.sass';

type Props = {
  attachmentId: string;
  file: {
    filename: string;
    url: string;
  };
  previewOnly?: boolean;
};

export const AttachmentFileItem = ({
  attachmentId,
  file: { filename, url },
  previewOnly,
}: Props) => {
  const { t } = useTranslation();
  const attachmentRef = useRef<HTMLAnchorElement>(null);
  const [createItem] = useMutation(createStudentItemMutation, {
    variables: {
      input: {
        itemId: attachmentId,
        itemType: LESSON_ITEM_TYPES.ATTACHMENT,
      },
    },
  });

  const createStudentItem = () => createItem();
  const handleDownlaod = () => attachmentRef.current?.click();

  return (
    <li className={styles.container}>
      <div className={styles.fileInfo}>
        <SharedIcon icon={<SharedFileExtensionIcon filename={filename} />} size='sm' />
        <a
          ref={attachmentRef}
          className={styles.fileName}
          data-testid='attachment-file-link'
          download={filename}
          href={url}
          rel='noopener noreferrer'
          target='_blank'
          onClick={!previewOnly ? debounce(createStudentItem, 700) : () => {}}>
          {filename}
        </a>
      </div>
      <Tooltip message={t('student.lesson.items.attachment.downloadAttachment')}>
        <DeprecatedIconButton
          className={styles.downloadButton}
          data-testid='attachment-file-button'
          icon={<Download />}
          size='sm'
          square={true}
          variant='base'
          onClick={handleDownlaod}
        />
      </Tooltip>
    </li>
  );
};
