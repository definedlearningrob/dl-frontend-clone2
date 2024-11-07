import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { CatalogTrackQuery } from '@graphql/dc/shared/operations';
import { CatalogTrackDocument } from '@graphql/dc/shared/hooks';
import { UnitResourceTypes } from '@graphql/dc/shared/types';
import { screen, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { renderWithRouter } from '@shared/utils/test';

import { CatalogTrack } from './CatalogTrack';

const trackMock: MockedResponse<CatalogTrackQuery> = {
  request: {
    query: CatalogTrackDocument,
    variables: { id: '1' },
  },
  result: {
    data: {
      careersCatalog: {
        id: '11',
        track: {
          id: '1',
          name: 'Track',
          description: 'Track description',
          imageUrl: 'https://via.placeholder.com/150',
          thumbnailUrl: 'https://via.placeholder.com/150',
          grades: ['K', '1'],
          resourcesCount: 5,
          units: [
            {
              id: '111',
              name: 'Unit 1',
              description: 'Unit 1 description',
              imageUrl: 'https://via.placeholder.com/150',
              thumbnailUrl: 'https://via.placeholder.com/150',
              resources: [
                {
                  resourceId: '1111',
                  resourceType: UnitResourceTypes.COURSE,
                  description: 'Course 1 description',
                  imageUrl: 'https://via.placeholder.com/150',
                  thumbnailUrl: 'https://via.placeholder.com/150',
                  name: 'Course 1',
                  pathways: [{ name: 'Marketing Research' }],
                  isVirtualInternship: null,
                },
                {
                  resourceId: '1112',
                  resourceType: UnitResourceTypes.OPPORTUNITY,
                  description: 'Opportunity 1 description',
                  imageUrl: 'https://via.placeholder.com/150',
                  thumbnailUrl: 'https://via.placeholder.com/150',
                  name: 'Opportunity 1',
                  pathways: [{ name: 'Animal Systems' }, { name: 'Printing Technology' }],
                  isVirtualInternship: false,
                },
                {
                  resourceId: '1113',
                  resourceType: UnitResourceTypes.OPPORTUNITY,
                  description: 'Virtual Internship 1 description',
                  imageUrl: 'https://via.placeholder.com/150',
                  thumbnailUrl: 'https://via.placeholder.com/150',
                  name: 'Virtual Internship 1',
                  pathways: [{ name: 'Environmental Service Systems' }],
                  isVirtualInternship: true,
                },
              ],
            },
            {
              id: '112',
              name: 'Unit 2',
              description: 'Unit 2 description',
              imageUrl: 'https://via.placeholder.com/150',
              thumbnailUrl: 'https://via.placeholder.com/150',
              resources: [
                {
                  resourceId: '1114',
                  resourceType: UnitResourceTypes.COURSE,
                  description: 'Course 2 description',
                  imageUrl: 'https://via.placeholder.com/150',
                  thumbnailUrl: 'https://via.placeholder.com/150',
                  name: 'Course 2',
                  pathways: [{ name: 'Facility and Mobile Equipment Maintenance' }],
                  isVirtualInternship: null,
                },
                {
                  resourceId: '1115',
                  resourceType: UnitResourceTypes.OPPORTUNITY,
                  description: 'Opportunity 2 description',
                  imageUrl: 'https://via.placeholder.com/150',
                  thumbnailUrl: 'https://via.placeholder.com/150',
                  name: 'Opportunity 2',
                  pathways: [{ name: 'Transportation Operations' }],
                  isVirtualInternship: false,
                },
              ],
            },
          ],
        },
      },
    },
  },
};

const renderComponent = () =>
  renderWithRouter(
    <MockedProvider mocks={[trackMock]}>
      <NavigationContextProvider>
        <Route path='/catalog/unit-outline/:id'>
          <CatalogTrack />
        </Route>
      </NavigationContextProvider>
    </MockedProvider>,
    {
      route: '/catalog/unit-outline/1',
    }
  );

describe('CatalogTrack', () => {
  it('renders correctly', async () => {
    const { container } = renderComponent();

    const trackName = await screen.findByRole('heading', { name: 'Track' });
    const trackDescription = screen.getByText('Track description');

    expect(trackName).toBeInTheDocument();
    expect(trackDescription).toBeInTheDocument();

    const unitList = await screen.findByRole('list', { name: 'Unit list' });
    const unitSections = within(unitList).getAllByRole('listitem', { name: /Unit/i });

    expect(unitSections).toHaveLength(2);

    expect(unitSections[0]).toHaveTextContent('Unit 1');
    expect(unitSections[1]).toHaveTextContent('Unit 2');

    const unitResources = within(unitSections[0]).getAllByRole('listitem');
    expect(unitResources).toHaveLength(3);
    expect(unitResources[0]).toHaveTextContent('Course 1');
    expect(unitResources[1]).toHaveTextContent('Opportunity 1');
    expect(unitResources[2]).toHaveTextContent('Virtual Internship 1');

    const unitResources2 = within(unitSections[1]).getAllByRole('listitem');
    expect(unitResources2).toHaveLength(2);
    expect(unitResources2[0]).toHaveTextContent('Course 2');
    expect(unitResources2[1]).toHaveTextContent('Opportunity 2');

    expect(container).toMatchSnapshot();
  });

  it('navigates to a resource after clicking on the card', async () => {
    const { history } = renderComponent();
    history.push = jest.fn();

    const courseCard = await screen.findByRole('link', { name: 'Course 1' });
    userEvent.click(courseCard);

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith('/courses/1111');

    // @ts-ignore
    history.push.mockClear();

    const opportunityCard = await screen.findByRole('link', { name: 'Opportunity 1' });
    userEvent.click(opportunityCard);

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith('/opportunities/1112');

    // @ts-ignore
    history.push.mockClear();

    const virtualInternshipCard = await screen.findByRole('link', {
      name: 'Virtual Internship 1',
    });
    userEvent.click(virtualInternshipCard);

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith('/opportunities/1113');
  });

  it('navigates to a resource after clicking on the navigation item', async () => {
    const { history } = renderComponent();
    history.push = jest.fn();

    const trackNavigation = await screen.findByTestId('table-of-content');
    const units = within(trackNavigation).getAllByRole('button');

    expect(units).toHaveLength(2);

    const [firstResourceList] = within(trackNavigation).getAllByRole('list');
    const resourceItems = within(firstResourceList).getAllByRole('link');
    expect(resourceItems).toHaveLength(3);
    expect(resourceItems[0]).toHaveTextContent('Course 1');
    expect(resourceItems[1]).toHaveTextContent('Opportunity 1');
    expect(resourceItems[2]).toHaveTextContent('Virtual Internship 1');

    userEvent.click(resourceItems[0]);
    expect(history.push).toHaveBeenCalledWith('/courses/1111');

    // @ts-ignore
    history.push.mockClear();

    userEvent.click(resourceItems[1]);
    expect(history.push).toHaveBeenCalledWith('/opportunities/1112');

    // @ts-ignore
    history.push.mockClear();

    userEvent.click(resourceItems[2]);
    expect(history.push).toHaveBeenCalledWith('/opportunities/1113');
  });
});
