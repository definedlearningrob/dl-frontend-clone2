import { compact } from 'lodash-es';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { ModuleCard } from '@dc/screens/StudentApp/Dashboard/ModuleCard/ModuleCard';

import { ReactComponent as EditIcon } from '@shared/assets/icons/edit.svg';
import { ReactComponent as PortfolioIcon } from '@shared/assets/icons/portfolio.svg';
import { ReactComponent as PieChartIcon } from '@shared/assets/icons/pie_chart_outline.svg';
import { ReactComponent as OpportunitiesIcon } from '@shared/assets/icons/match.svg';
import { ReactComponent as VirtualInternshipIcon } from '@shared/assets/icons/laptop.svg';
import { ReactComponent as PostSecondaryIcon } from '@shared/assets/icons/building.svg';
import { ReactComponent as ApplicationsIcon } from '@shared/assets/icons/list-task-graduate-hat.svg';

type Props = {
  hasOpportunitiesEnabled: boolean;
  hasPostSecondaryApplicationsEnabled: boolean;
};

export const ModuleLinks = ({
  hasOpportunitiesEnabled,
  hasPostSecondaryApplicationsEnabled,
}: Props) => {
  const { t } = useTranslation();

  const modules = compact([
    {
      primaryAction: {
        Icon: PortfolioIcon,
        path: '/portfolio',
        text: t('student.dashboard.portfolioDescription'),
        title: t('student.dashboard.portfolioTitle'),
      },
      secondaryAction: {
        Icon: EditIcon,
        path: '/portfolio/edit',
        text: t('student.dashboard.editResumeDescription'),
        title: t('student.dashboard.editResumeTitle'),
      },
    },
    {
      primaryAction: {
        Icon: PieChartIcon,
        path: '/portfolio/experiences',
        text: t('student.dashboard.experiencesDescription'),
        title: t('student.dashboard.experiencesTitle'),
      },
    },
    hasOpportunitiesEnabled && {
      primaryAction: {
        Icon: OpportunitiesIcon,
        path: '/opportunities',
        text: t('student.dashboard.opportunitiesDescription'),
        title: t('student.dashboard.opportunitiesTitle'),
      },
      secondaryAction: {
        Icon: VirtualInternshipIcon,
        path: '/opportunities?typeIn[]=VIRTUAL_INTERNSHIP',
        text: t('student.dashboard.virtualInternshipsDescription'),
        title: t('student.dashboard.virtualInternshipsTitle'),
      },
    },
    {
      primaryAction: {
        Icon: PostSecondaryIcon,
        path: '/post-secondary',
        text: t('student.dashboard.postSecondaryDescription'),
        title: t('student.dashboard.postSecondaryTitle'),
      },
      ...(hasPostSecondaryApplicationsEnabled && {
        secondaryAction: {
          Icon: ApplicationsIcon,
          path: '/post-secondary/manage-applications',
          text: t('student.dashboard.manageApplicationsDescription'),
          title: t('student.dashboard.manageApplicationsTitle'),
        },
      }),
    },
  ]);

  return (
    <div
      className={cx('h-full grid gap-x xxxl:gap-base z-0', {
        'grid-cols-4': hasOpportunitiesEnabled,
        'grid-cols-3': !hasOpportunitiesEnabled,
      })}>
      {modules.map((module) => (
        <ModuleCard
          key={module.primaryAction.title}
          primaryAction={module.primaryAction}
          secondaryAction={module.secondaryAction}
        />
      ))}
    </div>
  );
};
