import { useTranslation } from 'react-i18next';

import SharedEmptyContainerPlaceholder from '@dc/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';
import SharedFileExtensionIcon from '@dc/shared/FileExtensionIcon/FileExtensionIcon';
import { shapeResume } from '@dc/resources/typeDefs';
import '@dc/components/Portfolio/Resume/Resume.sass';

import SharedIcon from '@shared/components/Icon/Icon';

UserStudentResume.propTypes = {
  resume: shapeResume,
};

function UserStudentResume({ resume }) {
  const { t } = useTranslation();

  return (
    <div className='portfolio-resume'>
      <header className='portfolio-resume__header'>
        <h3 className='portfolio-resume__heading'>{t('portfolio.resume.heading')}</h3>
      </header>
      {resume ? (
        <div className='portfolio-resume-item' data-testid='portfolio-resume-item'>
          <SharedIcon icon={<SharedFileExtensionIcon filename={resume.filename} />} size='sm' />
          <a
            className='portfolio-resume-item__name'
            download={resume.filename}
            href={resume.url}
            rel='noopener noreferrer'
            target='_blank'>
            {resume.filename}
          </a>
        </div>
      ) : (
        <SharedEmptyContainerPlaceholder message={t('portfolio.resume.empty')} />
      )}
    </div>
  );
}

export default UserStudentResume;
