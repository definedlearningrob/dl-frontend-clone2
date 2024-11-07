import { render } from '@testing-library/react';

import SharedTableList from '@dc/shared/TableList/TableList';

describe('SharedTableList', () => {
  it('renders properly', () => {
    const items = [
      { name: 'first name', description: 'first desc' },
      { name: 'second name', description: 'second desc' },
      { name: 'third name', description: 'third desc' },
    ];
    const { getByTestId, getAllByTestId } = render(
      <SharedTableList data-testid='table'>
        <SharedTableList.Head data-testid='table-head'>
          <SharedTableList.Header data-testid='name-header'>name</SharedTableList.Header>
          <SharedTableList.Header data-testid='description-header'>
            description
          </SharedTableList.Header>
        </SharedTableList.Head>
        <SharedTableList.Body data-testid='table-body' items={items}>
          {({ item }) => (
            <SharedTableList.Row key={item.name} data-testid='table-row'>
              <SharedTableList.Cell data-testid='table-name-cell'>{item.name}</SharedTableList.Cell>
              <SharedTableList.Cell data-testid='table-description-cell'>
                {item.description}
              </SharedTableList.Cell>
            </SharedTableList.Row>
          )}
        </SharedTableList.Body>
      </SharedTableList>
    );

    expect(getByTestId(/table$/i)).toMatchSnapshot();
    expect(getByTestId(/name-header/).textContent).toEqual('name');
    expect(getByTestId(/description-header/).textContent).toEqual('description');
    expect(getAllByTestId(/table-row/).length).toEqual(3);

    const itemNames = getAllByTestId(/table-name-cell/);
    const itemDescriptions = getAllByTestId(/table-description-cell/);

    expect(itemNames[0].textContent).toEqual('first name');
    expect(itemNames[1].textContent).toEqual('second name');
    expect(itemNames[2].textContent).toEqual('third name');

    expect(itemDescriptions[0].textContent).toEqual('first desc');
    expect(itemDescriptions[1].textContent).toEqual('second desc');
    expect(itemDescriptions[2].textContent).toEqual('third desc');
  });
});
