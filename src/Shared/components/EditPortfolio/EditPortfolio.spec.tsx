import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { LocationState, MemoryHistory, createMemoryHistory } from 'history';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import cacheConfig from '@dc/graphql/cacheConfig';

import PortfolioProvider from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { EditPortfolio } from '@shared/components/EditPortfolio/EditPortfolio';
import { TCurrentUserInfo } from '@shared/components/Portfolio/types';

import { NavigationContextProvider } from '../Sidebar/useNavigation';

import {
  portfolioCareersProjectsMock,
  portfolioCareersResumesMock,
  portfolioCareersResumesWithBadgesMock,
  updateEducationMock,
  updateEducationSpy,
  updateExperienceMock,
  updateExperienceSpy,
  updateExtraCurricularsMock,
  updateExtraCurricularsSpy,
  updateResumeMock,
  updateResumeSpy,
} from './mocks';

const studentInfo = {
  uuid: '123',
  lastName: 'Jewess',
  firstName: 'Amanda',
  email: '',
  username: 'amanda.jewess',
};

const renderEditPortfolio = (mocks: MockedResponse[] = [], history: MemoryHistory<LocationState>) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={cacheConfig} mocks={[studentInfoMock, ...mocks]}>
      <NavigationContextProvider>
        <PortfolioProvider
          studentInfo={studentInfo}
          userInfo={studentInfoMock.result.data.userInfo as unknown as TCurrentUserInfo}>
          <EditPortfolio />
        </PortfolioProvider>
      </NavigationContextProvider>
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

describe('EditPortfolioContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const hardcodedDate = new Date('2023-01-01T12:00:00Z');
    jest.useFakeTimers().setSystemTime(hardcodedDate.getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // mock window.scrollTo()
  const scrollToSpy = jest.fn();
  global.scrollTo = scrollToSpy;

  it('should render skeletons correctly', () => {
    const history = createMemoryHistory({ initialEntries: ['/portfolio/edit'] });

    const { container } = renderEditPortfolio(
      [
        portfolioCareersResumesMock,
        portfolioCareersResumesMock,
        portfolioCareersResumesMock,
        portfolioCareersProjectsMock,
      ],
      history
    );

    expect(container).toMatchSnapshot();
  });

  it('should render initial state correctly', async () => {
    const history = createMemoryHistory({ initialEntries: ['/portfolio/edit'] });

    const { container } = renderEditPortfolio(
      [
        portfolioCareersResumesMock,
        portfolioCareersResumesMock,
        portfolioCareersResumesMock,
        portfolioCareersProjectsMock,
        portfolioCareersProjectsMock,
      ],
      history
    );

    const personalInformationHeading = await screen.findByText('Personal Information');

    expect(personalInformationHeading).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should edit all personal info', async () => {
    const history = createMemoryHistory({ initialEntries: ['/portfolio/edit'] });

    const { container } = renderEditPortfolio(
      [
        portfolioCareersResumesMock,
        portfolioCareersResumesMock,
        portfolioCareersResumesMock,
        portfolioCareersResumesMock,
        portfolioCareersProjectsMock,
        portfolioCareersProjectsMock,
        updateResumeMock,
      ],
      history
    );

    expect(await screen.findByText('Personal Information')).toBeInTheDocument();

    const nameInput = screen.getByLabelText('Display Name');
    const bioNoteInput = screen.getByLabelText(/Bio-note/);
    const emailInput = screen.getByPlaceholderText('Email address...');
    const phoneInput = screen.getByPlaceholderText('Phone number...');
    const linkedInInput = screen.getByPlaceholderText('LinkedIn account...');

    userEvent.paste(nameInput, '- Test Name');
    userEvent.paste(bioNoteInput, 'test bio');
    userEvent.paste(emailInput, 'mail@test.com');
    userEvent.paste(phoneInput, '1234567890');
    userEvent.paste(linkedInInput, 'linkedin.com');

    expect(container).toMatchSnapshot();

    const contactLinksHeader = await screen.findByRole('heading', {
      level: 2,
      name: 'Contacts and links',
    });

    const addLinkButton = within(contactLinksHeader.parentNode as HTMLElement).getByRole('button', {
      name: 'Add new',
    });

    userEvent.click(addLinkButton);

    const customLinkInput2 = screen.getAllByPlaceholderText('Custom link...')[0];

    userEvent.paste(customLinkInput2, 'custom2.com');

    const hideLastContactLink = screen.getAllByText('Hide')[3];

    userEvent.click(hideLastContactLink);

    const saveButton = screen.getByRole('button', { name: 'Save' });

    userEvent.click(saveButton);

    await waitFor(() => expect(updateResumeSpy).toHaveBeenCalledTimes(1));
  });

  const testCases = [
    [
      'Experience',
      updateExperienceMock,
      updateExperienceSpy,
      'Type experience name...',
      'Select experience period...',
      'Type experience description...',
    ],
    [
      'Education',
      updateEducationMock,
      updateEducationSpy,
      'Type education name...',
      'Select education period...',
      'Type education description...',
    ],
    [
      'Extra-Curriculars',
      updateExtraCurricularsMock,
      updateExtraCurricularsSpy,
      'Type extra-curricular name...',
      'Select extra-curricular period...',
      'Type extra-curricular description...',
    ],
  ] as const;

  it.each(testCases)(
    'should add %s info',
    async (sectionName, mock, spy, namePlaceholder, periodPlaceholder, descriptionPlaceholder) => {
      const history = createMemoryHistory({ initialEntries: ['/portfolio/edit'] });

      renderEditPortfolio(
        [
          portfolioCareersResumesMock,
          portfolioCareersResumesMock,
          portfolioCareersProjectsMock,
          portfolioCareersProjectsMock,
          mock as unknown as MockedResponse,
        ],
        history
      );

      expect(await screen.findByText('Edit Portfolio')).toBeInTheDocument();

      const heading = await screen.findByRole('heading', {
        level: 2,
        name: sectionName as string,
      });

      const section = heading.closest('section');

      const addNewButton = within(section!).getByRole('button', {
        name: 'Add new',
      });

      userEvent.click(addNewButton);

      const sectionNameLowerCase = typeof sectionName === 'string' && sectionName.toLowerCase();

      const nameInput = screen.getByPlaceholderText(
        (typeof namePlaceholder === 'string' && namePlaceholder) ||
          `Type ${sectionNameLowerCase} name...`
      );
      const periodInput = screen.getByPlaceholderText(
        (typeof periodPlaceholder === 'string' && periodPlaceholder) ||
          `Select ${sectionNameLowerCase} period...`
      );
      const descriptionInput = screen.getByPlaceholderText(
        (typeof descriptionPlaceholder === 'string' && descriptionPlaceholder) ||
          `Type ${sectionNameLowerCase} description...`
      );

      userEvent.paste(nameInput, `test ${sectionNameLowerCase}`);

      userEvent.click(periodInput);

      const monthLabels = await screen.findAllByLabelText(/choose/i);

      const januaryElement = monthLabels[0];
      const decemberElement = monthLabels[11];

      userEvent.click(januaryElement);
      userEvent.click(decemberElement);

      userEvent.paste(descriptionInput, 'test experience description');

      const hideButton = within(section!).getByText('Hide');

      userEvent.click(hideButton);

      const saveButton = screen.getByRole('button', { name: 'Save' });

      userEvent.click(saveButton);

      await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    }
  );

  it('should not render Badges section if student has not received any badges yet', async () => {
    const history = createMemoryHistory({ initialEntries: ['/portfolio/edit'] });

    renderEditPortfolio(
      [portfolioCareersResumesMock, portfolioCareersResumesMock, portfolioCareersProjectsMock],
      history
    );

    expect(await screen.findByText('Personal Information')).toBeInTheDocument();

    expect(await screen.queryByText('Badges')).toBeNull();
  });

  it('should render Badges section', async () => {
    const history = createMemoryHistory({ initialEntries: ['/portfolio/edit'] });

    const { container } = renderEditPortfolio(
      [
        portfolioCareersResumesWithBadgesMock,
        portfolioCareersResumesWithBadgesMock,
        portfolioCareersResumesWithBadgesMock,
        portfolioCareersResumesWithBadgesMock,
        portfolioCareersResumesWithBadgesMock,
        portfolioCareersProjectsMock,
      ],
      history
    );

    const element = await screen.findByRole('heading', { name: 'Badges' });

    expect(element).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
