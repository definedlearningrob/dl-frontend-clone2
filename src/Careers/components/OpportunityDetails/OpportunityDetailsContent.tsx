import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
  Opportunity,
  OpportunityTabs,
  RelatedOpportunities,
} from '@dc/components/OpportunityDetails';
import { useOpportunityQuery } from '@dc/graphql/student/hooks/useOpportunityQuery';

import Card from '@shared/components/Card/Card';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './OpportunityDetailsContent.module.sass';

export const OpportunityDetailsContent = () => {
  const { setBackNavButton } = useNavigation();
  const { state } = useLocation<{ from?: string }>();

  useEffect(() => {
    setBackNavButton(true, state?.from || '/opportunities');

    return () => setBackNavButton(false);
  }, []);

  const { id } = useParams<{ id: string }>();

  const { data, loading } = useOpportunityQuery({ id });

  return (
    <div className={styles.content}>
      <div className={styles.detailsContainer}>
        <Opportunity />
        <OpportunityTabs loading={loading} opportunity={data?.opportunity} />
      </div>
      <Card className={styles.relatedOpportunities}>
        <RelatedOpportunities />
      </Card>
    </div>
  );
};
