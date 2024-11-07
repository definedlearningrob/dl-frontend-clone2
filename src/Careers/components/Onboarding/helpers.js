import { ASSESSMENT_STATUSES, ASSESSMENT_TYPES } from '@dc/resources/constants';

export const getRouteForFirstStep = (attempt, answers) => {
  const assessmentType = attempt?.assessmentType;
  const baseRoute = '/onboarding/assessment/step/1/question';
  const defaultQuestionNumber = [1, 1, 2, 2, 3, 3][answers.length];
  const middleSchoolQuestionNumber = [1, 1, 2, 2][answers.length];
  const questionNumberBasedOnAssessmentType =
    assessmentType && assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL
      ? middleSchoolQuestionNumber
      : defaultQuestionNumber;

  return `${baseRoute}/${questionNumberBasedOnAssessmentType}`;
};

export const getRouteForSecondStep = (attempt, answers) => {
  const assessmentType = attempt?.assessmentType;
  const baseRoute = '/onboarding/assessment/step/2/question';
  const groupsAnswered = answers.reduce(
    (ids, answer) =>
      !ids.includes(answer.option.group.id) ? [...ids, answer.option.group.id] : ids,
    []
  );
  const questionNumberBasedOnAssessmentType =
    assessmentType && assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL
      ? answers.length + 1
      : groupsAnswered.length + 1;

  return `${baseRoute}/${questionNumberBasedOnAssessmentType}`;
};

export const getRouteForThirdStep = (answers) =>
  `/onboarding/assessment/step/3/question/${answers.length / 2 + 1}`;

export const getRouteForFourthStep = (answers) =>
  `/onboarding/assessment/step/4/question/${answers.length + 1}`;

export const getOnboardingRoute = ({
  attempt,
  interestsAnswers,
  status,
  studyPreferencesAnswers,
  workValuesAnswers,
  reviewSurveyAnswers,
} = {}) => {
  if (!attempt) {
    return '/';
  }

  const filledWithoutFinished =
    status.workValues === ASSESSMENT_STATUSES.COMPLETED &&
    attempt.status !== ASSESSMENT_STATUSES.COMPLETED;

  if (attempt.status === ASSESSMENT_STATUSES.PROCESSING_RESULTS) {
    return '/onboarding/processing-assessment';
  }

  const assessmentCompleted = attempt.status === ASSESSMENT_STATUSES.FINISHED;

  if (assessmentCompleted) {
    return '/choose-pathway';
  }

  const checkIfStepIsNotCompleted = (status) =>
    [ASSESSMENT_STATUSES.NOT_STARTED, ASSESSMENT_STATUSES.IN_PROGRESS].includes(status);

  const isFirstStep = checkIfStepIsNotCompleted(status.studyPreferences);
  const isSecondStep = checkIfStepIsNotCompleted(status.interests);
  const isThirdStep = checkIfStepIsNotCompleted(status.workValues);
  const isFourthStep = checkIfStepIsNotCompleted(status.reviewSurvey);

  if (isFirstStep) {
    return getRouteForFirstStep(attempt, studyPreferencesAnswers);
  }

  if (isSecondStep) {
    return getRouteForSecondStep(attempt, interestsAnswers);
  }

  if (isThirdStep) {
    return getRouteForThirdStep(workValuesAnswers);
  }

  if (isFourthStep) {
    return getRouteForFourthStep(reviewSurveyAnswers);
  }

  // Handle break of connection between save last answers and delayed finish
  if (filledWithoutFinished) {
    return `/onboarding/assessment/step/3/question/${workValuesAnswers.length / 2}`;
  }
};
