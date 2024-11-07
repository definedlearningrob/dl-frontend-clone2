import { MockedProvider } from '@apollo/client/testing';
import { CustomCatalogOverviewDocument } from '@graphql/dc/shared/hooks';
import { waitFor, screen } from '@testing-library/react';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { CustomCatalogSection } from '@dc/screens/StudentApp/Dashboard/CustomCatalogSection/CustomCatalogSection';

const customCatalogSpy = jest.fn();

const customCatalogOverviewMock = {
  request: {
    query: CustomCatalogOverviewDocument,
    variables: {},
  },
  result: () => {
    customCatalogSpy();

    return {
      data: {
        careersCatalog: {
          id: '23',
          description:
            '<p>Test description, test description, test description, test description, test description, test description, test description, test description, test description, test description, test description, test description. </p>',
          name: 'Test DC Catalog',
          thumbnailUrl: 'null',
          imageUrl: 'null',
          __typename: 'Catalog',
        },
      },
    };
  },
};

const noCustomCatalogOverviewMock = {
  request: {
    query: CustomCatalogOverviewDocument,
    variables: {},
  },
  result: () => {
    customCatalogSpy();

    return {
      data: {
        careersCatalog: null,
      },
    };
  },
};

describe('CustomCatalogSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render skeleton correctly', async () => {
    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider mocks={[customCatalogOverviewMock]}>
        <CustomCatalogSection />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("shouldn't render anything when there are no catalogs assigned", async () => {
    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider mocks={[noCustomCatalogOverviewMock]}>
        <CustomCatalogSection />
      </MockedProvider>
    );

    await waitFor(() => expect(customCatalogSpy).toHaveBeenCalled());

    const catalogName = screen.queryByText('Test DC Catalog');

    expect(catalogName).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render correctly', async () => {
    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider mocks={[customCatalogOverviewMock]}>
        <CustomCatalogSection />
      </MockedProvider>
    );

    await waitFor(() => expect(customCatalogSpy).toHaveBeenCalled());

    const catalogName = screen.getByText('Test DC Catalog');
    const catalogDescription = screen.getByText(/description/);
    const viewCatalogLink = screen.getByRole('link', { name: 'View catalog' });

    expect(catalogName).toBeInTheDocument();
    expect(catalogDescription).toBeInTheDocument();
    expect(viewCatalogLink).toHaveAttribute('href', '/catalog');

    expect(container).toMatchSnapshot();
  });
});
