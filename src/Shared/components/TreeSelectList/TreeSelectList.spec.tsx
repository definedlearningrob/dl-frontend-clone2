import { render, screen, within } from '@testing-library/react';
import { noop } from 'lodash-es';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';

import i18n from '@shared/i18n';

import { TreeSelectList } from './TreeSelectList';

const options = [
  {
    label: 'Calculus',
    value: '1',
    children: [
      {
        label: 'John Doe',
        value: '11',
        children: [],
        withAvatar: true,
      },
      {
        label: 'Jennifer Fox',
        value: '12',
        children: [],
        withAvatar: true,
      },
    ],
  },
  {
    label: 'Statistics',
    value: '2',
    children: [
      {
        label: 'Amy Smith',
        value: '21',
        children: [],
        withAvatar: true,
      },
    ],
  },
];

const renderComponent = (value: string[], onChange = noop) =>
  render(
    <I18nextProvider i18n={i18n}>
      <TreeSelectList
        label='Label'
        options={options}
        placeholder='Select options'
        value={value}
        onChange={onChange}
      />
    </I18nextProvider>
  );

describe('TreeSelectList', () => {
  it('renders correctly with selected values', () => {
    const { container } = renderComponent(['12', '21']);

    const selectedValues = screen.getAllByTestId('selected-value-chip');
    expect(selectedValues).toHaveLength(2);

    expect(selectedValues[0]).toHaveTextContent('Jennifer Fox');
    expect(selectedValues[1]).toHaveTextContent('Amy Smith');

    expect(container).toMatchSnapshot();
  });

  it('sets correct value when selecting parent option', () => {
    const onChange = jest.fn();
    renderComponent([], onChange);

    const parentOption = screen.getByRole('listitem', { name: 'Calculus' });
    userEvent.click(parentOption);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['11', '12']);
  });

  it('sets correct value when deselecting parent option', () => {
    const onChange = jest.fn();
    renderComponent(['11', '12', '21'], onChange);

    const parentOption = screen.getByRole('listitem', { name: 'Calculus' });
    userEvent.click(parentOption);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['21']);
  });

  it('toggles children option value', () => {
    const onChange = jest.fn();
    renderComponent(['11'], onChange);

    const parentOption = screen.getByRole('listitem', { name: 'Calculus' });
    const expandButton = within(parentOption).getByRole('button', { name: 'Expand' });
    userEvent.click(expandButton);

    const selectedOption = screen.getByRole('listitem', { name: 'John Doe' });
    const notSelectedOption = screen.getByRole('listitem', { name: 'Jennifer Fox' });

    userEvent.click(selectedOption);
    expect(onChange).toHaveBeenCalledWith([]);

    userEvent.click(notSelectedOption);
    expect(onChange).toHaveBeenCalledWith(['11', '12']);
  });

  it('removes value when clicking remove button on a chip', () => {
    const onChange = jest.fn();
    renderComponent(['11'], onChange);

    const removeButton = screen.getByRole('button', { name: 'Remove John Doe' });
    userEvent.click(removeButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('filters options correctly', () => {
    renderComponent([]);

    const searchInput = screen.getByRole('textbox', { name: 'Label' });
    userEvent.paste(searchInput, 'John');

    const options = screen.getAllByRole('listitem');
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('Calculus');

    const [parentOption] = options;
    const expandButton = within(parentOption).getByRole('button', { name: 'Expand' });
    userEvent.click(expandButton);

    const expandedOptions = screen.getAllByRole('listitem');
    expect(expandedOptions).toHaveLength(2);
    expect(expandedOptions[0]).toHaveTextContent('Calculus');
    expect(expandedOptions[1]).toHaveTextContent('John Doe');
  });
});
