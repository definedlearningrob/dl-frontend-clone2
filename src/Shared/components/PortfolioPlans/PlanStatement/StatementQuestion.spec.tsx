import { screen, waitFor } from '@testing-library/dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { renderWithI18N } from '@dc/utils/test';

import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';
import {
  ANSWER_STATEMENT_QUESTION,
  TAnswerStatementQuestionData,
  TAnswerStatementQuestionMutationInput,
} from '@shared/graphql/shared/mutations/answerPlanGroupStatementQuestion';

import { StatementQuestion } from './StatementQuestion';

const answerStatementQuestionSpy = jest.fn();

const answerStatementQuestionMock: MockedResponse<
  TAnswerStatementQuestionData,
  TAnswerStatementQuestionMutationInput
> = {
  request: {
    query: ANSWER_STATEMENT_QUESTION,
    variables: { input: { answer: ['Example answer'], evaluationId: '1', questionId: '123' } },
  },
  result() {
    answerStatementQuestionSpy();

    return {
      data: {
        answerPlanGroupStatementQuestion: {
          answer: {
            answer: ['Example answer'],
            id: '789',
          },
        },
      },
    };
  },
};

describe('StatementQuestion', () => {
  it('initializes with correct values', () => {
    const { container } = renderWithI18N(
      <MockedProvider>
        <StatementQuestion
          evaluationId='1'
          question={{
            id: '123',
            questionType: STATEMENT_QUESTION_TYPE.SHORT_TEXT,
            options: [],
            text: 'Example question',
            answer: { answer: ['Initial answer'], id: '456' },
          }}
        />
      </MockedProvider>
    );

    const textInput = screen.getByRole('textbox');
    expect(textInput).toHaveValue('Initial answer');
    expect(textInput).toBeDisabled();

    expect(container).toMatchSnapshot();
  });

  it('does not render when text is empty string', () => {
    const { container } = renderWithI18N(
      <MockedProvider>
        <StatementQuestion
          evaluationId='1'
          question={{
            id: '123',
            questionType: STATEMENT_QUESTION_TYPE.SHORT_TEXT,
            options: [],
            text: '',
            answer: { answer: ['Initial answer'], id: '456' },
          }}
        />
      </MockedProvider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('saves filled answer correctly', async () => {
    renderWithI18N(
      <MockedProvider mocks={[answerStatementQuestionMock]}>
        <StatementQuestion
          evaluationId='1'
          question={{
            id: '123',
            questionType: STATEMENT_QUESTION_TYPE.SHORT_TEXT,
            options: [],
            text: 'Example question',
            answer: null,
          }}
        />
      </MockedProvider>
    );

    const textInput = screen.getByRole('textbox');
    userEvent.type(textInput, 'Example answer');

    const saveButton = screen.getByRole('button', { name: 'Save' });
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(answerStatementQuestionSpy).toHaveBeenCalledTimes(1);
    });
  });
});
