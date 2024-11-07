import { ReactComponent as DocFileIcon } from '@shared/svg/file_document.svg';
import { ReactComponent as FileIcon } from '@shared/svg/file.svg';
import { ReactComponent as ImageFileIcon } from '@shared/svg/file_image.svg';
import { ReactComponent as SheetFileIcon } from '@shared/svg/file_sheet.svg';
import { ReactComponent as SlideFileIcon } from '@shared/svg/file_slide.svg';
import { ReactComponent as VideoFileIcon } from '@shared/svg/file_video.svg';
import { getFileExtension } from '@shared/utils/getFileExtension';

import {
  imageExtensions,
  videoExtensions,
  documentExtensions,
  presentationExtensions,
  sheetExtensions,
} from './resources';

type Props = {
  filename: string;
};

function FileExtensionIcon({ filename }: Props) {
  const fileExtension = getFileExtension(filename);

  if (imageExtensions.includes(fileExtension)) return <ImageFileIcon />;
  if (videoExtensions.includes(fileExtension)) return <VideoFileIcon />;
  if (documentExtensions.includes(fileExtension)) return <DocFileIcon />;
  if (presentationExtensions.includes(fileExtension)) return <SlideFileIcon />;
  if (sheetExtensions.includes(fileExtension)) return <SheetFileIcon />;

  return <FileIcon />;
}

export default FileExtensionIcon;
