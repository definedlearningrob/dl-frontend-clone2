import { useTranslation } from 'react-i18next';

import { ReactComponent as DownloadIcon } from '@dc/svg/download_to.svg';
import { ReactComponent as FileIcon } from '@dc/svg/file.svg';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ShowIcon } from '@shared/svg/visible_outlined.svg';
import { CollapsibleWrapper } from '@shared/components/CollapsibleWrapper/CollapsibleWrapper';

type Props = {
  submission: {
    files:
      | {
          filename: string;
          url: string;
          previewUrl: string;
          id: string;
          attachmentUrl: string;
        }[];
  } | null;
};

export const FilesForGrading = ({ submission }: Props) => {
  const { t } = useTranslation();

  if (!submission) {
    return (
      <div
        className='text-secondary-500 p-sm text-center my-auto border'
        data-testid='unsubmitted-input'>
        {t('user.student.coursesActivity.assignmentNoInputInfo')}
      </div>
    );
  }

  return (
    <CollapsibleWrapper title={t('user.student.coursesActivity.files')}>
      <ul className='mb-base'>
        {submission.files.map((file) => (
          <li
            key={file.id}
            className='user-student__courses-activity-modal__assignment-file-item'
            data-testid='submission-file-item'>
            <a href={file.url} rel='noopener noreferrer' target='_blank'>
              <SharedIcon icon={<FileIcon />} size='sm' />
              <span className='user-student__courses-activity-modal__assignment-file-name'>
                {file.filename}
              </span>
            </a>
            <div className='user-student__courses-activity-modal__assignment-file-buttons'>
              <a
                href={file.previewUrl}
                rel='noopener noreferrer'
                target='_blank'
                onClick={(e) => e.stopPropagation()}>
                <SharedIcon icon={<ShowIcon />} size='sm' />
              </a>
              <a
                download={file.filename}
                href={file.attachmentUrl}
                rel='noopener noreferrer'
                target='_blank'
                onClick={(e) => e.stopPropagation()}>
                <SharedIcon icon={<DownloadIcon />} size='sm' />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </CollapsibleWrapper>
  );
};
