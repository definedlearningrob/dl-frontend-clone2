import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useToggle } from 'react-use';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ClearIcon } from '@dc/svg/clear.svg';
import { ASSESSMENT_REPORT_FILE } from '@dc/graphql/user/queries/assessmentReport';
import { UploadReportStatuses } from '@dc/resources/enums';

import { MinimizedProgress } from '@shared/components/ProgressBox/MinimizedProgress';
import { FileLoader } from '@shared/components/ProgressBox/FileLoader';
import { useReportGenerator } from '@shared/hooks/useReportGenerator';
import { ReactComponent as FolderImage } from '@shared/assets/images/folder_with_bg.svg';
import { ReactComponent as CheckIcon } from '@shared/svg/checkmark.svg';
import { IconButton } from '@shared/components/IconButton/IconButton';
import Button from '@shared/components/Button/Button';
import { useFileDownload } from '@shared/hooks/useFileDownload';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { cx } from '@shared/utils/cx';

const extractFileUploadDetails = (data: any) => {
  if (!data) {
    return {
      fileStatus: UploadReportStatuses.NOT_STARTED,
      isCompleted: false,
      isFailed: false,
      isLoading: false,
      dataAccessor: '',
    };
  }

  const [dataAccessor] = Object.keys(data);
  const fileStatus: UploadReportStatuses = data?.[dataAccessor]?.uploadStatus;
  const isCompleted = fileStatus === UploadReportStatuses.COMPLETED;
  const isLoading = fileStatus === UploadReportStatuses.IN_PROGRESS;
  const isFailed = fileStatus === UploadReportStatuses.FAILED;

  return { fileStatus, isCompleted, dataAccessor, isFailed, isLoading };
};

export const ProgressBox = () => {
  const { fileToDownload, setFileToDownload } = useFileDownload();
  const [isMinimized, toggleMinimized] = useToggle(false);

  const { t } = useTranslation();
  const { generateReport } = useReportGenerator();

  const clearReport = () => setFileToDownload(null);

  const textsMap = {
    [UploadReportStatuses.COMPLETED]: {
      title: t('components.progressBox.title.ready'),
      subtitle: t('components.progressBox.text.ready'),
    },
    [UploadReportStatuses.FAILED]: {
      title: t('components.progressBox.title.error'),
      subtitle: t('components.progressBox.text.error'),
    },
    [UploadReportStatuses.IN_PROGRESS]: {
      title: t('components.progressBox.title.inProgress'),
      subtitle: t('components.progressBox.text.inProgress'),
    },
    [UploadReportStatuses.NOT_STARTED]: {
      title: t('components.progressBox.title.inProgress'),
      subtitle: t('components.progressBox.text.inProgress'),
    },
  };

  const { data, startPolling, stopPolling, error } = useQuery(
    fileToDownload?.query || ASSESSMENT_REPORT_FILE,
    {
      variables: { id: fileToDownload?.id },
      skip: !fileToDownload?.id,
      onCompleted: (data) => {
        const { isCompleted } = extractFileUploadDetails(data);

        if (!isCompleted) {
          startPolling(2000);
        }
      },
    }
  );

  const { isCompleted, fileStatus, dataAccessor, isFailed } = extractFileUploadDetails(data);
  const isError = !!(error || isFailed);
  const isFileStatusLoading = !isCompleted;

  useEffect(() => {
    if (isCompleted || isFailed) {
      stopPolling();
    }
  }, [fileStatus]);

  if (!fileToDownload?.id) return null;

  const download = () => {
    const url = data?.[dataAccessor].url;

    if (url) {
      window.location.href = url;
    }
  };

  const statusIconClassName = cx('text-white rounded-full absolute top-lg right-base z-highest', {
    'bg-success-500': isCompleted,
    'bg-danger-500': isError,
  });

  if (isMinimized) {
    return (
      <MinimizedProgress isCompleted={isCompleted} isError={isError} onClick={toggleMinimized} />
    );
  }

  return (
    <div className='bg-white shadow-400 rounded-sm py-sm fixed bottom-base xxxl:bottom-md right-base xxxl:right-md w-[280px] z-highest text-center'>
      <IconButton
        Icon={ClearIcon}
        className='absolute top-sm right-sm z-highest'
        size='md'
        onClick={clearReport}
      />

      <div className='h-[195px] flex items-center overflow-hidden mb-sm'>
        {isFileStatusLoading && <FileLoader />}
        {!isFileStatusLoading && (
          <div className='relative mx-auto'>
            <IconContainer
              Icon={isError ? ClearIcon : CheckIcon}
              className={statusIconClassName}
              paddingSize='none'
              size='md'
            />
            <FolderImage className='mx-auto h-[160px] w-[160px] relative top-sm z-high' />
          </div>
        )}
      </div>
      <div className='px-sm'>
        <h5 className='mb-xs text-sm'>{textsMap[fileStatus].title}</h5>
        <p className='text-xxs text-font-secondary'>{textsMap[fileStatus].subtitle}</p>
        <div className='flex gap-xs'>
          <Button
            className='!grow-0 basis-1/2 !px-0'
            size='sm'
            variant='primary-outlined'
            onClick={clearReport}>
            {isCompleted ? t('common.actions.dismiss') : t('common.actions.cancel')}
          </Button>
          {isError && (
            <Button
              className='!grow-0 basis-1/2 !px-0'
              size='sm'
              variant='primary'
              onClick={generateReport}>
              {t('common.actions.retry')}
            </Button>
          )}
          {!isError && (
            <Button
              className='!grow-0 basis-1/2 !px-0'
              size='sm'
              variant='primary'
              onClick={isCompleted ? download : toggleMinimized}>
              {isCompleted ? t('common.actions.download') : t('common.actions.minimize')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
