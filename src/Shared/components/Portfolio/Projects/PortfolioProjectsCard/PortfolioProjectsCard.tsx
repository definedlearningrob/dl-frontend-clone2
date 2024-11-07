import { useEffect } from 'react';
import { useToggle } from 'react-use';
import { isEmpty } from 'lodash-es';

import { TPortfolioProject } from '@shared/components/Portfolio/types';
import { StudentInfo } from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { cx } from '@shared/utils/cx';
import useQueryParams from '@shared/hooks/useQueryParams';

import ProjectSubmission from '../PortfolioProjectsSubmission';

import { PortfolioProjectsCardHeader } from './PortfolioProjectsCardHeader';
import { PortfolioProjectsCardImage } from './PortfolioProjectsCardImage';
import { TruncatedText } from './TruncatedText';

type Props = {
  project: TPortfolioProject;
  studentInfo: StudentInfo;
  className?: string;
  isEditing?: boolean;
  tab?: string;
};

export const PortfolioProjectsCard = ({
  project,
  studentInfo,
  className,
  isEditing = false,
  tab,
}: Props) => {
  const {
    description,
    id,
    imageUrl,
    name,
    isTeamSubmission,
    parentName,
    submission,
    finishedAt,
    thumbnailUrl,
    type,
  } = project;

  const [modalVisible, toggleModal] = useToggle(false);
  const noFiles = isEmpty(submission?.files);

  useEffect(() => {
    noFiles && modalVisible && toggleModal(!modalVisible);
  }, [submission?.files]);

  const {
    params: { evidence, focusTab },
  } = useQueryParams<{
    evidence: string;
    focusTab: string;
  }>();

  const focusClasses =
    evidence === id && tab === focusTab ? 'border border-primary-500 shadow-300' : '';

  const projectWrapperClassName = cx(
    'flex gap-sm xxxl:gap-base bg-white rounded-sm text-font-primary',
    focusClasses,
    { 'cursor-pointer hover:bg-neutral-200 group/portfolio-project-card': !isEditing },
    className
  );

  return (
    <div
      className={projectWrapperClassName}
      data-testid='portfolio-project-card'
      onClick={toggleModal}>
      <div className='wrapper-header basis-[178px] xxxl:basis-[240px] shrink-0'>
        <PortfolioProjectsCardImage
          imageUrl={imageUrl}
          teamSubmission={isTeamSubmission}
          thumbnailUrl={thumbnailUrl}
          type={type}
        />
      </div>
      <div className='grow'>
        <PortfolioProjectsCardHeader
          name={name}
          parentName={parentName}
          personalProjectId={id}
          projectId={id}
          submittedAt={finishedAt}
          type={type}
        />
        <TruncatedText text={description} />
        <ProjectSubmission
          currentUserUuid={studentInfo.uuid}
          modalVisible={modalVisible}
          submission={submission}
          teamSubmission={isTeamSubmission}
          toggleModal={toggleModal}
          type={type}
        />
      </div>
    </div>
  );
};
