/* eslint-disable react/no-danger */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { StandardSet } from '@graphql/dl/public/types';
import { PresentationTypes } from '@graphql/dc/shared/types';

import Details from '@pbl/components/Project/Details/Details';
import ExternalPresentation from '@pbl/components/Project/ExternalPresentation/ExternalPresentation';
import { ProjectFiles } from '@pbl/components/Project/Files/Files';
import Overview from '@pbl/components/Project/Overview/Overview';
import ProjectPresentation from '@pbl/components/Project/Presentation/Presentation';
import { ProjectTabs } from '@pbl/components/Project/Tabs/Tabs';
import { TProject } from '@pbl/graphql/public/queries/project';
import { PROJECT_USER_TYPES } from '@pbl/resources/enums';

import SharedTabs from '@shared/components/DeprecatedTabs/DeprecatedTabs';
import { ContentStatusesTypes } from '@shared/resources/enums';

import '@pbl/components/User/Project/Project.sass';

// NOTE: styles are supplied from '@pbl/components/User/Project/Project.sass'

type Props = {
  lessonTitle?: string;
  project: TProject;
  isUser: boolean;
  standardSets: StandardSet[];
};

function UserProject({
  lessonTitle,
  project: {
    checkInGroups,
    checkInQuestions,
    courses,
    displayName,
    description,
    files,
    id,
    introduction,
    presentation,
    presentationUrl,
    studentResources,
    teachingResources,
    units,
  },
  standardSets,
  isUser,
}: Props) {
  const hasOptionalSections = introduction || studentResources || teachingResources;
  const isCustomPresentationVisible =
    presentation && presentation.status === ContentStatusesTypes.PUBLISHED;
  const { t } = useTranslation();

  const tabs = useMemo(
    () =>
      Object.values(ProjectTabs)
        .filter((tab) => {
          const isHiddenStandardsTab = tab === ProjectTabs.STANDARDS && !isUser;
          const isEmptyCoursesTab = isEmpty(courses) && tab === ProjectTabs.DEFINED_CAREERS;

          return !isHiddenStandardsTab && !isEmptyCoursesTab;
        })
        .map((tab) => ({ label: t(`project.${tab}`), id: tab })),
    [ProjectTabs]
  );

  const properPresentation = useMemo(
    () =>
      isCustomPresentationVisible ? (
        <ProjectPresentation presentation={presentation} projectId={id} taskName={displayName} />
      ) : presentationUrl ? (
        <ExternalPresentation hasDraftStatePresentation={false} presentationUrl={presentationUrl} />
      ) : null,
    [presentation, presentationUrl]
  );

  const isBigPresentation = presentation && presentation?.type === PresentationTypes.FULL_SCREEN;

  return (
    <section className='user-project'>
      {!isBigPresentation && (
        <>
          <h2 className='user-project__subheading'>{lessonTitle}</h2>
          <h1 className='user-project__heading !mb-sm'>{displayName}</h1>
        </>
      )}
      {properPresentation}
      {!isBigPresentation && (
        <div className='user-project__cards-container'>
          <article>
            <SharedTabs tabs={tabs}>
              <>
                <SharedTabs.Tabs />
                <Details
                  checkInGroups={checkInGroups}
                  checkInQuestions={checkInQuestions}
                  courses={courses}
                  introduction={introduction}
                  projectName={displayName}
                  standardSets={standardSets}
                  studentResources={studentResources}
                  teachingResources={isUser ? teachingResources : undefined}
                  type={PROJECT_USER_TYPES.PUBLIC}
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
}

export default UserProject;
