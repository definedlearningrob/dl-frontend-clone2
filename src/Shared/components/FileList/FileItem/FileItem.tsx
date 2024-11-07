import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@shared/components/Tooltip';
import { TFile } from '@shared/resources/types';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { ReactComponent as DeleteIcon } from '@shared/svg/bin.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { getFileExtensionIcon } from '@shared/utils/getFileExtensionIcon';
import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { formatDateTime } from '@shared/utils/date';

export type File = Omit<TFile, 'googleWeblink' | 'submitter' | 'createdAt' | 'source'> &
  Partial<Pick<TFile, 'googleWeblink' | 'submitter' | 'createdAt'>>;

type Props = {
  archiveDisabled?: boolean;
  archiveTooltipLabel?: string;
  disabled?: boolean;
  className?: string;
  file: File;
  withoutBorder?: boolean;
  rounded?: boolean;
  onArchive?: (id: string) => void;
  variant?: 'primary' | 'light';
  showSubmitter?: boolean;
  showDate?: boolean;
};

const FileItem = ({
  archiveDisabled,
  archiveTooltipLabel,
  disabled,
  className,
  file,
  rounded,
  withoutBorder,
  onArchive,
  variant = 'primary',
  showSubmitter,
  showDate,
}: Props) => {
  const shouldShowArchiveButton = !!onArchive && !archiveDisabled;
  const { t } = useTranslation();

  const isPrimary = variant === 'primary';

  const fileItemClasses = cx(
    'flex items-center rounded-sm transition-colors',
    {
      'border border-neutral-300 hover:border-neutral-400': !withoutBorder,
      'rounded-sm': rounded,
      'bg-primary-500 text-white hover:bg-primary-600': isPrimary,
      'bg-white': !isPrimary,
      'pointer-events-none': disabled,
    },
    className
  );

  const linkClasses = cx({
    'text-white hover:text-white': isPrimary,
    'text-primary-500': !isPrimary,
  });

  const markerClasses =
    'relative after:absolute after:top-0 after:bottom-0 after:-right-xs xxxl:after:-right-x after:my-auto after:h-xxs after:w-xxs after:rounded-full after:bg-neutral-300';

  const showAdditionalInfo = showSubmitter || showDate;
  const submitterName = [file.submitter?.firstName, file.submitter?.lastName].join(' ');

  return (
    <li className={fileItemClasses}>
      <a
        className={cx('flex-1 flex flex-col gap-xxxs xxxl:gap-xxs p-sm', linkClasses)}
        href={file?.previewUrl || file.url}
        rel='noopener noreferrer'
        target='_blank'>
        <div className='flex items-center gap-xs'>
          <IconContainer Icon={getFileExtensionIcon(file.filename)} paddingSize='none' />
          <span className='text-xs xxxl:text-sm font-medium'>{file.filename}</span>
        </div>
        {showAdditionalInfo && (
          <div className='ml-md flex items-center gap-x xxxl:gap-[20px] text-font-secondary text-xxs xxxl:text-xs'>
            {showSubmitter && (
              <span
                className={cx('font-medium leading-lg', {
                  [markerClasses]: showDate,
                })}>
                {submitterName}
              </span>
            )}
            {showDate && file.createdAt && (
              <div className='flex items-center gap-xxxs xxxl:gap-xxs leading-sm'>
                <IconContainer Icon={CalendarIcon} paddingSize='none' size='sm' />
                <Tooltip message={formatDateTime(file.createdAt, { withTime: true })}>
                  {formatDateTime(file.createdAt)}
                </Tooltip>
              </div>
            )}
          </div>
        )}
      </a>
      <div className='flex items-center gap-xs py-sm pr-sm'>
        {!disabled && (
          <Tooltip message={t('common.actions.download')}>
            <a
              className={linkClasses}
              download={true}
              href={file.url}
              rel='noopener noreferrer'
              target='_blank'>
              <IconContainer
                Icon={DownloadIcon}
                className='rounded-sm hover:bg-primary-200 hover:text-primary-500 transition-colors'
                paddingSize='xxs'
              />
            </a>
          </Tooltip>
        )}
        {shouldShowArchiveButton && (
          <Tooltip
            message={archiveTooltipLabel || t(`common.actions.${file.id ? 'remove' : 'cancel'}`)}>
            <IconButton
              Icon={DeleteIcon}
              aria-label={t('student.lesson.items.assignment.fileTooltip.remove')}
              className={cx({
                'text-white hover:bg-danger-100 hover:text-danger-500 transition-colors': isPrimary,
              })}
              disabled={archiveDisabled}
              size='md'
              variant={isPrimary ? 'default' : 'danger'}
              onClick={(event) => {
                onArchive(file.id);
                event.preventDefault();
              }}
            />
          </Tooltip>
        )}
      </div>
    </li>
  );
};

export default FileItem;
