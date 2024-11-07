import { screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { MockedProvider } from '@apollo/client/testing';

import { renderWithI18N } from '@shared/utils/renderWithI18N';
import { ExperiencesChart } from '@shared/components/ExperiencesPanel/ExperiencesChart/ExperiencesChart';
import { ChartProvider } from '@shared/components/ExperiencesPanel/context/ChartContext';

const { ResizeObserver } = window;

describe('ExperiencesChart', () => {
  beforeEach(() => {
    // @ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });
  const history = createMemoryHistory({ initialEntries: ['/'] });

  it('should render correctly with DC translations', () => {
    const { container } = renderWithI18N(
      <MockedProvider>
        <Router history={history}>
          <Route path='/'>
            <ChartProvider data={[]}>
              <ExperiencesChart />
            </ChartProvider>
          </Route>
        </Router>
      </MockedProvider>,
      'DC'
    );

    expect(
      screen.getByRole('heading', { level: 5, name: 'Career Cluster Wheel' })
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with DL translations', () => {
    const { container } = renderWithI18N(
      <MockedProvider>
        <Router history={history}>
          <Route path='/'>
            <ChartProvider data={[]}>
              <ExperiencesChart />
            </ChartProvider>
          </Route>
        </Router>
      </MockedProvider>,
      'DL'
    );

    expect(
      screen.getByRole('heading', { level: 5, name: 'Career Cluster Wheel' })
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
