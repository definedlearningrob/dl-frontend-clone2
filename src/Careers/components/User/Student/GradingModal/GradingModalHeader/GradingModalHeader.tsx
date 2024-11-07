import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';

import { GRADE_STATUSES } from '@dc/resources/constants';

import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { ReactComponent as RefreshIcon } from '@shared/svg/refresh.svg';
import SharedModal from '@shared/components/Modal/Modal';
import { formatDateTime } from '@shared/utils/date';
import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import Switch from '@shared/components/Switch/Switch';

type GradeStatus = 'not-answered' | 'not-graded' | 'updated' | 'accepted' | 'not-accepted';

type Props = {
  itemName: string;
  hasRubrics: boolean;
  updatedAt?: string;
  setIsSimplifiedGradingEnabled: Dispatch<SetStateAction<boolean>>;
  isSimplifiedGradingEnabled: boolean;
  status: GradeStatus;
  submission: {
    updatedAt: string;
    grade: {
      status: keyof typeof GRADE_STATUSES;
      updatedAt: string;
      lastGradedBy: {
        firstName: string;
        lastName: string;
      };
    };
  };
  answer: {
    answer: string;
    updatedAt: string;
    grade: {
      status: keyof typeof GRADE_STATUSES;
      updatedAt: string;
      lastGradedBy: {
        firstName: string;
        lastName: string;
      };
    };
  };
};

export const GradingModalHeader = ({
  hasRubrics,
  itemName,
  updatedAt,
  submission,
  answer,
  isSimplifiedGradingEnabled,
  setIsSimplifiedGradingEnabled,
}: Props) => {
  const { t } = useTranslation();

  const updatedDate = submission ? submission?.grade?.updatedAt : answer?.grade?.updatedAt;

  const dateClass = cx('text-font-primary', {
    'text-secondary-500': dayjs(updatedAt).isAfter(updatedDate),
  });

  return (
    <>
      <SharedModal.Header className='justify-between'>
        <div>
          <SharedModal.Heading
            className='!text-base mb-xs'
            data-testid='activity-item-title'
            type='h4'>
            {itemName}
          </SharedModal.Heading>
          {updatedAt && (
            <div className='text-xs flex items-center'>
              <IconContainer Icon={RefreshIcon} className='mr-xxs' paddingSize='none' size='sm' />
              <span className='flex gap-xxs text-font-secondary'>
                {t('user.student.coursesActivity.lastUpdate')}:
                <Tooltip message={formatDateTime(updatedAt, { withTime: true })}>
                  <span className={dateClass}>{formatDateTime(updatedAt)}</span>
                </Tooltip>
              </span>
            </div>
          )}
        </div>
        {hasRubrics && (
          <div className='ml-auto mr-base flex items-center'>
            <Switch
              className='mr-xxs'
              label={t('user.student.coursesActivity.simplifiedGrading')}
              value={isSimplifiedGradingEnabled}
              onChange={() => setIsSimplifiedGradingEnabled((prev) => !prev)}
            />
            <Tooltip message={t('user.student.coursesActivity.simplifiedGradingInfo')}>
              <IconContainer
                Icon={InfoIcon}
                className='text-neutral-500 hover:text-primary-500'
                paddingSize='none'
                size='sm'
              />
            </Tooltip>
          </div>
        )}
      </SharedModal.Header>
    </>
  );
};
