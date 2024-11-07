import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { CustomCatalogQuery } from '@graphql/dc/shared/operations';
import { CustomCatalogDocument } from '@graphql/dc/shared/hooks';
import { screen, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '@dc/utils/test';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

import { CustomCatalog } from './CustomCatalog';

const catalogMock: MockedResponse<CustomCatalogQuery> = {
  request: { query: CustomCatalogDocument },
  result: {
    data: {
      careersCatalog: {
        id: '1',
        name: 'Custom catalog',
        description:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam ut orci pretium rhoncus at quis justo. Integer laoreet tellus ac tincidunt viverra. Phasellus hendrerit pulvinar mi, vel blandit eros. In at dolor vulputate, ullamcorper urna a, pharetra leo. Vivamus hendrerit pellentesque ullamcorper. Mauris ligula turpis, posuere sit amet euismod quis, vulputate ut nisi. Nam laoreet maximus ex ac pellentesque. Quisque pharetra a dolor non vestibulum. Nulla luctus quam eget massa mollis feugiat. Morbi tincidunt odio suscipit sapien tincidunt commodo.</p>',
        imageUrl: 'https://via.placeholder.com/150',
        thumbnailUrl: 'https://via.placeholder.com/150',
        tracks: [
          {
            id: '11',
            grades: ['K', '1'],
            name: 'Track 1',
            resourcesCount: 10,
            shortDescription: 'Short description',
            imageUrl: 'https://via.placeholder.com/150',
            thumbnailUrl: 'https://via.placeholder.com/150',
          },
          {
            id: '12',
            grades: ['1', '2', '3'],
            name: 'Track 2',
            resourcesCount: 2,
            shortDescription: 'Short description 2',
            imageUrl: 'https://via.placeholder.com/150',
            thumbnailUrl: 'https://via.placeholder.com/150',
          },
          {
            id: '13',
            grades: ['7'],
            name: 'Track 3',
            resourcesCount: 8,
            shortDescription: 'Short description 3',
            imageUrl: 'https://via.placeholder.com/150',
            thumbnailUrl: 'https://via.placeholder.com/150',
          },
        ],
      },
    },
  },
};

const renderComponent = () =>
  renderWithRouter(
    <div app-type='careers' className='app'>
      <MockedProvider mocks={[catalogMock]}>
        <NavigationContextProvider>
          <CustomCatalog />
        </NavigationContextProvider>
      </MockedProvider>
    </div>
  );

describe('CustomCatalog', () => {
  it('renders correctly', async () => {
    const { container } = renderComponent();

    const catalogName = await screen.findByRole('heading', { name: 'Custom catalog' });
    expect(catalogName).toBeInTheDocument();

    const trackCards = screen.getAllByRole('listitem');
    expect(trackCards).toHaveLength(3);

    expect(trackCards[0]).toHaveTextContent('Track 1');
    expect(trackCards[1]).toHaveTextContent('Track 2');
    expect(trackCards[2]).toHaveTextContent('Track 3');

    expect(container).toMatchSnapshot();
  });

  it('navigates to a track after clicking on the card', async () => {
    const { history } = renderComponent();
    history.push = jest.fn();

    const trackCard = await screen.findByRole('listitem', { name: 'Track 1' });
    userEvent.click(within(trackCard).getByRole('link'));

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith('/catalog/unit-outline/11');
  });
});
