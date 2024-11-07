import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { TFile } from '@pbl/graphql/user/queries/project';
import { ReactComponent as DownloadIcon } from '@pbl/svg/download_to.svg';

import { ReactComponent as SheetIcon } from '@shared/assets/icons/file_sheet.svg';
import { ReactComponent as MediaIcon } from '@shared/assets/icons/file_video.svg';
import { ReactComponent as DocumentIcon } from '@shared/assets/icons/file_document.svg';
import { ReactComponent as ImageIcon } from '@shared/assets/icons/file_image.svg';
import { ReactComponent as FileIcon } from '@shared/assets/icons/file.svg';
import { ReactComponent as RemoveIcon } from '@shared/svg/delete_outlined.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';

import './FileItem.sass';

const filetypesToIconMap = {
  pdf: DocumentIcon,
  doc: DocumentIcon,
  docs: DocumentIcon,
  docx: DocumentIcon,
  rtf: DocumentIcon,
  jpg: ImageIcon,
  jpeg: ImageIcon,
  png: ImageIcon,
  gif: ImageIcon,
  wma: MediaIcon,
  mpg: MediaIcon,
  flv: MediaIcon,
  mp3: MediaIcon,
  avi: MediaIcon,
  mp4: MediaIcon,
  xls: SheetIcon,
  xlsx: SheetIcon,
  csv: SheetIcon,
  zip: FileIcon,
  html: FileIcon,
  txt: FileIcon,
};

type Props = {
  file: TFile;
  isEditing: boolean;
  onDelete: () => void;
};

function ProjectFileItem({ file: { filename, url }, isEditing, onDelete }: Props) {
  const attachmentRef = useRef<HTMLAnchorElement>(null);
  const { t } = useTranslation();

  const handleDownload = () => attachmentRef.current?.click();

  const fileNameSegments = filename.split('.');

  const fileExtension = fileNameSegments[
    fileNameSegments.length - 1
  ] as keyof typeof filetypesToIconMap;
  const ParsedFileIcon = filetypesToIconMap[fileExtension] || FileIcon;

  return (
    <li
      className='flex p-sm border border-neutral-300 mb-x rounded-sm items-center last:!mb-0'
      data-testid='user-project-file-item'>
      <div className='flex gap-xs grow items-center min-w-0'>
        <IconContainer
          Icon={ParsedFileIcon}
          className='text-primary-500'
          paddingSize='none'
          size='base'
        />
        <a
          ref={attachmentRef}
          className='truncate text-primary-500 min-w-0'
          download={filename}
          href={url}
          rel='noopener noreferrer'
          target='_blank'>
          <Tooltip delayDuration={500} message={filename}>
            {filename}
          </Tooltip>
        </a>
      </div>
      <div className='flex gap-xs'>
        <Tooltip message={t('common.actions.download')}>
          <button
            className='hover:!bg-primary-200 focus:outline-2 focus:outline-primary-500 focus:outline-offset-1 focus:outline rounded-xs'
            type='button'
            onClick={handleDownload}>
            <IconContainer
              Icon={DownloadIcon}
              className='text-primary-500'
              paddingSize='xxs'
              size='base'
            />
          </button>
        </Tooltip>
        {isEditing && (
          <Tooltip message={t('common.actions.delete')}>
            <button
              className='hover:!bg-danger-100 foxus:!bg-danger-100 focus:outline-2 focus:outline-danger-500 focus:outline-offset-1 focus:outline rounded-xs'
              type='button'
              onClick={onDelete}>
              <IconContainer
                Icon={RemoveIcon}
                className='text-danger-500'
                paddingSize='xxs'
                size='base'
              />
            </button>
          </Tooltip>
        )}
      </div>
    </li>
  );
}

export default ProjectFileItem;
