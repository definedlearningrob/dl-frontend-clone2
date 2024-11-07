import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import useAssessment from '@dc/hooks/useAssessment';
import { AssessmentStep2Context } from '@dc/context/assessmentStep2Context';

// Prop for testing - it is super worth to test it and useParam has problem to get param from mocked router
function useMiddleSchoolAssessmentStep2({ mockQuestionNumber } = {}) {
  const { interestsAnswers, setInterestsAnswers } = useAssessment();
  const {
    checkedAnswersIds,
    declinedAnswersIds,
    interestsGroups,
    setCheckedAnswersIds,
    setDeclinedAnswersIds,
  } = useContext(AssessmentStep2Context);
  const { questionNumber } = useParams();
  const currentInterestGroup = interestsGroups[(questionNumber || mockQuestionNumber) - 1];
  const allInterestsOptions = interestsGroups
    .map((interestsGroup) => interestsGroup?.options.map((interest) => interest))
    .flat();

  const processMiddleSchoolQuestionData = (questionNumber) => {
    const currentOptionId = allInterestsOptions[questionNumber - 1].id;

    const newInterestAnswer = {
      optionId: currentOptionId,
      checked: checkedAnswersIds.includes(currentOptionId),
    };

    setInterestsAnswers([...interestsAnswers, newInterestAnswer]);
  };

  const toggleMiddleSchoolAnswerCheck = (answerValue, passedId) => {
    if (!answerValue) {
      const newCheckedAnswersIds = checkedAnswersIds.includes(passedId)
        ? checkedAnswersIds.filter((id) => id !== passedId)
        : [...checkedAnswersIds];
      const newDeclinedAnswersIds = !declinedAnswersIds.includes(passedId)
        ? [...declinedAnswersIds, passedId]
        : [...declinedAnswersIds];

      setCheckedAnswersIds(newCheckedAnswersIds);
      setDeclinedAnswersIds(newDeclinedAnswersIds);
    }

    if (!!answerValue) {
      const newCheckedAnswersIds = !checkedAnswersIds.includes(passedId)
        ? [...checkedAnswersIds, passedId]
        : [...checkedAnswersIds];
      const newDeclinedAnswersIds = declinedAnswersIds.includes(passedId)
        ? declinedAnswersIds.filter((id) => id !== passedId)
        : [...declinedAnswersIds];

      setCheckedAnswersIds(newCheckedAnswersIds);
      setDeclinedAnswersIds(newDeclinedAnswersIds);
    }
  };

  return {
    allInterestsOptions,
    checkedAnswersIds,
    currentInterestGroup,
    declinedAnswersIds,
    interestsGroups,
    processMiddleSchoolQuestionData,
    setDeclinedAnswersIds,
    toggleMiddleSchoolAnswerCheck,
  };
}

export default useMiddleSchoolAssessmentStep2;
