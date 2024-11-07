import { MockedProvider } from '@apollo/client/testing';
import { screen } from '@testing-library/react';
import { UserPartnerOptionsDocument } from '@graphql/dc/users/hooks';

import { OpportunityForm } from '@dc/components/User/Opportunities/OpportunityForm';
import { VISIBILITY_SCOPE } from '@dc/resources/enums';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ENTITIES_WITH_CHILDREN } from '@dc/graphql/user/queries/entitiesWithChildrens';
import { OPPORTUNITY_TAGS } from '@dc/graphql/shared/queries/opportunityTags';
import CLUSTERS from '@dc/graphql/shared/queries/clusters';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

const initialValues = {
  automaticAcceptance: false,
  availableSpots: 0,
  creditsOutcomes: '',
  visibilityScope: VISIBILITY_SCOPE.ENTITY,
  imageFilename: '',
  imageUuid: '',
  name: '',
  description: '',
  image: '',
  opportunityType: null,
  pathways: [],
  location: '',
  salaryInformation: '',
  tags: [],
  periodStart: null,
  periodEnd: null,
  deadline: null,
  entityUuids: [],
  partner: null,
  imageData: { url: '', file: undefined, urlForUpload: '', uuid: '' },
  imageFitToContainer: true,
};

const entitiesSpy = jest.fn();
const clustersSpy = jest.fn();
const tagsSpy = jest.fn();
const partnersSpy = jest.fn();

const mocks = [
  {
    request: {
      query: ENTITIES_WITH_CHILDREN,
      variables: {
        perPage: 10,
        infiniteScroll: true,
      },
    },
    result: () => {
      entitiesSpy();

      return {
        data: {
          entities: {
            pagesCount: 1,
            nodesCount: 5,
            nodes: [
              {
                uuid: '632cf708-11d0-4b48-ba65-4205b4815206',
                name: 'Rockaway Beach Middle School',
                children: {
                  nodes: [],
                },
              },
            ],
          },
        },
      };
    },
  },
  {
    request: {
      query: CLUSTERS,
      variables: {},
    },
    result: () => {
      clustersSpy();

      return {
        data: {
          clusters: [
            {
              id: '1',
              name: 'Agriculture, Food & Natural Resources',
              pathways: [
                {
                  id: '1',
                  name: 'Agribusiness Systems',
                },
                {
                  id: '2',
                  name: 'Animal Systems',
                },
              ],
            },
            {
              id: '8',
              name: 'Architecture & Construction',
              pathways: [
                {
                  id: '38',
                  name: 'Design/Pre-Construction',
                },
                {
                  id: '39',
                  name: 'Construction',
                },
              ],
            },
          ],
        },
      };
    },
  },
  {
    request: {
      query: OPPORTUNITY_TAGS,
      variables: {},
    },
    result: () => {
      tagsSpy();

      return {
        data: {
          opportunityTags: ['web', 'google', 'ror', 'ruby', 'hr'],
        },
      };
    },
  },
  {
    request: {
      query: UserPartnerOptionsDocument,
      variables: { page: 1, filter: {}, perPage: 20 },
    },
    result: () => {
      partnersSpy();

      return {
        data: {
          partners: {
            nodes: [
              {
                id: '1',
                name: 'Google',
                status: 'PUBLISHED',
              },
              {
                id: '2',
                name: 'Facebook',
                status: 'PUBLISHED',
              },
            ],
            pagesCount: 1,
          },
        },
      };
    },
  },
];

describe('OpportunityForm', () => {
  it('should render correctly', async () => {
    const { container } = renderWithRouterAndReduxProvider(
      <UserInfoProvider value={userInfoMock.result.data}>
        <MockedProvider mocks={[...mocks, userInfoMock]}>
          <OpportunityForm
            buttonLabel='Test button'
            initialValues={initialValues}
            title='Title for test'
            onSubmit={jest.fn()}
          />
        </MockedProvider>
      </UserInfoProvider>
    );

    expect(await screen.findByRole('heading', { name: 'Title for test' }));
    expect(await screen.findByRole('button', { name: 'Test button' }));

    expect(clustersSpy).toHaveBeenCalledTimes(1);
    expect(tagsSpy).toHaveBeenCalledTimes(1);
    expect(entitiesSpy).toHaveBeenCalledTimes(1);
    expect(partnersSpy).toHaveBeenCalledTimes(1);

    expect(container).toMatchSnapshot();
  });
});
