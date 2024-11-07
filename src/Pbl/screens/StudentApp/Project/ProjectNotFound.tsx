import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { MainContent } from '@shared/components/MainContent/MainContent';
import Card from '@shared/components/Card/Card';
import SharedImage from '@shared/components/Image/Image';
import EmptyData from '@shared/assets/images/empty_data_text_with_search.png';
import Button from '@shared/components/Button/Button';

export const ProjectNotFound = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <MainContent className='h-[theme(layout.containerHeight)] flex justify-center items-center'>
      <Card className='w-1/2'>
        <div className='flex justify-center items-center h-[400px] xxxl:h-[500px]'>
          <div className='flex flex-col items-center gap-xs xxxl:gap-sm text-center text-neutral-800 w-[320px] xxxl:w-[380px]'>
            <SharedImage className='mx-auto' src={EmptyData} />
            <h6 className='text-xs xxxl:text-sm mb-0'>
              <h3>{t('project.notFound')}</h3>
            </h6>
            <p className='text-xxs xxxl:text-xs font-regular leading-lg text-neutral-700 mb-lg'>
              {t('project.notFoundText')}
            </p>
            <Button variant='primary' onClick={() => history.push('/dashboard')}>
              {t('common.actions.backToDashboard')}
            </Button>
          </div>
        </div>
      </Card>
    </MainContent>
  );
};
