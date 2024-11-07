import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FieldArray } from 'formik';

import { Tab, Tabs } from '@shared/components/Tabs/Tabs';
import useStudentPortfolioQuery from '@shared/graphql/user/hooks/useStudentPortfolioQuery';
import usePortfolioProjectsQuery from '@shared/graphql/student/hooks/usePortfolioProjectsQuery';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';
import useQueryParams from '@shared/hooks/useQueryParams';
import { EvidenceList } from '@shared/components/PortfolioPlans/Evidence/AddEvidenceModal/EvidenceList';
import { ManualAddedEvidenceRecord } from '@shared/components/PortfolioPlans/Evidence/types';

type Props = {
  alreadyAddedEvidence: ManualAddedEvidenceRecord[];
};

export const AddEvidenceForm = ({ alreadyAddedEvidence }: Props) => {
  const { t } = useTranslation();

  const {
    params: { tabId },
  } = useQueryParams<{ tabId?: PORTFOLIO_PROJECT_TYPES }>();

  const [projectType, setProjectType] = useState<PORTFOLIO_PROJECT_TYPES>(
    tabId || PORTFOLIO_PROJECT_TYPES.PBL
  );

  const { id } = useParams<{ id: string }>();

  const properPortfolioProjects = id
    ? useStudentPortfolioQuery({ studentUuid: id, type: projectType, first: 10 })
    : usePortfolioProjectsQuery({ type: projectType, first: 10 });

  const {
    projects: portfolioProjects,
    loading: portfolioProjectsLoading,
    fetchMore,
    pageInfo,
  } = properPortfolioProjects;

  const filteredProjects = portfolioProjects?.edges.filter(
    (project) =>
      !alreadyAddedEvidence.some(
        (addedEvidence) =>
          addedEvidence.itemType === project.node.resourceClass &&
          addedEvidence.itemId === project.node.id
      )
  );

  const tabs: Tab[] = [
    {
      tabId: PORTFOLIO_PROJECT_TYPES.PBL,
      label: t('portfolio.tabs.definedLearning'),
      onClick: () => setProjectType(PORTFOLIO_PROJECT_TYPES.PBL),
    },
    {
      tabId: PORTFOLIO_PROJECT_TYPES.CAREERS,
      label: t('portfolio.tabs.definedCareers'),
      onClick: () => setProjectType(PORTFOLIO_PROJECT_TYPES.CAREERS),
    },
    {
      tabId: PORTFOLIO_PROJECT_TYPES.PERSONAL,
      label: t('portfolio.tabs.personal'),
      onClick: () => setProjectType(PORTFOLIO_PROJECT_TYPES.PERSONAL),
    },
  ];

  const handleFetchMore = () => {
    fetchMore({ variables: { after: pageInfo?.endCursor, first: 10 } });
  };

  return (
    <div>
      <Tabs className='min-h-0 h-full flex flex-col' defaultTabId={PORTFOLIO_PROJECT_TYPES.PBL}>
        <div className='mb-md sticky top-[0px] bg-white z-highest'>
          <Tabs.List fullWidth={true} tabs={tabs} withPadding={false} withQueryParams={false} />
        </div>
        <FieldArray
          name='evidence'
          render={(formikArrayProps) => (
            <EvidenceList
              fetchMore={handleFetchMore}
              hasNextPage={!!pageInfo?.hasNextPage}
              isLoading={portfolioProjectsLoading}
              projectType={projectType}
              projects={filteredProjects || []}
              {...formikArrayProps}
            />
          )}
        />
      </Tabs>
    </div>
  );
};
