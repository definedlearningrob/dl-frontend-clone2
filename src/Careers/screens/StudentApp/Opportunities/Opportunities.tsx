import { usePartnersQuery } from '@graphql/dc/students/hooks';
import { isEmpty } from 'lodash-es';

import { Opportunities } from '@dc/components/Opportunities/';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import styles from './Opportunities.module.sass';

export const StudentAppOpportunities = () => {
  const { data, loading } = usePartnersQuery();

  const hasPartners = !isEmpty(data?.partners.nodes);

  if (loading) {
    return null;
  }

  return (
    <SharedMainContent className={styles.container}>
      <Opportunities hasPartners={hasPartners} />
    </SharedMainContent>
  );
};
