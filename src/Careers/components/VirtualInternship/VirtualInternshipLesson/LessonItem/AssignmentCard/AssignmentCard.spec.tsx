import { MockedProvider } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { AssignmentCard } from '@dc/components/VirtualInternship/VirtualInternshipLesson/LessonItem';
import deleteAssignmentSubmissionFileMutation from '@dc/graphql/student/mutations/deleteAssignmentSubmissionFile';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import {
  ASSIGNMENT_SUBMISSION_TYPES,
  OPPORTUNITY_APPLICATION_STATUS,
  OPPORTUNITY_TYPE,
  VISIBILITY_SCOPE,
} from '@dc/resources/enums';
import { TAssignment } from '@dc/components/Student/Lesson/types';
import { VIRTUAL_INTERNSHIP_LESSON_QUERY } from '@dc/graphql/student/queries/virtualInternshipLesson';
import createAssignmentSubmissionMutation from '@dc/graphql/student/mutations/createAssignmentSubmission';
import { UPDATE_ASSIGNMENT_SUBMISSION_MUTATION } from '@dc/graphql/student/mutations/updateAssignmentSubmission';
import {
  ASSESSMENT_SUBMISSION_STATUS,
  ASSET_TYPE,
  LESSON_TYPES,
  RESOURCE_CLASS,
} from '@dc/resources/constants';
import generatePresignedUrlMutation from '@dc/graphql/student/mutations/generatePresignedUploadUrl';
import createAssignmentSubmissionFileMutation from '@dc/graphql/student/mutations/createAssignmentSubmissionFile';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const opportunityFetchSpy = jest.fn();
const deleteAssignmentFetchSpy = jest.fn();
const createAssignmentFileSpy = jest.fn();
const updateAssignmentFetchSpy = jest.fn();
const generatePresignatedUrlFetchSpy = jest.fn();
const generateFilesFetchSpy = jest.fn();

const xhrMock = {
  onreadystatechange: null,
  open: jest.fn(),
  send: jest.fn(),
  upload: {},
};

const virtualInternshipLessonMock = {
  request: {
    query: VIRTUAL_INTERNSHIP_LESSON_QUERY,
    variables: { opportunityId: '14', lessonId: '4' },
  },
  result() {
    opportunityFetchSpy();

    return {
      data: {
        opportunity: {
          applicationStatus: OPPORTUNITY_APPLICATION_STATUS.PENDING,
          opportunityApplication: { id: '123' },
          archivedAt: '',
          automaticAcceptance: true,
          availableSpots: 3,
          creditsOutcomes: 'Credits',
          deadline: '',
          periodStart: '',
          periodEnd: '',
          tags: [],
          description: 'Description',
          id: '1',
          imageUrl: 'url-to-image',
          isFavorite: true,
          opportunityType: OPPORTUNITY_TYPE.VIRTUAL_INTERNSHIP,
          pathways: [{ id: '1', name: 'Pathway name' }],
          salaryInformation: 'Salary information',
          location: 'location',
          name: 'Test Virtual Internship',
          questions: [{ id: '1', question: 'Question?' }],
          visibilityScope: VISIBILITY_SCOPE.ENTITY,
          virtualInternship: {
            id: '1000',
            requiredExperiences: 2,
            lesson: {
              assignments: [],
              description: {
                audience: '',
                goal: '',
                introduction: '',
                role: '',
                situation: '',
              },
              progress: { performed: 1, total: 2, submitted: 0, accepted: 1 },
              attachments: [],
              vocabularies: [],
              careerReviewSurvey: { version: 1, questions: [], performed: false },
              checkInGroups: [],
              checkInQuestions: [],
              videos: [],
              type: LESSON_TYPES.GENERIC,
              texts: [],
              researchLinks: [],
              externalPresentations: [],
              name: 'Lesson name',
              imageUrl: 'image-url',
              id: '1',
              hasPresentation: true,
            },
            readinessSkillsLessons: [
              {
                id: '22',
                name: 'First readiness skills lessons name',
                thumbnailUrl: 'thumbnail-url',
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
              {
                id: '33',
                name: 'Second readiness skills lessons name',
                thumbnailUrl: 'thumbnail-url',
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
            ],
            experienceOpportunityLessons: [
              {
                id: '123',
                name: 'Preselected experience opportunity lesson name',
                thumbnailUrl: 'thumbnail-url',
                description: {
                  introduction: 'Experience opportunity description - id: 123',
                  audience: '',
                  goal: '',
                  role: '',
                  situation: '',
                },
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
              {
                id: '124',
                name: 'Experience opportunity lesson to select',
                thumbnailUrl: 'thumbnail-url',
                description: {
                  introduction: 'Experience opportunity description - id: 124',
                  audience: '',
                  goal: '',
                  role: '',
                  situation: '',
                },
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
            ],
            studentExperienceOpportunityLessons: [
              {
                id: '123',
                name: 'Preselected experience opportunity lesson name',
                thumbnailUrl: 'thumbnail-url',
                description: {
                  introduction: 'Experience opportunity description - id: 123',
                  audience: '',
                  goal: '',
                  role: '',
                  situation: '',
                },
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
            ],
            postExperienceLessons: [
              {
                id: '11',
                name: 'First post experience lessons name',
                thumbnailUrl: 'thumbnail-url',
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
              {
                id: '12',
                name: 'Second post experience lessons name',
                thumbnailUrl: 'thumbnail-url',
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
            ],
            calendarLessons: [
              {
                id: '1',
                name: 'First lesson name',
                thumbnailUrl: 'thumbnail-url',
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
              {
                id: '2',
                name: 'Second lesson name',
                thumbnailUrl: 'thumbnail-url',
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
              {
                id: '3',
                name: 'Third lesson name',
                thumbnailUrl: 'thumbnail-url',
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
              {
                id: '4',
                name: 'Fourth lesson name',
                thumbnailUrl: 'thumbnail-url',
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
            ],
          },
        },
      },
    };
  },
};

const deleteAssignmentFileMock = {
  request: {
    query: deleteAssignmentSubmissionFileMutation,
    variables: { input: { id: '1' } },
  },
  result() {
    deleteAssignmentFetchSpy();

    return {
      data: {
        deleteAssignmentSubmissionFile: {
          status: 'ok',
        },
      },
    };
  },
};

const createAssigmentFileMock = {
  request: {
    query: createAssignmentSubmissionMutation,
    variables: {
      input: {
        assignmentId: '1',
        contextId: '1000',
        contextType: ASSIGNMENT_SUBMISSION_TYPES.VIRTUAL_INTERNSHIP,
      },
    },
  },
  result() {
    createAssignmentFileSpy();

    return {
      data: {
        createAssignmentSubmission: {
          assignmentSubmission: {
            id: '1',
          },
        },
      },
    };
  },
};
const updateAssignmentFileMock = {
  request: {
    query: UPDATE_ASSIGNMENT_SUBMISSION_MUTATION,
    variables: { input: { id: '1', status: ASSESSMENT_SUBMISSION_STATUS.SUBMITTED } },
  },
  result() {
    updateAssignmentFetchSpy();

    return {
      data: {
        updateAssignmentSubmission: {
          assignmentSubmission: {
            id: '1',
            status: ASSESSMENT_SUBMISSION_STATUS.SUBMITTED,
          },
        },
      },
    };
  },
};
const generatePresignitedUrlFileMock = {
  request: {
    query: generatePresignedUrlMutation,
    variables: {
      input: {
        filename: 'first_file.pdf',
        assetType: ASSET_TYPE.FILE,
        resourceClass: RESOURCE_CLASS.ASSIGNMENT_SUBMISSION_FILE,
      },
    },
  },
  result() {
    generatePresignatedUrlFetchSpy();

    return {
      data: {
        generatePresignedUploadUrl: {
          url: 'someurl',
          uuid: '1234-1234-1234',
        },
      },
    };
  },
};

const createAssignmentSubmissionFile = {
  request: {
    query: createAssignmentSubmissionFileMutation,
    variables: {
      input: {
        fileFilename: 'first_file.pdf',
        fileUuid: '1234-1234-1234',
        assignmentSubmissionId: '1',
      },
    },
  },
  result() {
    generateFilesFetchSpy();

    return {
      data: {
        assignmentSubmissionFile: {
          filename: 'first_file.pdf',
          id: '1234-1234-1234',
          url: 'someurl',
        },
      },
    };
  },
};

const opportunityMocks = [
  virtualInternshipLessonMock,
  deleteAssignmentFileMock,
  updateAssignmentFileMock,
  createAssigmentFileMock,
  generatePresignitedUrlFileMock,
  createAssignmentSubmissionFile,
  studentInfoMock,
];

const defaultAssignment = {
  id: '1',
  name: 'Some  name',
  description: 'Some description',
  displayName: 'Some display name',
  step: 2,
  rubrics: [],
  updatedAt: '2020-01-01T00:00:00.000Z',
  submission: {
    files: [],
    grade: null,
    rubricGrade: null,
    updatedAt: '2020-01-01T00:00:00.000Z',
    id: '1',
    status: 'DRAFT' as const,
  },
  __typename: 'Assignment' as const,
};

const assignmentWithFiles = {
  ...defaultAssignment,
  submission: {
    ...defaultAssignment.submission,
    files: [
      { id: '1', filename: 'somename1.pdf', source: '', url: 'file-url' },
      { id: '2', filename: 'somename2.pdf', source: '', url: 'file-url' },
      { id: '3', filename: 'somename3.pdf', source: '', url: 'file-url' },
      { id: '4', filename: 'somename4.pdf', source: '', url: 'file-url' },
    ],
  },
};

const assignmentWithoutFiles = {
  id: '1',
  name: 'Some  name',
  description: 'Some description',
  displayName: 'Some display name',
  step: 2,
  rubrics: [],
  updatedAt: '2020-01-01T00:00:00.000Z',
  submission: null,
  __typename: 'Assignment' as const,
};

const renderAssigment = (assignment: TAssignment = defaultAssignment) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={opportunityMocks}>
      <UserInfoProvider
        value={{ userInfo: { ...studentInfoMock.result.data.userInfo, uuid: '2' } }}>
        <NavigationContextProvider>
          <Route path='/opportunities/:opportunityId/virtual-internship/lesson/:lessonId'>
            <AssignmentCard assignment={assignment} virtualInternshipId='1000' />
          </Route>
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { route: '/opportunities/14/virtual-internship/lesson/4' }
  );

describe('StudentVirtualInternshipAssignment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    //@ts-ignore
    global.XMLHttpRequest = jest.fn(() => xhrMock);
  });

  it('renders correctly', async () => {
    const { container } = renderAssigment();
    expect(container).toMatchSnapshot();
  });

  it('renders empty files list when no files', async () => {
    renderAssigment();

    const assignmentList = await screen.queryAllByRole('listitem');
    const submitButton = await screen.findByRole('button', { name: 'Submit' });

    expect(submitButton).toBeDisabled();
    expect(assignmentList).toHaveLength(0);
  });

  it('renders files list with added files', async () => {
    renderAssigment(assignmentWithFiles);

    const assignmentList = await screen.queryAllByRole('listitem');
    const submitButton = await screen.findByRole('button', { name: 'Submit' });

    expect(submitButton).toBeEnabled();
    expect(assignmentList).toHaveLength(4);
  });

  it('should call delete file mutation when remove button clicked ', async () => {
    renderAssigment(assignmentWithFiles);

    const deleteButtons = await screen.findAllByRole('button', { name: 'Remove file' });
    userEvent.click(deleteButtons[0]);
    const dialog = await screen.findByRole('dialog');
    const archiveButton = within(dialog).getByRole('button', { name: 'Archive' });
    expect(dialog).toBeInTheDocument();

    userEvent.click(archiveButton);
    await waitFor(() => {
      expect(deleteAssignmentFetchSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should calls create submission', async () => {
    renderAssigment(assignmentWithoutFiles);

    const dropZone = await screen.findByTestId('drop-zone-input');
    fireEvent.change(dropZone, {
      target: {
        files: [{ name: 'first_file.pdf', size: 100 }],
      },
    });

    await waitFor(() => {
      expect(createAssignmentFileSpy).toHaveBeenCalledTimes(1);
    });
  });
});
