import SharedMainContent from '@pbl/shared/MainContent/MainContent';

import usePortfolioResumesQuery from '@shared/graphql/student/hooks/usePortfolioResumesQuery';
import { PortfolioContentWrapper } from '@shared/components/Portfolio/PortfolioContentWrapper/PortfolioContentWrapper';

export const Portfolio = () => {
  const { data: resumesData } = usePortfolioResumesQuery();

  if (!resumesData) {
    return null;
  }

  return (
    <SharedMainContent className='!pt-0'>
      <PortfolioContentWrapper portfolio={resumesData.portfolio} />
    </SharedMainContent>
  );
};
