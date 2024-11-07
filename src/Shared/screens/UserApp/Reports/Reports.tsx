import { useTranslation } from 'react-i18next';
import { camelCase, isEmpty } from 'lodash-es';
import { Redirect } from 'react-router-dom';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { reportIconMap, reportImageMap } from '@dc/resources/constants';
import { TUserInfo as DCUserInfo } from '@dc/graphql/user/queries/userInfo';

import { TUserInfo as DLUserInfo } from '@pbl/graphql/user/queries/userInfo';

import { Kicker } from '@shared/components/Kicker';
import { ReportCard } from '@shared/components/ReportCards/ReportCard';
import { REPORTS_ORDER } from '@shared/resources/constants';
import { GOALS_REPORTS, DL_REPORTS } from '@shared/resources/constants';
import { useDetectApplicationType } from '@shared/hooks/useDetectApplicationType';
import { ReportType } from '@shared/resources/enums';

type Props = {
  userInfo: DCUserInfo | DLUserInfo;
};

const MAIN_SECTION_LENGTH = 2;

export const Reports = ({ userInfo }: Props) => {
  const { t } = useTranslation();
  const { isCareersApp, isPblApp } = useDetectApplicationType();

  const { availableReportTypes } = userInfo;

  const sortedReports = [...availableReportTypes]
    .filter(
      (reportType) =>
        isCareersApp ||
        GOALS_REPORTS.includes(reportType) ||
        (isPblApp && DL_REPORTS.includes(reportType))
    )
    .sort((a, b) => REPORTS_ORDER.indexOf(a) - REPORTS_ORDER.indexOf(b));

  const hasGoalsReports = sortedReports.some((reportType) => GOALS_REPORTS.includes(reportType));
  const hasDLReports = sortedReports.some((reportType) => DL_REPORTS.includes(reportType));

  if (isPblApp && !hasGoalsReports && !hasDLReports) {
    return <Redirect to='/' />;
  }
  const [mainReports, otherReports] = sortedReports.reduce(
    ([main, other], reportType, index) => {
      const isMainReport =
        GOALS_REPORTS.includes(reportType) ||
        (!hasGoalsReports && index + 1 <= MAIN_SECTION_LENGTH);

      isMainReport ? main.push(reportType) : other.push(reportType);

      return [main, other];
    },
    [[] as ReportType[], [] as ReportType[]]
  );

  const hasOtherReports = !isEmpty(otherReports);

  const getReportDetails = (reportName: string) => ({
    description: t(`reports.reportDescription.${reportName}`),
    title: t('reports.reportName', {
      reportName: t(`reports.reportTitle.${reportName}`),
    }),
  });

  const mainSectionTitle = hasGoalsReports ? t('reports.goals') : t('reports.reports');
  const othersSectionTitle = hasGoalsReports ? t('reports.otherReports') : t('reports.others');
  const description = hasGoalsReports
    ? t('reports.goalsDescription')
    : t('reports.reportsDescription');

  return (
    <SharedMainContent>
      <header className='text-neutral-800 mb-base xxxl:mb-md'>
        <h4 className='text-base xxxl:text-lg font-bold leading-base mb-xs xxxl:mb-sm'>
          {mainSectionTitle}
        </h4>
        <p className='text-xs xxxl:text-sm font-regular leading-lg tracking-normal mb-0'>
          {description}
        </p>
      </header>
      <div className='flex pb-base gap-sm xxxl:gap-base xxxl:pb-md'>
        {mainReports.map((reportType) => {
          const { title, description } = getReportDetails(camelCase(reportType));

          return (
            <div key={reportType} className='basis-1/2'>
              <ReportCard
                description={description}
                image={reportImageMap[reportType]}
                isBig={true}
                title={title}
                type={reportType}
              />
            </div>
          );
        })}
      </div>
      {hasOtherReports && (
        <>
          <Kicker className='xxxl:!text-xs !pb-0 !mb-sm'>{othersSectionTitle}</Kicker>
          <div className='flex gap-sm xxxl:gap-base items-stretch'>
            {otherReports.map((reportType) => {
              const { title, description } = getReportDetails(camelCase(reportType));

              return (
                <div
                  key={reportType}
                  className='min-w-[164px] basis-[200px] xxxl:min-w-[260px] xxxl:basis-[320px] min-h-[280px] grow-0'>
                  <ReportCard
                    Icon={reportIconMap[reportType]}
                    description={description}
                    title={title}
                    type={reportType}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </SharedMainContent>
  );
};
