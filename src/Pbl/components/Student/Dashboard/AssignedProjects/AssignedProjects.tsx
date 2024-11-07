import cx from 'classnames';
import { PropsWithChildren, RefObject, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import ProjectCard from '@pbl/components/Student/Dashboard/ProjectCard/ProjectCard';
import { type TMyProjectsData } from '@pbl/graphql/student/queries/myProjects';
import useUserInfo from '@pbl/hooks/useUserInfo';

import SharedCarousel from '@shared/components/Carousel/Carousel';
import { WelcomeMessage } from '@shared/components/WelcomeMessage';
import { useResizeWidthObserver } from '@shared/hooks/useResizeWidthObserver';

import styles from './AssignedProjects.module.sass';
import NoProjects from './NoProjects/NoProjects';

type AssignedProjectsProps = {
  projects?: TMyProjectsData['myProjects']['nodes'];
  contentWrapperRef: RefObject<HTMLDivElement>;
};

const GAP_OFFSET = 8;
const MAX_CARDS_CONTAINER = 4;

const CardsList = ({ children }: PropsWithChildren<{}>) => (
  <div className={styles.list}>{children}</div>
);

const AssignedProjects = ({ projects, contentWrapperRef }: AssignedProjectsProps) => {
  const cardIsWidthConstrained = (projects?.length || 0) > 4;
  const cardsContainerClass = cx(cardIsWidthConstrained && styles.customCard);
  const {
    userInfo: { welcomeMessage },
  } = useUserInfo();
  const { t } = useTranslation();
  const nameRef = useRef(null);

  const userNameWidth = useResizeWidthObserver(nameRef);
  const welcomeMessageWidth = useResizeWidthObserver(contentWrapperRef);

  const parsedData = projects?.map((project) => {
    const projectCardKey = project.team ? `${project.id}-team` : project.id;

    return (
      <ProjectCard
        key={projectCardKey}
        className={cardsContainerClass}
        project={project}
        widthConstrained={cardIsWidthConstrained}
      />
    );
  });

  const renderProperData = () => {
    if (!projects?.length) {
      return <NoProjects />;
    }

    if (projects?.length <= MAX_CARDS_CONTAINER) {
      return <CardsList>{parsedData}</CardsList>;
    }

    return <SharedCarousel data={parsedData} />;
  };

  return (
    <section className={styles.wrapper}>
      <div className='flex items-center gap-xs'>
        <h2 ref={nameRef} className={styles.heading}>
          {t('student.dashboard.assignedProjects.label')}
        </h2>
        {welcomeMessage && (
          <WelcomeMessage
            leftOffset={-userNameWidth - GAP_OFFSET}
            welcomeMessage={welcomeMessage}
            width={welcomeMessageWidth}
          />
        )}
      </div>
      <p className={styles.subHeading}>{t('student.dashboard.assignedProjects.description')}</p>
      {renderProperData()}
    </section>
  );
};

export default AssignedProjects;
