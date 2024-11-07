/*eslint-disable react/no-danger */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useOpportunityQuery } from '@dc/graphql/user/hooks/useOpportunityQuery';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { OpportunityTabs } from '@dc/components/OpportunityDetails';
import { OpportunityDetailsCard } from '@dc/components/User/Opportunities/OpportunityDetailsCard';
import { ParticipantListCard } from '@dc/components/User/Opportunities/ParticipantListCard';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

export function OpportunityScreen() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { setBackNavButton } = useNavigation();
  const { data, loading, error } = useOpportunityQuery({ id });

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  if (error) {
    return (
      <SharedMainContent>
        <div className='text-center'>{t('shared.dataLoader.error')}</div>
      </SharedMainContent>
    );
  }

  return (
    <SharedMainContent className='flex flex-row justify-center items-center gap-base !pt-xs px-base h-[theme(layout.containerHeight)] xxxl:p-md xxxl:gap-md'>
      <div className='flex flex-col h-full gap-sm basis-2/3 xxxl:gap-md'>
        <OpportunityDetailsCard />
        <OpportunityTabs loading={loading} opportunity={data?.opportunity} />
      </div>
      <div className='flex flex-col h-full basis-1/3 gap-sm xxxl:gap-md'>
        <ParticipantListCard />
      </div>
    </SharedMainContent>
  );
}
