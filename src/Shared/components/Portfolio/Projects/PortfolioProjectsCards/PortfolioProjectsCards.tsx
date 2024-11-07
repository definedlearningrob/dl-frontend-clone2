import { isEmpty } from 'lodash-es';
import { useState, useCallback } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import cx from 'classnames';
import { useWindowSize } from 'react-use';
import InfiniteScroll from 'react-infinite-scroller';

import Card from '@shared/components/Card/Card';
import SharedButton from '@shared/components/Button/Button';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';
import { usePortfolioContext } from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { PortfolioProjectsCard } from '@shared/components/Portfolio/Projects';

import { PortfolioProjectsEmptyCard } from '../PortfolioProjectsEmptyCard/PortfolioProjectsEmptyCard';

const cardContentClassName = cx(
  `flex justify-between`,
  `py-base xxxl:pt-md `,
  `bg-white sticky z-high`
);

export const PortfolioProjectsCards = () => {
  const { t } = useTranslation();
  const {
    createPortfolioProject: { setShowCreatePersonalProjectModal },
    portfolioProjects: { projects, loading, fetchMorePortfolioProjects, portfolioProjectsPageInfo },
    tabs: { projectType },
    studentInfo,
    isUser,
  } = usePortfolioContext();

  const { width, height } = useWindowSize();

  const portfolioProjects = projects?.edges || [];
  const isPortfolioProjectPersonal = projectType === PORTFOLIO_PROJECT_TYPES.PERSONAL && !isUser;

  const [headerTop, setHeaderTop] = useState(0);

  // useCallback as a replacement for useEffect+useRef
  // used to calculate header top position (sticky list header)
  const customRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        // should take top position if scroll is on y === 0
        window.scrollTo(0, 0);

        const { top } = node.getBoundingClientRect();

        setHeaderTop(top);
      }
    },
    [width, height]
  );
  if (loading)
    return (
      <Card className='h-[450px] flex justify-center'>
        <SharedLoadingSpinner size='small' />
      </Card>
    );

  const openCreatePersonalProjectModal = () => {
    setShowCreatePersonalProjectModal(true);
  };
  const hasProjects = !isEmpty(portfolioProjects);

  const handleFetchMore = () => {
    fetchMorePortfolioProjects({
      variables: { after: portfolioProjectsPageInfo?.endCursor, first: 20 },
    });
  };

  return (
    <div ref={customRef}>
      <Card className='h-full flex flex-col min-h-0 !pt-0'>
        <div className={cardContentClassName} style={{ top: headerTop }}>
          {hasProjects && (
            <h6 className='flex items-center min-h-[40px] mb-0 text-neutral-800 text-sm leading-base'>
              <Trans
                i18nKey='portfolioProjects.projectsCount'
                values={{ count: projects?.totalCount || 0 }}>
                <span className='ps-xxs text-neutral-600' />
              </Trans>
            </h6>
          )}
          {isPortfolioProjectPersonal && hasProjects && (
            <SharedButton
              data-testid='create-new-project'
              size='sm'
              type='submit'
              value='createPersonalProject'
              variant='primary'
              onClick={openCreatePersonalProjectModal}>
              {t('portfolioProjects.createNewPersonalProject')}
            </SharedButton>
          )}
        </div>
        <InfiniteScroll
          hasMore={!!projects?.pageInfo?.hasNextPage}
          initialLoad={false}
          loadMore={handleFetchMore}
          loader={
            <div key={0} className='flex justify-center w-full h-[100px]'>
              <SharedLoadingSpinner size='small' />
            </div>
          }
          threshold={200}
          useWindow={true}>
          {!hasProjects && <PortfolioProjectsEmptyCard />}
          {hasProjects && (
            <div>
              {portfolioProjects.map(({ node: project }, index: number) => (
                <div
                  key={`${project.resourceClass}-${project.id}`}
                  className='mb-xxs xxxl:mb-xs last-of-type:mb-0'>
                  <PortfolioProjectsCard
                    key={project.name + index}
                    className='p-sm'
                    project={project}
                    studentInfo={studentInfo}
                    tab={projectType}
                  />
                </div>
              ))}
            </div>
          )}
        </InfiniteScroll>
      </Card>
    </div>
  );
};
