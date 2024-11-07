import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { match } from 'ts-pattern';

import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import { ReactComponent as FileIcon } from '@shared/svg/file.svg';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { formatDateTime } from '@shared/utils/date';
import Button from '@shared/components/Button/Button';

import styles from './OpportunityInfoBox.module.sass';

type Props = {
  status: 'accepted' | 'pending' | 'deadline';
  deadline?: string | null;
  onView?: () => void;
  onRemove?: () => void;
};

export const OpportunityInfoBox = ({ status, deadline, onView, onRemove }: Props) => {
  const { t } = useTranslation();

  const { icon, subtitle, title, actions } = match(status)
    .with('accepted', () => ({
      icon: <DoneIcon />,
      title: t('opportunityDetails.statuses.acceptedTitle'),
      subtitle: t('opportunityDetails.statuses.acceptedSubtitle'),
      actions: null,
    }))
    .with('pending', () => ({
      icon: <FileIcon />,
      title: t('opportunityDetails.statuses.pendingTitle'),
      subtitle: t('opportunityDetails.statuses.pendingSubtitle'),
      actions: (
        <div className='flex gap-xs mt-xs'>
          <Button minWidth='md' size='sm' variant='primary' onClick={onView}>
            {t('common.actions.show')}
          </Button>
          <Button minWidth='md' size='sm' variant='primary-outlined' onClick={onRemove}>
            {t('common.actions.remove')}
          </Button>
        </div>
      ),
    }))
    .with('deadline', () => ({
      icon: <InfoIcon />,
      title: t('opportunityDetails.statuses.deadlineTitle'),
      subtitle: t('opportunityDetails.statuses.deadlineSubtitle', {
        deadline: formatDateTime(deadline || ''),
      }),
      actions: null,
    }))
    .exhaustive();

  return (
    <div className='flex rounded-sm border border-neutral-300 w-full p-xs xxl:p-x'>
      <SharedIcon
        className={cx(styles.iconWrapper, {
          [styles.successIcon]: status === 'accepted',
        })}
        icon={icon}
        size='md'
      />
      <div className='text-xxs'>
        <div className='text-primary-500 font-medium leading-lg'>{title}</div>
        <div className='text-neutral-700'>{subtitle}</div>
        {actions && actions}
      </div>
    </div>
  );
};
