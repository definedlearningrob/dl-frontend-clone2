import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import useAssessment from '@dc/hooks/useAssessment';
import { AssessmentStep2Context } from '@dc/context/assessmentStep2Context';

// Prop for testing - it is super worth to test it and useParam has problem to get param from mocked router
function useAssessmentStep2({ mockQuestionNumber } = {}) {
  const { interestsAnswers, setInterestsAnswers } = useAssessment();
  const { checkedAnswersIds, setCheckedAnswersIds, interestsGroups } =
    useContext(AssessmentStep2Context);
  const { questionNumber } = useParams();
  const currentInterestGroup = interestsGroups[(questionNumber || mockQuestionNumber) - 1];

  const processQuestionData = () => {
    const newInterestsAnswers = currentInterestGroup.options.map(({ id }) => ({
      optionId: id,
      checked: checkedAnswersIds.includes(id),
    }));

    setInterestsAnswers([...interestsAnswers, ...newInterestsAnswers]);
  };

  const toggleAnswerCheck = (passedId) => {
    const newIds = !checkedAnswersIds.includes(passedId)
      ? [...checkedAnswersIds, passedId]
      : checkedAnswersIds.filter((id) => id !== passedId);

    setCheckedAnswersIds(newIds);
  };

  return {
    checkedAnswersIds,
    currentInterestGroup,
    interestsGroups,
    processQuestionData,
    toggleAnswerCheck,
  };
}

export default useAssessmentStep2;
