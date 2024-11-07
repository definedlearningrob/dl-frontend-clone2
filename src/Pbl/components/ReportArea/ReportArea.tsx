import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { roleAllowed } from '@pbl/utils/roleAllowed';
import { ReactComponent as NoReportsIcon } from '@pbl/svg/empty_no-reports.svg';
import { libraryAllowedRoles } from '@pbl/resources/roleGuard';

import ProjectCard from '@shared/components/Card/Card';

import styles from './ReportArea.module.sass';

type Props = { isFullWidth?: boolean; isStudentViewFullWidth?: boolean };

const DashboardReportArea = ({ isFullWidth = false, isStudentViewFullWidth = false }: Props) => {
  const { t } = useTranslation();
  const containerClasses = cx(styles.container, {
    [styles.reportAreaContainer]: roleAllowed(libraryAllowedRoles),
    [styles.fullWidth]: isFullWidth,
    [styles.studentViewFullWidth]: isStudentViewFullWidth,
  });

  return (
    <ProjectCard className={containerClasses}>
      <ProjectCard.Header>
        <ProjectCard.Title size='small'>{t('user.myProjects.reportAreaHeader')}</ProjectCard.Title>
      </ProjectCard.Header>
      <ProjectCard.Body className={styles.body}>
        <NoReportsIcon />
        <h4 className={styles.heading}>{t('dashboard.reportArea.noDataTitle')}</h4>
        <p className={styles.subHeading}>{t('dashboard.reportArea.noDataDescription')}</p>
      </ProjectCard.Body>
    </ProjectCard>
  );
};

export default DashboardReportArea;
