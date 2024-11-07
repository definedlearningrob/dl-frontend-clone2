import { screen, within } from '@testing-library/react';
import { ComponentProps } from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithI18N } from '@shared/utils/renderWithI18N';

import { NewTable, TableColumns } from './NewTable';

type User = {
  id: string;
  age: number;
  firstName: string;
  lastName: string;
  email: string;
};

const data = [
  {
    id: '1',
    firstName: 'Jon',
    lastName: 'Doe',
    age: 20,
    email: 'jon.doe@test.com',
  },
  {
    id: '2',
    firstName: 'Allison',
    lastName: 'Adams',
    age: 30,
    email: 'allison.adams@test.com',
  },
  {
    id: '3',
    firstName: 'James',
    lastName: 'Lebron',
    age: 17,
    email: 'james.lebron@test.com',
  },
  {
    id: '4',
    firstName: 'Mary',
    lastName: 'Jordan',
    age: 23,
    email: 'mary.jordan@test.com',
  },
  {
    id: '5',
    firstName: 'Cheryl',
    lastName: 'Kozey',
    age: 41,
    email: 'cheryl.kozey@test.com',
  },
  {
    id: '6',
    firstName: 'Brad',
    lastName: 'Upton',
    age: 32,
    email: 'brad.upton@test.com',
  },
];

const columns: TableColumns<User> = [
  {
    id: 'fullName',
    accessorFn: (user) => `${user.firstName} ${user.lastName}`,
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
];

type TableProps = Partial<
  Pick<
    ComponentProps<typeof NewTable>,
    'enableSorting' | 'onTableStateChange' | 'pagesCount' | 'nodesCount' | 'onRowClick'
  >
>;

const renderComponent = (props?: TableProps) =>
  renderWithI18N(<NewTable columns={columns} data={data} {...props} />, 'DC');

describe('NewTable', () => {
  it('renders a table with correct data', () => {
    const { container } = renderComponent({ pagesCount: 3, nodesCount: 30 });

    const [tableHead, ...tableBodyRows] = screen.getAllByRole('row');

    const tableColumnHeaders = within(tableHead).getAllByRole('columnheader');
    expect(tableColumnHeaders).toHaveLength(3);
    expect(tableBodyRows).toHaveLength(6);

    expect(container).toMatchSnapshot();
  });

  it('sorts table data after clicking column header', () => {
    const onTableStateChange = jest.fn();
    renderComponent({
      onTableStateChange,
      enableSorting: true,
      pagesCount: 3,
      nodesCount: 30,
    });

    const nameColumnHeader = screen.getByRole('columnheader', { name: 'Name' });
    userEvent.click(nameColumnHeader);

    expect(onTableStateChange).toHaveBeenCalled();
    expect(onTableStateChange).toHaveBeenCalledWith({
      pagination: { pageIndex: 0, pageSize: 25 },
      sorting: [{ desc: false, id: 'fullName' }],
    });
  });

  it('updates page size after changing it using pagination select', () => {
    const onTableStateChange = jest.fn();
    renderComponent({
      onTableStateChange,
      pagesCount: 3,
      nodesCount: 30,
    });

    expect(screen.getByText('Results: 1 - 25 of 30')).toBeInTheDocument();
    const pageSizeSelectInput = screen.getByRole('combobox', { name: 'Select page size' });

    userEvent.click(pageSizeSelectInput);
    userEvent.type(pageSizeSelectInput, '{arrowup}{enter}');

    expect(onTableStateChange).toHaveBeenCalled();
    expect(onTableStateChange).toHaveBeenCalledWith({
      pagination: { pageIndex: 0, pageSize: 100 },
      sorting: [],
    });

    expect(screen.getByText('Results: 1 - 30 of 30')).toBeInTheDocument();
  });

  it('updates page number after clicking page button', () => {
    const onTableStateChange = jest.fn();
    renderComponent({
      onTableStateChange,
      pagesCount: 3,
      nodesCount: 30,
    });

    const prevButton = screen.getByRole('button', { name: 'Prev' });
    expect(prevButton).toBeDisabled();

    const nextButton = screen.getByRole('button', { name: 'Next' });
    userEvent.click(nextButton);

    expect(onTableStateChange).toHaveBeenCalled();
    expect(onTableStateChange).toHaveBeenCalledWith({
      pagination: { pageIndex: 1, pageSize: 25 },
      sorting: [],
    });

    onTableStateChange.mockReset();

    const thirdPageButton = screen.getByRole('button', { name: '3' });
    userEvent.click(thirdPageButton);

    expect(onTableStateChange).toHaveBeenCalled();
    expect(onTableStateChange).toHaveBeenCalledWith({
      pagination: { pageIndex: 2, pageSize: 25 },
      sorting: [],
    });
  });

  it('performs an action after clicking on a row', () => {
    const onRowClick = jest.fn();
    renderComponent({ onRowClick });

    const tableRow = screen.getByRole('row', { name: /Mary Jordan/ });
    userEvent.click(tableRow);

    expect(onRowClick).toHaveBeenCalled();
    expect(onRowClick).toHaveBeenCalledWith('4');
  });
});
