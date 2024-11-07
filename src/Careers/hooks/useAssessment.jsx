import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';
import finishAssessmentMutation from '@dc/graphql/student/mutations/finishAssessment';
import saveAssessmentProgressMutation from '@dc/graphql/student/mutations/saveAssessmentProgress';
import { ASSESSMENT_TYPES } from '@dc/resources/constants';
import { shapeAssessmentProgress } from '@dc/resources/typeDefs';

import { callToast } from '@shared/components/Toaster/Toaster';

const TOOLTIP_TIME = 3000;

AssessmentProvider.propTypes = {
  assessment: shapeAssessmentProgress,
  children: PropTypes.node.isRequired,
  initialCurrentRoute: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

const AssessmentContext = createContext();

export function AssessmentProvider({ assessment, initialCurrentRoute, children }) {
  const [studyPreferencesAnswers, setStudyPreferencesAnswers] = useState(
    assessment.studyPreferencesAnswers
  );
  const [interestsAnswers, setInterestsAnswers] = useState([]);
  const [workValuesAnswers, setWorkValuesAnswers] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(initialCurrentRoute);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState(null);

  return (
    <AssessmentContext.Provider
      value={{
        assessment,
        currentRoute,
        setStudyPreferencesAnswers,
        interestsAnswers,
        savedPreferences: assessment.studyPreferencesAnswers,
        setCurrentRoute,
        setInterestsAnswers,
        setTooltipMessage,
        setTooltipVisible,
        setWorkValuesAnswers,
        studyPreferencesAnswers,
        tooltipMessage,
        tooltipVisible,
        workValuesAnswers,
      }}>
      {children}
    </AssessmentContext.Provider>
  );
}

function useAssessment() {
  const {
    assessment,
    currentRoute,
    interestsAnswers,
    savedPreferences,
    setCurrentRoute,
    setInterestsAnswers,
    setStudyPreferencesAnswers,
    setTooltipMessage,
    setTooltipVisible,
    setWorkValuesAnswers,
    studyPreferencesAnswers,
    tooltipMessage,
    tooltipVisible,
    workValuesAnswers,
  } = useContext(AssessmentContext);
  const [waitingForFinishStart, setWaitingForFinishStart] = useState(false);
  const { stepNumber, questionNumber } = useParams();
  const { t } = useTranslation();
  const [mutateSaveAssessmentProgress, { loading: savingProgress }] = useMutation(
    saveAssessmentProgressMutation
  );
  const [mutateFinishAssessment, { loading: finishing }] = useMutation(finishAssessmentMutation, {
    variables: { attemptId: assessment.attempt.id },
  });
  const assessmentType = assessment?.attempt?.assessmentType;

  const getNewPreferences = () => {
    const savedPreferencesIds = savedPreferences.map(({ option }) => option.id);

    return studyPreferencesAnswers.filter(({ option }) => !savedPreferencesIds.includes(option.id));
  };

  const saveProgress = async ({ finished, lastWorkValues = [], noRefetchQueries = false }) => {
    const newPreferences = getNewPreferences().map(({ position, option }) => ({
      position,
      optionId: option.id,
    }));

    // When finishing it's refetched later in update attempt mutation
    const refetchQueries =
      finished || noRefetchQueries ? [] : [{ query: assessmentAttemptStatusQuery }];
    const lastWorkValuesIds = lastWorkValues.map(({ optionId }) => optionId);
    const workValueAnswersWithoutLast = workValuesAnswers.filter(
      (workValue) => !lastWorkValuesIds.includes(workValue.optionId)
    );

    await mutateSaveAssessmentProgress({
      variables: {
        async: finished,
        attemptId: assessment.attempt.id,
        studyPreferencesAnswers: newPreferences,
        interestsAnswers,
        workValuesAnswers: [...workValueAnswersWithoutLast, ...lastWorkValues],
      },
      refetchQueries,
    });

    setInterestsAnswers([]);
    setWorkValuesAnswers([]);

    if (!finished) {
      callToast('success', t('student.onboarding.assessment.savedSuccessful'));
    }
  };

  const finishAssessmentWithSave = async (lastWorkValues) => {
    await saveProgress({ finished: true, lastWorkValues });
    setWaitingForFinishStart(true);

    return new Promise((resolve) => {
      setTimeout(async () => {
        await mutateFinishAssessment();
        setWaitingForFinishStart(false);
        resolve();
      }, 1000);
    });
  };

  const getWholeAssessmentQuestionNumber = () => {
    const defaultVal = {
      1: 0,
      2: 4,
      3: 10,
      4: 41,
    }[parseInt(stepNumber)];

    const middleSchoolValue = {
      1: 0,
      2: 3,
      3: 39,
      4: 55,
    }[parseInt(stepNumber)];

    const wholeAssessmentQuestionNumber =
      assessmentType && assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL
        ? middleSchoolValue
        : defaultVal;

    return wholeAssessmentQuestionNumber + parseInt(questionNumber);
  };

  const triggerTooltip = ({ message }) => {
    setTooltipVisible(true);
    setTooltipMessage(message);
    setTimeout(() => {
      setTooltipVisible(false);
      setTooltipMessage(null);
    }, TOOLTIP_TIME);
  };

  return {
    assessment,
    assessmentType,
    currentRoute,
    finishAssessmentWithSave,
    finishAssessment: mutateFinishAssessment,
    getWholeAssessmentQuestionNumber,
    interestsAnswers,
    saveProgress,
    saving: savingProgress || finishing || waitingForFinishStart,
    setCurrentRoute,
    setInterestsAnswers,
    setStudyPreferencesAnswers,
    setWorkValuesAnswers,
    studyPreferencesAnswers,
    tooltipMessage,
    tooltipVisible,
    triggerTooltip,
    workValuesAnswers,
  };
}

export default useAssessment;
