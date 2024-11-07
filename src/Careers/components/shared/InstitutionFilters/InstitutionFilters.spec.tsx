import { act, screen } from '@testing-library/react';
import { createMemoryHistory, LocationState, MemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import React, { ComponentProps } from 'react';
import { MockedProvider } from '@apollo/client/testing';

import { InstitutionFilters } from '@dc/shared/InstitutionFilters/InstitutionFilters';
import { InstitutionFiltersProvider } from '@dc/shared/InstitutionFiltersProvider';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

describe('InstitutionFilters', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const renderInstitutionFiltersWithProvider = (
    history: MemoryHistory<LocationState>,
    componentProps?: ComponentProps<typeof InstitutionFilters>
  ) =>
    renderWithRouterAndReduxProvider(
      <MockedProvider mocks={[studentInfoMock]}>
        <UserInfoProvider
          value={{
            userInfo: {
              ...studentInfoMock.result.data.userInfo,
              state: 'ALASKA',
            },
          }}>
          <InstitutionFiltersProvider>
            <InstitutionFilters {...componentProps} />
          </InstitutionFiltersProvider>
        </UserInfoProvider>
      </MockedProvider>,
      {
        history,
        initialState: {
          session: {
            user: { type: 'student' },
            loginError: {},
          },
        },
      }
    );

  it('renders correctly without additional filters', () => {
    const history = createMemoryHistory({ initialEntries: ['/post-secondary'] });

    const { container } = renderInstitutionFiltersWithProvider(history);

    expect(screen.getByPlaceholderText('Search by name')).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Size/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Costs/)).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with additional filters', () => {
    const history = createMemoryHistory({ initialEntries: ['/post-secondary'] });

    const { container } = renderInstitutionFiltersWithProvider(history, {
      showAdditionalFilters: true,
    });

    expect(screen.getByPlaceholderText('Search by name')).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Size/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Costs/)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should set query after passing keyword filter - onClick', async () => {
    const history = createMemoryHistory({ initialEntries: ['/post-secondary'] });

    renderInstitutionFiltersWithProvider(history, {
      triggerType: 'CHANGE',
    });

    const keywordInput = screen.getByPlaceholderText('Search by name');

    userEvent.click(keywordInput);

    userEvent.paste(keywordInput, 'keyword-value');

    act(() => {
      jest.runAllTimers();
    });

    expect(history.location.search).toEqual('?keyword=keyword-value');
  });

  it('should set query after passing location filter', async () => {
    const history = createMemoryHistory({ initialEntries: ['/post-secondary'] });

    renderInstitutionFiltersWithProvider(history, { triggerType: 'CHANGE' });

    const locationSelect = screen.getByLabelText(/Location/);

    userEvent.type(locationSelect, 'Alaska{enter}');
    userEvent.type(locationSelect, 'Illinois{enter}');

    act(() => {
      jest.runAllTimers();
    });

    expect(history.location.search).toEqual('?location[]=ALASKA&location[]=ILLINOIS');
  });

  it('should set query after passing type filter', async () => {
    const history = createMemoryHistory({ initialEntries: ['/post-secondary'] });

    renderInstitutionFiltersWithProvider(history, { triggerType: 'CHANGE' });

    const typeSelect = screen.getByLabelText(/Type/);

    userEvent.type(typeSelect, 'private not-for-profit, less-than 2-year{enter}');

    act(() => {
      jest.runAllTimers();
    });

    expect(history.location.search).toEqual('?type[]=PRV_NFP_LT2');
  });

  it('should set query after passing size filter', async () => {
    const history = createMemoryHistory({ initialEntries: ['/post-secondary'] });

    renderInstitutionFiltersWithProvider(history, {
      triggerType: 'CHANGE',
      showAdditionalFilters: true,
    });

    const sizeSelect = screen.getByLabelText(/Size/);

    userEvent.type(sizeSelect, 'Medium{enter}');
    userEvent.type(sizeSelect, 'Very small{enter}');

    act(() => {
      jest.runAllTimers();
    });
    expect(history.location.search).toEqual('?size[]=MEDIUM&size[]=VERY_SMALL');
  });

  it('should set query after passing costs filter', async () => {
    const history = createMemoryHistory({ initialEntries: ['/post-secondary'] });

    renderInstitutionFiltersWithProvider(history, {
      triggerType: 'CHANGE',
      showAdditionalFilters: true,
    });

    const costsSelect = screen.getByLabelText(/Costs/);

    userEvent.type(costsSelect, '10000 - 15000{enter}');

    act(() => {
      jest.runAllTimers();
    });

    expect(history.location.search).toEqual('?cost[]=FROM_10001_TO_15000');
  });

  it('should set query after passing all filters', async () => {
    const history = createMemoryHistory({ initialEntries: ['/post-secondary'] });

    renderInstitutionFiltersWithProvider(history, {
      triggerType: 'CHANGE',
      showAdditionalFilters: true,
    });

    const keywordInput = screen.getByPlaceholderText('Search by name');
    const locationSelect = screen.getByLabelText(/Location/);
    const typeSelect = screen.getByLabelText(/Type/);
    const sizeSelect = screen.getByLabelText(/Size/);
    const costsSelect = screen.getByLabelText(/Costs/);

    expect(keywordInput).toBeInTheDocument();

    userEvent.click(keywordInput);

    userEvent.paste(keywordInput, 'keyword-value');
    userEvent.type(locationSelect, 'Alaska{enter}');
    userEvent.type(typeSelect, 'private not-for-profit, less-than 2-year{enter}');
    userEvent.type(sizeSelect, 'very small{enter}');
    userEvent.type(costsSelect, '20000+{enter}');

    act(() => {
      jest.runAllTimers();
    });

    expect(history.location.search).toEqual(
      '?location[]=ALASKA&type[]=PRV_NFP_LT2&size[]=VERY_SMALL&cost[]=MORE_THAN_20000&keyword=keyword-value'
    );
  });

  it('should reset all filters after "Clear all" button', async () => {
    const history = createMemoryHistory({ initialEntries: ['/post-secondary'] });

    renderInstitutionFiltersWithProvider(history, {
      triggerType: 'CHANGE',
      showAdditionalFilters: true,
    });

    const keywordInput = screen.getByPlaceholderText('Search by name');
    const locationSelect = screen.getByLabelText(/Location/);
    const typeSelect = screen.getByLabelText(/Type/);
    const sizeSelect = screen.getByLabelText(/Size/);
    const costsSelect = screen.getByLabelText(/Costs/);

    expect(keywordInput).toBeInTheDocument();

    userEvent.click(keywordInput);

    userEvent.paste(keywordInput, 'keyword-value');
    userEvent.type(locationSelect, 'Alaska{enter}');
    userEvent.type(typeSelect, 'private not-for-profit, less-than 2-year{enter}');
    userEvent.type(sizeSelect, 'very small{enter}');
    userEvent.type(costsSelect, '20000+{enter}');

    act(() => {
      jest.runAllTimers();
    });

    expect(history.location.search).toEqual(
      '?location[]=ALASKA&type[]=PRV_NFP_LT2&size[]=VERY_SMALL&cost[]=MORE_THAN_20000&keyword=keyword-value'
    );

    const clearAllButton = screen.getByLabelText('Clear all');

    userEvent.click(clearAllButton);

    expect(history.location.search).toEqual('');
  });
});
