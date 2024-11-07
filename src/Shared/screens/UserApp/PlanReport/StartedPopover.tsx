import { Trans, useTranslation } from 'react-i18next';

import { TooltipWithHeader } from '@shared/components/Tooltip';
import { ReactComponent as InfoIcon } from '@shared/assets/icons/info_outlined.svg';
import { ReactComponent as InProgressIcon } from '@shared/svg/in_progress.svg';
import { ReactComponent as NotMetIcon } from '@shared/svg/clear_circle_outlined.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { cx } from '@shared/utils/cx';
import { ReactComponent as StartedIcon } from '@shared/assets/icons/started.svg';

export const StartedPopover = () => {
  const { t } = useTranslation();

  return (
    <TooltipWithHeader
      Icon={StartedIcon}
      content={
        <div className='font-medium'>
          <div className='mb-xs'>
            <Trans
              components={{
                infoText: <span className='text-info-500' />,
              }}
              i18nKey='planReport.startedInfo'
            />
          </div>
          <div className='flex items-center gap-xxs mb-xxs'>
            <IconContainer
              Icon={InProgressIcon}
              className={cx('border border-neutral-300 rounded-xs text-secondary-500')}
              paddingSize='xxs'
              size='sm'
            />
            {t('planReport.statuses.inProgress')}
          </div>
          <div className='flex items-center gap-xxs'>
            <IconContainer
              Icon={NotMetIcon}
              className={cx('border border-neutral-300 rounded-xs text-danger-500')}
              paddingSize='xxs'
              size='sm'
            />
            {t('planReport.statuses.notMet')}
          </div>
        </div>
      }
      header={t('planReport.statuses.started').toUpperCase()}
      iconClassName='text-info-600'>
      <IconContainer Icon={InfoIcon} className='text-neutral-600' paddingSize='none' size='sm' />
    </TooltipWithHeader>
  );
};
