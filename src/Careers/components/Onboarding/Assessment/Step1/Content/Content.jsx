import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import StudyPreference from '@dc/components/Onboarding/Assessment/Step1/Content/StudyPreference/StudyPreference';
import useAssessment from '@dc/hooks/useAssessment';
import useAssessmentStep1 from '@dc/hooks/useAssessmentStep1';
import { ContentWrapper } from '@dc/components/Onboarding/Assessment/ContentWrapper/ContentWrapper';
import { ASSESSMENT_TYPES } from '@dc/resources/constants';

OnboardingAssessmentStep1Content.propTypes = {
  assessmentType: PropTypes.string,
};

function OnboardingAssessmentStep1Content({ assessmentType }) {
  const history = useHistory();
  const { t } = useTranslation();
  const { questionNumber } = useParams();
  const { saveProgress, saving, setCurrentRoute, triggerTooltip } = useAssessment();
  const { availableStudyPreferences, processQuestionData, questionCompleted } =
    useAssessmentStep1();

  const nextQuestionClick = () => {
    processQuestionData();

    const baseUrl = '/onboarding/assessment/step';
    const step1QuestionsCount =
      assessmentType && assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL ? 2 : 3;
    const allQuestionsAnswered = parseInt(questionNumber) === step1QuestionsCount;
    const nextUrl = allQuestionsAnswered
      ? `${baseUrl}/2/question/1`
      : `${baseUrl}/1/question/${parseInt(questionNumber) + 1}`;

    setCurrentRoute(nextUrl);

    if (allQuestionsAnswered) {
      triggerTooltip({ message: t('student.onboarding.assessment.step1Completed') });
    }

    history.push(nextUrl);
  };

  return (
    <ContentWrapper
      assessmentType={assessmentType}
      isSaving={saving}
      nextDisabled={!questionCompleted}
      onNext={nextQuestionClick}
      onSaveProgress={saveProgress}>
      <div className='assessment__step1'>
        <h2 className='assessment__steps-header display-only-mobile-block'>
          {t('student.onboarding.assessment.step1.mainTextDesktop')}
        </h2>
        <h2 className='assessment__steps-header display-only-desktop-block'>
          {t('student.onboarding.assessment.step1.mainTextDesktop')}
        </h2>
        <div className='assessment__step1__mobile-choice-headings'>
          <h3 className='assessment__step1__most-desired-title'>
            {t('student.onboarding.assessment.step1.mostDesiredTitle')}
          </h3>
          <h3 className='assessment__step1__least-desired-title'>
            {t('student.onboarding.assessment.step1.leastDesiredTitle')}
          </h3>
        </div>
        <div className='assessment__step1__interactive-part'>
          <div className='assessment__step1__most-desired'>
            <h3 className='assessment__step1__most-desired-title'>
              {t('student.onboarding.assessment.step1.mostDesiredTitle')}
            </h3>
          </div>
          <ul className='assessment__step1__items-list'>
            {availableStudyPreferences.map((preference, index) => (
              <StudyPreference key={index} studyPreference={preference} />
            ))}
          </ul>
          <div className='assessment__step1__least-desired'>
            <h3 className='assessment__step1__least-desired-title'>
              {t('student.onboarding.assessment.step1.leastDesiredTitle')}
            </h3>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default OnboardingAssessmentStep1Content;
