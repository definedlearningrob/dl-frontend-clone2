import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import useAssessment from '@dc/hooks/useAssessment';
import useAssessmentStep2 from '@dc/hooks/useAssessmentStep2';
import { AssessmentProvider } from '@dc/hooks/useAssessment';
import { AssessmentStep2Provider } from '@dc/context/assessmentStep2Context';
import { renderWithRouter } from '@dc/utils/test';

const interestsGroups = [
  {
    id: '1',
    options: [
      { id: '1', activity: 'first activity' },
      { id: '2', activity: 'second activity' },
      { id: '3', activity: 'third activity' },
      { id: '4', activity: 'fourth activity' },
    ],
  },
  {
    id: '2',
    options: [
      { id: '5', activity: 'fifth activity' },
      { id: '6', activity: 'sixth activity' },
      { id: '7', activity: 'seventh activity' },
      { id: '8', activity: 'eight activity' },
    ],
  },
];

const renderWithUseAssessment = (TesterComponent, { useAssessmentProps } = {}) => {
  const utils = renderWithRouter(
    <MockedProvider mocks={[]}>
      <AssessmentProvider
        assessment={{ attempt: { id: 5 }, interestsAnswers: [], ...useAssessmentProps }}>
        <AssessmentStep2Provider interestsGroups={interestsGroups}>
          <TesterComponent />
        </AssessmentStep2Provider>
      </AssessmentProvider>
    </MockedProvider>
  );

  return { ...utils };
};

describe('useAssessmentStep2', () => {
  it('returns proper current interests groups based on route param for first question', async () => {
    function TesterComponent() {
      const { currentInterestGroup } = useAssessmentStep2({ mockQuestionNumber: 1 });

      return currentInterestGroup.options.map((int) => (
        <span key={int.id} data-testid='current-groups'>
          {int.activity}
        </span>
      ));
    }

    const { getAllByTestId } = renderWithUseAssessment(TesterComponent);

    expect(getAllByTestId(/current-groups/)).toHaveLength(4);

    expect(getAllByTestId(/current-groups/)[0]).toHaveTextContent('first');
    expect(getAllByTestId(/current-groups/)[3]).toHaveTextContent('fourth');
  });

  it('returns proper current interests groups based on route param for second question', async () => {
    function TesterComponent() {
      const { currentInterestGroup } = useAssessmentStep2({ mockQuestionNumber: 2 });

      return currentInterestGroup.options.map((int) => (
        <span key={int.id} data-testid='current-groups'>
          {int.activity}
        </span>
      ));
    }

    const { getAllByTestId } = renderWithUseAssessment(TesterComponent);

    expect(getAllByTestId(/current-groups/)).toHaveLength(4);

    expect(getAllByTestId(/current-groups/)[0]).toHaveTextContent('fifth');
    expect(getAllByTestId(/current-groups/)[3]).toHaveTextContent('eight');
  });

  it('returns proper current interests groups based on route param for second question', async () => {
    function TesterComponent() {
      const { checkedAnswersIds, currentInterestGroup, toggleAnswerCheck } = useAssessmentStep2({
        mockQuestionNumber: 1,
      });

      return (
        <>
          {currentInterestGroup.options.map((int) => (
            <button key={int.id} data-testid='toggle' onClick={() => toggleAnswerCheck(int.id)} />
          ))}
          <span data-testid='checked-ids'>{checkedAnswersIds.join(', ')}</span>
        </>
      );
    }

    const { getAllByTestId, getByTestId } = renderWithUseAssessment(TesterComponent);

    expect(getByTestId(/checked-id/)).toHaveTextContent('');

    fireEvent.click(getAllByTestId(/toggle/)[3]);
    await act(() => Promise.resolve());

    expect(getByTestId(/checked-ids/)).toHaveTextContent('4');

    fireEvent.click(getAllByTestId(/toggle/)[0]);
    await act(() => Promise.resolve());

    expect(getByTestId(/checked-ids/)).toHaveTextContent('4, 1');

    fireEvent.click(getAllByTestId(/toggle/)[2]);
    await act(() => Promise.resolve());
    expect(getByTestId(/checked-ids/)).toHaveTextContent('4, 1, 3');

    fireEvent.click(getAllByTestId(/toggle/)[1]);
    await act(() => Promise.resolve());

    expect(getByTestId(/checked-ids/)).toHaveTextContent('4, 1, 3, 2');

    fireEvent.click(getAllByTestId(/toggle/)[0]);
    await act(() => Promise.resolve());

    expect(getByTestId(/checked-ids/)).toHaveTextContent('4, 3, 2');

    fireEvent.click(getAllByTestId(/toggle/)[1]);
    await act(() => Promise.resolve());

    expect(getByTestId(/checked-ids/)).toHaveTextContent('4, 3');

    fireEvent.click(getAllByTestId(/toggle/)[2]);
    await act(() => Promise.resolve());

    expect(getByTestId(/checked-ids/)).toHaveTextContent('4');

    fireEvent.click(getAllByTestId(/toggle/)[3]);
    await act(() => Promise.resolve());

    expect(getByTestId(/checked-ids/)).toHaveTextContent('');
  });

  it('processes next question properly', async () => {
    function TesterComponent() {
      const { currentInterestGroup, processQuestionData, toggleAnswerCheck } = useAssessmentStep2({
        mockQuestionNumber: 1,
      });
      const { interestsAnswers } = useAssessment();

      return (
        <>
          {currentInterestGroup.options.map((int) => (
            <button key={int.id} data-testid='toggle' onClick={() => toggleAnswerCheck(int.id)} />
          ))}
          {interestsAnswers.map((answ) => (
            <span key={answ.optionId} data-testid='answers'>
              {answ.optionId} : {JSON.stringify(answ.checked)}
            </span>
          ))}
          <button data-testid='process' onClick={processQuestionData} />
        </>
      );
    }

    const { getAllByTestId, getByTestId, queryAllByTestId } =
      renderWithUseAssessment(TesterComponent);

    fireEvent.click(getAllByTestId(/toggle/)[0]);
    await act(() => Promise.resolve());

    fireEvent.click(getAllByTestId(/toggle/)[3]);
    await act(() => Promise.resolve());

    expect(queryAllByTestId(/answers/)).toHaveLength(0);

    fireEvent.click(getByTestId(/process/));
    await act(() => Promise.resolve());

    const answers = getAllByTestId(/answers/);

    expect(answers).toHaveLength(4);

    expect(answers[0]).toHaveTextContent('1 : true');
    expect(answers[1]).toHaveTextContent('2 : false');
    expect(answers[2]).toHaveTextContent('3 : false');
    expect(answers[3]).toHaveTextContent('4 : true');
  });
});
