import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { useGenerateFerpaUrl } from '@dc/graphql/student/hooks/useGenerateFerpaUrl';

import SharedIcon from '@shared/components/Icon/Icon';
import SharedButton from '@shared/components/Button/Button';
import useQueryParams from '@shared/hooks/useQueryParams';
import { callToast } from '@shared/components/Toaster/Toaster';
import { Badge } from '@shared/components/Badge/Badge';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { ActionableSection } from '../ActionableSection';

import styles from './FerpaCard.module.sass';

type QueryParams = {
  isFerpaConfirmed?: boolean;
};

export const FerpaCard = () => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TStudentInfo>();
  const [generateFerpaUrl, { called, reset }] = useGenerateFerpaUrl();
  const {
    params: { isFerpaConfirmed },
    removeQueryParams,
  } = useQueryParams<QueryParams>();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { hasFerpaSigned, hasAccountConnected } = userInfo.commonAppData;

  useEffect(() => {
    if (isFerpaConfirmed) {
      callToast('success', t('student.postSecondary.applicationsSection.updateFerpaStatusSuccess'));
      removeQueryParams(['isFerpaConfirmed']);
    }
  }, [isFerpaConfirmed]);

  const handleCompleteFerpa = async () => {
    try {
      const { data } = await generateFerpaUrl();

      const ferpaUrl = data?.generateFerpaUrl.url;
      window.open(ferpaUrl, '_self');
    } catch {
      callToast('error', t('student.postSecondary.applicationsSection.ferpaRedirectError'));
      reset();
    }
  };

  if (!hasAccountConnected) {
    return null;
  }

  const ferpaActions = hasFerpaSigned ? (
    <Badge type='success'>
      {t('student.postSecondary.applicationsSection.completedFERPAWaiver')}
    </Badge>
  ) : (
    <SharedButton
      className={styles.button}
      isLoading={called}
      size={isFullHD ? 'md' : 'sm'}
      variant='primary'
      onClick={handleCompleteFerpa}>
      {t('student.postSecondary.applicationsSection.completeFerpa')}
    </SharedButton>
  );

  return (
    <ActionableSection
      action={ferpaActions}
      className='!rounded-t-none'
      contentClassName='border-t border-neutral-300'
      description={t('student.postSecondary.applicationsSection.completeFerpaDescription')}
      icon={<SharedIcon className={styles.commonAppIcon} icon={<div />} />}
      title={t('student.postSecondary.applicationsSection.completeFerpaTitle')}
    />
  );
};
