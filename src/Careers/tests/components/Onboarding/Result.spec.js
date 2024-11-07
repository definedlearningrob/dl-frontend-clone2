import { fireEvent, waitFor, within, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';
import assessmentResultsQuery from '@dc/graphql/student/queries/assessmentResults';
import { ASSESSMENT_STEPS_QUERY } from '@dc/graphql/student/queries/assessmentSteps';
import enrollInCourseMutation from '@dc/graphql/student/mutations/enrollInCourse';
import Result from '@dc/components/Onboarding/Result/Result';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import markOnboardingAsCompleted from '@dc/graphql/student/queries/markOnboardingAsCompleted';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import ASSESSMENT_COURSE from '@dc/graphql/student/queries/assesmentCourse';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

// This is because scrollIntoView is not implemented in jsdom.
window.HTMLElement.prototype.scrollIntoView = jest.fn();

const getCourseMock = (courseId = '348') => ({
  request: {
    query: ASSESSMENT_COURSE,
    variables: { id: courseId, track: false },
  },
  result: () => ({
    data: {
      course: {
        id: courseId,
        imageUrl: 'image',
        thumbnailUrl: 'thumburl',
      },
    },
  }),
});

const assessmentResultsMock = {
  request: {
    query: assessmentResultsQuery,
    variables: {},
  },
  result: () => ({
    data: {
      assessmentProgress: {
        result: {
          id: '2',
          additionalPathways: [
            {
              id: '36',
              description:
                'The legal services pathway includes cccupations related to the monitoring.',
              name: 'Legal Services',
              imageUrl: 'http://localstack.lvh.me',
              cluster: {
                name: 'Law, Public Safety, Corrections Security',
                __typename: 'Cluster',
              },
              courses: [
                {
                  id: '295',
                  description: 'Conduct hearings to recommend or make decisions on claims.',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Administrative Law Judges, Adjudicators, and Hearing Officers',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles: 'Adjudicator, Administrative Hearing Officer',
                    averageSalary: '$97,870',
                    jobZone: '5',
                    onetCode: '23-1021.00',
                    outlook: 'Below Average',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'HIGH_SCHOOL',
                },
                {
                  id: '296',
                  description: 'Facilitate negotiation and conflict resolution through dialogue.',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Arbitrators, Mediators, and Conciliators',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles: 'Adjuster Arbitrator, ADR Coordinator',
                    averageSalary: '$63,930',
                    jobZone: '5',
                    onetCode: '23-1022.00',
                    outlook: 'Bright',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'HIGH_SCHOOL',
                },
              ],
              __typename: 'Pathway',
            },
            {
              id: '51',
              description:
                'The engineering and technology pathway includes workers who apply mathematics.',
              name: 'Engineering and Technology',
              imageUrl: 'http://localstack.lvh.me',
              cluster: {
                name: 'STEM',
                __typename: 'Cluster',
              },
              courses: [
                {
                  id: '154',
                  description: 'Perform engineering duties in designing...',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Aerospace Engineers',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles: 'Aerodynamicist, Aeronautical Design Engineer',
                    averageSalary: '$116,500',
                    jobZone: '3',
                    onetCode: '17-2011.00',
                    outlook: 'Below Average',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'HIGH_SCHOOL',
                },
                {
                  id: '43',
                  description:
                    'Plan, direct, or coordinate activities in such fields as architecture.',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Architectural and Engineering Managers',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles: 'Architect Manager, Architectural Job Captain',
                    averageSalary: '$144,830',
                    jobZone: '5',
                    onetCode: '11-9041.00',
                    outlook: 'Below Average',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'HIGH_SCHOOL',
                },
              ],
              __typename: 'Pathway',
            },
          ],
          recommendedPathways: [
            {
              id: '20',
              description: 'Pathway includes occupations that lead or assist in the delivery.',
              name: 'Teaching/Training',
              imageUrl: 'http://localstack.lvh.me',
              cluster: {
                name: 'Education Training',
                __typename: 'Cluster',
              },
              courses: [
                {
                  id: '348',
                  description: 'Provide individualized physical education instruction.',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Adapted Physical Education Specialists',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles:
                      'Adapted Fitness Professional, Adapted Physical Education Aide',
                    averageSalary: '$61,190',
                    jobZone: '1',
                    onetCode: '25-2059.01',
                    outlook: 'Bright',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'MIDDLE_SCHOOL',
                },
                {
                  id: '349',
                  description: 'Teach or instruct out-of-school youths and adults.',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Adult Education',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles: 'Academic Specialist, ABE Instructor',
                    averageSalary: '$54,350',
                    jobZone: '1',
                    onetCode: '25-3011.00',
                    outlook: 'Below Average',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'HIGH_SCHOOL',
                },
                {
                  id: '176',
                  description: 'Develop new or improved designs for vehicle structural members.',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Automotive Engineers',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles: 'Automotive Designer, Automotive Engineer',
                    averageSalary: '$88,430',
                    jobZone: '1',
                    onetCode: '17-2141.02',
                    outlook: 'Below Average',
                    __typename: 'CourseMetadata',
                  },
                  status: 'DRAFT',
                  type: 'HIGH_SCHOOL',
                },
                {
                  id: '180',
                  description:
                    'Develop usable, tangible products, using knowledge of biology, chemistry, or engineering.',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Biochemical Engineers',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles: 'Analytical Biochemical Engineer',
                    averageSalary: '$99,040',
                    jobZone: '2',
                    onetCode: '17-2199.01',
                    outlook: 'Below Average',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'HIGH_SCHOOL',
                },
                {
                  id: '44',
                  description:
                    'Define, plan, or execute biofuels/biodiesel research programs that evaluate alternative feedstock.',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Biofuels/Biodiesel Technology and Product Development Managers',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles:
                      'Analytical Research Program Manager, Biodiesel Division Manager',
                    averageSalary: '$144,830',
                    jobZone: '3',
                    onetCode: '11-9041.01',
                    outlook: 'Below Average',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'HIGH_SCHOOL',
                },
                {
                  id: '157',
                  description:
                    'Design chemical plant equipment and devise processes for manufacturing chemicals and products.',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Chemical Engineers',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles: 'Absorption and Adsorption Engineer, Automation Engineer',
                    averageSalary: '$108,770',
                    jobZone: '4',
                    onetCode: '17-2041.00',
                    outlook: 'Below Average',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'HIGH_SCHOOL',
                },
                {
                  id: '160',
                  description:
                    'Research, design, develop, or test computer or computer-related equipment for commercial.',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Computer Hardware Engineers',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles: 'Automation Engineer, Computer Architect',
                    averageSalary: '$117,220',
                    jobZone: '5',
                    onetCode: '17-2061.00',
                    outlook: 'Below Average',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'HIGH_SCHOOL',
                },
              ],
              __typename: 'Pathway',
            },
            {
              id: '29',
              description: 'The counseling and mental health services pathway includes workers.',
              name: 'Counseling Mental Health Services',
              imageUrl: 'http://localstack.lvh.me',
              cluster: {
                name: 'Human Services',
                __typename: 'Cluster',
              },
              courses: [
                {
                  id: '251',
                  description: 'Diagnose or evaluate mental and emotional disorders.',
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Clinical Psychologists',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles: 'Behavior Analyst, Behavior Specialist, Behavior Therapist',
                    averageSalary: '$78,200',
                    jobZone: '5',
                    onetCode: '19-3031.02',
                    outlook: 'Below Average',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'HIGH_SCHOOL',
                },
                {
                  id: '252',
                  description:
                    "Assess and evaluate individuals' problems through the use of case history.",
                  imageUrl: 'http://localstack.lvh.me',
                  name: 'Counseling Psychologists',
                  __typename: 'Course',
                  metadata: {
                    alternativeTitles: 'ABSS, Behavior Specialist, Behavior Therapist',
                    averageSalary: '$78,200',
                    jobZone: '3',
                    onetCode: '19-3031.03',
                    outlook: 'Below Average',
                    __typename: 'CourseMetadata',
                  },
                  status: 'PUBLISHED',
                  type: 'HIGH_SCHOOL',
                },
              ],
              __typename: 'Pathway',
            },
          ],
          __typename: 'AssessmentResult',
        },
        __typename: 'AssessmentProgress',
      },
      currentCourses: [],
    },
  }),
};
const defaultMocks = [
  {
    request: {
      query: assessmentAttemptStatusQuery,
      variables: {},
    },
    result: () => ({
      data: {
        assessmentProgress: {
          attempt: {
            assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
            id: '5',
            status: 'FINISHED',
            updatedAt: '2021-09-29T09:00:00Z',
            __typename: 'AssessmentAttempt',
          },
          __typename: 'AssessmentProgress',
        },
      },
    }),
  },
  assessmentResultsMock,
  {
    request: {
      query: ASSESSMENT_STEPS_QUERY,
      variables: {},
    },
    result: () => ({
      data: {
        assessmentProgress: {
          attempt: {
            assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
            id: '1',
            status: 'FINISHED',
            updatedAt: '2021-09-29T09:00:00Z',
            __typename: 'AssessmentAttempt',
          },
          __typename: 'AssessmentProgress',
        },
      },
    }),
  },
  getCourseMock(),
  userInfoMock,
];

const enrollInMiddleSchoolCourseMocks = [
  {
    request: {
      query: enrollInCourseMutation,
      variables: {
        input: {
          courseId: '348',
          studentUuid: undefined,
        },
      },
    },
    result: () => ({
      data: {
        enrollInCourse: {
          course: {
            id: '348',
            imageUrl: 'https://test_image.com',
            name: 'MiddleSchool Course',
            progress: {
              submitted: 2,
              total: 5,
            },
            status: 'DONE',
            pathway: {
              name: 'MiddleSchool',
            },
          },
        },
      },
    }),
  },
  {
    request: {
      query: assessmentAttemptStatusQuery,
      variables: {},
    },
    result: () => ({
      data: {
        assessmentProgress: {
          attempt: {
            assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
            id: '1',
            status: 'FINISHED',
          },
        },
      },
    }),
  },
];

const enrollInDefaultCourseMocks = [
  {
    request: {
      query: enrollInCourseMutation,
      variables: {
        input: {
          courseId: '349',
          studentUuid: undefined,
        },
      },
    },
    result: () => ({
      data: {
        enrollInCourse: {
          course: {
            id: '349',
            imageUrl: 'https://test_image.com',
            name: 'MiddleSchool Course',
            progress: {
              submitted: 2,
              total: 5,
            },
            status: 'DONE',
            pathway: {
              name: 'MiddleSchool',
            },
          },
        },
      },
    }),
  },
  {
    request: {
      query: assessmentAttemptStatusQuery,
      variables: {},
    },
    result: () => ({
      data: {
        assessmentProgress: {
          attempt: {
            assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
            id: '1',
            status: 'FINISHED',
          },
        },
      },
    }),
  },
];

const renderOnboardingResult = (
  assessmentType = CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
  mocks = [],
  userInfo
) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...defaultMocks, ...mocks]}>
      <UserInfoProvider
        value={{
          userInfo: userInfo || {
            hasCompletedOnboarding: true,
            settings: {
              assessmentType: assessmentType,
            },
          },
        }}>
        <Result assessmentType={assessmentType} />
      </UserInfoProvider>
    </MockedProvider>,
    { initialState: { session: { loginError: {}, user: { type: 'student' } } } }
  );

describe('OnboardingResult', () => {
  it('renders top/bottom navigation bars and intro, components, pathways sections', async () => {
    const { container } = renderOnboardingResult();

    const navigationBars = await screen.findAllByTestId(/onboarding-result-nav/);
    const introSection = screen.getByTestId(/assessment-result-intro/);
    const componentsSection = screen.getByTestId(/assessment-result-components-section/);
    const pathwaysSection = screen.getByTestId(/pathway-options/);

    expect(navigationBars).toHaveLength(2);
    expect(introSection).toBeInTheDocument();
    expect(componentsSection).toBeInTheDocument();
    expect(pathwaysSection).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('when a student has "MIDDLE_SCHOOL" assessment type, selected pathway displays middle school courses', async () => {
    renderOnboardingResult(CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL);

    const pathwayCards = await screen.findAllByTestId(/pathway-card/);
    fireEvent.click(pathwayCards[0]);

    const middleSchoolOverview = screen.queryByTestId(/onboarding-result-middleSchool-overview/);
    const coursesTable = screen.queryByTestId(/onboarding-result-courses-table/);

    expect(middleSchoolOverview).toBeInTheDocument();
    expect(coursesTable).not.toBeInTheDocument();
  });

  it('when a student has "DEFAULT" assessment type, selected pathway displays table of courses to enroll', async () => {
    renderOnboardingResult();

    const pathwayCards = await screen.findAllByTestId(/pathway-card/);

    fireEvent.click(pathwayCards[0]);

    const middleSchoolOverview = screen.queryByTestId(/onboarding-result-middleSchool-overview/);
    const coursesTable = screen.queryByTestId(/onboarding-result-courses-table/);

    expect(middleSchoolOverview).not.toBeInTheDocument();
    expect(coursesTable).toBeInTheDocument();
  });

  describe('recommended pathways section', () => {
    it('displays 4 matching pathways as cards correctly', async () => {
      renderOnboardingResult();

      const pathwayCards = await screen.findAllByTestId(/pathway-card/);

      expect(pathwayCards).toHaveLength(4);

      expect(pathwayCards[0]).toHaveTextContent(/Teaching\/Training/i);
      expect(pathwayCards[0]).toHaveTextContent(/Part of the Education Training Cluster/i);

      expect(pathwayCards[1]).toHaveTextContent(/Counseling Mental Health Services/i);
      expect(pathwayCards[1]).toHaveTextContent(/Part of the Human Services Cluster/i);

      expect(pathwayCards[2]).toHaveTextContent(/Legal Services/i);
      expect(pathwayCards[2]).toHaveTextContent(
        /Part of the Law, Public Safety, Corrections Security Cluster/i
      );

      expect(pathwayCards[3]).toHaveTextContent(/Engineering and Technology/i);
      expect(pathwayCards[3]).toHaveTextContent(/Part of the STEM Cluster/i);
    });
  });

  describe('middleSchool pathway overview', () => {
    it('displays placeholder message when there is no middleSchool courses available within pathway', async () => {
      renderOnboardingResult(CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL);

      const pathwayWithoutMiddleSchoolCourse = await screen.findAllByTestId(/pathway-card/);
      fireEvent.click(pathwayWithoutMiddleSchoolCourse[3]);

      const placeholderMessage = screen.getByTestId(/empty-placeholder/);

      expect(placeholderMessage).toHaveTextContent(
        'Middle School courses for this pathway are not available.'
      );
    });

    it('displays card with pathway title, pathway description and enroll button', async () => {
      renderOnboardingResult(CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL);

      const pathwayCards = await screen.findAllByTestId(/pathway-card/);

      fireEvent.click(pathwayCards[0]);

      const middleSchoolOverview = await screen.findByTestId(
        /onboarding-result-middleSchool-overview/
      );

      expect(middleSchoolOverview).toHaveTextContent(/Adapted Physical Education Specialists/i);
      expect(middleSchoolOverview).toHaveTextContent(
        /Provide individualized physical education instruction./i
      );
      expect(within(middleSchoolOverview).getByTestId(/button/)).toHaveTextContent(/enroll/i);
    });

    it('opens course modal on "Enroll" button and enrolls in a middle school course correctly', async () => {
      const enrollInCourseMutationSpy = jest.spyOn(enrollInMiddleSchoolCourseMocks[0], 'result');

      renderOnboardingResult(CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL, [
        ...enrollInMiddleSchoolCourseMocks,
        assessmentResultsMock,
      ]);

      const pathwayCards = await screen.findAllByTestId(/pathway-card/);

      fireEvent.click(pathwayCards[0]);

      await waitFor(() => {
        const openModalButton = within(
          screen.getByTestId(/onboarding-result-middleSchool-overview/)
        ).getByTestId(/button/);

        fireEvent.click(openModalButton);
      });

      const courseModal = await screen.findByRole('dialog', { name: 'Modal' });

      expect(courseModal).toBeInTheDocument();
      expect(courseModal).toHaveTextContent(/Adapted Physical Education Specialists/i);
      expect(courseModal).toHaveTextContent(
        /Provide individualized physical education instruction./i
      );
      expect(courseModal).toHaveTextContent(/Median Salary:\$61,190 annual/i);
      expect(courseModal).toHaveTextContent(/Projected Employment Growth Next 10 years:Bright/i);

      const modalEnrollButton = await screen.getByTestId(/enroll-in-course/);

      fireEvent.click(modalEnrollButton);

      await waitFor(() => {
        expect(enrollInCourseMutationSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('calls mark onboarding as completed after enroll when onboarding enabled and not completed', async () => {
      const markOnboardingAsCompletedSpy = jest.fn();
      const mocks = [
        assessmentResultsMock,
        studentInfoMock,
        {
          request: {
            query: enrollInCourseMutation,
            variables: {
              input: {
                courseId: '348',
                studentUuid: undefined,
              },
            },
          },
          result: () => ({
            data: {
              enrollInCourse: {
                course: {
                  id: '348',
                  imageUrl: 'https://test_image.com',
                  name: 'MiddleSchool Course',
                  progress: {
                    submitted: 2,
                    total: 5,
                  },
                  status: 'DONE',
                  pathway: {
                    name: 'MiddleSchool',
                  },
                },
              },
            },
          }),
        },
        {
          request: {
            query: markOnboardingAsCompleted,
            variables: { input: {} },
          },
          result() {
            markOnboardingAsCompletedSpy();

            return {
              data: {
                markOnboardingAsCompleted: {
                  status: 'SUCCESS',
                },
              },
            };
          },
        },
        userInfoMock,
      ];

      renderOnboardingResult(CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL, mocks, {
        hasCompletedOnboarding: false,
        settings: {
          onboardingEnabled: true,
          assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
        },
      });

      const pathwayCards = await screen.findAllByTestId(/pathway-card/);
      userEvent.click(pathwayCards[0]);

      const openModalButton = await within(
        screen.getByTestId(/onboarding-result-middleSchool-overview/)
      ).findByRole('button', {
        name: 'Enroll',
      });
      userEvent.click(openModalButton);

      const modalEnrollButton = await screen.findByRole('button', { name: 'Enroll in Course' });
      userEvent.click(modalEnrollButton);

      await waitFor(() => expect(markOnboardingAsCompletedSpy).toHaveBeenCalledTimes(1));
    });

    it('does not call mark onboarding as completed after enroll when onboarding disabled and not completed', async () => {
      const markOnboardingAsCompletedSpy = jest.fn();
      const mocks = [
        {
          request: {
            query: enrollInCourseMutation,
            variables: {
              input: {
                courseId: '348',
                studentUuid: undefined,
              },
            },
          },
          result: () => ({
            data: {
              enrollInCourse: {
                course: {
                  id: '348',
                  imageUrl: 'https://test_image.com',
                  name: 'MiddleSchool Course',
                  progress: {
                    submitted: 2,
                    total: 5,
                  },
                  status: 'DONE',
                  pathway: {
                    name: 'MiddleSchool',
                  },
                },
              },
            },
          }),
        },
        {
          request: {
            query: markOnboardingAsCompleted,
            variables: { input: {} },
          },
          result() {
            markOnboardingAsCompletedSpy();

            return {
              data: {
                markOnboardingAsCompleted: {
                  status: 'SUCCESS',
                },
              },
            };
          },
        },
      ];

      renderOnboardingResult(CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL, mocks, {
        hasCompletedOnboarding: false,
        settings: {
          onboardingEnabled: false,
          assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
        },
      });

      const pathwayCards = await screen.findAllByTestId(/pathway-card/);
      userEvent.click(pathwayCards[0]);

      const openModalButton = await within(
        screen.getByTestId(/onboarding-result-middleSchool-overview/)
      ).findByRole('button', {
        name: 'Enroll',
      });
      userEvent.click(openModalButton);

      const modalEnrollButton = await screen.findByRole('button', { name: 'Enroll in Course' });
      userEvent.click(modalEnrollButton);

      await waitFor(() => expect(markOnboardingAsCompletedSpy).not.toHaveBeenCalledTimes(1));
    });

    it('does not call mark onboarding as completed after enroll when onboarding enabled and completed', async () => {
      const markOnboardingAsCompletedSpy = jest.fn();
      const mocks = [
        {
          request: {
            query: enrollInCourseMutation,
            variables: {
              input: {
                courseId: '348',
                studentUuid: undefined,
              },
            },
          },
          result: () => ({
            data: {
              enrollInCourse: {
                course: {
                  id: '348',
                  imageUrl: 'https://test_image.com',
                  name: 'MiddleSchool Course',
                  progress: {
                    submitted: 2,
                    total: 5,
                  },
                  status: 'DONE',
                  pathway: {
                    name: 'MiddleSchool',
                  },
                },
              },
            },
          }),
        },
        {
          request: {
            query: markOnboardingAsCompleted,
            variables: { input: {} },
          },
          result() {
            markOnboardingAsCompletedSpy();

            return {
              data: {
                markOnboardingAsCompleted: {
                  status: 'SUCCESS',
                },
              },
            };
          },
        },
        userInfoMock,
      ];

      renderOnboardingResult(CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL, mocks, {
        hasCompletedOnboarding: false,
        settings: {
          onboardingEnabled: false,
          assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
        },
      });

      const pathwayCards = await screen.findAllByTestId(/pathway-card/);
      userEvent.click(pathwayCards[0]);

      const openModalButton = await within(
        screen.getByTestId(/onboarding-result-middleSchool-overview/)
      ).findByRole('button', {
        name: 'Enroll',
      });
      userEvent.click(openModalButton);

      const modalEnrollButton = await screen.findByRole('button', { name: 'Enroll in Course' });
      userEvent.click(modalEnrollButton);

      await waitFor(() => expect(markOnboardingAsCompletedSpy).not.toHaveBeenCalledTimes(1));
    });
  });

  describe("default pathway's courses table", () => {
    it('displays pathway name, pathway description and study duration tabs correctly', async () => {
      renderOnboardingResult();

      const pathwayCards = await screen.findAllByTestId(/pathway-card/);

      fireEvent.click(pathwayCards[0]);

      const coursesTable = await screen.findByTestId(/onboarding-result-courses-table/);
      const courseTableTabs = await screen.findAllByTestId(/course-table-tab/);

      expect(coursesTable).toHaveTextContent(/Teaching\/Training/i);
      expect(coursesTable).toHaveTextContent(
        /Pathway includes occupations that lead or assist in the delivery./i
      );

      expect(courseTableTabs).toHaveLength(4);
      expect(courseTableTabs[0]).toHaveTextContent(/1 Year/i);
      expect(courseTableTabs[1]).toHaveTextContent(/1 - 3 Years/i);
      expect(courseTableTabs[2]).toHaveTextContent(/4 Year/i);
      expect(courseTableTabs[3]).toHaveTextContent(/5 \+ Years/i);
    });

    it('displays published courses and draft courses in period tab correctly', async () => {
      renderOnboardingResult();

      const pathwayCards = await screen.findAllByTestId(/pathway-card/);

      fireEvent.click(pathwayCards[0]);

      const courseNames = await screen.findAllByTestId(/onboarding-table-course-name/);
      const courseButtons = await screen.findAllByTestId(/onboarding-table-course-button/);
      const extendDraftCoursesButton = await screen.findByTestId(
        /onboarding-table-draft-courses-divider/
      );

      expect(courseNames).toHaveLength(3);
      expect(courseNames[0]).toHaveTextContent(/Adult Education/i);
      expect(courseNames[1]).toHaveTextContent(/Biochemical Engineers/i);
      expect(courseNames[2]).toHaveTextContent(/Automotive Engineers/i);

      expect(courseButtons).toHaveLength(3);
      expect(courseButtons[0]).toHaveTextContent(/enroll in course/i);
      expect(courseButtons[1]).toHaveTextContent(/enroll in course/i);
      expect(courseButtons[2]).toHaveTextContent(/See Details/i);

      expect(extendDraftCoursesButton).toHaveTextContent(/see other matching careers/i);
    });

    it('does not allow to enroll in "DRAFT" course', async () => {
      renderOnboardingResult();

      const pathwayCards = await screen.findAllByTestId(/pathway-card/);

      fireEvent.click(pathwayCards[0]);

      const courseButtons = await screen.findAllByTestId(/onboarding-table-course-button/);

      fireEvent.click(courseButtons[2]);

      await waitFor(() => {
        const courseModal = screen.getByRole('dialog', { name: 'Modal' });
        const modalEnrollButton = within(courseModal).queryByTestId(/enroll-in-course/);

        expect(modalEnrollButton).not.toBeInTheDocument();
      });
    });

    it('enrolls on a selected course correctly', async () => {
      const enrollInCourseMutationSpy = jest.spyOn(enrollInDefaultCourseMocks[0], 'result');

      renderOnboardingResult(CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL, [
        ...enrollInDefaultCourseMocks,
        getCourseMock('349'),
        assessmentResultsMock,
      ]);

      const pathwayCards = await screen.findAllByTestId(/pathway-card/);

      fireEvent.click(pathwayCards[0]);

      const courseButtons = await screen.findAllByTestId(/onboarding-table-course-button/);

      fireEvent.click(courseButtons[0]);

      await waitFor(() => {
        const courseModal = screen.getByRole('dialog', { name: 'Modal' });
        const modalEnrollButton = within(courseModal).queryByTestId(/enroll-in-course/);

        fireEvent.click(modalEnrollButton);
      });

      await waitFor(() => {
        expect(enrollInCourseMutationSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
