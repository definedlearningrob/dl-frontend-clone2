import { useState, useCallback, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import { useTranslation } from 'react-i18next';
import { snakeCase } from 'lodash-es';

import { TPortfolio } from '@shared/graphql/student/query/portfolioResumes';
import { PortfolioProjectsCards } from '@shared/components/Portfolio/Projects';
import { usePortfolioContext } from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { Tab, Tabs } from '@shared/components/Tabs/Tabs';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';
import DeletePersonalProjectModal from '@shared/components/Portfolio/Projects/DeletePersonalProjectModal';
import { CreatePersonalProjectModal } from '@shared/components/Portfolio/Projects/CreatePersonalProjectModal';
import { UpdatePersonalProjectModal } from '@shared/components/Portfolio/Projects/UpdatePersonalProjectModal';
import Link from '@shared/components/Link';
import SharedSwitch from '@shared/components/Switch/Switch';
import { ReactComponent as CopyIcon } from '@shared/assets/icons/copy.svg';
import { ReactComponent as LinkIcon } from '@shared/assets/icons/link.svg';
import { ReactComponent as ShareIcon } from '@shared/assets/icons/share.svg';
import { ReactComponent as WarningIcon } from '@shared/assets/icons/warning_outlined.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Badge } from '@shared/components/Badge/Badge';
import { useUpdateResume } from '@shared/graphql/student/hooks/useUpdateResume';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { useDetectApplicationType } from '@shared/hooks/useDetectApplicationType';
import { useFeatureFlags } from '@shared/components/FeatureProvider';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useRole } from '@shared/hooks/useRole';
import { callToast } from '@shared/components/Toaster/Toaster';
import { handleError } from '@shared/utils/handleError';
import { PortfolioResumesEducationDetails } from '@shared/components/Portfolio/Resumes/PortfolioResumesEducationDetails';
import { PortfolioResumesBio } from '@shared/components/Portfolio/Resumes/PortfolioResumesBio';
import { formatExternalLink } from '@shared/utils/formatExternalLink';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { Tooltip } from '@shared/components/Tooltip';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { EmptyPortfolio } from '@shared/components/EmptyPortfolio/EmptyPortfolio';

type Props = {
  portfolio: TPortfolio;
};

export const PortfolioContentWrapper = ({ portfolio }: Props) => {
  const { isStudent } = useRole();
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { isCareersApp } = useDetectApplicationType();
  const [updateResume] = useUpdateResume();
  const { setBackNavButton } = useNavigation();
  const { SHARED_RESUME_ON } = useFeatureFlags();

  const {
    params: { focusTab, statementId, groupId },
  } = useQueryParams<{
    focusTab: string;
    statementId: string;
    groupId: string;
  }>();

  useEffect(() => {
    const backText = focusTab && t('portfolio.public.backToPlans');
    const backPath = '/plans?groupId=' + groupId + '&statementId=' + statementId;
    setBackNavButton(true, backPath, backText);

    return () => setBackNavButton(false);
  }, []);

  if (!portfolio.sharedResume)
    return (
      <MainContent className='flex justify-center pt-0'>
        <EmptyPortfolio />
      </MainContent>
    );

  const {
    avatarUrl,
    bio,
    name,
    contactLinks,
    experiences,
    educations,
    extraCurriculars,
    highlightedProjects,
    highlightedProjectsEnabled,
    externalResumes,
    highlightedBadges,
  } = portfolio.sharedResume;

  const studentBio = { avatarUrl, bio, name, contactLinks };
  const studentEducationDetails = {
    experiences,
    educations,
    extraCurriculars,
    highlightedProjects,
    highlightedProjectsEnabled,
    highlightedBadges,
  };

  const {
    createPortfolioProject: { showCreatePersonalProjectModal },
    modifyPersonalProject: {
      modifyPersonalProjectData: { isDeleteProjectModalOpen, isUpdateProjectModalOpen },
    },
    tabs: { setProjectType },
  } = usePortfolioContext();
  const { width, height } = useWindowSize();

  const { t } = useTranslation();

  const [offsets, setOffsets] = useState({ first: 0, second: 0 });

  const {
    params: { tabId },
  } = useQueryParams<{ tabId?: PORTFOLIO_PROJECT_TYPES }>();

  const tabs: Tab[] = [
    {
      tabId: PORTFOLIO_PROJECT_TYPES.RESUME,
      label: t('portfolio.tabs.resume'),
    },
    {
      tabId: PORTFOLIO_PROJECT_TYPES.CAREERS,
      label: t('portfolio.tabs.definedCareers'),
      onClick: () => setProjectType(PORTFOLIO_PROJECT_TYPES.CAREERS),
    },
    {
      tabId: PORTFOLIO_PROJECT_TYPES.PBL,
      label: t('portfolio.tabs.definedLearning'),
      onClick: () => setProjectType(PORTFOLIO_PROJECT_TYPES.PBL),
    },
    {
      tabId: PORTFOLIO_PROJECT_TYPES.PERSONAL,
      label: t('portfolio.tabs.personal'),
      onClick: () => setProjectType(PORTFOLIO_PROJECT_TYPES.PERSONAL),
    },
  ];

  const headerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        const { top, height } = node.getBoundingClientRect();

        setOffsets({
          first: top,
          second: top + height,
        });
      }
    },
    [width, height]
  );

  const handleTabsChange = () => {
    window.scrollTo(0, 0);
  };

  const itemSize = isFullHD ? 'md' : 'sm';

  const toggleSharedUrlEnabled = async () => {
    try {
      await updateResume({
        sharedUrlEnabled: !portfolio.sharedResume?.sharedUrlEnabled,
      });

      callToast('success', t('portfolio.resumeUpdate'));
    } catch (error) {
      handleError(error);
    }
  };

  const domainLink = isCareersApp
    ? import.meta.env.VITE_DC_FRONTEND_HOST
    : import.meta.env.VITE_PBL_FRONTEND_HOST;
  const sharedLink = portfolio.sharedResume
    ? `${domainLink}/resume/${snakeCase(portfolio.sharedResume.name)}/${
        portfolio.sharedResume.sharedUrl
      }`
    : '';
  const isSharedUrlEnabled = portfolio.sharedResume?.sharedUrlEnabled;
  const badge = isSharedUrlEnabled
    ? {
        icon: ShareIcon,
        type: 'success' as const,
        text: t('common.notifications.publishingStatuses.published'),
      }
    : {
        icon: WarningIcon,
        type: 'secondary' as const,
        text: t('common.notifications.publishingStatuses.internalOnly'),
      };

  const previewLink = portfolio.sharedResume
    ? `${snakeCase(portfolio.sharedResume.name)}/${portfolio.sharedResume.sharedUrl}`
    : '';

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setTooltipVisible(true);
    } catch (error) {
      handleError(error);
    }

    setTimeout(() => {
      setTooltipVisible(false);
    }, 3000);
  };

  const portfolioLink = isStudent
    ? sharedLink
    : `${domainLink}/resume/${snakeCase(portfolio.sharedResume.name)}/${
        portfolio.sharedResume.shareCode
      }`;

  return (
    <div className='flex flex-col h-full'>
      <div
        ref={headerRef}
        className='w-full py-sm xxxl:py-base gap-base xxxl:gap-md bg-neutral-200 z-higher sticky flex shrink-0 items-center justify-between'
        style={{ top: offsets.first }}>
        <div className='w-[362px] xxxl:w-[512px] grow-0 shrink-0 flex items-end gap-xs'>
          <h1 className='text-base xxxl:text-lg mb-0 leading-base'>{t('portfolio.portfolio')}</h1>
          {SHARED_RESUME_ON && (
            <Badge
              Icon={badge.icon}
              className='!rounded-full !leading-base h-base truncate'
              type={badge.type}>
              {badge.text}
            </Badge>
          )}
        </div>
        {SHARED_RESUME_ON && isStudent ? (
          <div className='flex gap-base min-w-0 grow'>
            <div className='min-w-0 grow'>
              <Tooltip
                delayDuration={300}
                message={t('common.notifications.copy.linkCopied')}
                open={isTooltipVisible}
                side='top'>
                <div className='flex gap-xs bg-white border border-neutral-300 rounded-sm items-center px-xs min-w-0'>
                  <IconContainer
                    Icon={LinkIcon}
                    className='shrink-0'
                    paddingSize='none'
                    size={isFullHD ? 'base' : 'sm'}
                  />
                  <div className='overflow-hidden text-xxs xxxl:!text-xs overflow-ellipsis whitespace-nowrap min-w-0 leading-[30px] xxxl:leading-[38px]'>
                    {sharedLink}
                  </div>
                  <Tooltip className='ml-auto shrink-0' message={t('sharedCommon.copy')}>
                    <IconButton
                      Icon={CopyIcon}
                      className='!text-neutral-800'
                      size={isFullHD ? 'md' : 'sm'}
                      variant='default'
                      onClick={() => copyToClipboard(sharedLink)}
                    />
                  </Tooltip>
                </div>
              </Tooltip>
            </div>
            <div className='flex shrink-0'>
              <SharedSwitch
                additionalLabel={t('portfolio.sharedResumeLink')}
                className='bg-white px-xs py-xxs xxxl:py-xs border-primary-500 rounded-sm h-md xxxl:h-[40px] mr-sm xxxl:mr-base shrink-0'
                labelClassName='!text-xxs xxxl:!text-xs'
                name='portfolio'
                value={!!portfolio.sharedResume?.sharedUrlEnabled}
                onChange={toggleSharedUrlEnabled}
              />
              <Link
                className='mr-xs xxxl:mr-sm px-sm xxxl:px-base'
                size={itemSize}
                to={`portfolio/resume/${previewLink}`}
                variant='primary-outlined'>
                {t('common.actions.preview')}
              </Link>
              <Link
                className='py-xs px-sm xxxl:px-base'
                size={itemSize}
                to='/portfolio/edit'
                variant='primary'>
                {t('common.actions.edit')}
              </Link>
            </div>
          </div>
        ) : (
          <div className='ml-auto'>
            <Link
              size={isFullHD ? 'md' : 'sm'}
              target='_blank'
              to={{ pathname: formatExternalLink(portfolioLink) }}
              variant='primary'>
              {t('portfolioResume.showResume')}
            </Link>
          </div>
        )}
      </div>
      <Tabs
        className='flex min-h-0 space-x-base xxxl:space-x-md'
        defaultTabId={tabId || PORTFOLIO_PROJECT_TYPES.RESUME}>
        <div
          className='w-[362px] xxxl:w-[512px] grow-0 shrink-0 sticky h-min'
          style={{ top: offsets.second }}>
          <PortfolioResumesBio
            isPublic={false}
            isStudent={isStudent}
            previousPortfolioResumes={externalResumes}
            studentBio={studentBio}
          />
        </div>
        <div className='w-full h-full flex flex-col min-h-0'>
          <div className='sticky z-higher pb-sm bg-neutral-200' style={{ top: offsets.second }}>
            <Tabs.List fullWidth={true} tabs={tabs} onTabsChange={handleTabsChange} />
          </div>
          <Tabs.Content tabId={PORTFOLIO_PROJECT_TYPES.RESUME}>
            <PortfolioResumesEducationDetails studentEducationDetails={studentEducationDetails} />
          </Tabs.Content>
          <Tabs.Content tabId={PORTFOLIO_PROJECT_TYPES.CAREERS}>
            <div>
              <PortfolioProjectsCards />
            </div>
          </Tabs.Content>
          <Tabs.Content tabId={PORTFOLIO_PROJECT_TYPES.PBL}>
            <div>
              <PortfolioProjectsCards />
            </div>
          </Tabs.Content>
          <Tabs.Content tabId={PORTFOLIO_PROJECT_TYPES.PERSONAL}>
            <div>
              <PortfolioProjectsCards />
            </div>
          </Tabs.Content>
        </div>
      </Tabs>
      {isDeleteProjectModalOpen && <DeletePersonalProjectModal />}
      {showCreatePersonalProjectModal && <CreatePersonalProjectModal />}
      {isUpdateProjectModalOpen && <UpdatePersonalProjectModal />}
    </div>
  );
};
