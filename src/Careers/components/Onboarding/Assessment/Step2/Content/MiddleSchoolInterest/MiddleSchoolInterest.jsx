import PropTypes from 'prop-types';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import useMiddleSchoolAssessmentStep2 from '@dc/hooks/useMiddleSchoolAssessmentStep2';
import { ReactComponent as ThumbsUp } from '@dc/assets/icons/thumbs-up.svg';
import { ReactComponent as ThumbsDown } from '@dc/assets/icons/thumbs-down.svg';

import Image from '@shared/components/Image/Image';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

OnboardingAssessmentStep2ContentMiddleSchoolInterest.propTypes = {
  interest: PropTypes.shape({
    activity: PropTypes.string,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
};

function OnboardingAssessmentStep2ContentMiddleSchoolInterest({ interest }) {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { checkedAnswersIds, declinedAnswersIds, toggleMiddleSchoolAnswerCheck } =
    useMiddleSchoolAssessmentStep2();

  const handleClickAction = (answerValue) => () => {
    toggleMiddleSchoolAnswerCheck(answerValue, interest.id);
  };

  const commonButtonClasses =
    'font grow shrink-0 basis-[150px] xxxl:basis-[220px] border-2 rounded-sm p-xs xxxl:p-sm flex flex-col items-center outline-offset-4';

  const yesButtonClassName = cx(commonButtonClasses, 'border-success-600 text-success-600 grow-0', {
    ['bg-success-600 !text-white']: checkedAnswersIds.includes(interest?.id),
  });

  const noButtonClassName = cx(commonButtonClasses, 'border-danger-600 text-danger-600 grow-0', {
    ['bg-danger-600 !text-white']: declinedAnswersIds.includes(interest?.id),
  });

  const iconSize = isFullHD ? 'lg' : 'md';

  return (
    <div className='flex flex-col grow items-center h-full'>
      <p className='text-2xl font-bold mb-base xxxl:mb-2lg'>{interest.activity}?</p>
      <div className='grow mb-md xxxl:mb-2lg h-[130px] xxxl:h-[400px] flex justify-center'>
        <Image className='w-full object-contain' src={interest.imageUrl} />
      </div>
      <div className='shrink-0 w-full max-w-[500px] flex justify-center gap-md xxxl:gap-2lg'>
        <button className={noButtonClassName} onClick={handleClickAction(false)}>
          <IconContainer Icon={ThumbsDown} className='mb-xs' paddingSize='xxxs' size={iconSize} />
          <h3 className='mb-xs text-base xxxl:text-lg'>
            {t('student.onboarding.assessment.step2.no')}
          </h3>
          <div className='font-medium'>{t('student.onboarding.assessment.step2.dislikeIt')}</div>
        </button>
        <button className={yesButtonClassName} onClick={handleClickAction(true)}>
          <IconContainer Icon={ThumbsUp} className='mb-xs' paddingSize='xxxs' size={iconSize} />
          <h3 className='mb-xs text-base xxxl:text-lg'>
            {t('student.onboarding.assessment.step2.yes')}
          </h3>
          <div className='font-medium'>{t('student.onboarding.assessment.step2.likeIt')}</div>
        </button>
      </div>
    </div>
  );
}

export default OnboardingAssessmentStep2ContentMiddleSchoolInterest;
