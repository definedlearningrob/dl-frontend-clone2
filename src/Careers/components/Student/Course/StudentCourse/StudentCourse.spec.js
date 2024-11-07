import { I18nextProvider } from 'react-i18next';
import { MockedProvider } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { waitFor, screen } from '@testing-library/react';

import { StudentCourse } from '@dc/components/Student/Course/StudentCourse';
import i18n from '@dc/i18n';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import COURSE from '@dc/graphql/student/queries/course';
import { EducationalSettingTypes } from '@dc/resources/enums';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const props = {
  description: 'random',
  name: 'random',
  progress: {
    total: 4,
    submitted: 0,
  },
  pathway: {
    name: 'Pathway',
  },
  isEnrolled: false,
};

const propsEnrolled = {
  description: 'random',
  name: 'random',
  progress: {
    total: 4,
    submitted: 0,
  },
  pathway: {
    name: 'Pathway',
  },
  isEnrolled: true,
};
let courseQuerySpy = jest.fn();

const mocks = [
  {
    request: {
      query: COURSE,
      variables: { id: '123', track: true },
    },
    result() {
      courseQuerySpy();

      return {
        data: {
          course: {
            description: 'Description',
            id: '1',
            imageUrl: 'image-url',
            lessons: [],
            name: 'Course name',
            pathway: { name: 'Pathway name' },
            progress: { submitted: 1, total: 2 },
            type: EducationalSettingTypes.HIGH_SCHOOL,
          },
        },
      };
    },
  },
];

const renderLessonCard = (props) =>
  renderWithRouterAndReduxProvider(
    <Route path='courses/:id'>
      <MockedProvider mocks={mocks}>
        <I18nextProvider i18n={i18n}>
          <UserInfoProvider>
            <NavigationContextProvider>
              <StudentCourse {...props} />
            </NavigationContextProvider>
          </UserInfoProvider>
        </I18nextProvider>
      </MockedProvider>
    </Route>,
    {
      route: 'courses/123',
    }
  );

describe('StudentCourse', () => {
  describe('renders correctly', () => {
    it('when student is not enrolled', async () => {
      const { container } = renderLessonCard(props);

      await waitFor(() => {
        expect(courseQuerySpy).toHaveBeenCalled();
      });

      expect(screen.getByRole('button', { name: 'Enroll in Course' })).toBeInTheDocument();

      expect(container).toMatchSnapshot();
    });

    it('when student is enrolled', async () => {
      const { container } = renderLessonCard(propsEnrolled);

      await waitFor(() => {
        expect(courseQuerySpy).toHaveBeenCalled();
      });

      const courseName = await screen.findByRole('heading', { name: 'Course name' });
      expect(courseName).toBeInTheDocument();

      const continueLink = screen.getByRole('link', { name: 'Continue' });
      expect(continueLink).toHaveAttribute('href', '/courses');

      expect(screen.getByRole('button', { name: 'Unenroll' })).toBeInTheDocument();

      expect(container).toMatchSnapshot();
    });
  });
});
