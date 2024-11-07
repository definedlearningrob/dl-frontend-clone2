import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

AssessmentStep2Provider.propTypes = {
  children: PropTypes.node.isRequired,
  interestsGroups: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      id: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          activity: PropTypes.string,
          id: PropTypes.string,
        })
      ),
    })
  ),
};

export const AssessmentStep2Context = createContext();

export function AssessmentStep2Provider({ children, interestsGroups }) {
  const [checkedAnswersIds, setCheckedAnswersIds] = useState([]);
  const [declinedAnswersIds, setDeclinedAnswersIds] = useState([]);

  return (
    <AssessmentStep2Context.Provider
      value={{
        checkedAnswersIds,
        declinedAnswersIds,
        interestsGroups,
        setCheckedAnswersIds,
        setDeclinedAnswersIds,
      }}>
      {children}
    </AssessmentStep2Context.Provider>
  );
}
