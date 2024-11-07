import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';
import finishAssessmentMutation from '@dc/graphql/student/mutations/finishAssessment';
import saveAsssessmentProgressMutation from '@dc/graphql/student/mutations/saveAssessmentProgress';
import useAssessment from '@dc/hooks/useAssessment';
import { AssessmentProvider } from '@dc/hooks/useAssessment';
import { ASSESSMENT_STATUSES } from '@dc/resources/constants';
import { renderWithRouter } from '@dc/utils/test';

let assessmentAttemptStatusQueryCalles = false;
let finishAssessmentMutationCalled = false;
let finishingSaveAsssessmentProgressMutationCalled = false;
let saveAsssessmentProgressMutationCalled = false;

const mocks = [
  {
    request: {
      query: saveAsssessmentProgressMutation,
      variables: {
        attemptId: 5,
        interestsAnswers: [
          { id: 1, checked: false },
          { id: 2, checked: false },
          { id: 3, checked: true },
        ],
        studyPreferencesAnswers: [{ optionId: 2, position: 1 }],
        workValuesAnswers: [
          { id: 1, tokens: 2 },
          { id: 2, tokens: 3 },
          { id: 3, tokens: 0 },
        ],
      },
    },
    result: () => {
      saveAsssessmentProgressMutationCalled = true;

      return {
        data: {
          createInterestsAnswers: {
            status: 'ok',
          },
          createWorkValuesAnswers: {
            status: 'ok',
          },
          createStudyPreferencesAnswers: {
            status: 'ok',
          },
        },
      };
    },
  },
  {
    request: {
      query: saveAsssessmentProgressMutation,
      variables: {
        attemptId: 5,
        async: true,
        interestsAnswers: [],
        studyPreferencesAnswers: [],
        workValuesAnswers: [
          { tokens: 2, id: 3 },
          { tokens: 1, id: 2 },
        ],
      },
    },
    result: () => {
      finishingSaveAsssessmentProgressMutationCalled = true;

      return {
        data: {
          createInterestsAnswers: {
            status: 'ok',
          },
          createWorkValuesAnswers: {
            status: 'ok',
          },
          createStudyPreferencesAnswers: {
            status: 'ok',
          },
        },
      };
    },
  },
  {
    request: {
      query: finishAssessmentMutation,
      variables: {
        attemptId: 5,
      },
    },
    result: () => {
      finishAssessmentMutationCalled = true;

      return {
        data: {
          createAssessmentResult: {
            status: 'ok',
          },
        },
      };
    },
  },
  {
    request: {
      query: assessmentAttemptStatusQuery,
    },
    result: () => {
      assessmentAttemptStatusQueryCalles = true;

      return {
        data: {
          assessmentProgress: {
            attempt: null,
            interestsAnswers: [],
            result: null,
            studyPreferencesAnswers: [],
            workValuesAnswers: [],
            status: {
              interests: ASSESSMENT_STATUSES.NOT_STARTED,
              studyPreferences: ASSESSMENT_STATUSES.NOT_STARTED,
              workValues: ASSESSMENT_STATUSES.NOT_STARTED,
            },
          },
          currentCourses: [],
        },
      };
    },
  },
];

const renderWithUseAssessment = (TesterComponent, routerParams) => {
  const utils = renderWithRouter(
    <MockedProvider mocks={mocks}>
      <AssessmentProvider
        assessment={{
          attempt: { id: 5 },
          studyPreferencesAnswers: [{ option: { id: 1 }, position: 9 }],
        }}>
        <TesterComponent />
      </AssessmentProvider>
    </MockedProvider>,
    routerParams
  );

  return { ...utils };
};

describe('useAssessment', () => {
  beforeEach(() => {
    saveAsssessmentProgressMutationCalled = false;
    finishAssessmentMutationCalled = false;
    assessmentAttemptStatusQueryCalles = false;
    finishingSaveAsssessmentProgressMutationCalled = false;
  });

  it('returns correct initial answers length', async () => {
    function TesterComponent() {
      const { interestsAnswers, studyPreferencesAnswers, workValuesAnswers } = useAssessment();

      return (
        <>
          <span data-testid='interests-answers-length'>{interestsAnswers.length}</span>
          <span data-testid='values-answers-length'>{workValuesAnswers.length}</span>
          <span data-testid='preferences-answers-length'>{studyPreferencesAnswers.length}</span>
          <span data-testid='preference-answer-id'>{studyPreferencesAnswers[0].option.id}</span>
          <span data-testid='preference-answer-position'>
            {studyPreferencesAnswers[0].position}
          </span>
        </>
      );
    }

    const { getByTestId } = renderWithUseAssessment(TesterComponent);

    expect(getByTestId(/interests-answers-length/)).toHaveTextContent(0);
    expect(getByTestId(/values-answers-length/)).toHaveTextContent(0);
    expect(getByTestId(/preferences-answers-length/)).toHaveTextContent(1);
    expect(getByTestId(/preference-answer-id/)).toHaveTextContent(1);
    expect(getByTestId(/preference-answer-position/)).toHaveTextContent(9);
  });

  it('allows to manipulate answers', async () => {
    function TesterComponent() {
      const {
        interestsAnswers,
        studyPreferencesAnswers,
        workValuesAnswers,
        setInterestsAnswers,
        setStudyPreferencesAnswers,
        setWorkValuesAnswers,
      } = useAssessment();

      const setAnswers = () => {
        setInterestsAnswers([
          { id: 1, checked: false },
          { id: 2, checked: false },
          { id: 3, checked: true },
        ]);
        setStudyPreferencesAnswers([
          { option: { id: 1 }, position: 9 },
          { option: { id: 2 }, position: 1 },
        ]);
        setWorkValuesAnswers([
          { id: 1, tokens: 2 },
          { id: 2, tokens: 3 },
          { id: 3, tokens: 0 },
        ]);
      };

      return (
        <>
          <span data-testid='interests-answers-length'>{interestsAnswers.length}</span>
          <span data-testid='values-answers-length'>{workValuesAnswers.length}</span>
          <span data-testid='preferences-answers-length'>{studyPreferencesAnswers.length}</span>
          <span data-testid='preference-answer-id'>{studyPreferencesAnswers[0].option.id}</span>
          <span data-testid='preference-answer-position'>
            {studyPreferencesAnswers[0].position}
          </span>
          <span data-testid='interest-answer-id'>{interestsAnswers[0]?.id}</span>
          <span data-testid='interest-answer-checked'>{`${interestsAnswers[0]?.checked}`}</span>
          <span data-testid='value-answer-id'>{workValuesAnswers[0]?.id}</span>
          <span data-testid='value-answer-tokens'>{workValuesAnswers[0]?.tokens}</span>
          <button data-testid='set-answers' onClick={setAnswers} />
        </>
      );
    }

    const { getByTestId } = renderWithUseAssessment(TesterComponent);

    await fireEvent.click(getByTestId(/set-answers/));
    await act(() => Promise.resolve({}));

    expect(getByTestId(/interests-answers-length/)).toHaveTextContent(3);
    expect(getByTestId(/values-answers-length/)).toHaveTextContent(3);
    expect(getByTestId(/preferences-answers-length/)).toHaveTextContent(2);
    expect(getByTestId(/preference-answer-id/)).toHaveTextContent(1);
    expect(getByTestId(/preference-answer-position/)).toHaveTextContent(9);
    expect(getByTestId(/interest-answer-id/)).toHaveTextContent(1);
    expect(getByTestId(/interest-answer-checked/)).toHaveTextContent(false);
    expect(getByTestId(/value-answer-id/)).toHaveTextContent(1);
    expect(getByTestId(/value-answer-tokens/)).toHaveTextContent(2);
  });

  // eslint-disable-next-line max-len
  it('calls save progress with set answers and without existing study preference and refetch onboarding status', async () => {
    function TesterComponent() {
      const {
        setInterestsAnswers,
        setStudyPreferencesAnswers,
        setWorkValuesAnswers,
        saveProgress,
      } = useAssessment();

      const setAnswers = () => {
        setInterestsAnswers([
          { id: 1, checked: false },
          { id: 2, checked: false },
          { id: 3, checked: true },
        ]);
        setStudyPreferencesAnswers([
          { option: { id: 1 }, position: 9 },
          { option: { id: 2 }, position: 1 },
        ]);
        setWorkValuesAnswers([
          { id: 1, tokens: 2 },
          { id: 2, tokens: 3 },
          { id: 3, tokens: 0 },
        ]);
      };

      return (
        <>
          <button data-testid='save-progress' onClick={saveProgress} />;
          <button data-testid='set-answers' onClick={setAnswers} />
        </>
      );
    }

    const { getByTestId } = renderWithUseAssessment(TesterComponent);

    await fireEvent.click(getByTestId(/set-answers/));
    await act(() => Promise.resolve({}));

    await fireEvent.click(getByTestId(/save-progress/));

    await waitFor(() => {
      expect(saveAsssessmentProgressMutationCalled).toBe(true);
      expect(assessmentAttemptStatusQueryCalles).toBe(true);
    });
  });

  it('calls finish assessment with saving with last pair of work values passed with async true', async () => {
    function TesterComponent() {
      const { finishAssessmentWithSave } = useAssessment();

      const finishAssessmentClick = async () => {
        finishAssessmentWithSave([
          { tokens: 2, id: 3 },
          { tokens: 1, id: 2 },
        ]);
      };

      return (
        <>
          <button data-testid='finish-assessment' onClick={finishAssessmentClick} />;
        </>
      );
    }

    const { getByTestId } = renderWithUseAssessment(TesterComponent);

    await fireEvent.click(getByTestId(/finish-assessment/));

    // Wait for delayed finish - fake timers won't play well with promise
    await waitFor(
      () => {
        expect(finishingSaveAsssessmentProgressMutationCalled).toBe(true);
        expect(finishAssessmentMutationCalled).toBe(true);
      },
      { timeout: 1200 }
    );
  });

  it('calls finish assessment', async () => {
    function TesterComponent() {
      const { finishAssessment } = useAssessment();

      return <button data-testid='finish-assessment' onClick={finishAssessment} />;
    }

    const { getByTestId } = renderWithUseAssessment(TesterComponent);

    await fireEvent.click(getByTestId(/finish-assessment/));

    await waitFor(() => {
      expect(finishAssessmentMutationCalled).toBe(true);
    });
  });
});
