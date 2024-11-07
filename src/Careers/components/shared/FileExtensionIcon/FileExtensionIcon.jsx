import PropTypes from 'prop-types';

import { ReactComponent as DocFileIcon } from '@dc/svg/file_document.svg';
import { ReactComponent as FileIcon } from '@dc/svg/file.svg';
import { ReactComponent as ImageFileIcon } from '@dc/svg/file_image.svg';
import { ReactComponent as SheetFileIcon } from '@dc/svg/file_sheet.svg';
import { ReactComponent as SlideFileIcon } from '@dc/svg/file_slide.svg';
import { ReactComponent as VideoFileIcon } from '@dc/svg/file_video.svg';

SharedFileExtensionIcon.propTypes = {
  filename: PropTypes.string,
};

function SharedFileExtensionIcon({ filename }) {
  const fileExtension = filename?.split('.').pop();
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const videoExtensions = ['wma', 'mpg', 'flv', 'avi', 'mp4', 'webm'];
  const documentExtensions = ['pdf', 'doc', 'docx', 'txt', 'csv', 'rtf', 'html'];
  const presentationExtensions = ['ppt', 'pptx'];
  const sheetExtensions = ['xls', 'xlsx'];

  if (imageExtensions.includes(fileExtension)) return <ImageFileIcon />;
  if (videoExtensions.includes(fileExtension)) return <VideoFileIcon />;
  if (documentExtensions.includes(fileExtension)) return <DocFileIcon />;
  if (presentationExtensions.includes(fileExtension)) return <SlideFileIcon />;
  if (sheetExtensions.includes(fileExtension)) return <SheetFileIcon />;

  return <FileIcon />;
}

export default SharedFileExtensionIcon;
