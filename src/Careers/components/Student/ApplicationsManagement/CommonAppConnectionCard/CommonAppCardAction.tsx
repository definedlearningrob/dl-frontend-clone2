import { useTranslation } from 'react-i18next';

import { TCommonAppData } from '@dc/graphql/student/queries/userInfo';

import { Badge } from '@shared/components/Badge/Badge';
import SharedButton from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import styles from './CommonAppConnectionCard.module.sass';

type Props = {
  commonAppData: TCommonAppData;
  isLoading?: boolean;
};

export const CommonAppCardAction = ({ commonAppData, isLoading = false }: Props) => {
  const { t } = useTranslation();

  const { hasAccountConnected, connectionUrl } = commonAppData;
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  if (hasAccountConnected) {
    return <Badge type='success'>{t('student.postSecondary.applicationsSection.connected')}</Badge>;
  }

  const buttonText = isLoading
    ? t('student.postSecondary.applicationsSection.connecting')
    : t('student.postSecondary.applicationsSection.connect');

  return (
    <SharedButton
      className={styles.button}
      isLoading={isLoading}
      size={isFullHD ? 'md' : 'sm'}
      variant='primary'
      onClick={() => window.open(connectionUrl, '_self')}>
      {buttonText}
    </SharedButton>
  );
};
