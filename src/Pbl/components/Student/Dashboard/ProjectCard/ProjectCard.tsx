import cx from 'classnames';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TMyProjectsData } from '@pbl/graphql/student/queries/myProjects';

import { ReactComponent as CalendarIcon } from '@shared/assets/icons/calendar.svg';
import { ReactComponent as EducatorIcon } from '@shared/assets/icons/educator.svg';
import { ReactComponent as TeamIcon } from '@shared/assets/icons/projectTeam.svg';
import defaultThumbnail from '@shared/assets/images/default-thumbnail.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import SharedImage from '@shared/components/Image/Image';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import ViewButton from '@shared/components/ViewButton/ViewButton';
import { ReactComponent as ChevronIcon } from '@shared/assets/icons/chevron_right.svg';

import styles from './ProjectCard.module.sass';

type ProjectCardProps = {
  className?: string;
  project: TMyProjectsData['myProjects']['nodes'][0];
  widthConstrained: boolean;
};

const ProjectCard = ({ className, project, widthConstrained }: ProjectCardProps) => {
  const { t } = useTranslation();
  const { assignedAt, id, displayName, originator, team, thumbnailUrl } = project;
  const isTeamProject = Boolean(team);

  const metadataIconStyles = 'inline-block mr-xs';
  const metadataItemStyles = 'flex text-font-secondary gap-xxs text-xxs xxxl:text-xs';
  const wrapperStyles = cx(styles.wrapper, widthConstrained && styles.constrained, className);
  const teamInfoStyle = cx(metadataItemStyles, 'text-ellipsis whitespace-normal');

  const redirectToProject = isTeamProject ? `/teams/${team.id}/projects/${id}` : `/projects/${id}`;
  const fullOriginatorName = `${originator?.firstName} ${originator?.lastName}`;
  const assignedBy = originator
    ? t('student.dashboard.assignedProjects.assignedBy', { name: fullOriginatorName })
    : `${t('student.dashboard.assignedProjects.selfAssigned')}`;
  const assignedOn = dayjs(assignedAt).format('MMM, DD');

  const teamIconWithTooltip = (
    <DeprecatedTooltip
      message={t('student.dashboard.assignedProjects.teamProjects')}
      variant='dark'>
      <TeamIcon />
    </DeprecatedTooltip>
  );

  return (
    <Link className={wrapperStyles} to={redirectToProject}>
      <div className={styles.imageWrapper}>
        {isTeamProject && (
          <SharedIcon
            className='bg-primary-200 rounded-sm left-sm p-xs absolute top-sm'
            icon={teamIconWithTooltip}
            size='md'
          />
        )}
        <SharedImage
          alt={displayName}
          className={styles.image}
          fallbackSrc={defaultThumbnail}
          src={thumbnailUrl}
        />
      </div>
      <section className={styles.body}>
        <h6 className={styles.title}>{displayName}</h6>
        <div className={styles.metadata}>
          <span className={metadataItemStyles}>
            <SharedIcon className={metadataIconStyles} icon={<EducatorIcon />} size='xs' />
            <span>{assignedBy}</span>
          </span>
          <span className={metadataItemStyles}>
            <SharedIcon className={metadataIconStyles} icon={<CalendarIcon />} size='xs' />
            <span>{t('student.dashboard.assignedProjects.assignedOn', { date: assignedOn })}</span>
          </span>
          {isTeamProject && (
            <span className={teamInfoStyle}>
              <SharedIcon className={metadataIconStyles} icon={<TeamIcon />} size='xs' />
              <span className={styles.teamName}>
                {t('teams.teamWithName', { name: team.name })}
              </span>
            </span>
          )}
        </div>
        <ViewButton Icon={ChevronIcon} className={styles.button}>
          {t('student.dashboard.assignedProjects.viewProject')}
        </ViewButton>
      </section>
    </Link>
  );
};

export default ProjectCard;
