import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import useAssessment from '@dc/hooks/useAssessment';
import useAssessmentStep3 from '@dc/hooks/useAssessmentStep3';
import { AssessmentProvider } from '@dc/hooks/useAssessment';
import { AssessmentStep3Provider } from '@dc/hooks/useAssessmentStep3';
import { renderWithRouter } from '@dc/utils/test';

const workValuesPairs = [
  {
    id: '1',
    options: [
      { id: '1', value: 'first value' },
      { id: '2', value: 'second value' },
    ],
  },
  {
    id: '2',
    options: [
      { id: '5', value: 'third value' },
      { id: '6', value: 'fourth value' },
    ],
  },
];

const renderWithUseAssessment = (TesterComponent, { useAssessmentProps } = {}) => {
  const utils = renderWithRouter(
    <MockedProvider mocks={[]}>
      <AssessmentProvider
        assessment={{ attempt: { id: 5 }, workValuesAnswers: [], ...useAssessmentProps }}>
        <AssessmentStep3Provider workValuesPairs={workValuesPairs}>
          <TesterComponent />
        </AssessmentStep3Provider>
      </AssessmentProvider>
    </MockedProvider>
  );

  return { ...utils };
};

describe('useAssessmentStep3', () => {
  it('returns proper current work values based on route param for first question', async () => {
    function TesterComponent() {
      const { currentWorkValuePair } = useAssessmentStep3({ mockQuestionNumber: 1 });

      return currentWorkValuePair.options.map((wv) => (
        <span key={wv.id} data-testid='work-values'>
          {wv.value}
        </span>
      ));
    }

    const { getAllByTestId } = renderWithUseAssessment(TesterComponent);

    expect(getAllByTestId(/work-values/)).toHaveLength(2);

    expect(getAllByTestId(/work-values/)[0]).toHaveTextContent('first');
    expect(getAllByTestId(/work-values/)[1]).toHaveTextContent('second');
  });

  it('returns proper current work values based on route param for second question', async () => {
    function TesterComponent() {
      const { currentWorkValuePair } = useAssessmentStep3({ mockQuestionNumber: 2 });

      return currentWorkValuePair.options.map((wv) => (
        <span key={wv.id} data-testid='work-values'>
          {wv.value}
        </span>
      ));
    }

    const { getAllByTestId } = renderWithUseAssessment(TesterComponent);

    expect(getAllByTestId(/work-values/)).toHaveLength(2);

    expect(getAllByTestId(/work-values/)[0]).toHaveTextContent('third');
    expect(getAllByTestId(/work-values/)[1]).toHaveTextContent('fourth');
  });

  it('moves token properly', async () => {
    function TesterComponent() {
      const { currentWorkValuePair, moveToken, optionsWithTokens } = useAssessmentStep3({
        mockQuestionNumber: 1,
      });

      const [leftValue, rightValue] = currentWorkValuePair.options;

      return (
        <>
          <button data-testid='add-left' onClick={() => moveToken(leftValue.id)} />
          <button data-testid='add-right' onClick={() => moveToken(rightValue.id)} />
          <button data-testid='move-left' onClick={() => moveToken(leftValue.id, rightValue.id)} />
          <button data-testid='move-right' onClick={() => moveToken(rightValue.id, leftValue.id)} />
          {optionsWithTokens.map((opt) => (
            <span key={opt.optionId} data-testid='options'>
              {opt.optionId} : {opt.tokens}
            </span>
          ))}
        </>
      );
    }

    const { getAllByTestId, getByTestId, queryAllByTestId } =
      renderWithUseAssessment(TesterComponent);

    expect(queryAllByTestId(/options/)).toHaveLength(0);

    fireEvent.click(getByTestId(/add-left/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(1);
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('1 : 1');

    fireEvent.click(getByTestId(/add-left/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(1);
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('1 : 2');

    fireEvent.click(getByTestId(/add-left/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(1);
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('1 : 3');

    fireEvent.click(getByTestId(/add-left/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(1);
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('1 : 3');

    fireEvent.click(getByTestId(/move-right/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(2);
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('2 : 1');
    expect(getAllByTestId(/options/)[1]).toHaveTextContent('1 : 2');

    fireEvent.click(getByTestId(/move-right/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(2);
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('2 : 2');
    expect(getAllByTestId(/options/)[1]).toHaveTextContent('1 : 1');

    fireEvent.click(getByTestId(/move-right/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(2);
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('2 : 3');
    expect(getAllByTestId(/options/)[1]).toHaveTextContent('1 : 0');

    fireEvent.click(getByTestId(/move-right/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(2);
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('2 : 3');
    expect(getAllByTestId(/options/)[1]).toHaveTextContent('1 : 0');

    fireEvent.click(getByTestId(/move-left/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(2);
    expect(getAllByTestId(/options/)[1]).toHaveTextContent('2 : 2');
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('1 : 1');

    fireEvent.click(getByTestId(/move-left/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(2);
    expect(getAllByTestId(/options/)[1]).toHaveTextContent('2 : 1');
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('1 : 2');

    fireEvent.click(getByTestId(/move-left/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(2);
    expect(getAllByTestId(/options/)[1]).toHaveTextContent('2 : 0');
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('1 : 3');

    fireEvent.click(getByTestId(/move-left/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/options/)).toHaveLength(2);
    expect(getAllByTestId(/options/)[1]).toHaveTextContent('2 : 0');
    expect(getAllByTestId(/options/)[0]).toHaveTextContent('1 : 3');
  });

  it('process next question properly', async () => {
    function TesterComponent() {
      const { currentWorkValuePair, moveToken, processQuestionData } = useAssessmentStep3({
        mockQuestionNumber: 1,
      });
      const { workValuesAnswers } = useAssessment();

      const [leftValue] = currentWorkValuePair.options;

      return (
        <>
          <button data-testid='add-left' onClick={() => moveToken(leftValue.id)} />
          <button data-testid='process' onClick={processQuestionData} />
          {workValuesAnswers.map((wva) => (
            <span key={wva.optionId} data-testid='answers'>
              {wva.optionId} : {wva.tokens}
            </span>
          ))}
        </>
      );
    }

    const { getAllByTestId, getByTestId, queryAllByTestId } =
      renderWithUseAssessment(TesterComponent);

    expect(queryAllByTestId(/answers/)).toHaveLength(0);

    fireEvent.click(getByTestId(/add-left/));
    await act(() => Promise.resolve({}));

    fireEvent.click(getByTestId(/add-left/));
    await act(() => Promise.resolve({}));

    fireEvent.click(getByTestId(/add-left/));
    await act(() => Promise.resolve({}));

    fireEvent.click(getByTestId(/process/));
    await act(() => Promise.resolve({}));

    expect(getAllByTestId(/answers/)).toHaveLength(2);
    expect(getAllByTestId(/answers/)[0]).toHaveTextContent('1 : 3');
    expect(getAllByTestId(/answers/)[1]).toHaveTextContent('2 : 0');
  });
});
