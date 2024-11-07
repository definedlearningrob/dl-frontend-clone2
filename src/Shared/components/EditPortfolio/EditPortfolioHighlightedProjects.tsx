import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

import { ReactComponent as Duplicate } from '@shared/svg/duplicate.svg';
import { Badge } from '@shared/components/Badge/Badge';
import usePortfolioResumesQuery from '@shared/graphql/student/hooks/usePortfolioResumesQuery';
import { Tab, Tabs } from '@shared/components/Tabs/Tabs';
import { HighlightedProjectsList } from '@shared/components/EditPortfolio/HighlightedProjectsList';
import { PortfolioFormValues } from '@shared/components/EditPortfolio/EditPortfolio';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';

import { EditPortfolioCardWithTitle } from './EditPortfolioCard';

export const EditPortfolioHighlightedProjects = () => {
  const [highlightedProjectsField] =
    useField<PortfolioFormValues['highlightedProjects']>('highlightedProjects');
  const { t } = useTranslation();

  const { data: resumesData } = usePortfolioResumesQuery();

  if (!resumesData) return null;

  const {
    portfolio: { sharedResume },
  } = resumesData;

  const dcProjects = sharedResume?.dcProjects.nodes || [];
  const dlProjects = sharedResume?.dlProjects.nodes || [];
  const personalProjects = sharedResume?.personalProjects.nodes || [];

  const tabs: Tab[] = [
    {
      tabId: PORTFOLIO_PROJECT_TYPES.CAREERS,
      label: t('portfolio.tabs.definedCareers'),
    },
    {
      tabId: PORTFOLIO_PROJECT_TYPES.PBL,
      label: t('portfolio.tabs.definedLearning'),
    },
    {
      tabId: PORTFOLIO_PROJECT_TYPES.PERSONAL,
      label: t('portfolio.tabs.personal'),
    },
  ];

  const highlightedProjectsCount = highlightedProjectsField.value.length;

  const cardDetails = highlightedProjectsCount > 0 && (
    <Badge className='w-fit' type='primary'>
      {t('portfolio.creator.highlightedProjectsBadge', { count: highlightedProjectsCount })}
    </Badge>
  );

  return (
    <EditPortfolioCardWithTitle
      Icon={Duplicate}
      className='!pe-0 h-full'
      description={t('portfolio.creator.highlightedProjectsInfo')}
      details={cardDetails}
      title={t('portfolio.creator.highlightedProjects')}>
      <Tabs className='min-h-0 h-full flex flex-col' defaultTabId={PORTFOLIO_PROJECT_TYPES.CAREERS}>
        <div className='mb-md'>
          <Tabs.List fullWidth={true} tabs={tabs} withPadding={false} />
        </div>
        <Tabs.Content tabId={PORTFOLIO_PROJECT_TYPES.CAREERS}>
          <HighlightedProjectsList projects={dcProjects} tab={PORTFOLIO_PROJECT_TYPES.CAREERS} />
        </Tabs.Content>
        <Tabs.Content tabId={PORTFOLIO_PROJECT_TYPES.PBL}>
          <HighlightedProjectsList projects={dlProjects} tab={PORTFOLIO_PROJECT_TYPES.PBL} />
        </Tabs.Content>
        <Tabs.Content tabId={PORTFOLIO_PROJECT_TYPES.PERSONAL}>
          <HighlightedProjectsList
            projects={personalProjects}
            tab={PORTFOLIO_PROJECT_TYPES.PERSONAL}
          />
        </Tabs.Content>
      </Tabs>
    </EditPortfolioCardWithTitle>
  );
};
