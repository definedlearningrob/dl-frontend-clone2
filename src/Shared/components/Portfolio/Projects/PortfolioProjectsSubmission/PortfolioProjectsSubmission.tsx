import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { PortfolioProjectType, TPortfolioSubmission } from '@shared/components/Portfolio/types';
import SharedButton from '@shared/components/Button/Button';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';

import { PortfolioProjectsSubmissionModal } from './PortfolioProjectsSubmissionModal';

type ProjectSubmissionType = {
  currentUserUuid?: string;
  modalVisible: boolean;
  submission: TPortfolioSubmission;
  teamSubmission: boolean;
  toggleModal: () => void;
  type: PortfolioProjectType;
};

const ProjectSubmission = ({
  currentUserUuid,
  modalVisible,
  submission,
  teamSubmission,
  toggleModal,
  type,
}: ProjectSubmissionType) => {
  const { t } = useTranslation();
  const noFiles = isEmpty(submission?.files);
  const showButton = type !== PortfolioProjectType.OPPORTUNITY && !noFiles;

  return (
    <>
      {showButton && (
        <SharedButton
          Icon={ChevronRightIcon}
          className='!pl-0'
          iconPlacement='end'
          size='sm'
          variant='link'>
          <span>{t('portfolioProjects.showFiles')}</span>
        </SharedButton>
      )}
      {modalVisible && (
        <PortfolioProjectsSubmissionModal
          currentUserUuid={currentUserUuid}
          files={submission.files}
          teamSubmission={teamSubmission}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
};

export default ProjectSubmission;
