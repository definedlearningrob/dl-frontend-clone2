import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithI18N } from '@dc/utils/test';

import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';

import { PlanStatementQuestion } from './PlanStatementQuestion';

const defaultOptions = [
  {
    option: 'First option',
    id: '1',
  },
  {
    option: 'Second option',
    id: '2',
  },
  { option: 'Third option', id: '3' },
];

const onSubmit = jest.fn();

describe('StatementQuestion', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Short text', () => {
    const questionType = STATEMENT_QUESTION_TYPE.SHORT_TEXT;

    it('displays text input without initial answer', async () => {
      const { container } = renderWithI18N(
        <PlanStatementQuestion
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const textInput = screen.getByRole('textbox');
      expect(textInput).toHaveValue('');

      const saveButton = screen.getByRole('button', { name: 'Save' });
      await waitFor(() => {
        expect(saveButton).toBeDisabled();
      });

      expect(container).toMatchSnapshot();
    });

    it('displays text input with initial answer', () => {
      renderWithI18N(
        <PlanStatementQuestion
          answer={['Initial answer']}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const textInput = screen.getByRole('textbox');
      expect(textInput).toHaveValue('Initial answer');
      expect(textInput).toBeDisabled();
    });

    it('enables edit mode when clicking "Edit" button', () => {
      renderWithI18N(
        <PlanStatementQuestion
          answer={['Initial answer']}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const editButton = screen.getByRole('button', { name: 'Edit' });
      userEvent.click(editButton);

      const textInput = screen.getByRole('textbox');
      expect(textInput).not.toBeDisabled();
    });

    it('fires save action with correct values', async () => {
      renderWithI18N(
        <PlanStatementQuestion
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const textInput = screen.getByRole('textbox');
      userEvent.paste(textInput, 'Example answer');
      userEvent.click(screen.getByRole('button', { name: 'Save' }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
      expect(onSubmit).toHaveBeenCalledWith('Example answer');
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
      expect(textInput).toBeDisabled();
    });
  });

  describe('Long text', () => {
    const questionType = STATEMENT_QUESTION_TYPE.LONG_TEXT;

    it('displays text area without initial answer', async () => {
      const { container } = renderWithI18N(
        <PlanStatementQuestion
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveValue('');

      const saveButton = screen.getByRole('button', { name: 'Save' });
      await waitFor(() => {
        expect(saveButton).toBeDisabled();
      });

      expect(container).toMatchSnapshot();
    });

    it('displays text area with initial answer', () => {
      renderWithI18N(
        <PlanStatementQuestion
          answer={['Initial answer']}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveValue('Initial answer');
      expect(textarea).toBeDisabled();
    });

    it('enables edit mode when clicking "Edit" button', () => {
      renderWithI18N(
        <PlanStatementQuestion
          answer={['Initial answer']}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const editButton = screen.getByRole('button', { name: 'Edit' });
      userEvent.click(editButton);

      const textarea = screen.getByRole('textbox');
      expect(textarea).not.toBeDisabled();
    });

    it('fires save action with correct values', async () => {
      renderWithI18N(
        <PlanStatementQuestion
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const textarea = screen.getByRole('textbox');
      userEvent.paste(textarea, 'Example answer');
      userEvent.click(screen.getByRole('button', { name: 'Save' }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
      expect(onSubmit).toHaveBeenCalledWith('Example answer');
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
      expect(textarea).toBeDisabled();
    });
  });

  describe('Single choice', () => {
    const questionType = STATEMENT_QUESTION_TYPE.SINGLE_CHOICE;

    it('displays radio buttons without initial answer', async () => {
      const { container } = renderWithI18N(
        <PlanStatementQuestion
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const radioButtons = screen.getAllByRole('radio');
      expect(radioButtons).toHaveLength(3);

      expect(radioButtons[0]).toHaveAccessibleName('First option');
      expect(radioButtons[1]).toHaveAccessibleName('Second option');
      expect(radioButtons[2]).toHaveAccessibleName('Third option');

      const saveButton = screen.getByRole('button', { name: 'Save' });
      await waitFor(() => {
        expect(saveButton).toBeDisabled();
      });

      expect(container).toMatchSnapshot();
    });

    it('displays radio buttons with initial answer', () => {
      renderWithI18N(
        <PlanStatementQuestion
          answer={['Second option']}
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const radioButtons = screen.getAllByRole('radio');
      expect(radioButtons).toHaveLength(3);

      expect(radioButtons[0]).not.toBeChecked();
      expect(radioButtons[1]).toBeChecked();
      expect(radioButtons[2]).not.toBeChecked();

      expect(radioButtons[0]).toBeDisabled();
      expect(radioButtons[1]).toBeDisabled();
      expect(radioButtons[2]).toBeDisabled();
    });

    it('enables edit mode when clicking "Edit" button', () => {
      renderWithI18N(
        <PlanStatementQuestion
          answer={['2']}
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const editButton = screen.getByRole('button', { name: 'Edit' });
      userEvent.click(editButton);

      const firstRadioButton = screen.getByRole('radio', { name: 'First option' });
      expect(firstRadioButton).not.toBeDisabled();
    });

    it('fires save action with correct values', async () => {
      renderWithI18N(
        <PlanStatementQuestion
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const thirdRadioButton = screen.getByRole('radio', { name: 'Third option' });
      userEvent.click(thirdRadioButton);
      userEvent.click(screen.getByRole('button', { name: 'Save' }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
      expect(onSubmit).toHaveBeenCalledWith(['Third option']);
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
      expect(thirdRadioButton).toBeDisabled();
    });
  });

  describe('Multiple choice', () => {
    const questionType = STATEMENT_QUESTION_TYPE.MULTIPLE_CHOICE;

    it('displays checkboxes without initial answer', async () => {
      const { container } = renderWithI18N(
        <PlanStatementQuestion
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(3);

      expect(checkboxes[0]).toHaveAccessibleName('First option');
      expect(checkboxes[1]).toHaveAccessibleName('Second option');
      expect(checkboxes[2]).toHaveAccessibleName('Third option');

      const saveButton = screen.getByRole('button', { name: 'Save' });
      await waitFor(() => {
        expect(saveButton).toBeDisabled();
      });

      expect(container).toMatchSnapshot();
    });

    it('displays checkboxes with initial answer', () => {
      renderWithI18N(
        <PlanStatementQuestion
          answer={['First option', 'Second option']}
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(3);

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();

      expect(checkboxes[0]).toBeDisabled();
      expect(checkboxes[1]).toBeDisabled();
      expect(checkboxes[2]).toBeDisabled();
    });

    it('enables edit mode when clicking "Edit" button', () => {
      renderWithI18N(
        <PlanStatementQuestion
          answer={['First option', 'Second option']}
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const editButton = screen.getByRole('button', { name: 'Edit' });
      userEvent.click(editButton);

      const firstCheckbox = screen.getByRole('checkbox', { name: 'First option' });
      expect(firstCheckbox).not.toBeDisabled();
    });

    it('fires save action with correct values', async () => {
      renderWithI18N(
        <PlanStatementQuestion
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const [firstCheckbox, , thirdCheckbox] = screen.getAllByRole('checkbox');
      userEvent.click(firstCheckbox);
      userEvent.click(thirdCheckbox);
      userEvent.click(screen.getByRole('button', { name: 'Save' }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
      expect(onSubmit).toHaveBeenCalledWith(['First option', 'Third option']);
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
      expect(firstCheckbox).toBeDisabled();
    });
  });

  describe('Multiple choice dropdown', () => {
    const questionType = STATEMENT_QUESTION_TYPE.MULTIPLE_CHOICE_DROPDOWN;

    it('displays select without initial answer', async () => {
      const { container } = renderWithI18N(
        <PlanStatementQuestion
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveValue('');

      const saveButton = screen.getByRole('button', { name: 'Save' });
      await waitFor(() => {
        expect(saveButton).toBeDisabled();
      });

      expect(container).toMatchSnapshot();
    });

    it('displays select with initial answer', () => {
      renderWithI18N(
        <PlanStatementQuestion
          answer={['First option', 'Second option']}
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const select = screen.queryByRole('combobox');
      // select input is hidden when it is disabled
      expect(select).not.toBeInTheDocument();

      const selectedValueChip = screen.getByTestId('select-chip');
      expect(selectedValueChip).toHaveTextContent('2 selected');
    });

    it('enables edit mode when clicking "Edit" button', () => {
      renderWithI18N(
        <PlanStatementQuestion
          answer={['First option', 'Second option']}
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const editButton = screen.getByRole('button', { name: 'Edit' });
      userEvent.click(editButton);

      const select = screen.getByRole('combobox');
      expect(select).not.toBeDisabled();
    });

    it('fires save action with correct values', async () => {
      renderWithI18N(
        <PlanStatementQuestion
          options={defaultOptions}
          questionType={questionType}
          text='Example question'
          onSubmit={onSubmit}
        />
      );

      const select = screen.getByRole('combobox');
      userEvent.type(select, '{enter}');
      expect(screen.getByTestId('select-chip')).toHaveTextContent('First option');

      userEvent.type(select, '{arrowdown}{enter}');
      expect(screen.getByTestId('select-chip')).toHaveTextContent('2 selected');

      userEvent.click(screen.getByRole('button', { name: 'Save' }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
      expect(onSubmit).toHaveBeenCalledWith(['First option', 'Second option']);
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    });
  });
});
