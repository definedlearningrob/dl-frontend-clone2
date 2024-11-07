import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { Roles } from '@pbl/resources/enums';
import { roleAllowed } from '@pbl/utils/roleAllowed';

import Button from '@shared/components/Button/Button';
import Card from '@shared/components/Card/Card';
import { ReactComponent as BookedOpened } from '@shared/svg/book_open_with_page.svg';

const LibrarySection = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const libraryAllowedRoles = [Roles.ENTITY_ADMIN, Roles.TEACHER];

  const goToLibrary = () => history.push('/library/checkins');

  if (!roleAllowed(libraryAllowedRoles)) return null;

  return (
    <Card>
      <div className='flex gap-base xxxl:gap-md items-start xxxl:items-center'>
        <div className='w-[96px] xxxl:w-[168px] flex-shrink-0 rounded-base bg-neutral-200 p-sm xxxl:p-md'>
          <BookedOpened className='w-full h-full text-neutral-400' />
        </div>
        <div>
          <h5 className='text-sm mb-xxs xxxl:mb-xs'>{t('project.checkIns.libraryCard.heading')}</h5>
          <p className='text-xs text-font-secondary mb-sm'>
            {t('project.checkIns.libraryCard.paragraph')}
          </p>
          <Button className='w-full' variant='primary' onClick={goToLibrary}>
            {t('project.checkIns.libraryCard.goToLibrary')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LibrarySection;
