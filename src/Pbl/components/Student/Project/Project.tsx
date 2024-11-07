import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useApolloClient } from '@apollo/client';
import { PresentationTypes } from '@graphql/dc/shared/types';

import Details from '@pbl/components/Project/Details/Details';
import ExternalPresentation from '@pbl/components/Project/ExternalPresentation/ExternalPresentation';
import { ProjectFiles } from '@pbl/components/Project/Files/Files';
import Overview from '@pbl/components/Project/Overview/Overview';
import ProjectPresentation from '@pbl/components/Project/Presentation/Presentation';
import { ProjectTabs } from '@pbl/components/Project/Tabs/Tabs';
import { TProject } from '@pbl/graphql/student/fragments/projectFragment';
import { CONVERSATION_CONTEXT_TYPES } from '@pbl/resources/constants';
import { PROJECT_USER_TYPES } from '@pbl/resources/enums';

import { RECEIVER_TYPES } from '@shared/resources/constants';
import { ContentStatusesTypes } from '@shared/resources/enums';
import { ReactComponent as TeamIcon } from '@shared/assets/icons/projectTeam.svg';
import { ReactComponent as IndividualProjectIcon } from '@shared/assets/icons/individual_project_icon.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import SharedTabs from '@shared/components/DeprecatedTabs/DeprecatedTabs';
import { useMessaging } from '@shared/hooks/useMessaging';
import '@pbl/components/User/Project/Project.sass';
import { cx } from '@shared/utils/cx';

import styles from './Project.module.sass';
import { NoPresentation } from './NoPresentation';

type Props = {
  project: TProject;
};

const StudentProject = ({
  project: {
    assignedAt,
    checkInGroups,
    checkInQuestions,
    courses,
    description,
    displayName,
    files,
    id,
    introduction,
    presentation,
    presentationUrl,
    studentResources,
    team,
    units,
  },
}: Props) => {
  const { t } = useTranslation();
  const { setMessagingState, messagingState } = useMessaging();
  const { cache } = useApolloClient();

  const hasOptionalSections = introduction || studentResources;
  const isTeamProject = !!team;

  const isBigPresentation = presentation?.type === PresentationTypes.FULL_SCREEN;

  const isCustomPresentationVisible = presentation;
  const headingIcon = isTeamProject ? <TeamIcon /> : <IndividualProjectIcon />;

  useEffect(() => {
    setMessagingState({
      ...messagingState,
      ...(isTeamProject && {
        receiver: { teamName: team.name, uuid: team.uuid },
        receiverType: RECEIVER_TYPES.TEAM,
      }),
      context: {
        id,
        title: 'TASK',
        subtitle: displayName,
        type: CONVERSATION_CONTEXT_TYPES.TASK,
      },
    });

    return () => {
      setMessagingState({
        ...messagingState,
        context: null,
        receiver: null,
        receiverType: undefined,
      });
    };
  }, []);

  // For now we need to clear on the mount products field of task
  // in case that we accessed it from the same task but in other context (team)
  useEffect(() => {
    cache.evict({
      id: cache.identify({
        __typename: 'Task',
        id: id,
      }),
      fieldName: 'products',
    });
  }, []);

  const tabs = useMemo(
    () =>
      Object.values(ProjectTabs)
        .filter((tab) => {
          const isStandardsTab = tab === ProjectTabs.STANDARDS;
          const isEmptyCoursesTab = isEmpty(courses) && tab === ProjectTabs.DEFINED_CAREERS;

          return !isStandardsTab && !isEmptyCoursesTab;
        })
        .map((tab) => ({ label: t(`project.${tab}`), id: tab })),
    [ProjectTabs]
  );

  const properPresentation = useMemo(() => {
    if (isCustomPresentationVisible) {
      return <ProjectPresentation presentation={presentation} projectId={id} />;
    }

    if (presentationUrl) {
      return (
        <ExternalPresentation hasDraftStatePresentation={false} presentationUrl={presentationUrl} />
      );
    }

    return null;
  }, [isCustomPresentationVisible, presentation, presentationUrl, id, displayName, team?.name]);

  const hasPresentation =
    (!isCustomPresentationVisible && presentationUrl) ||
    presentation?.status === ContentStatusesTypes.PUBLISHED;

  return (
    <section
      className={cx('user-project', {
        'h-full': isBigPresentation,
      })}>
      {!isBigPresentation && (
        <div className={styles.headingWrapper}>
          <SharedIcon className={styles.teamIcon} icon={headingIcon} size='lg' />
          <div className={styles.headingTextWrapper}>
            {displayName && <h1 className={styles.studentHeading}>{displayName}</h1>}
            {isTeamProject && (
              <div className={styles.teamNameWrapper}>
                <SharedIcon className={styles.smallTeamIcon} icon={<TeamIcon />} size='sm' />
                <p className={styles.teamName}>
                  {t('teams.team')}:<span className={styles.name}>{team?.name}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {hasPresentation ? properPresentation : <NoPresentation />}
      {!isBigPresentation && (
        <div className='user-project__cards-container'>
          <article>
            <SharedTabs tabs={tabs}>
              <>
                <SharedTabs.Tabs />
                <Details
                  assignedAt={assignedAt}
                  checkInGroups={checkInGroups}
                  checkInQuestions={checkInQuestions}
                  courses={courses}
                  introduction={introduction}
                  projectName={displayName}
                  studentResources={studentResources}
                  team={team}
                  type={PROJECT_USER_TYPES.STUDENT}
                />
              </>
            </SharedTabs>
          </article>
          <article className='user-project__additional-info'>
            {hasOptionalSections && <Overview description={description} units={units} />}
            {!isEmpty(files) && <ProjectFiles files={files} isEditing={false} />}
          </article>
        </div>
      )}
    </section>
  );
};

export default StudentProject;
