import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useEffect } from 'react';

import useCareerExperiences from '@shared/graphql/shared/hooks/useCareerExperiences';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { ChartLegend } from '@shared/components/ExperiencesPanel/ChartLegend/ChartLegend';
import EmptyState from '@shared/components/EmptyState/EmptyState';
import { ChartProvider } from '@shared/components/ExperiencesPanel/context/ChartContext';
import { ReactComponent as EmptyReportIcon } from '@shared/assets/icons/empty_no-reports.svg';
import Button from '@shared/components/Button/Button';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import { ExperiencesChart } from './ExperiencesChart/ExperiencesChart';
import styles from './ExperiencesPanel.module.sass';

type Props = {
  isStudent: boolean;
};

export const ExperiencesPanel = ({ isStudent }: Props) => {
  const { uuid } = useParams<{ uuid?: string }>();
  const { t } = useTranslation();
  const history = useHistory();
  const { setBackNavButton } = useNavigation();

  const { data, loading } = useCareerExperiences(uuid);

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.loader}>
        <SharedLoadingSpinner size='medium' />
      </div>
    );
  }

  if (isEmpty(data)) {
    return (
      <EmptyState
        className={styles.emptyContent}
        heading={t('portfolio.experiencesPanel.experienceNotFound')}
        icon={<EmptyReportIcon />}>
        <p className={styles.emptyText}>
          {t('portfolio.experiencesPanel.experiencesTextNotFound')}
        </p>
        <Button variant='primary' onClick={history.goBack}>
          {t('common.actions.backToPortfolio')}
        </Button>
      </EmptyState>
    );
  }

  return (
    <div className={styles.content}>
      <ChartProvider data={data!} isStudent={isStudent}>
        <ExperiencesChart />
        <ChartLegend />
      </ChartProvider>
    </div>
  );
};
