import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import useAssessment from '@dc/hooks/useAssessment';
import useAssessmentStep2 from '@dc/hooks/useAssessmentStep2';
import useMiddleSchoolAssessmentStep2 from '@dc/hooks/useMiddleSchoolAssessmentStep2';
import { ContentWrapper } from '@dc/components/Onboarding/Assessment/ContentWrapper/ContentWrapper';
import Interest from '@dc/components/Onboarding/Assessment/Step2/Content/Interest/Interest';
import MiddleSchoolInterest from '@dc/components/Onboarding/Assessment/Step2/Content/MiddleSchoolInterest/MiddleSchoolInterest';
import { ASSESSMENT_TYPES } from '@dc/resources/constants';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { preloadImages } from '@shared/utils/images';

OnboardingAssessmentStep2Content.propTypes = {
  assessmentType: PropTypes.string,
};

function OnboardingAssessmentStep2Content({ assessmentType }) {
  const history = useHistory();
  const isMiddleSchool = useMemo(
    () => assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL,
    [assessmentType]
  );
  const [loadedImages, setLoadedImages] = useState(!isMiddleSchool);
  const headerClassnames = `assessment${isMiddleSchool ? '__middleSchool' : ''}__steps-header`;
  const unorderedListClassnames = `assessment${
    isMiddleSchool ? '__middleSchool' : ''
  }__step2__list`;
  const { t } = useTranslation();
  const { questionNumber } = useParams();
  const { saveProgress, saving, setCurrentRoute, triggerTooltip } = useAssessment();
  const { currentInterestGroup, processQuestionData, interestsGroups } = useAssessmentStep2();
  const {
    allInterestsOptions,
    checkedAnswersIds,
    declinedAnswersIds,
    processMiddleSchoolQuestionData,
  } = useMiddleSchoolAssessmentStep2();

  // Preloads images to avoid blink effect
  useEffect(() => {
    const loadImages = async () => {
      const imageUrls = interestsGroups.reduce((acc, group) => {
        const urls = group.options.map(({ imageUrl }) => imageUrl);

        return [...acc, ...urls];
      }, []);

      await preloadImages(imageUrls);

      setLoadedImages(true);
    };

    if (isMiddleSchool) {
      loadImages();
    }
  }, []);

  const nextQuestionClick = () => {
    isMiddleSchool ? processMiddleSchoolQuestionData(questionNumber) : processQuestionData();

    const baseUrl = '/onboarding/assessment/step';
    const step2QuestionsCount =
      assessmentType && isMiddleSchool ? allInterestsOptions.length : interestsGroups.length;
    const allQuestionsAnswered = parseInt(questionNumber) === step2QuestionsCount;
    const nextUrl = allQuestionsAnswered
      ? `${baseUrl}/3/question/1`
      : `${baseUrl}/2/question/${parseInt(questionNumber) + 1}`;

    setCurrentRoute(nextUrl);

    if (allQuestionsAnswered) {
      triggerTooltip({ message: t('student.onboarding.assessment.step2Completed') });
    }

    history.push(nextUrl);
  };

  const renderInterestComponent = () => {
    const currentOption = allInterestsOptions[questionNumber - 1];
    const InterestComponent =
      assessmentType && isMiddleSchool ? (
        <MiddleSchoolInterest key={currentOption?.id} interest={currentOption} />
      ) : (
        currentInterestGroup.options.map((interest) => (
          <Interest key={interest.id} interest={interest} />
        ))
      );

    return InterestComponent;
  };

  const nextQuestionDisabled =
    assessmentType && isMiddleSchool
      ? !(
          checkedAnswersIds.includes(allInterestsOptions[questionNumber - 1]?.id) ||
          declinedAnswersIds.includes(allInterestsOptions[questionNumber - 1]?.id)
        )
      : false;

  if (!loadedImages) return <SharedLoadingSpinner size='full-screen' />;

  return (
    <ContentWrapper
      assessmentType={assessmentType}
      isSaving={saving}
      nextDisabled={nextQuestionDisabled}
      onNext={nextQuestionClick}
      onSaveProgress={saveProgress}>
      <>
        <h2 className={headerClassnames}>
          {t(
            `student.onboarding.assessment.step2.${
              assessmentType && isMiddleSchool ? 'middleSchoolMainText' : 'defaultMainText'
            }`
          )}
        </h2>
        {(!assessmentType || assessmentType !== ASSESSMENT_TYPES.MIDDLE_SCHOOL) && (
          <span className='assessment__step2__sub-title'>
            {t('student.onboarding.assessment.step2.multiChoice')}
          </span>
        )}
        <div className='assessment__step2__interactive-part'>
          <ul className={unorderedListClassnames}>{renderInterestComponent()}</ul>
        </div>
      </>
    </ContentWrapper>
  );
}

export default OnboardingAssessmentStep2Content;
