import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAssessment from '@dc/hooks/useAssessment';

const MAX_TOKENS = 3;
const MIN_TOKENS = 0;

AssessmentStep3Provider.propTypes = {
  children: PropTypes.node.isRequired,
  workValuesPairs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          category: PropTypes.string,
          id: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
};

export const AssessmentStep3Context = createContext();

export function AssessmentStep3Provider({ children, workValuesPairs }) {
  const [optionsWithTokens, setOptionsWithTokens] = useState([]);

  return (
    <AssessmentStep3Context.Provider
      value={{
        optionsWithTokens,
        setOptionsWithTokens,
        workValuesPairs,
      }}>
      {children}
    </AssessmentStep3Context.Provider>
  );
}

// Prop for testing - it is super worth to test it and useParam has problem to get param from mocked router
function useAssessmentStep3({ mockQuestionNumber } = {}) {
  const { workValuesAnswers, setWorkValuesAnswers } = useAssessment();
  const { optionsWithTokens, setOptionsWithTokens, workValuesPairs } =
    useContext(AssessmentStep3Context);
  const { questionNumber } = useParams();
  const currentWorkValuePair = workValuesPairs[(questionNumber || mockQuestionNumber) - 1];

  const processQuestionData = () => {
    const newPair = currentWorkValuePair.options.map(
      ({ id }) =>
        optionsWithTokens.find(({ optionId }) => id === optionId) || { optionId: id, tokens: 0 }
    );

    const newWorkValues = [...workValuesAnswers, ...newPair];

    setWorkValuesAnswers(newWorkValues);

    return newWorkValues;
  };

  const moveToken = (addId, removeId) => {
    const removeOption = optionsWithTokens.find(({ optionId }) => optionId === removeId);
    const addOption = optionsWithTokens.find(({ optionId }) => optionId === addId) || {
      optionId: addId,
      tokens: 0,
    };

    if (addOption?.tokens === MAX_TOKENS || removeOption?.tokens === MIN_TOKENS) {
      return;
    }

    const withoutOptions = optionsWithTokens.filter(
      ({ optionId }) => optionId !== addId && optionId !== removeId
    );

    const newOptions =
      removeOption && addOption
        ? [
            ...withoutOptions,
            { ...addOption, tokens: addOption.tokens + 1 },
            { ...removeOption, tokens: removeOption.tokens - 1 },
          ]
        : [...withoutOptions, { ...addOption, tokens: addOption.tokens + 1 }];

    setOptionsWithTokens(newOptions);
  };

  return {
    currentWorkValuePair,
    moveToken,
    optionsWithTokens,
    processQuestionData,
    setOptionsWithTokens,
    workValuesPairs,
  };
}

export default useAssessmentStep3;
