import { screen } from '@testing-library/react';

import { Question } from '@shared/components/StudentReport/ProgressDetails/Question';
import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';
import { renderWithI18N } from '@shared/utils/renderWithI18N';

describe('Question component', () => {
  it('should render nothing when question is empty', () => {
    const { container } = renderWithI18N(<Question question={null} />, 'DC');
    expect(screen.queryByText(/answer/i)).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('should render short text question correctly', () => {
    const question = {
      questionType: STATEMENT_QUESTION_TYPE.SHORT_TEXT,
      text: 'Test question',
      id: '1',
      answer: { answer: ['Test short answer'], id: '1' },
      options: [],
    };

    const { container } = renderWithI18N(<Question question={question} />, 'DC');

    expect(screen.getByText(/test question/i)).toBeInTheDocument();
    expect(screen.getByText(/test short answer/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render long text question correctly', () => {
    const question = {
      questionType: STATEMENT_QUESTION_TYPE.LONG_TEXT,
      text: 'Test question',
      id: '1',
      answer: { answer: ['Test long answer'], id: '1' },
      options: [],
    };

    const { container } = renderWithI18N(<Question question={question} />, 'DC');

    expect(screen.getByText(/test question/i)).toBeInTheDocument();
    expect(screen.getByText(/test long answer/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render single choice question correctly', () => {
    const question = {
      questionType: STATEMENT_QUESTION_TYPE.SINGLE_CHOICE,
      text: 'Test question',
      id: '1',
      answer: { answer: ['Option 2'], id: '1' },
      options: [
        { id: '1', option: 'Option 1' },
        { id: '2', option: 'Option 2' },
        { id: '3', option: 'Option 3' },
      ],
    };

    const { container } = renderWithI18N(<Question question={question} />, 'DC');

    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render multiple choice question correctly', () => {
    const question = {
      questionType: STATEMENT_QUESTION_TYPE.MULTIPLE_CHOICE,
      text: 'Test question',
      id: '1',
      answer: { answer: ['Option 1', 'Option 3', 'Option 4'], id: '1' },
      options: [
        { id: '1', option: 'Option 1' },
        { id: '2', option: 'Option 2' },
        { id: '3', option: 'Option 3' },
        { id: '4', option: 'Option 4' },
      ],
    };

    const { container } = renderWithI18N(<Question question={question} />, 'DC');

    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(screen.getByText('Option 1, Option 3, Option 4')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render multiple choice dropdown question correctly', () => {
    const question = {
      questionType: STATEMENT_QUESTION_TYPE.MULTIPLE_CHOICE_DROPDOWN,
      text: 'Test question',
      id: '1',
      answer: { answer: ['Option 1', 'Option 2'], id: '1' },
      options: [
        { id: '1', option: 'Option 1' },
        { id: '2', option: 'Option 2' },
        { id: '3', option: 'Option 3' },
      ],
    };

    const { container } = renderWithI18N(<Question question={question} />, 'DC');

    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(screen.getByText('Option 1, Option 2')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should not render options that are not in the answer', () => {
    const question = {
      questionType: STATEMENT_QUESTION_TYPE.MULTIPLE_CHOICE_DROPDOWN,
      text: 'Test question',
      id: '1',
      answer: { answer: ['Option 1', 'Option 2'], id: '1' },
      options: [
        { id: '1', option: 'Option 1' },
        { id: '2', option: 'Option 2' },
        { id: '3', option: 'Option 3' },
      ],
    };

    const { container } = renderWithI18N(<Question question={question} />, 'DC');

    expect(screen.getByText(/option 1, option 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/option 3/i)).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('should render placeholders if answers are not passed', () => {
    const question = {
      questionType: STATEMENT_QUESTION_TYPE.MULTIPLE_CHOICE_DROPDOWN,
      text: 'Test question',
      id: '1',
      answer: null,
      options: [
        { id: '1', option: 'Option 1' },
        { id: '2', option: 'Option 2' },
        { id: '3', option: 'Option 3' },
      ],
    };

    const { container } = renderWithI18N(<Question question={question} />, 'DC');

    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(screen.getByText('This question has not been answered yet.')).toBeInTheDocument();
    expect(screen.queryByText(/option/i)).toBeNull();

    expect(container).toMatchSnapshot();
  });
});
