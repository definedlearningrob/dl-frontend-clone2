import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';
import { PresentationTypes } from '@graphql/dc/shared/types';

import Details from '@pbl/components/Project/Details/Details';
import ExternalPresentation from '@pbl/components/Project/ExternalPresentation/ExternalPresentation';
import { ProjectFiles } from '@pbl/components/Project/Files/Files';
import Overview from '@pbl/components/Project/Overview/Overview';
import ProjectPresentation from '@pbl/components/Project/Presentation/Presentation';
import UserProjectSettings from '@pbl/components/User/Project/Settings/Settings';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { ProjectTabs } from '@pbl/components/Project/Tabs/Tabs';
import { TProject } from '@pbl/graphql/user/queries/project';
import { PROJECT_USER_TYPES } from '@pbl/resources/enums';

import { useLti } from '@shared/components/LtiProvider/LtiProvider';
import { ContentStatusesTypes } from '@shared/resources/enums';
import SharedTabs from '@shared/components/DeprecatedTabs/DeprecatedTabs';
import { cx } from '@shared/utils/cx';

import ProjectHeader from './Header/Header';
import Share from './Share/Share';

import './Project.sass';

type Props = {
  lessonTitle?: string;
  project: TProject;
};

function UserProject({
  lessonTitle,
  project: {
    checkInGroups,
    checkInQuestions,
    checkInsGradingNeededCount,
    copies,
    courses,
    description,
    displayName,
    files,
    id,
    introduction,
    presentation,
    presentationUrl,
    sharedResource,
    status,
    studentResources,
    submissionsGradingNeededCount,
    teachingResources,
    units,
  },
}: Props) {
  const { t } = useTranslation();
  const { state } = useLocation<{ isEditing: boolean; tabId: string }>();
  const { isOwner, toggleEditMode, editMode } = useCustomizeProject();
  const { isLtiSearch } = useLti();
  const { productId } = useParams<{ productId?: string }>();
  const history = useHistory();
  const isCustomPresentationVisible =
    presentation && presentation.status === ContentStatusesTypes.PUBLISHED;
  const hasCustomPresentationInDraft =
    presentation && presentation.status === ContentStatusesTypes.DRAFT;

  const tabs = useMemo(
    () =>
      Object.values(ProjectTabs)
        .filter((tab) => !isEmpty(courses) || tab !== ProjectTabs.DEFINED_CAREERS)
        .map((tab) => ({
          label: t(`project.${tab}`),
          id: tab,
        })),
    [ProjectTabs]
  );

  const hasCopies = copies && copies.length > 0;
  const canBeCopied =
    status === 'PUBLISHED' &&
    (presentation ? presentation.status === ContentStatusesTypes.PUBLISHED : true);

  const properPresentation = useMemo(
    () =>
      isCustomPresentationVisible ? (
        <ProjectPresentation presentation={presentation} projectId={id} />
      ) : (
        <ExternalPresentation
          hasDraftStatePresentation={hasCustomPresentationInDraft}
          presentationUrl={presentationUrl}
        />
      ),
    [presentation, presentationUrl]
  );
  const shouldShowShare = !isLtiSearch && !productId;
  const shouldShowProjectFiles = !isEmpty(files) || editMode;

  useEffect(() => {
    if (state?.isEditing || state?.tabId) {
      toggleEditMode();
      history.replace({ state: {} });
    }
  }, []);

  return (
    <section className='user-project'>
      <ProjectHeader
        canBeCopied={canBeCopied}
        displayName={displayName}
        hasCopies={hasCopies}
        lessonTitle={lessonTitle}
      />
      {!isOwner && properPresentation}
      <div className='user-project__body'>
        <div className='user-project__body-left'>
          {isOwner && properPresentation}
          <article className='user-project__content'>
            <SharedTabs defaultTabId={state?.tabId} tabs={tabs}>
              <SharedTabs.Tabs className='user-project__tabs' />
              <Details
                checkInGroups={checkInGroups}
                checkInQuestions={checkInQuestions}
                courses={courses}
                introduction={introduction}
                projectName={displayName}
                studentResources={studentResources}
                teachingResources={teachingResources}
                type={PROJECT_USER_TYPES.USER}
              />
            </SharedTabs>
          </article>
        </div>
        <div
          className={cx('user-project__body-right', {
            '!basis-1/4': presentation?.type === PresentationTypes.FULL_SCREEN,
          })}>
          {isOwner && (
            <UserProjectSettings
              checkinsToGrade={checkInsGradingNeededCount}
              displayName={displayName}
              hasCopies={hasCopies}
              status={status}
              submissionsToGrade={submissionsGradingNeededCount}
            />
          )}
          <article className='user-project__additional-info'>
            <Overview
              checkinsToGrade={checkInsGradingNeededCount}
              description={description}
              submissionsToGrade={submissionsGradingNeededCount}
              units={units}
            />
            {shouldShowShare && <Share sharedResource={sharedResource} status={status} />}
            {shouldShowProjectFiles && <ProjectFiles files={files} isEditing={editMode} />}
          </article>
        </div>
      </div>
    </section>
  );
}

export default UserProject;
