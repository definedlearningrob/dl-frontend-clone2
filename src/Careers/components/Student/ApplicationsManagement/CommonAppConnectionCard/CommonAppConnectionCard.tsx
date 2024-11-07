import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { useUpdateCommonAppMetadata } from '@dc/graphql/student/hooks/useUpdateCommonAppMetadata';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as CommonAppIcon } from '@shared/svg/common_app.svg';
import useQueryParams from '@shared/hooks/useQueryParams';
import { callToast } from '@shared/components/Toaster/Toaster';

import { ActionableSection } from '../ActionableSection';

import styles from './CommonAppConnectionCard.module.sass';
import { CommonAppCardAction } from './CommonAppCardAction';

type QueryParams = {
  applicantId?: string;
  requestId?: string;
};

const COMMON_APP_URL = 'https://apply.commonapp.org/';

export const CommonAppConnectionCard = () => {
  const { t } = useTranslation();
  const { userInfo, refreshUser } = useUserInfo<TStudentInfo>();
  const {
    params: { applicantId },
  } = useQueryParams<QueryParams>();
  const [updateCommonAppMetadata, { loading }] = useUpdateCommonAppMetadata();

  const { hasAccountConnected } = userInfo.commonAppData;

  const handleSaveApplicantId = async () => {
    if (!applicantId) return;

    try {
      await updateCommonAppMetadata({ applicantId: +applicantId });
      refreshUser();

      callToast('success', t('student.postSecondary.applicationsSection.commonAppSuccess'));
    } catch {
      callToast('error', t('student.postSecondary.applicationsSection.commonAppError'));
    }
  };

  useEffect(() => {
    if (!hasAccountConnected && applicantId) {
      handleSaveApplicantId();
    }
  }, [applicantId]);

  const linkedAccount = (
    <a
      className='text-neutral-800 font-bold leading-base text-sm xxxl:text-base'
      href={COMMON_APP_URL}
      target='_blank'>
      {t('student.postSecondary.applicationsSection.connectedToCommonApp')}
    </a>
  );

  const titleKey = hasAccountConnected
    ? linkedAccount
    : t('student.postSecondary.applicationsSection.connectCommonApp');

  const descriptionKey = hasAccountConnected
    ? 'student.postSecondary.applicationsSection.syncCommonAppApplications'
    : 'student.postSecondary.applicationsSection.signInToCommonApp';

  return (
    <ActionableSection
      action={<CommonAppCardAction commonAppData={userInfo.commonAppData} isLoading={loading} />}
      description={t(descriptionKey)}
      icon={
        <a href={COMMON_APP_URL} target='_blank'>
          <SharedIcon className={styles.commonAppIcon} icon={<CommonAppIcon />} />
        </a>
      }
      title={titleKey}
    />
  );
};
