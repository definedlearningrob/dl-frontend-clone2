import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { UploadReportStatuses } from '@dc/resources/enums';

import SharedButton from '@shared/components/Button/Button';

type Props = {
  report?: {
    id: string;
    uploadStatus: UploadReportStatuses;
    url: string;
  };
  retry: () => void;
};

type TConfig =
  | {
      key: string;
      variant: 'primary' | 'primary-outlined';
      action: () => void;
    }
  | undefined;

function UserReportProgressBoxButtons({ report, retry }: Props) {
  const { t } = useTranslation();

  const reportStatus = report?.uploadStatus;
  const reportFailed = reportStatus === UploadReportStatuses.FAILED;
  const reportInProgress = reportStatus === UploadReportStatuses.IN_PROGRESS;
  const reportNotStarted = reportStatus === UploadReportStatuses.NOT_STARTED;
  const loadingReport = reportInProgress || reportNotStarted;

  const download = () => {
    const url = report?.url;

    if (url) {
      window.location.href = url;
    }
  };

  const config =
    reportStatus &&
    ({
      [UploadReportStatuses.COMPLETED]: {
        key: 'success',
        variant: 'primary-outlined',
        action: download,
      },
      [UploadReportStatuses.FAILED]: { key: 'failed', variant: 'primary', action: retry },
      [UploadReportStatuses.IN_PROGRESS]: {
        key: 'inProgress',
        variant: 'primary',
        action: () => {},
      },
      [UploadReportStatuses.NOT_STARTED]: {
        key: 'inProgress',
        variant: 'primary',
        action: () => {},
      },
    }[reportStatus] as TConfig);

  const contentClasses = cx('progress-box__content', {
    '-error': reportFailed,
  });

  return config ? (
    <div className={contentClasses}>
      {t(`user.report.progressBox.${config.key}`)}
      <SharedButton
        className='progress-box__button'
        isLoading={loadingReport}
        variant={config.variant}
        onClick={config.action}>
        {t(`user.report.progressBox.action.${config.key}`)}
      </SharedButton>
    </div>
  ) : (
    <div className={contentClasses}>
      {t('user.report.progressBox.inProgress')}
      <SharedButton
        className='progress-box__button'
        isLoading={true}
        size='sm'
        variant='primary'
        onClick={() => {}}>
        {t('user.report.progressBox.action.inProgress')}
      </SharedButton>
    </div>
  );
}

export default UserReportProgressBoxButtons;
