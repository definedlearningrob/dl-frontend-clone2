import { AttachmentFileItem } from '@dc/components/Student/Lesson/Attachment/AttachmentFileItem';
import { LessonItemCard } from '@dc/components/Student/Lesson/shared/LessonItemCard/LessonItemCard';
import { TAttachment } from '@dc/components/Student/Lesson/types';

import styles from './AttachmentCard.module.sass';

type Props = {
  attachment: TAttachment;
};

export const AttachmentCard = ({ attachment }: Props) => {
  const { id, displayName, description, files, __typename } = attachment;
  const cardId = `${id}-${__typename}`;

  return (
    <LessonItemCard key={id} description={description} id={cardId} title={displayName}>
      <ul className={styles.attachmentList}>
        {files.map((file) => (
          <AttachmentFileItem key={file.id} attachmentId={id} file={file} />
        ))}
      </ul>
    </LessonItemCard>
  );
};
