import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';

import { OpportunitiesCarousel } from '@dc/components/Opportunities/OpportunitiesCarousel';
import {
  OPPORTUNITY_TYPE,
  OPPORTUNITY_APPLICATION_STATUS,
  VISIBILITY_SCOPE,
} from '@dc/resources/enums';
import { renderWithRouter } from '@dc/utils/test';
import MY_OPPORTUNITIES from '@dc/graphql/student/queries/myOpportunities';

const myOpportunitiesSpy = jest.fn();
const mockMyOpportunities = [
  {
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    imageUrl: 'https://picsum.photos/600/300',
    opportunityType: OPPORTUNITY_TYPE.INTERNSHIP,
    periodStart: '2023-02-03T00:00:00.000',
    periodEnd: '2023-04-03T00:00:00.000',
    deadline: '2023-03-03T00:00:00.000',
    isFavorite: true,
    isRecommended: false,
    id: '1',
    applicationStatus: OPPORTUNITY_APPLICATION_STATUS.REJECTED,
    automaticAcceptance: false,
    availableSpots: 5,
    description: 'Lorem ipsum dolor sit amet',
    location: 'Lorem Ipsum',
    tags: ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
    visibilityScope: VISIBILITY_SCOPE.ALL,
    creditsOutcomes: '50',
    pathways: [],
    salaryInformation: '50',
    archivedAt: null,
    virtualInternship: null,
    partner: null,
    imageFitToContainer: false,
  },
  {
    name: 'Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas',
    imageUrl: 'https://picsum.photos/600/300',
    opportunityType: OPPORTUNITY_TYPE.INTERNSHIP,
    periodStart: '2023-02-03T00:00:00.000',
    periodEnd: '2023-04-03T00:00:00.000',
    deadline: '2023-03-03T00:00:00.000',
    isFavorite: true,
    isRecommended: true,
    id: '2',
    applicationStatus: OPPORTUNITY_APPLICATION_STATUS.STARTED,
    automaticAcceptance: false,
    availableSpots: 5,
    description: 'Lorem ipsum dolor sit amet',
    location: 'Lorem Ipsum',
    tags: ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
    visibilityScope: VISIBILITY_SCOPE.ALL,
    creditsOutcomes: '50',
    pathways: [],
    salaryInformation: '50',
    archivedAt: null,
    virtualInternship: null,
    partner: null,
    imageFitToContainer: true,
  },
  {
    name: 'Libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam',
    imageUrl: 'https://picsum.photos/600/300',
    opportunityType: OPPORTUNITY_TYPE.INTERNSHIP,
    periodStart: '2023-02-03T00:00:00.000',
    periodEnd: '2023-04-03T00:00:00.000',
    deadline: '2023-03-03T00:00:00.000',
    isFavorite: true,
    isRecommended: true,
    id: '3',
    applicationStatus: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED,
    automaticAcceptance: false,
    availableSpots: 5,
    description: 'Lorem ipsum dolor sit amet',
    location: 'Lorem Ipsum',
    tags: ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
    visibilityScope: VISIBILITY_SCOPE.ALL,
    creditsOutcomes: '50',
    pathways: [],
    salaryInformation: '50',
    archivedAt: null,
    virtualInternship: null,
    partner: null,
    imageFitToContainer: false,
  },
  {
    name: 'Turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod',
    imageUrl: 'https://picsum.photos/600/300',
    opportunityType: OPPORTUNITY_TYPE.INTERNSHIP,
    periodStart: '2023-02-03T12:00:00.000',
    periodEnd: '2023-04-03T12:00:00.000',
    deadline: '2023-03-03T12:00:00.000',
    isFavorite: true,
    isRecommended: false,
    id: '4',
    applicationStatus: OPPORTUNITY_APPLICATION_STATUS.REJECTED,
    automaticAcceptance: false,
    availableSpots: 5,
    description: 'Lorem ipsum dolor sit amet',
    location: 'Lorem Ipsum',
    tags: ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
    visibilityScope: VISIBILITY_SCOPE.ALL,
    creditsOutcomes: '50',
    pathways: [],
    salaryInformation: '50',
    archivedAt: null,
    virtualInternship: null,
    partner: null,
    imageFitToContainer: false,
  },
];

const emptyMyOpportunityMock = [
  {
    request: {
      query: MY_OPPORTUNITIES,
      variables: { page: 1, perPage: 100 },
    },
    result: {
      data: {
        myOpportunities: {
          nodes: [],
          nodesCount: 0,
          pagesCount: 0,
        },
      },
    },
  },
];

const myOpportunityMock = [
  {
    request: {
      query: MY_OPPORTUNITIES,
      variables: { page: 1, perPage: 100 },
    },
    result: () => {
      myOpportunitiesSpy();

      return {
        data: {
          myOpportunities: {
            nodes: mockMyOpportunities,
            nodesCount: 4,
            pagesCount: 1,
          },
        },
      };
    },
  },
];

const renderOpportunityCarousel = (mocks: MockedResponse[]) =>
  renderWithRouter(
    <MockedProvider mocks={mocks}>
      <OpportunitiesCarousel />
    </MockedProvider>
  );

describe('OpportunitiesCarousel', () => {
  it('should render properly with empty state', async () => {
    const { container } = renderOpportunityCarousel(emptyMyOpportunityMock);

    expect(await screen.findByTestId('empty-state-icon')).toBeInTheDocument();
    expect(screen.getByText('Current and Favorites area is empty')).toBeInTheDocument();
    expect(screen.getByText('There is no data in this section yet.')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render properly with passed data', async () => {
    const { container } = renderOpportunityCarousel(myOpportunityMock);
    await waitFor(() => {
      expect(myOpportunitiesSpy).toHaveBeenCalled();
    });
    expect(await screen.findByText('Current and Favorites')).toBeInTheDocument();
    expect(screen.getByText(`(${mockMyOpportunities.length})`)).toBeInTheDocument();
    expect(screen.getByText('All In-progress and favorited opportunities')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
