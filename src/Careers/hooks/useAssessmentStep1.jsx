import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

import useAssessment from '@dc/hooks/useAssessment';
import { ASSESSMENT_TYPES } from '@dc/resources/constants';

AssessmentStep1Provider.propTypes = {
  children: PropTypes.node.isRequired,
  studyPreferences: PropTypes.arrayOf(
    PropTypes.shape({
      area: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};

const AssessmentStep1Context = createContext();

export function AssessmentStep1Provider({ children, studyPreferences }) {
  const [mostDesired, setMostDesired] = useState(null);
  const [leastDesired, setLeastDesired] = useState(null);

  return (
    <AssessmentStep1Context.Provider
      value={{
        leastDesired,
        mostDesired,
        setLeastDesired,
        setMostDesired,
        studyPreferences,
      }}>
      {children}
    </AssessmentStep1Context.Provider>
  );
}

function useAssessmentStep1() {
  const { assessmentType, setStudyPreferencesAnswers, studyPreferencesAnswers } = useAssessment();
  const { leastDesired, mostDesired, setLeastDesired, setMostDesired, studyPreferences } =
    useContext(AssessmentStep1Context);

  const selectedPreferencesIds = [...studyPreferencesAnswers.map(({ option: { id } }) => id)];
  const availableStudyPreferences = studyPreferences.filter(
    ({ id }) => !selectedPreferencesIds.includes(id)
  );
  const questionCompleted = !!(leastDesired && mostDesired);

  const processQuestionData = () => {
    const [lastPreference] = availableStudyPreferences.filter(
      ({ id }) => id !== mostDesired.id && id !== leastDesired.id
    );

    const defaultPreferences = {
      0: [
        { position: 1, option: mostDesired },
        { position: 7, option: leastDesired },
      ],
      2: [
        { position: 2, option: mostDesired },
        { position: 6, option: leastDesired },
      ],
      4: [
        { position: 3, option: mostDesired },
        { position: 5, option: leastDesired },
        { position: 4, option: lastPreference },
      ],
    }[studyPreferencesAnswers.length];

    const middleSchoolPreferences = {
      0: [
        { position: 1, option: mostDesired },
        { position: 5, option: leastDesired },
      ],
      2: [
        { position: 2, option: mostDesired },
        { position: 4, option: leastDesired },
        { position: 3, option: lastPreference },
      ],
    }[studyPreferencesAnswers.length];

    const newPreferences =
      assessmentType && assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL
        ? middleSchoolPreferences
        : defaultPreferences;

    setMostDesired(null);
    setLeastDesired(null);
    setStudyPreferencesAnswers([...studyPreferencesAnswers, ...newPreferences]);
  };

  return {
    availableStudyPreferences,
    leastDesired,
    mostDesired,
    processQuestionData,
    questionCompleted,
    setLeastDesired,
    setMostDesired,
  };
}

export default useAssessmentStep1;
