import PropTypes from 'prop-types';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';
import { AttachmentFileItem } from '@dc/components/Student/Lesson/Attachment/AttachmentFileItem';

import { cleanInjection } from '@shared/utils/cleanInjection';

StudentLessonAttachment.propTypes = {
  attachment: PropTypes.shape({
    __typename: PropTypes.string,
    description: PropTypes.string,
    displayName: PropTypes.string,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string,
        id: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    id: PropTypes.string,
  }),
  previewOnly: PropTypes.bool,
};

function StudentLessonAttachment({
  attachment: { __typename, description, displayName, files, id },
  previewOnly,
}) {
  const generatedUUID = __typename + id;

  return (
    <Card data-testid='lesson-item-attachment' id={generatedUUID} title={displayName}>
      <div className='attachment-item'>
        <p
          className='attachment-item__description embeded-content'
          //eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={cleanInjection(description)}
        />
        <ul className='attachment-item__file-list'>
          {files.map((file) => (
            <AttachmentFileItem
              key={file.id}
              attachmentId={id}
              file={file}
              previewOnly={previewOnly}
            />
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default StudentLessonAttachment;
