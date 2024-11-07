import { useTranslation } from 'react-i18next';
import { ChangeEvent, FC, SVGProps, useState } from 'react';

import { TabCard } from '@dc/components/Admin/Entity/TabCard';
import { ReactComponent as ReviewSurveyIcon } from '@dc/assets/icons/experiencesSummary.svg';
import { ReactComponent as OpportunitiesIcon } from '@dc/assets/icons/match.svg';
import { ReactComponent as CareerPathwayIcon } from '@dc/assets/icons/pathway.svg';
import { TEntity } from '@dc/graphql/user/queries/entity';
import { ReportModal } from '@dc/components/Admin/Entity/Reports/Modal/ReportModal';

import { ReactComponent as CertificateIcon } from '@shared/assets/icons/certificate.svg';
import { ReactComponent as CollegeIcon } from '@shared/assets/icons/building.svg';
import { ReactComponent as AssesmentsIcon } from '@shared/assets/icons/list-task-graduate-hat.svg';
import { ReactComponent as GoalPerformanceIcon } from '@shared/assets/icons/bar_graph.svg';
import { ReactComponent as GoalsIcon } from '@shared/assets/icons/sport-cup.svg';
import { ToggleSwitchTile } from '@shared/components/ToggleSwitchTile';
import { ReportType } from '@shared/resources/enums';

type Props = {
  entity: TEntity;
};

type GoalsCheckboxes = {
  description?: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  name: string;
  reportType: ReportType;
};

export type GoalToModify = {
  value: boolean;
  name: string;
  reportType: ReportType;
};

export const Reports = ({ entity }: Props) => {
  const { t } = useTranslation();

  const [goalToModify, setGoalToModify] = useState<GoalToModify | null>(null);

  const closeModal = () => setGoalToModify(null);
  const goals: GoalsCheckboxes[] = [
    {
      description: t('admin.entities.goals.studentGoalsDescription'),
      icon: CertificateIcon,
      name: t('reports.goalsReportName', {
        reportName: t(`reports.reportName`, {
          reportName: t(`reports.reportTitle.goalPlans`),
        }),
      }),
      reportType: ReportType.GOAL_PLANS,
    },
    {
      description: t('admin.entities.goals.goalPerformanceDescription'),
      icon: GoalPerformanceIcon,
      name: t('reports.goalsReportName', {
        reportName: t(`reports.reportName`, {
          reportName: t('reports.reportTitle.goalPerformanceIndicators'),
        }),
      }),
      reportType: ReportType.GOAL_PERFORMANCE_INDICATORS,
    },
    {
      description: t('admin.entities.goals.reviewSurveyDescription'),
      icon: ReviewSurveyIcon,
      name: t('reports.reportName', { reportName: t(`reports.reportTitle.careerReviewSurvey`) }),
      reportType: ReportType.CAREER_REVIEW_SURVEY,
    },
    {
      description: t('admin.entities.goals.assessmentDescription'),
      icon: AssesmentsIcon,
      name: t('reports.reportName', { reportName: t(`reports.reportTitle.assessment`) }),
      reportType: ReportType.ASSESSMENT,
    },
    {
      description: t('admin.entities.goals.collegeDescription'),
      icon: CollegeIcon,
      name: t('reports.reportName', { reportName: t(`reports.reportTitle.collegeAndFuture`) }),
      reportType: ReportType.COLLEGE_AND_FUTURE,
    },
    {
      description: t('admin.entities.goals.opportunitiesDescription'),
      icon: OpportunitiesIcon,
      name: t('reports.reportName', { reportName: t(`reports.reportTitle.opportunities`) }),
      reportType: ReportType.OPPORTUNITIES,
    },
    {
      description: t('admin.entities.goals.pathwayDescription'),
      icon: CareerPathwayIcon,
      name: t('reports.reportName', { reportName: t(`reports.reportTitle.careerPathway`) }),
      reportType: ReportType.CAREER_PATHWAY,
    },
  ];

  const toggleGoal = (event: ChangeEvent<HTMLInputElement>, reportType: ReportType) => {
    const { name, checked } = event.target;

    setGoalToModify({ name, value: checked, reportType });
  };

  return (
    <>
      <TabCard
        description={t('admin.entities.tabs.reportsDescription')}
        icon={GoalsIcon}
        title={t('admin.entities.tabs.reports')}>
        <div className='flex flex-col gap-sm'>
          {goals.map((goal) => (
            <ToggleSwitchTile
              key={goal.name}
              Icon={goal.icon}
              description={goal.description}
              isEnabled={entity.reportTypes.includes(goal.reportType)}
              name={goal.name}
              title={goal.name}
              onChange={(event) => toggleGoal(event, goal.reportType)}
            />
          ))}
          {goalToModify && (
            <ReportModal entity={entity} goalToModify={goalToModify} onClose={closeModal} />
          )}
        </div>
      </TabCard>
    </>
  );
};
