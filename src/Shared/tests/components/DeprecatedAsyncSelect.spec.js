import { fireEvent, waitFor } from '@testing-library/react';
import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';

import { renderWithI18N } from '@dc/utils/test';

import { DeprecatedAsyncSelect } from '@shared/components/DeprecatedAsyncSelect';

const testingQuery = gql(`
  query Plans($perPage: Int, $filter: Object) {
    plans(perPage: $perPage, filter: $filter) {
      nodes {
        name,
      }
    }
  }
`);

const defaultMocks = [
  {
    request: {
      query: testingQuery,
      variables: { filter: { nameCont: '' }, perPage: 1000 },
    },
    result: {
      data: {
        plans: {
          nodes: [{ name: 'First plan' }, { name: 'Second plan' }, { name: 'Third plan' }],
        },
      },
    },
  },
];

// eslint-disable-next-line react/prop-types
const OptionComponent = ({ data }) => (
  <div data-testid='option'>
    {/* eslint-disable-next-line react/prop-types */}
    {data.name}
  </div>
);

// eslint-disable-next-line react/prop-types
const SelectedValueComponent = ({ data }) => (
  // eslint-disable-next-line react/prop-types
  <span data-testid='selected-option'>{data.name}</span>
);

const renderSelect = (props, mocks = []) => {
  const utils = renderWithI18N(
    <MockedProvider mocks={[...defaultMocks, ...mocks]}>
      <DeprecatedAsyncSelect
        OptionComponent={OptionComponent}
        SelectedValueComponent={SelectedValueComponent}
        dataKey='plans.nodes'
        filterName='nameCont'
        query={testingQuery}
        valueKey='name'
        onChange={jest.fn()}
        {...props}
      />
    </MockedProvider>
  );

  return { ...utils };
};

describe('DeprecatedAsyncSelect', () => {
  it('shows proper data on options by dataKey', async () => {
    const { getAllByTestId } = renderSelect({ SelectedValueComponent, OptionComponent });

    await waitFor(() => {
      fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
    });

    await waitFor(() => {
      const options = getAllByTestId(/option/);

      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent('First plan');
      expect(options[1]).toHaveTextContent('Second plan');
      expect(options[2]).toHaveTextContent('Third plan');
    });
  });

  it('filters properly by passed filter value', async () => {
    const spy = jest.fn();
    const mocks = [
      {
        request: {
          query: testingQuery,
          variables: { filter: { nameCont: 'filter' }, perPage: 1000 },
        },
        result() {
          spy();

          return { data: { plans: { nodes: [{ name: 'Found' }] } } };
        },
      },
    ];

    const { getAllByTestId } = renderSelect({ SelectedValueComponent, OptionComponent }, mocks);

    await waitFor(() => {
      fireEvent.change(document.querySelector('.dc-async-select input'), {
        target: { value: 'filter' },
      });
    });

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(getAllByTestId(/option/)).toHaveLength(1);
      expect(getAllByTestId(/option/)[0]).toHaveTextContent('Found');
    });
  });

  it('selects and displays selected option', async () => {
    const { getAllByTestId, getByTestId } = renderSelect({
      SelectedValueComponent,
      OptionComponent,
    });

    await waitFor(() => {
      fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
    });

    await waitFor(() => {
      fireEvent.click(getAllByTestId(/option/)[0]);
    });

    await waitFor(() => {
      expect(getByTestId(/selected-option/)).toHaveTextContent('First plan');
    });
  });
});
