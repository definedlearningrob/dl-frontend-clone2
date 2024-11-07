import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import { removeFromCache } from '@dc/utils/graphql';
import deleteResumeMutation from '@dc/graphql/student/mutations/deleteResume';

import { StudentPortfolioResumeItem } from '@shared/components/PortfolioResume/Item/Item';
import { ResumeUploadModal } from '@shared/components/PortfolioResume/UploadModal/UploadModal';
import '@shared/components/PortfolioResume/PortfolioResume.module.sass';
import { usePortfolioContext } from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { DeleteModal } from '@shared/components/PortfolioResume/DeleteModal';
import { TStudentPortfolioResume } from '@shared/graphql/user/query/studentPortfolioResumes';
import { callToast } from '@shared/components/Toaster/Toaster';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';
import { handleError } from '@shared/utils/handleError';
import { TExternalResumes } from '@shared/resources/types';

type Props = {
  resumes?: TExternalResumes[];
};

const ExternalResume = ({ resumes }: Props) => {
  const { t } = useTranslation();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<TStudentPortfolioResume>();
  const { isUser } = usePortfolioContext();

  const toggleModal = () => setModalVisibility(!isModalVisible);

  const setDeleteModal = (resume: TStudentPortfolioResume) => {
    setResumeToDelete(resume);
  };

  const [deleteResume] = useMutation(deleteResumeMutation);
  const handleDelete = async () => {
    if (resumeToDelete) {
      const { id } = resumeToDelete;
      try {
        await deleteResume({
          variables: { input: { id } },
          update: removeFromCache(id, 'ExternalResume'),
        });

        setResumeToDelete(undefined);
        callToast(
          'success',
          t('notifications.success.deleted', { name: t('portfolioResume.heading') })
        );
      } catch (error) {
        setResumeToDelete(undefined);
        handleError(error);
      }
    }
  };

  if (!resumes) return null;

  return (
    <>
      <div className='flex items-center mb-xs pt-base'>
        <h6 className='text-xs xxxl:text-sm mb-0 text-neutral-800 font-bold leading-md'>
          {t('portfolioResume.resumesOldFilesTitle')}
        </h6>
        <Tooltip delayDuration={300} message={t('portfolioResume.resumesOldFilesMessage')}>
          <IconContainer Icon={InfoIcon} className='text-primary-500' size='sm' />
        </Tooltip>
        <div className='w-full border-0 border-b border-neutral-300' />
      </div>
      <div>
        <ul className='flex flex-col gap-x mb-base last-of-type:mb-0'>
          {resumes.map((resume) => (
            <StudentPortfolioResumeItem
              key={resume.id}
              resume={resume}
              showDeleteButton={!isUser}
              onDelete={() => setDeleteModal(resume)}
            />
          ))}
        </ul>
      </div>
      {resumeToDelete && (
        <DeleteModal
          closeModal={() => setResumeToDelete(undefined)}
          resumeToDelete={resumeToDelete}
          onDelete={handleDelete}
        />
      )}
      {isModalVisible && <ResumeUploadModal closeModal={toggleModal} />}
    </>
  );
};

export default ExternalResume;
