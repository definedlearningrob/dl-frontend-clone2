import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InstitutionCard, InstitutionCardProps } from '@dc/shared/InstitutionCard/InstitutionCard';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import TOGGLE_FAVORITE_INSTITUTION from '@dc/graphql/student/mutations/toggleFavouriteInstitution';
import { MY_INSTITUTIONS_QUERY } from '@dc/graphql/student/queries/myInstitutions';
import { INSTITUTION_TYPES } from '@dc/resources/enums';

const toggleFavoritesSpy = jest.fn();
const getInstitutionsSpy = jest.fn();

const toggleFavoriteMock = {
  request: {
    query: TOGGLE_FAVORITE_INSTITUTION,
    variables: { input: { institutionId: '1' } },
  },
  result: () => {
    toggleFavoritesSpy();

    return {
      data: {
        toggleInstitutionFavorite: {
          institution: {
            id: '1',
            name: 'ABCO Technology',
            isFavorite: false,
            __typename: 'Institution',
          },
          __typename: 'ToggleInstitutionFavoriteMutationPayload',
        },
      },
    };
  },
};

const myInstitutionsMock = {
  request: {
    query: MY_INSTITUTIONS_QUERY,
  },
  result: () => {
    getInstitutionsSpy();

    return {
      data: {
        myInstitutions: {
          nodes: [
            {
              commonAppEnabled: false,
              type: 'Private not-for-profit, 4-year or above',
              sizeType: 'MEDIUM',
              sizeDescription: 'MORE_THAN_10000',
              cost: null,
              thumbnailUrl: null,
              id: '1',
              isFavorite: true,
              imageUrl: null,
              name: 'Aurora University',
              address: { city: 'Aurora', stateCode: 'IL', __typename: 'InstitutionAddress' },
              __typename: 'Institution',
            },
          ],
          pagesCount: 1,
          __typename: 'InstitutionPage',
        },
      },
    };
  },
};

describe('InstitutionCard', () => {
  const item: InstitutionCardProps['institution'] = {
    address: {
      city: 'Aurora',
      stateCode: 'IL',
    },
    commonAppEnabled: false,
    cost: 30000,
    id: '1',
    isFavorite: false,
    name: 'Aurora University',
    sizeType: 'MEDIUM' as const,
    sizeDescription: 'MORE_THAN_10000' as const,
    thumbnailUrl: null,
    type: INSTITUTION_TYPES.PRV_FP_2,
  };

  const renderInstitutionCardWithProvider = (
    mocks: MockedResponse[] = [],
    customItem?: typeof item
  ) =>
    renderWithRouterAndReduxProvider(
      <MockedProvider mocks={mocks}>
        <InstitutionCard institution={customItem || item} />
      </MockedProvider>
    );

  it('renders correctly', () => {
    const { container } = renderInstitutionCardWithProvider();
    const icons = screen.getAllByTestId('icon');

    expect(screen.getByTestId('icon-button')).toBeInTheDocument();
    expect(icons).toHaveLength(5);
    expect(screen.getByText('Aurora University')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should call toggle favorite mutation on button click', async () => {
    renderInstitutionCardWithProvider([toggleFavoriteMock, myInstitutionsMock]);

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(toggleFavoritesSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getInstitutionsSpy).toHaveBeenCalledTimes(1));
  });

  it('should display size fallback when it is not provided', () => {
    renderInstitutionCardWithProvider([], { ...item, sizeType: null, sizeDescription: null });

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('should display size description fallback when it is not provided', () => {
    renderInstitutionCardWithProvider([], { ...item, sizeType: 'MEDIUM', sizeDescription: null });

    expect(screen.getByText('Medium', { exact: false })).toHaveTextContent('Medium (N/A)');
  });

  it('should display size description when its provided', () => {
    renderInstitutionCardWithProvider([], {
      ...item,
      sizeType: 'MEDIUM',
      sizeDescription: 'MORE_THAN_10000',
    });

    expect(screen.getByText('Medium', { exact: false })).toHaveTextContent('Medium (10 000+)');
  });

  it('should display commonApp badge when commonAppEnabled in institution && showCommonAppIcon === true', async () => {
    renderInstitutionCardWithProvider([], {
      ...item,
      commonAppEnabled: true,
    });

    expect(screen.getByLabelText('Institution allows CommonApp applications')).toBeInTheDocument();
  });
});
