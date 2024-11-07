import { FieldArrayRenderProps, useField } from 'formik';
import { useCallback, useState } from 'react';
import { isEmpty, find, findIndex, times } from 'lodash-es';
import InfiniteScroll from 'react-infinite-scroller';
import { useTranslation } from 'react-i18next';

import { EvidenceListItem } from '@shared/components/PortfolioPlans/Evidence/EvidenceListItem';
import { TPortfolioProjectEdge } from '@shared/graphql/student/query/portfolioProjects';
import { cx } from '@shared/utils/cx';
import { TPortfolioProject } from '@shared/components/Portfolio/types';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';

import { EvidenceListItemSkeleton } from '../EvidenceListItemSkeleton';

const ListSkeleton = () => (
  <div>
    {times(5, (index) => (
      <li key={index}>
        <EvidenceListItemSkeleton />
      </li>
    ))}
  </div>
);

type Props = {
  projects: TPortfolioProjectEdge[];
  isLoading: boolean;
  hasNextPage: boolean;
  fetchMore: () => void;
  projectType: PORTFOLIO_PROJECT_TYPES;
} & FieldArrayRenderProps;

export const EvidenceList = ({
  projects = [],
  push,
  remove,
  isLoading,
  fetchMore,
  projectType,
  hasNextPage,
}: Props) => {
  const [evidencesField] = useField('evidence');
  const [hasOverflow, setHasOverflow] = useState(false);
  const { t } = useTranslation();

  const listRef = useCallback(
    (node: HTMLUListElement | null) => {
      if (node) {
        node.scrollTo(0, 0);
        setHasOverflow(node.scrollHeight > node.clientHeight);
      }
    },
    [projectType]
  );

  const handleSelect = (project: TPortfolioProject) => {
    const evidenceItem = {
      itemType: project.resourceClass,
      itemId: project.id,
    };

    const existingEvidenceIndex = findIndex(evidencesField.value, evidenceItem);

    existingEvidenceIndex >= 0 ? remove(existingEvidenceIndex) : push(evidenceItem);
  };

  const hasProjects = !isEmpty(projects);

  return (
    <div className='border border-neutral-300 rounded-sm overflow-hidden'>
      <div className='flex p-xs bg-neutral-200 gap-sm font-bold leading-base text-xs border-b border-neutral-300'>
        <div className='w-full max-w-[148px] xxxl:max-w-[195px]'>
          {t('components.evidence.evidenceImage')}
        </div>
        <div className='basis-1/3'>{t('components.evidence.evidenceTitle')}</div>
        <div className='basis-2/3'>{t('components.evidence.evidenceDetails')}</div>
        <div
          className={cx('basis-[80px] shrink-0 text-center', {
            'me-xxs': hasOverflow,
          })}>
          Select
        </div>
      </div>
      {!isLoading && !hasProjects && (
        <div className='h-[340px] flex justify-center items-center'>
          {t('components.evidence.noProjects')}
        </div>
      )}
      <ul ref={listRef} className='overflow-scroll h-[340px] xxxl:h-[490px] scrollbar'>
        {isLoading && !hasProjects && <ListSkeleton />}
        <InfiniteScroll
          hasMore={hasNextPage}
          initialLoad={false}
          loadMore={fetchMore}
          loader={<ListSkeleton key={0} />}
          threshold={350}
          useWindow={false}>
          {!isLoading &&
            projects.map(({ node: project }) => {
              const isSelected = !!find(evidencesField.value, {
                itemType: project.resourceClass,
                itemId: project.id,
              });

              return (
                <div
                  key={`${project.id}-${project.resourceClass}`}
                  className='border-b border-neutral-300'>
                  <EvidenceListItem
                    description={project.description}
                    imageUrl={project.imageUrl}
                    isTeamSubmission={project.isTeamSubmission}
                    projectType={project.type}
                    selected={isSelected}
                    subTitle={project.name}
                    title={project.parentName}
                    onSelect={() => handleSelect(project)}
                  />
                </div>
              );
            })}
        </InfiniteScroll>
      </ul>
    </div>
  );
};
