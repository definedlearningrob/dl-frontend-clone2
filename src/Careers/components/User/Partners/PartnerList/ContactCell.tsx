import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as WorldIcon } from '@shared/assets/icons/world_icon.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as MailIcon } from '@shared/assets/icons/mail.svg';
import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  email: string | null;
  url: string | null;
};

const iconWrapperClasses =
  'group-hover/row:bg-primary-200 transition-colors items-center text-primary-500 font-medium text-xxs xxxl:text-xs flex leading-lg gap-xxs xxxl:gap-xs';
const linkClasses = 'text-primary-500 font-medium text-xxs xxxl:text-xs truncate';
const emptyStateClasses = 'text-neutral-800 font-regular italic';
const iconClasses = 'rounded-sm text-neutral-700 items-center';

export const ContactCell = ({ email, url }: Props) => {
  const { t } = useTranslation();

  const preventPropagation = (event: MouseEvent) => event.stopPropagation();

  return (
    <div className='flex flex-col gap-xxxs'>
      <div className={iconWrapperClasses}>
        <Tooltip
          className='flex truncate p-none gap-xxxs xxxl:gap-xxs'
          message={url || t('user.partners.emptyState.noWebsite')}>
          <IconContainer Icon={WorldIcon} className={iconClasses} paddingSize='none' size='sm' />
          {url ? (
            <a
              className={linkClasses}
              href={url}
              rel='noreferrer'
              target='_blank'
              onClick={preventPropagation}>
              {url}
            </a>
          ) : (
            <span className={emptyStateClasses}>{t('user.partners.emptyState.noWebsite')}</span>
          )}
        </Tooltip>
      </div>
      <div className={iconWrapperClasses}>
        <Tooltip
          className='flex truncate gap-xxxs xxxl:gap-xxs'
          delayDuration={300}
          message={email ? email : t('user.partners.emptyState.noEmail')}>
          <IconContainer Icon={MailIcon} className={iconClasses} paddingSize='none' size='sm' />
          {email ? (
            <a
              className={linkClasses}
              href={`mailto:${email}`}
              rel='noreferrer'
              target='_blank'
              onClick={preventPropagation}>
              {email}
            </a>
          ) : (
            <span className={emptyStateClasses}>{t('user.partners.emptyState.noEmail')}</span>
          )}
        </Tooltip>
      </div>
    </div>
  );
};
