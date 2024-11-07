import { createMemoryHistory } from 'history';
import { waitFor } from '@testing-library/dom';

import useQueryParams from '@shared/hooks/useQueryParams';
import { renderWithRouter } from '@shared/utils/test';

const renderWithProvider = (HookConsumer, history) =>
  renderWithRouter(<HookConsumer />, { history });

describe('hooks | useQueryParams', () => {
  it('shows params properly', () => {
    const history = createMemoryHistory({
      initialEntries: [
        {
          pathname: '/',
          search: '?firstParamName=firstParamValue&secondParamName=secondParamValue',
          state: { someKey: 'someValue' },
        },
      ],
    });
    const HookConsumer = () => {
      const { params } = useQueryParams();
      const paramKeys = Object.keys(params);
      const paramValues = Object.values(params);

      return (
        <>
          {paramKeys.map((key) => (
            <div key={key} data-testid='param-key'>
              {key}
            </div>
          ))}
          {paramValues.map((value) => (
            <div key={value} data-testid='param-value'>
              {value}
            </div>
          ))}
        </>
      );
    };

    const { getAllByTestId } = renderWithProvider(HookConsumer, history);

    const keys = getAllByTestId('param-key');
    const values = getAllByTestId('param-value');

    expect(keys).toHaveLength(2);
    expect(values).toHaveLength(2);
    expect(keys[0]).toHaveTextContent('firstParamName');
    expect(keys[1]).toHaveTextContent('secondParamName');
    expect(values[0]).toHaveTextContent('firstParamValue');
    expect(values[1]).toHaveTextContent('secondParamValue');
  });

  it('updates params properly', async () => {
    const history = createMemoryHistory({
      initialEntries: [
        {
          pathname: '/',
          search: '?firstParamName=firstParamValue&secondParamName=secondParamValue',
          state: { someKey: 'someValue' },
        },
      ],
    });
    const HookConsumer = () => {
      const { updateQueryParams } = useQueryParams();
      updateQueryParams({ updatedParamName: 'updatedParamValue' });

      return <div />;
    };

    renderWithProvider(HookConsumer, history);

    await waitFor(() => {
      expect(history.location.search).toEqual(
        '?firstParamName=firstParamValue&secondParamName=secondParamValue&updatedParamName=updatedParamValue'
      );
    });
    expect(history.location.state).toEqual({ someKey: 'someValue' });
  });

  it('removes single param properly', async () => {
    const history = createMemoryHistory({
      initialEntries: [
        {
          pathname: '/',
          search:
            '?firstParamName=firstParamValue&secondParamName=secondParamValue&thirdParamName=thirdParamValue',
          state: { someKey: 'someValue' },
        },
      ],
    });
    const HookConsumer = () => {
      const { removeQueryParams } = useQueryParams();
      removeQueryParams(['secondParamName']);

      return <div />;
    };

    renderWithProvider(HookConsumer, history);

    await waitFor(() => {
      expect(history.location.search).toEqual(
        '?firstParamName=firstParamValue&thirdParamName=thirdParamValue'
      );
    });
    expect(history.location.state).toEqual({ someKey: 'someValue' });
  });

  it('removes multi params properly', async () => {
    const history = createMemoryHistory({
      initialEntries: [
        {
          pathname: '/',
          search:
            '?firstParamName=firstParamValue&secondParamName=secondParamValue&thirdParamName=thirdParamValue',
          state: { someKey: 'someValue' },
        },
      ],
    });
    const HookConsumer = () => {
      const { removeQueryParams } = useQueryParams();
      removeQueryParams(['secondParamName', 'firstParamName']);

      return <div />;
    };

    renderWithProvider(HookConsumer, history);

    await waitFor(() => {
      expect(history.location.search).toEqual('?thirdParamName=thirdParamValue');
    });
    expect(history.location.state).toEqual({ someKey: 'someValue' });
  });
});
