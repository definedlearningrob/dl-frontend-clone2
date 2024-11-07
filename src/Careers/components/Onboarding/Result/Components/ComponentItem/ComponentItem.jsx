import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import finishedAssesssmentStatusQuery from '@dc/graphql/student/queries/finishedAssesssmentStatus';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

OnboardingResultComponentsComponentItem.propTypes = {
  component: PropTypes.elementType,
  path: PropTypes.string,
  query: PropTypes.object,
};

function OnboardingResultComponentsComponentItem({ path, component: Component, query }) {
  return (
    <SharedDataLoader query={finishedAssesssmentStatusQuery}>
      {({
        assessmentProgress: {
          attempt: { id: assessmentAttemptId },
        },
      }) => (
        <Route
          children={() => (
            <SharedDataLoader options={{ variables: { assessmentAttemptId } }} query={query}>
              {(data) => <Component {...data} />}
            </SharedDataLoader>
          )}
          path={path}
        />
      )}
    </SharedDataLoader>
  );
}

export default OnboardingResultComponentsComponentItem;
