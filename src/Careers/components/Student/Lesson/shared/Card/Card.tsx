import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { HTMLProps, ReactNode } from 'react';

import { ReactComponent as SendIcon } from '@shared/svg/send_outlined.svg';
import SharedIcon from '@shared/components/Icon/Icon';

type Props = {
  children: ReactNode;
  'data-testid'?: string;
  onAskGuidanceClick?: () => void;
  title?: string;
} & HTMLProps<HTMLDivElement>;

function StudentLessonSharedCard({
  children,
  className,
  'data-testid': dataTestId,
  onAskGuidanceClick,
  title,
  ...attributes
}: Props) {
  const classes = cx('lesson-item-card', className);
  const { t } = useTranslation();

  return (
    <div className={classes} data-testid={dataTestId} {...attributes}>
      {title && (
        <div className='lesson-item-card__header'>
          <h4 className='lesson-item-card__title'>{title}</h4>
          {onAskGuidanceClick && (
            <button className='lesson-item-card__ask-button' onClick={onAskGuidanceClick}>
              <SharedIcon
                className='lesson-item-card__ask-button-icon'
                icon={<SendIcon />}
                size='sm'
              />
              <span className='lesson-item-card__ask-button-text'>
                {t('messaging.askQuestion')}
              </span>
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export default StudentLessonSharedCard;
