import { useParams } from 'react-router-dom';
import { usePartnerOverviewQuery as usePartnerOverviewQueryUser } from '@graphql/dc/users/hooks';
import { usePartnerOverviewQuery as usePartnerOverviewQueryStudent } from '@graphql/dc/students/hooks';
import { ForwardedRef, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { PartnerCardContentWrapper } from '@dc/components/PartnerView/PartnerCardContentWrapper';
import { PartnerDetailsSkeleton } from '@dc/components/PartnerView/PartnerDetailsSkeleton';

import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';
import { useRole } from '@shared/hooks/useRole';

export const PartnerDetails = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { isUser } = useRole();

  const computedPartnerQueryHook = isUser
    ? usePartnerOverviewQueryUser
    : usePartnerOverviewQueryStudent;

  const { data, loading } = computedPartnerQueryHook({ variables: { id } });

  return (
    <PartnerCardContentWrapper ref={ref} header={t('partners.details')}>
      <div className='px-base py-sm'>
        {loading && <PartnerDetailsSkeleton />}
        {!loading && <InjectedContent content={data?.partner?.details!} />}
      </div>
    </PartnerCardContentWrapper>
  );
});
