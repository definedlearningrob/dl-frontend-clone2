import { kebabCase } from 'lodash-es';
import { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { createEvent, EventAttributes } from 'ics';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { formatDateTime } from '@shared/utils/date';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';

import { IconContainer } from '../IconContainer/IconContainer';

type Props = {
  title: string;
  date: string;
  description?: string;
};

export const CalendarCard = ({ title, description, date }: Props) => {
  const { t } = useTranslation();

  const url = useMemo(() => {
    const parsedDate = dayjs(date);
    const event: EventAttributes = {
      start: [parsedDate.get('year'), parsedDate.get('month') + 1, parsedDate.get('date')],
      duration: { days: 1 },
      title,
      description,
    };

    const { error, value } = createEvent(event);

    if (error || !value) {
      return;
    }
    const file = new Blob([value], { type: 'text/calendar;charset=utf-8' });

    return URL.createObjectURL(file);
  }, [date, title, description]);

  useEffect(() => {
    if (url) {
      return () => URL.revokeObjectURL(url);
    }
  }, [url]);

  const containerClasses = cx(
    'group block outline-none p-sm xxxl:p-base',
    'border border-neutral-300 rounded-sm !text-font-primary',
    'transition-colors hover:bg-neutral-200 hover:border-neutral-400 focus-visible:border-primary-500'
  );

  const dateClasses = cx(
    'mb-sm text-xxs font-medium xxxl:text-xs',
    'transition-colors text-font-secondary group-hover:text-font-primary group-focus-visible:text-font-primary'
  );

  return (
    <a
      className={containerClasses}
      download={kebabCase(title)}
      href={url}
      rel='noopener noreferrer'
      target='_blank'>
      <div className='transition-colors bg-neutral-200 rounded-xs p-xs w-fit mb-base group-hover:bg-white xxxl:mb-md'>
        <CalendarIcon className='transition-colors text-font-secondary group-hover:text-primary-500 group-focus-visible:text-font-primary' />
      </div>
      <h6 className='text-xs font-bold leading-base mb-xxs xxxl:text-sm'>{title}</h6>
      <span className={dateClasses}>{formatDateTime(date)}</span>
      <div className='transition-[gap] flex items-center gap-xxs text-xs mt-sm text-primary-500 group-hover:gap-xs group-focus-visible:gap-xs'>
        <span className='text-xs font-medium xxxl:text-sm'>
          {t('components.calendarCard.addToCalendar')}
        </span>
        <IconContainer
          Icon={ChevronRightIcon}
          className='transition-colors group-hover:text-primary-600 group-focus-visible:text-primary-600'
          paddingSize='none'
          size='sm'
        />
      </div>
    </a>
  );
};
