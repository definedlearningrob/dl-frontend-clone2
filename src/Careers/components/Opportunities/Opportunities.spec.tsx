import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, within } from '@testing-library/dom';
import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { OpportunityTypes } from '@graphql/dc/shared/types';
import { ApplicationStatus, VirtualInternshipStatuses } from '@graphql/dc/students/types';
import { PartnersDocument } from '@graphql/dc/students/hooks';
import { PartnersQuery } from '@graphql/dc/students/operations';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import MY_OPPORTUNITIES, {
  TMyOpportunitiesData,
} from '@dc/graphql/student/queries/myOpportunities';
import OPPORTUNITIES_QUERY, { TOpportunitiesData } from '@dc/graphql/student/queries/opportunities';
import CLUSTERS, { TClustersData } from '@dc/graphql/shared/queries/clusters';
import { OPPORTUNITY_TAGS, TOpportunityTagsData } from '@dc/graphql/shared/queries/opportunityTags';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

import { Opportunities } from './Opportunities';

const opportunitiesMock: MockedResponse<TOpportunitiesData> = {
  request: {
    query: OPPORTUNITIES_QUERY,
    variables: { page: 1, perPage: 12, infiniteScroll: true },
  },
  result: {
    data: {
      opportunities: {
        nodesCount: 4,
        pagesCount: 1,
        nodes: [
          {
            id: '7',
            name: 'Test',
            applicationStatus: null,
            isFavorite: false,
            isRecommended: true,
            imageUrl: 'http:/example.com/example.png',
            opportunityType: OpportunityTypes.JOB_SHADOW,
            deadline: '2023-07-25',
            periodStart: '2023-07-26',
            periodEnd: '2023-08-28',
            virtualInternship: null,
            pathways: [
              {
                id: '2',
                name: 'Animal Systems',
              },
            ],
            partner: {
              id: '1',
              name: 'Test Partner',
            },
            imageFitToContainer: false,
          },
          {
            id: '6',
            name: 'afdsfsd',
            applicationStatus: null,
            isFavorite: false,
            isRecommended: false,
            imageUrl: 'http:/example.com/example.png',
            opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP,
            deadline: null,
            periodStart: null,
            periodEnd: null,
            virtualInternship: {
              id: '1',
              requiredExperiences: 0,
              readinessSkillsLessons: [],
              roadmapItemsCount: 5,
              status: VirtualInternshipStatuses.NOT_STARTED,
            },
            pathways: [],
            partner: null,
            imageFitToContainer: false,
          },
          {
            id: '5',
            name: 'Process Engineering Intern at Hargrove Engineers \u0026 Constructors',
            applicationStatus: null,
            isFavorite: true,
            isRecommended: false,
            imageUrl: 'http:/example.com/example.png',
            opportunityType: OpportunityTypes.APPRENTICESHIP,
            deadline: '2023-07-26',
            periodStart: '2023-07-27',
            periodEnd: '2023-08-04',
            virtualInternship: null,
            pathways: [],
            partner: null,
            imageFitToContainer: true,
          },
          {
            id: '10',
            name: 'Opportunity without dates',
            applicationStatus: null,
            isFavorite: false,
            isRecommended: false,
            imageUrl: 'http:/example.com/example.png',
            opportunityType: OpportunityTypes.JOB_SHADOW,
            deadline: null,
            periodStart: null,
            periodEnd: null,
            virtualInternship: null,
            pathways: [
              {
                id: '8',
                name: 'A/V Technology & Film',
              },
              {
                id: '9',
                name: 'Printing Technology',
              },
              {
                id: '12',
                name: 'Journalism and Broadcasting',
              },
              {
                id: '13',
                name: 'Telecommunications',
              },
            ],
            partner: {
              id: '2',
              name: 'Test Partner',
            },
            imageFitToContainer: true,
          },
        ],
      },
    },
  },
};

const partnersMock: MockedResponse<PartnersQuery> = {
  request: {
    query: PartnersDocument,
    variables: {},
  },
  result: {
    data: {
      partners: {
        nodes: [
          {
            id: '3',
            name: 'Santa',
            imageFitToContainer: true,
            thumbnailUrl: 'http://test.com/image.jpeg',
            about: 'Lipsum',
            imageUrl: 'http://test.com/image.jpeg',
            opportunities: [],
            courses: [],
          },
          {
            id: '4',
            name: 'Santa Rosa Medical Center',
            imageFitToContainer: false,
            thumbnailUrl: 'http://test.com/image.jpeg',
            about: 'Lorem Ipsum',
            imageUrl: 'http://test.com/image.jpeg',
            opportunities: [
              {
                id: '19',
                opportunityType: OpportunityTypes.APPRENTICESHIP,
              },
              {
                id: '33',
                opportunityType: OpportunityTypes.JOB,
              },
            ],
            courses: [
              {
                id: '19',
              },
              {
                id: '33',
              },
            ],
          },
          {
            id: '24',
            name: 'Test name',
            imageFitToContainer: true,
            thumbnailUrl: 'http://test.com/image.jpeg',
            about: 'Ipsum lorem',
            imageUrl: 'http://test.com/image.jpeg',
            opportunities: [],
            courses: [],
          },
        ],
      },
    },
  },
};

// TODO: Update expiry dates after 2100 year :)
const myOpportunitiesMock: MockedResponse<TMyOpportunitiesData> = {
  request: {
    query: MY_OPPORTUNITIES,
    variables: { page: 1, perPage: 100 },
  },
  result: {
    data: {
      myOpportunities: {
        nodes: [
          {
            applicationStatus: null,
            id: '1',
            imageUrl: 'http:/example.com/example.png',
            isFavorite: true,
            name: 'Internship 0',
            opportunityType: OpportunityTypes.APPRENTICESHIP,
            periodStart: '2023-07-27',
            periodEnd: '2023-08-04',
            deadline: '2023-07-26',
            virtualInternship: null,
            pathways: [],
            partner: {
              id: '1',
              name: 'Test Partner Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            },
            imageFitToContainer: true,
          },
          {
            applicationStatus: ApplicationStatus.PENDING,
            id: '2',
            imageUrl: 'http:/example.com/example.png',
            isFavorite: false,
            name: 'Internship 1',
            opportunityType: OpportunityTypes.INTERNSHIP,
            periodStart: '2023-03-05',
            periodEnd: '2023-03-30',
            deadline: '2023-02-23',
            virtualInternship: null,
            pathways: [],
            partner: null,
            imageFitToContainer: true,
          },
          {
            applicationStatus: ApplicationStatus.PENDING,
            id: '3',
            imageUrl: 'http:/example.com/example.png',
            isFavorite: false,
            name: 'Internship 2',
            opportunityType: OpportunityTypes.INTERNSHIP,
            periodStart: '2100-03-05',
            periodEnd: '2100-03-30',
            deadline: '2100-02-23',
            virtualInternship: null,
            pathways: [],
            partner: null,
            imageFitToContainer: false,
          },
          {
            applicationStatus: ApplicationStatus.ACCEPTED,
            id: '4',
            imageUrl: 'http:/example.com/example.png',
            isFavorite: false,
            name: 'Internship 3',
            opportunityType: OpportunityTypes.INTERNSHIP,
            periodStart: '2100-03-05',
            periodEnd: '2100-03-30',
            deadline: '2100-02-23',
            virtualInternship: null,
            pathways: [],
            partner: null,
            imageFitToContainer: false,
          },
          {
            applicationStatus: ApplicationStatus.REJECTED,
            id: '15',
            imageUrl: 'http:/example.com/example.png',
            isFavorite: false,
            name: 'Internship 4',
            opportunityType: OpportunityTypes.INTERNSHIP,
            periodStart: '2100-03-05',
            periodEnd: '2100-03-30',
            deadline: '2100-02-23',
            virtualInternship: null,
            pathways: [],
            partner: null,
            imageFitToContainer: false,
          },
          {
            applicationStatus: ApplicationStatus.STARTED,
            id: '16',
            imageUrl: 'http:/example.com/example.png',
            isFavorite: false,
            name: 'Internship 5',
            opportunityType: OpportunityTypes.INTERNSHIP,
            periodStart: '2100-03-05',
            periodEnd: '2100-03-30',
            deadline: '2100-02-23',
            virtualInternship: null,
            pathways: [],
            partner: null,
            imageFitToContainer: true,
          },
          {
            applicationStatus: ApplicationStatus.FINISHED,
            id: '17',
            imageUrl: 'http:/example.com/example.png',
            isFavorite: false,
            name: 'Internship 6',
            opportunityType: OpportunityTypes.INTERNSHIP,
            periodStart: '2100-03-05',
            periodEnd: '2100-03-30',
            deadline: '2100-02-23',
            virtualInternship: null,
            pathways: [],
            partner: null,
            imageFitToContainer: true,
          },
        ],
        nodesCount: 2,
        pagesCount: 1,
      },
    },
  },
};

const clustersMock: MockedResponse<TClustersData> = {
  request: {
    query: CLUSTERS,
  },
  result: {
    data: {
      clusters: [
        {
          id: '1',
          name: 'Test cluster',
          pathways: [
            {
              id: '2',
              name: 'Animal Systems',
            },
            {
              id: '8',
              name: 'A/V Technology & Film',
            },
            {
              id: '9',
              name: 'Printing Technology',
            },
            {
              id: '12',
              name: 'Journalism and Broadcasting',
            },
            {
              id: '13',
              name: 'Telecommunications',
            },
          ],
        },
      ],
    },
  },
};

const opportunityTagsMock: MockedResponse<TOpportunityTagsData> = {
  request: {
    query: OPPORTUNITY_TAGS,
  },
  result: {
    data: {
      opportunityTags: ['tag#1', 'tag#2'],
    },
  },
};

const renderComponent = (hasPartners = false) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider
      mocks={[
        opportunitiesMock,
        myOpportunitiesMock,
        clustersMock,
        opportunityTagsMock,
        partnersMock,
      ]}>
      <UserInfoProvider
        value={{
          userInfo: {
            ...userInfoMock.result.data.userInfo,
          },
        }}>
        <NavigationContextProvider>
          <Route path='/opportunities'>
            <Opportunities hasPartners={hasPartners} />
          </Route>
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { route: '/opportunities' }
  );

describe('OpportunityScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => new Promise((resolve) => setTimeout(resolve, 0)));

  const testCases = [
    ['Internship 0', null],
    ['Internship 1', 'Expired'],
    ['Internship 2', 'Pending'],
    ['Internship 3', 'Accepted'],
    ['Internship 4', 'Not accepted'],
    ['Internship 5', 'In-progress'],
    ['Internship 6', 'Completed'],
  ];

  describe('should render card in Favourites carousel', () => {
    it('should render properly', async () => {
      const { container } = renderComponent();

      const favouriteSectionHeading = screen.getByRole('heading', {
        name: /Current and Favorites/,
      });

      const favoritesSection = favouriteSectionHeading.parentElement;

      expect(favoritesSection).toBeInTheDocument();

      const card = await within(favoritesSection!).findByLabelText('Internship 0');

      expect(card).toBeInTheDocument();

      expect(container).toMatchSnapshot();
    });

    it.each(testCases)(
      'with "%s" name & "%s" status',
      async (expectedInternshipName, expectedStatus) => {
        renderComponent();

        const favouriteSectionHeading = screen.getByRole('heading', {
          name: /Current and Favorites/,
        });

        const favoritesSection = favouriteSectionHeading.parentElement;

        expect(favoritesSection).toBeInTheDocument();

        const card = await within(favoritesSection!).findByLabelText(expectedInternshipName!);

        expect(card).toBeInTheDocument();

        if (expectedStatus === null) return;

        expect(card).toHaveTextContent(expectedStatus!);
      }
    );
  });

  it('displays pathways on the opportunity card when dates are not set', async () => {
    renderComponent();

    const opportunityCard = await screen.findByRole('link', {
      name: 'Opportunity without dates',
    });

    const pathways = within(opportunityCard).getByText('Pathways:');

    expect(pathways).toBeInTheDocument();

    userEvent.hover(pathways);

    expect(await screen.findByRole('tooltip')).toHaveTextContent(
      'A/V Technology & Film, Printing Technology, Journalism and Broadcasting, Telecommunications'
    );
  });

  it('display correctly if any partners are assigned', async () => {
    const { container } = renderComponent(true);

    const interestedAndCurrentSectionHeading = await screen.findByRole('heading', {
      name: /Interested and Current/,
    });

    const opportunities = await within(
      interestedAndCurrentSectionHeading.parentElement!.parentElement!
    ).findAllByRole('link');

    expect(opportunities).toHaveLength(7);

    const partnersSectionHeading = await screen.findByRole('heading', {
      name: /Partners/,
    });

    const partners = await within(
      partnersSectionHeading.parentElement!.parentElement!
    ).findAllByRole('link');

    expect(partners).toHaveLength(3);

    expect(container).toMatchSnapshot();
  });
});
