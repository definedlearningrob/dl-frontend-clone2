import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import useAssessment from '@dc/hooks/useAssessment';
import useAssessmentStep1 from '@dc/hooks/useAssessmentStep1';
import { AssessmentProvider } from '@dc/hooks/useAssessment';
import { AssessmentStep1Provider } from '@dc/hooks/useAssessmentStep1';
import { renderWithRouter } from '@dc/utils/test';

const studyPreferencesOptions = [
  { id: '1', area: 'first', description: 'first desc' },
  { id: '2', area: 'second', description: 'second desc' },
  { id: '3', area: 'third', description: 'third desc' },
  { id: '4', area: 'fourth', description: 'fourth desc' },
  { id: '5', area: 'fifth', description: 'fifth desc' },
  { id: '6', area: 'sixth', description: 'sixth desc' },
  { id: '7', area: 'seventh', description: 'seventh desc' },
];

const renderWithUseAssessment = (TesterComponent, { useAssessmentProps } = {}) => {
  const utils = renderWithRouter(
    <MockedProvider mocks={[]}>
      <AssessmentProvider
        assessment={{ attempt: { id: 5 }, studyPreferencesAnswers: [], ...useAssessmentProps }}>
        <AssessmentStep1Provider studyPreferences={studyPreferencesOptions}>
          <TesterComponent />
        </AssessmentStep1Provider>
      </AssessmentProvider>
    </MockedProvider>
  );

  return { ...utils };
};

describe('useAssessmentStep1', () => {
  it('returns proper available study preferences when empty', async () => {
    function TesterComponent() {
      const { availableStudyPreferences } = useAssessmentStep1();

      return availableStudyPreferences.map((pref) => (
        <span key={pref.area} data-testid='available-preference'>
          {pref.area}
        </span>
      ));
    }

    const { getAllByTestId } = renderWithUseAssessment(TesterComponent);

    expect(getAllByTestId(/available-preference/)).toHaveLength(7);

    expect(getAllByTestId(/available-preference/)[0]).toHaveTextContent('first');
    expect(getAllByTestId(/available-preference/)[6]).toHaveTextContent('seventh');
  });

  it('returns proper available study preferences when existing answers', async () => {
    function TesterComponent() {
      const { availableStudyPreferences } = useAssessmentStep1();

      return availableStudyPreferences.map((pref) => (
        <span key={pref.area} data-testid='available-preference'>
          {pref.area}
        </span>
      ));
    }

    const { getAllByTestId } = renderWithUseAssessment(TesterComponent, {
      useAssessmentProps: {
        studyPreferencesAnswers: [
          { position: 1, option: studyPreferencesOptions[0] },
          { position: 7, option: studyPreferencesOptions[1] },
          { position: 2, option: studyPreferencesOptions[2] },
          { position: 6, option: studyPreferencesOptions[3] },
        ],
      },
    });

    expect(getAllByTestId(/available-preference/)).toHaveLength(3);

    expect(getAllByTestId(/available-preference/)[0]).toHaveTextContent('fifth');
    expect(getAllByTestId(/available-preference/)[1]).toHaveTextContent('sixth');
  });

  it('returns proper question completed state', async () => {
    function TesterComponent() {
      const { questionCompleted, setMostDesired, setLeastDesired } = useAssessmentStep1();

      return (
        <>
          <button
            data-testid='set-least'
            onClick={() => setLeastDesired(studyPreferencesOptions[0])}
          />
          <button
            data-testid='set-most'
            onClick={() => setMostDesired(studyPreferencesOptions[1])}
          />
          <span data-testid='q-completed'>{JSON.stringify(questionCompleted)}</span>
        </>
      );
    }

    const { getByTestId } = renderWithUseAssessment(TesterComponent);

    expect(getByTestId(/q-completed/)).toHaveTextContent('false');

    fireEvent.click(getByTestId(/set-least/));
    await act(() => Promise.resolve());

    expect(getByTestId(/q-completed/)).toHaveTextContent('false');

    fireEvent.click(getByTestId(/set-most/));
    await act(() => Promise.resolve());

    expect(getByTestId(/q-completed/)).toHaveTextContent('true');
  });

  it('process next question properly in first step', async () => {
    function TesterComponent() {
      const {
        availableStudyPreferences,
        leastDesired,
        mostDesired,
        processQuestionData,
        setMostDesired,
        setLeastDesired,
      } = useAssessmentStep1();
      const { studyPreferencesAnswers } = useAssessment();

      return (
        <>
          <button
            data-testid='set-most'
            onClick={() => setMostDesired(availableStudyPreferences[0])}
          />
          <button
            data-testid='set-least'
            onClick={() => setLeastDesired(availableStudyPreferences[1])}
          />
          <button data-testid='process' onClick={processQuestionData} />
          {studyPreferencesAnswers.map((answ) => (
            <span key={answ.option.id} data-testid='answers'>
              {answ.option.area} : {answ.position}
            </span>
          ))}
          <span data-testid='most-desired'>{JSON.stringify(mostDesired)}</span>
          <span data-testid='least-desired'>{JSON.stringify(leastDesired)}</span>
        </>
      );
    }

    const { getAllByTestId, getByTestId, queryAllByTestId } =
      renderWithUseAssessment(TesterComponent);

    expect(queryAllByTestId(/answers/)).toHaveLength(0);

    fireEvent.click(getByTestId(/set-least/));
    await act(() => Promise.resolve());

    fireEvent.click(getByTestId(/set-most/));
    await act(() => Promise.resolve());

    fireEvent.click(getByTestId(/process/));
    await act(() => Promise.resolve());

    expect(getAllByTestId(/answers/)).toHaveLength(2);
    expect(getAllByTestId(/answers/)[0]).toHaveTextContent('first : 1');
    expect(getAllByTestId(/answers/)[1]).toHaveTextContent('second : 7');
    expect(getByTestId('most-desired')).toHaveTextContent('null');
    expect(getByTestId('least-desired')).toHaveTextContent('null');
  });

  it('process next question properly in second step', async () => {
    function TesterComponent() {
      const {
        availableStudyPreferences,
        leastDesired,
        mostDesired,
        processQuestionData,
        setMostDesired,
        setLeastDesired,
      } = useAssessmentStep1();
      const { studyPreferencesAnswers } = useAssessment();

      return (
        <>
          <button
            data-testid='set-mostt'
            onClick={() => setMostDesired(availableStudyPreferences[0])}
          />
          <button
            data-testid='set-least'
            onClick={() => setLeastDesired(availableStudyPreferences[1])}
          />
          <button data-testid='process' onClick={processQuestionData} />
          {studyPreferencesAnswers.map((answ) => (
            <span key={answ.option.id} data-testid='answers'>
              {answ.option.area} : {answ.position}
            </span>
          ))}
          <span data-testid='most-desired'>{JSON.stringify(mostDesired)}</span>
          <span data-testid='least-desired'>{JSON.stringify(leastDesired)}</span>
        </>
      );
    }

    const { getAllByTestId, getByTestId, queryAllByTestId } = renderWithUseAssessment(
      TesterComponent,
      {
        useAssessmentProps: {
          studyPreferencesAnswers: [
            { position: 1, option: studyPreferencesOptions[0] },
            { position: 7, option: studyPreferencesOptions[1] },
          ],
        },
      }
    );

    expect(queryAllByTestId(/answers/)).toHaveLength(2);

    fireEvent.click(getByTestId(/set-least/));
    await act(() => Promise.resolve());

    fireEvent.click(getByTestId(/set-most/));
    await act(() => Promise.resolve());

    fireEvent.click(getByTestId(/process/));
    await act(() => Promise.resolve());

    expect(getAllByTestId(/answers/)).toHaveLength(4);
    expect(getAllByTestId(/answers/)[0]).toHaveTextContent('first : 1');
    expect(getAllByTestId(/answers/)[1]).toHaveTextContent('second : 7');
    expect(getAllByTestId(/answers/)[2]).toHaveTextContent('third : 2');
    expect(getAllByTestId(/answers/)[3]).toHaveTextContent('fourth : 6');
    expect(getByTestId('most-desired')).toHaveTextContent('null');
    expect(getByTestId('least-desired')).toHaveTextContent('null');
  });

  it('process next question properly in third step', async () => {
    function TesterComponent() {
      const {
        availableStudyPreferences,
        leastDesired,
        mostDesired,
        processQuestionData,
        setMostDesired,
        setLeastDesired,
      } = useAssessmentStep1();
      const { studyPreferencesAnswers } = useAssessment();

      return (
        <>
          <button
            data-testid='set-mostt'
            onClick={() => setMostDesired(availableStudyPreferences[0])}
          />
          <button
            data-testid='set-least'
            onClick={() => setLeastDesired(availableStudyPreferences[1])}
          />
          <button data-testid='process' onClick={processQuestionData} />
          {studyPreferencesAnswers.map((answ) => (
            <span key={answ.option.id} data-testid='answers'>
              {answ.option.area} : {answ.position}
            </span>
          ))}
          <span data-testid='most-desired'>{JSON.stringify(mostDesired)}</span>
          <span data-testid='least-desired'>{JSON.stringify(leastDesired)}</span>
        </>
      );
    }

    const { getAllByTestId, getByTestId, queryAllByTestId } = renderWithUseAssessment(
      TesterComponent,
      {
        useAssessmentProps: {
          studyPreferencesAnswers: [
            { position: 1, option: studyPreferencesOptions[0] },
            { position: 7, option: studyPreferencesOptions[1] },
            { position: 2, option: studyPreferencesOptions[2] },
            { position: 6, option: studyPreferencesOptions[3] },
          ],
        },
      }
    );

    expect(queryAllByTestId(/answers/)).toHaveLength(4);

    fireEvent.click(getByTestId(/set-least/));
    await act(() => Promise.resolve());

    fireEvent.click(getByTestId(/set-most/));
    await act(() => Promise.resolve());

    fireEvent.click(getByTestId(/process/));
    await act(() => Promise.resolve());

    expect(getAllByTestId(/answers/)).toHaveLength(7);
    expect(getAllByTestId(/answers/)[0]).toHaveTextContent('first : 1');
    expect(getAllByTestId(/answers/)[1]).toHaveTextContent('second : 7');
    expect(getAllByTestId(/answers/)[2]).toHaveTextContent('third : 2');
    expect(getAllByTestId(/answers/)[3]).toHaveTextContent('fourth : 6');
    expect(getAllByTestId(/answers/)[4]).toHaveTextContent('fifth : 3');
    expect(getAllByTestId(/answers/)[5]).toHaveTextContent('sixth : 5');
    expect(getAllByTestId(/answers/)[6]).toHaveTextContent('seventh : 4');
    expect(getByTestId('most-desired')).toHaveTextContent('null');
    expect(getByTestId('least-desired')).toHaveTextContent('null');
  });
});
