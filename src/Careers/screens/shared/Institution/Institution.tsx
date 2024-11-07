import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { InstitutionTabs } from '@dc/components/PostSecondary/InstitutionTabs';
import { InstitutionSummaryCard } from '@dc/components/PostSecondary/InstitutionSummaryCard';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { useInstitutionQuery } from '@dc/graphql/student/hooks/useInstitutionQuery';
import { useUserInstitutionQuery } from '@dc/graphql/user/hooks/useUserInstitutionQuery';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import { InstitutionSkeleton } from './InstitutionSkeleton';
import styles from './Institution.module.sass';

type Props = {
  isTeacher?: boolean;
};

export const Institution = ({ isTeacher }: Props) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { setBackNavButton } = useNavigation();

  const useProperInstitutionQuery = isTeacher ? useUserInstitutionQuery : useInstitutionQuery;
  const { data, loading } = useProperInstitutionQuery({ id, track: true });

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  if (loading) {
    return (
      <SharedMainContent>
        <InstitutionSkeleton isTeacher={isTeacher} />
      </SharedMainContent>
    );
  }

  if (!data) {
    return (
      <SharedMainContent>
        <div className='text-center'>{t('shared.dataLoader.error')}</div>
      </SharedMainContent>
    );
  }

  return (
    <SharedMainContent>
      <div className={styles.wrapper}>
        <InstitutionSummaryCard institution={data.institution} isTeacher={isTeacher} />
        <InstitutionTabs isIpedsInstitution={data.institution.isIpeds} isTeacher={isTeacher} />
      </div>
    </SharedMainContent>
  );
};
