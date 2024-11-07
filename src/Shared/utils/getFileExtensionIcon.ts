import { match } from 'ts-pattern';

import { ReactComponent as DocFileIcon } from '@shared/svg/file_document.svg';
import { ReactComponent as FileIcon } from '@shared/svg/file.svg';
import { ReactComponent as ImageFileIcon } from '@shared/svg/file_image.svg';
import { ReactComponent as SheetFileIcon } from '@shared/svg/file_sheet.svg';
import { ReactComponent as SlideFileIcon } from '@shared/svg/file_slide.svg';
import { ReactComponent as VideoFileIcon } from '@shared/svg/file_video.svg';

import { getFileExtension } from './getFileExtension';

export const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
export const videoExtensions = ['wma', 'mpg', 'flv', 'avi', 'mp4', 'webm'];
export const documentExtensions = ['pdf', 'doc', 'docx', 'txt', 'csv', 'rtf', 'html'];
export const presentationExtensions = ['ppt', 'pptx'];
export const sheetExtensions = ['xls', 'xlsx'];

export const getFileExtensionIcon = (filename: string) => {
  const fileExtension = getFileExtension(filename);

  return match(fileExtension)
    .when(
      (extension) => imageExtensions.includes(extension),
      () => ImageFileIcon
    )
    .when(
      (extension) => videoExtensions.includes(extension),
      () => VideoFileIcon
    )
    .when(
      (extension) => documentExtensions.includes(extension),
      () => DocFileIcon
    )
    .when(
      (extension) => presentationExtensions.includes(extension),
      () => SlideFileIcon
    )
    .when(
      (extension) => sheetExtensions.includes(extension),
      () => SheetFileIcon
    )
    .otherwise(() => FileIcon);
};
