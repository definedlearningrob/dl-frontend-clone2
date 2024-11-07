import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const UserProjectClassroom = () => {
  const { t } = useTranslation();
  const classroomRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className='rounded-lg border border-solid border-primary-500 text-primary-500 py-sm px-md flex justify-center items-center mt-sm'
      data-testid='share-container'>
      <div ref={classroomRef} id='widget-div' />
      <div className='flex justify-center items-center ml-sm'>
        {t('user.project.classroomButton')}
      </div>
    </div>
  );
};

export default UserProjectClassroom;
