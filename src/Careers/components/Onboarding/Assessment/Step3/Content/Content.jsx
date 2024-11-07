import { useMemo } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';
import { useHistory, useParams } from 'react-router-dom';

import useAssessment from '@dc/hooks/useAssessment';
import useAssessmentStep3 from '@dc/hooks/useAssessmentStep3';
import { ContentWrapper } from '@dc/components/Onboarding/Assessment/ContentWrapper/ContentWrapper';
import { ASSESSMENT_STATUSES, ASSESSMENT_TYPES } from '@dc/resources/constants';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as ArrowLeft } from '@shared/svg/chevron_left.svg';
import { ReactComponent as ArrowRight } from '@shared/svg/chevron_right.svg';

const SUM_OF_TOKENS = 3;

OnboardingAssessmentStep3Content.propTypes = {
  assessmentType: PropTypes.string,
};

function OnboardingAssessmentStep3Content({ assessmentType }) {
  const { assessment, saveProgress, saving, setCurrentRoute, currentRoute } = useAssessment();

  const isMiddleSchool = useMemo(
    () => assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL,
    [assessmentType]
  );

  const {
    currentWorkValuePair: {
      options: [leftOption, rightOption],
    },
    moveToken,
    optionsWithTokens,
    processQuestionData,
    workValuesPairs,
  } = useAssessmentStep3();

  const { t } = useTranslation();

  const history = useHistory();
  const { questionNumber } = useParams();
  const { status, attempt } = assessment;

  const filledWithoutFinished =
    status.workValues === ASSESSMENT_STATUSES.COMPLETED &&
    attempt.status !== ASSESSMENT_STATUSES.COMPLETED;

  const nextQuestionClick = async () => {
    const baseUrl = '/onboarding/assessment/step';

    const workValues = processQuestionData();
    const step3QuestionsCount = workValuesPairs.length;
    const isAssessmentLastQuestion = parseInt(questionNumber) === step3QuestionsCount;

    const nextUrl = isAssessmentLastQuestion
      ? `${baseUrl}/4/question/1`
      : `/onboarding/assessment/step/3/question/${parseInt(questionNumber) + 1}`;

    if (isAssessmentLastQuestion) {
      // This is cause assessment state is not updated after process question
      // data with finish in one function call
      const lastWorkValuesIndex = workValues.length - 1;
      const lastWorkValues = [workValues[lastWorkValuesIndex], workValues[lastWorkValuesIndex - 1]];
      await saveProgress({ lastWorkValues });
    }

    setCurrentRoute(nextUrl);
  };

  useUpdateEffect(() => {
    history.push(currentRoute);
  }, [currentRoute]);

  const leftOptionTokens = () =>
    optionsWithTokens.find(({ optionId }) => optionId === leftOption.id)?.tokens || 0;
  const rightOptionTokens = () =>
    optionsWithTokens.find(({ optionId }) => optionId === rightOption.id)?.tokens || 0;

  const leftIndicatorClasses = cx('assessment__step3__left-indicator', {
    [`-selected-${leftOptionTokens()}`]: leftOptionTokens() > 0,
  });

  const rightIndicatorClasses = cx('assessment__step3__right-indicator', {
    [`-selected-${rightOptionTokens()}`]: rightOptionTokens() > 0,
  });

  const allTokensTaken = SUM_OF_TOKENS - rightOptionTokens() - leftOptionTokens() === 0;

  const tokenPlaceholderClasses = cx('assessment__step3__tokens-placeholder', {
    '-left-taken': leftOptionTokens() > 0,
    '-right-taken': rightOptionTokens() > 0,
    '-center-taken': rightOptionTokens() > 1 || leftOptionTokens() > 1,
    '-all-taken': allTokensTaken,
  });

  const moveTokenToSide = (direction) => () => {
    if (direction === 'right') {
      allTokensTaken ? moveToken(rightOption.id, leftOption.id) : moveToken(rightOption.id);
    } else if (direction === 'left') {
      allTokensTaken ? moveToken(leftOption.id, rightOption.id) : moveToken(leftOption.id);
    }
  };

  const renderIndicator = (site, displayClass) => {
    const className = site === 'left' ? leftIndicatorClasses : rightIndicatorClasses;

    return (
      <div className={`${className} ${displayClass}`}>
        <div className='assessment__step3__selection-token' />
        <div className='assessment__step3__selection-token' />
        <div className='assessment__step3__selection-token' />
      </div>
    );
  };

  return (
    <ContentWrapper
      assessmentType={assessmentType}
      isSaving={saving || filledWithoutFinished}
      nextDisabled={!allTokensTaken}
      onNext={nextQuestionClick}
      onSaveProgress={saveProgress}>
      <div className='assessment__step3'>
        <span className='assessment__step3__sub-title'>
          {t('student.onboarding.assessment.step3.pickInfo')}
        </span>
        <h2 className='assessment__steps-header'>
          {t(
            `student.onboarding.assessment.step3.${
              assessmentType && isMiddleSchool ? 'middleSchoolMainText' : 'defaultMainText'
            }`
          )}
        </h2>
        <div className='assessment__step3__interactive-part'>
          <div className='assessment__step3__options'>
            <div className='assessment__step3__option -left'>
              <span className='assessment__step3__option-text'>...{leftOption.value}.</span>
              {renderIndicator('left', 'display-only-mobile-flex')}
            </div>
            <div className='assessment__step3__option -right'>
              <span className='assessment__step3__option-text'>...{rightOption.value}.</span>
              {renderIndicator('right', 'display-only-mobile-flex')}
            </div>
          </div>
          <div className='assessment__step3__controls'>
            {renderIndicator('left', 'display-only-desktop-flex')}
            <div className={tokenPlaceholderClasses}>
              {allTokensTaken ? (
                <DeprecatedIconButton icon={<ArrowRight />} onClick={moveTokenToSide('right')} />
              ) : (
                <DeprecatedIconButton icon={<ArrowLeft />} onClick={moveTokenToSide('left')} />
              )}
              <div className='assessment__step3__token' />
              <div className='assessment__step3__token' />
              <div className='assessment__step3__token' />
              {allTokensTaken ? (
                <DeprecatedIconButton icon={<ArrowLeft />} onClick={moveTokenToSide('left')} />
              ) : (
                <DeprecatedIconButton icon={<ArrowRight />} onClick={moveTokenToSide('right')} />
              )}
            </div>
            {renderIndicator('right', 'display-only-desktop-flex')}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default OnboardingAssessmentStep3Content;
