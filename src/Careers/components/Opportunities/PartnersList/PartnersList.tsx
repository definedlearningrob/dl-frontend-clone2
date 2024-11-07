import { Trans, useTranslation } from 'react-i18next';
import { usePartnersQuery } from '@graphql/dc/students/hooks';

import { PartnerCard } from '@dc/components/Student/PartnerCard/PartnerCard';
import { OpportunitiesListWrapper } from '@dc/components/Opportunities/OpportunitiesListWrapper/OpportunitiesListWrapper';

export const PartnersList = () => {
  const { t } = useTranslation();

  const { data, loading } = usePartnersQuery();

  const partners = data?.partners.nodes ?? [];

  return (
    <OpportunitiesListWrapper
      description={t('opportunities.partnersDescription')}
      loading={loading}
      name={
        <Trans
          components={{ neutralText: <span className='text-neutral-600' /> }}
          i18nKey='opportunities.partnersCount'
          values={{ count: partners.length }}
        />
      }>
      {!loading && partners.map((partner) => <PartnerCard key={partner.id} {...partner} />)}
    </OpportunitiesListWrapper>
  );
};
