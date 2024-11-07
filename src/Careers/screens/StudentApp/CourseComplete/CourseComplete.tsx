import { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DotLottiePlayer } from '@dotlottie/react-player';

import confettiPath from '@dc/assets/lottie/confetti.lottie?url';

import { MainContent } from '@shared/components/MainContent/MainContent';
import SharedCard from '@shared/components/Card/Card';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import Link from '@shared/components/Link';

export const CourseComplete = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation<{ courseName: string } | undefined>();
  const { courseId } = useParams<{ courseId: string }>();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  useEffect(() => {
    !location.state?.courseName && history.push(`/courses/${courseId}`);
  }, []);

  const buttonSize = isFullHD ? 'lg' : 'md';

  return (
    <MainContent className='h-[theme(layout.containerHeight)] flex justify-center items-center'>
      <SharedCard className='flex flex-col text-center w-[460px] xxxl:w-[540px]'>
        <DotLottiePlayer autoplay={true} src={confettiPath} />
        <div className='-mt-md'>
          <h2 className='mb-xs text-2lg xxxl:text-2xl'>{t('student.courseComplete.title')}</h2>
          <span className='text-sm xxxl:text-base font-medium leading-lg mb-sm'>
            {t('student.courseComplete.subheading', {
              courseName: location.state?.courseName ?? t('student.courseComplete.course'),
            })}
          </span>
          <p className='text-xxs xxxl:text-xs italic leading-lg mb-base'>
            {t('student.courseComplete.description')}
          </p>
          <Link
            className='mb-xs xxxl:mb-sm w-full'
            size={buttonSize}
            to='/final-report'
            variant='primary-outlined'>
            {t('student.courseComplete.viewinalReport')}
          </Link>
          <Link className='w-full' size={buttonSize} to='/courses' variant='primary'>
            {t('student.courseComplete.exploreMoreCourses')}
          </Link>
        </div>
      </SharedCard>
    </MainContent>
  );
};
