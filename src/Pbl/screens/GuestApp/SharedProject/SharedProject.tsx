import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStandardSetsQuery } from '@graphql/dl/public/hooks';

import Project from '@pbl/components/SharedResources/Student/Project/Project';
import MainContent from '@pbl/shared/MainContent/MainContent';
import usePublicProjectQuery from '@pbl/graphql/public/hooks/usePublicProjectQuery';

import EmptyState from '@shared/components/EmptyState/EmptyState';
import Link from '@shared/components/Link';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import useQueryParams from '@shared/hooks/useQueryParams';

import styles from './SharedProject.module.sass';

export const SharedProject = () => {
  const { projectId: shareId, targetRole } = useParams<{ projectId: string; targetRole: string }>();
  const {
    params: { code },
  } = useQueryParams<{ code: string }>();
  const { t } = useTranslation();
  const {
    data: projectData,
    loading: projectLoading,
    error,
  } = usePublicProjectQuery(shareId, code);
  const { data: standardSetsData, loading: standardSetsLoading } = useStandardSetsQuery({
    variables: { code },
  });

  const isLoading = projectLoading || standardSetsLoading;

  if (isLoading) {
    return (
      <MainContent>
        <SharedLoadingSpinner size='small' />
      </MainContent>
    );
  }

  if (error || !projectData) {
    return (
      <MainContent>
        <EmptyState className={styles.studentSharedEmptyState} heading={t('user.project.notFound')}>
          <p>{t('user.project.notFoundText')}</p>
          <Link to='/' variant='primary'>
            {t('common.actions.back')}
          </Link>
        </EmptyState>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Project
        isUser={targetRole !== 'student'}
        project={projectData.project}
        standardSets={standardSetsData?.standardSets ?? []}
      />
    </MainContent>
  );
};
