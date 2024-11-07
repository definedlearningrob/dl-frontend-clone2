import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import TOGGLE_FAVORITE_INSTITUTION from '@dc/graphql/student/mutations/toggleFavouriteInstitution';
import INSTITUTION_QUERY from '@dc/graphql/student/queries/institution';
import {
  INSTITUTION_PROGRAMS_QUERY,
  ProgramsDegree,
} from '@dc/graphql/student/queries/institutionPrograms';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

import { Institution } from './Institution';

const toggleFavoritesSpy = jest.fn();

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
          },
        },
      },
    };
  },
};

const institutionMock = {
  request: {
    query: INSTITUTION_QUERY,
    variables: { id: '1', track: true },
  },
  result: {
    data: {
      institution: {
        hasApplied: false,
        id: '1',
        type: 'Private not-for-profit, 4-year or above',
        name: 'Aurora University',
        size: null,
        sizeType: null,
        commonAppApplicationUrl: null,
        sizeDescription: null,
        cost: null,
        imageUrl: 'https://images.definedlearning.com/ipeds/177834.jpg',
        isFavorite: false,
        thumbnailUrl: 'https://images.definedlearning.com/ipeds/177834.jpg',
        address: {
          street: '800 W Jefferson',
          city: 'Kirksville',
          zip: '63501',
          state: 'Missouri',
          stateCode: 'MO',
          area: { kind: 'remote', type: 'town' },
        },
        admissionRate: null,
        satMathMin: null,
        satMathMax: null,
        satReadingMin: null,
        satReadingMax: null,
        actMin: null,
        actMax: null,
        studentFacultyRatio: null,
        commonAppEnabled: false,
        applicationType: null,
        applicationId: null,
        dates: [
          {
            deadlineDate: '2023-03-30',
            decisionType: 'Early Decision',
            term: 'Spring',
          },
          {
            deadlineDate: '2023-04-09',
            decisionType: 'Early Action',
            term: 'Spring',
          },
          {
            deadlineDate: '2023-04-19',
            decisionType: 'Regular Decision',
            term: 'Spring',
          },
          {
            deadlineDate: '2023-09-19',
            decisionType: 'Regular Decision',
            term: 'Fall',
          },
        ],
        degrees: ['certificates', "master's degrees", 'doctoral degrees'],
        contact: {
          phone: '6606262121',
          urlAdmissions: 'www.atsu.edu/',
          urlApplications: 'www.atsu.edu/',
          urlFinancialAid: 'www.atsu.edu/department-of-student-affairs/enrollment-services',
          urlNetPriceCalculator: null,
          urlGeneral: 'www.atsu.edu/',
        },
        maxTeacherEval: 4,
        minTeacherEval: 1,
        isIpeds: true,
      },
    },
  },
};

const institutionProgramsMock = {
  request: {
    query: INSTITUTION_PROGRAMS_QUERY,
    variables: { id: '1', page: 1, perPage: 25 },
  },
  result: {
    data: {
      institution: {
        id: '1',
        programs: {
          nodes: [
            {
              title: 'Test Program',
              degrees: [ProgramsDegree.ASSOCIATES_DEGREE],
            },
            {
              title: 'Test Program 2',
              degrees: [ProgramsDegree.BACHELORS_DEGREE],
            },
          ],
          nodesCount: 2,
          pagesCount: 1,
        },
      },
    },
  },
};

describe('InstitutionCard', () => {
  const renderInstitution = (
    mocks: MockedResponse[] = [],
    options?: { postSecondaryApplicationsEnabled?: boolean }
  ) => {
    const userInfoMock = {
      ...studentInfoMock,
      result: {
        data: {
          userInfo: {
            ...studentInfoMock.result.data.userInfo,
            commonAppData: {
              ...studentInfoMock.result.data.userInfo.commonAppData,
              hasAccountConnected: true,
            },
            ...options,
          },
        },
      },
    };

    return renderWithRouterAndReduxProvider(
      <MockedProvider mocks={[userInfoMock, ...mocks]}>
        <UserInfoProvider value={userInfoMock.result.data}>
          <NavigationContextProvider>
            <Route path='/post-secondary/institutions/:id'>
              <Institution isTeacher={false} />
            </Route>
          </NavigationContextProvider>
        </UserInfoProvider>
      </MockedProvider>,
      {
        route: '/post-secondary/institutions/1',
        initialState: {
          session: { loginError: {}, user: { type: 'student' } },
        },
      }
    );
  };

  beforeEach(() => {
    global.URL.createObjectURL = jest.fn();
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly', async () => {
    const { container } = renderInstitution([institutionMock, institutionProgramsMock]);

    expect(await screen.findByText('Aurora University')).toBeVisible();

    expect(container).toMatchSnapshot();
  });

  it('toggles as favorite', async () => {
    renderInstitution([institutionMock, institutionProgramsMock, toggleFavoriteMock]);

    const button = await screen.findByRole('button', { name: 'Favorite' });
    userEvent.click(button);

    await waitFor(() => {
      expect(toggleFavoritesSpy).toHaveBeenCalled();
    });
  });

  it('shows the apply to college button when enabled on entity level', async () => {
    renderInstitution([institutionMock, institutionProgramsMock]);

    expect(await screen.findByText('Direct application')).toBeVisible();
  });

  it('does not show the apply to college button when disabled on entity lavel', async () => {
    renderInstitution([institutionMock, institutionProgramsMock], {
      postSecondaryApplicationsEnabled: false,
    });

    expect(await screen.findByText('Aurora University')).toBeVisible();
    expect(
      screen.queryByRole('button', { name: 'Begin application process' })
    ).not.toBeInTheDocument();
  });

  it('should display size fallback when it is not provided', async () => {
    const parsedInstitutionMock = {
      ...institutionMock,
      result: {
        data: {
          institution: {
            ...institutionMock.result.data.institution,
            sizeType: null,
            sizeDescription: null,
          },
        },
      },
    };
    renderInstitution([parsedInstitutionMock, institutionProgramsMock]);

    const size = await screen.findByText('Size');
    const sizeHeader = size.previousSibling;

    expect(sizeHeader).toHaveTextContent('Not specified');
  });

  it('should display size description fallback when it is not provided', async () => {
    const parsedInstitutionMock = {
      ...institutionMock,
      result: {
        data: {
          institution: {
            ...institutionMock.result.data.institution,
            sizeType: 'MEDIUM',
            sizeDescription: null,
          },
        },
      },
    };
    renderInstitution([parsedInstitutionMock, institutionProgramsMock]);

    expect(await screen.findByText('Medium (N/A)')).toBeInTheDocument();
  });

  it('should display size description when its provided', async () => {
    const parsedInstitutionMock = {
      ...institutionMock,
      result: {
        data: {
          institution: {
            ...institutionMock.result.data.institution,
            sizeType: 'MEDIUM',
            sizeDescription: 'MORE_THAN_10000',
          },
        },
      },
    };
    renderInstitution([parsedInstitutionMock, institutionProgramsMock]);

    expect(await screen.findByText('Medium (10 000+)')).toBeInTheDocument();
  });

  it('should go to academics tab and display programs with description', async () => {
    renderInstitution([institutionMock, institutionProgramsMock, institutionProgramsMock]);

    const tab = await screen.findByRole('tab', { name: 'Academics' });
    userEvent.click(tab);

    expect(await screen.findByText('Academics Summary')).toBeVisible();
    expect(screen.getByText('Aurora University offers 2 programs.')).toBeVisible();
    expect(screen.getByText('Test Program')).toBeVisible();
    expect(screen.getByText('Test Program 2')).toBeVisible();
  });

  it('programs should display faculty ratio if provided', async () => {
    const parsedInstitutionMock = {
      ...institutionMock,
      result: {
        data: {
          institution: {
            ...institutionMock.result.data.institution,
            studentFacultyRatio: 16,
          },
        },
      },
    };

    renderInstitution([
      parsedInstitutionMock,
      parsedInstitutionMock,
      institutionProgramsMock,
      institutionProgramsMock,
    ]);

    const tab = await screen.findByRole('tab', { name: 'Academics' });
    userEvent.click(tab);

    expect(
      await screen.findByText(
        `Aurora University offers 2 programs. It has student-to-faculty ratio of 16:1.`
      )
    ).toBeVisible();
  });

  it('programs should be filtered by keyword', async () => {
    const institutionProgramsFilterMock = {
      request: {
        query: INSTITUTION_PROGRAMS_QUERY,
        variables: {
          id: '1',
          page: 1,
          perPage: 25,
          filter: { title: 'Test Program 2' },
          infiniteScroll: false,
        },
      },
      result: {
        data: {
          institution: {
            id: '1',
            programs: {
              nodes: [
                {
                  title: 'Test Program 2',
                  degrees: [ProgramsDegree.BACHELORS_DEGREE],
                },
              ],
              nodesCount: 1,
              pagesCount: 1,
            },
          },
        },
      },
    };
    renderInstitution([
      institutionMock,
      institutionProgramsMock,
      institutionProgramsMock,
      institutionProgramsFilterMock,
    ]);

    const tab = await screen.findByRole('tab', { name: 'Academics' });
    userEvent.click(tab);

    expect(await screen.findByText(`Academics Summary`)).toBeVisible();
    const input = screen.getByLabelText('Program name');
    userEvent.paste(input, 'Test Program 2');

    await waitFor(
      () => {
        expect(screen.getByText('Test Program 2')).toBeVisible();
        expect(screen.queryByText('Test Program 1')).not.toBeInTheDocument();
      },
      // timeout is set to 600 because of the debounce which is set to 500
      { timeout: 600 }
    );
  });
});
