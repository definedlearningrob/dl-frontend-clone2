import { MockedProvider } from '@apollo/client/testing';
import { screen } from '@testing-library/dom';

import { FutureColleges } from '@dc/components/Student/Lesson/FutureColleges/FutureColleges';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

type Props = {
  hasInstitutionsInStudentState: boolean;
};

const renderLesson = ({ hasInstitutionsInStudentState }: Props) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[studentInfoMock]}>
      <UserInfoProvider value={{ userInfo: studentInfoMock.result.data.userInfo }}>
        <FutureColleges
          careerName="'Preschool Teachers, Except Special Education'"
          hasInstitutionsInStudentState={hasInstitutionsInStudentState}
        />
      </UserInfoProvider>
    </MockedProvider>,
    { initialState: { session: { user: { type: 'student' }, loginError: {} } } }
  );

describe('FutureColleges', () => {
  it('should render correctly', async () => {
    const { container } = renderLesson({ hasInstitutionsInStudentState: true });

    const heading = await screen.findByRole('heading', { name: 'Colleges & Future' });
    const collagesAndFutureDescription = await screen.findByText(
      'Find associated colleges, universities, trade programs, bootcamps and more with this course.'
    );

    const seeCollagesButton = await screen.findByRole('button', {
      name: 'See colleges & futures',
    });

    expect(heading).toBeInTheDocument();
    expect(collagesAndFutureDescription).toBeInTheDocument();
    expect(seeCollagesButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render when hasInstitutionsInStudentState is true', async () => {
    renderLesson({ hasInstitutionsInStudentState: true });

    const heading = screen.getByRole('heading', { name: 'Colleges & Future' });
    const collagesAndFutureDescription = screen.getByText(
      'Find associated colleges, universities, trade programs, bootcamps and more with this course.'
    );

    const seeCollagesLink = await screen.getByRole('link', {
      name: 'See colleges & futures',
    });

    expect(heading).toBeInTheDocument();
    expect(collagesAndFutureDescription).toBeInTheDocument();
    expect(seeCollagesLink).toHaveAttribute(
      'href',
      "/post-secondary/search?keyword='Preschool Teachers, Except Special Education'&location=ALASKA"
    );
  });

  it('should render when hasInstitutionsInStudentState is false', async () => {
    renderLesson({ hasInstitutionsInStudentState: false });

    const heading = await screen.findByRole('heading', { name: 'Colleges & Future' });
    const collagesAndFutureDescription = await screen.findByText(
      'Find associated colleges, universities, trade programs, bootcamps and more with this course.'
    );

    const seeCollagesLink = await screen.getByRole('link', {
      name: 'See colleges & futures',
    });

    expect(heading).toBeInTheDocument();
    expect(collagesAndFutureDescription).toBeInTheDocument();
    expect(seeCollagesLink).toHaveAttribute(
      'href',
      "/post-secondary/search?keyword='Preschool Teachers, Except Special Education'"
    );
  });
});
