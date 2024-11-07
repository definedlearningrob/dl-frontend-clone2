import { fireEvent, screen, waitFor, within } from '@testing-library/dom';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import StudentLessonAssignment from '@dc/components/Student/Lesson/Assignment/Assignment';
import courseQuery from '@dc/graphql/student/queries/course';
import createAssignmentSubmissionMutation from '@dc/graphql/student/mutations/createAssignmentSubmission';
import currentCoursesQuery from '@dc/graphql/student/queries/currentCourses';
import generatePresignedUrlMutation from '@dc/graphql/student/mutations/generatePresignedUploadUrl';
import deleteAssignmentSubmissionFileMutation from '@dc/graphql/student/mutations/deleteAssignmentSubmissionFile';
import lessonInCourseQuery from '@dc/graphql/student/queries/lessonInCourse';
import { ASSESSMENT_SUBMISSION_STATUS, ASSET_TYPE, RESOURCE_CLASS } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ASSIGNMENT_SUBMISSION_TYPES } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import createAssignmentSubmissionFileMutation from '@dc/graphql/student/mutations/createAssignmentSubmissionFile';
import { UPDATE_ASSIGNMENT_SUBMISSION_MUTATION } from '@dc/graphql/student/mutations/updateAssignmentSubmission';

import { SUBMISSION_STATUS } from '@shared/resources/enums';

const xhrMock = {
  onreadystatechange: null,
  open: jest.fn(),
  send: jest.fn(),
  upload: {},
  readyState: 4,
  status: 200,
};

let deleteAssignmentSubmissionFileMutationCalled = false;
let createAssignmentSubmissionMutationCalled = false;
let currentCoursesQueryCalled = false;
let lessonInCourseQueryCalled = false;
let generatePresignedUrlMutationCalled = false;
let updateAssignmentSubmissionMutationCalled = false;

const mocks = [
  {
    request: {
      query: deleteAssignmentSubmissionFileMutation,
      variables: { input: { id: '1' } },
    },
    result: () => {
      deleteAssignmentSubmissionFileMutationCalled = true;

      return {
        data: {
          deleteAssignmentSubmissionFile: {
            status: 'ok',
          },
        },
      };
    },
  },
  {
    request: {
      query: createAssignmentSubmissionMutation,
      variables: {
        input: {
          assignmentId: '1',
          contextId: undefined,
          contextType: ASSIGNMENT_SUBMISSION_TYPES.COURSE,
        },
      },
    },
    result: () => {
      createAssignmentSubmissionMutationCalled = true;

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
  },
  {
    request: {
      query: createAssignmentSubmissionFileMutation,
      variables: {
        input: {
          fileFilename: 'first_file.pdf',
          fileUuid: 'some-uuid',
          assignmentSubmissionId: '1',
        },
      },
    },
    result: {
      data: {
        createAssignmentSubmissionFile: {
          assignmentSubmissionFile: {
            filename: 'first_file.pdf',
            id: '1',
            url: 'someurl',
          },
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_ASSIGNMENT_SUBMISSION_MUTATION,
      variables: { input: { id: '1', status: ASSESSMENT_SUBMISSION_STATUS.SUBMITTED } },
    },
    result: () => {
      updateAssignmentSubmissionMutationCalled = true;

      return {
        data: {
          updateAssignmentSubmission: {
            clientMutationId: 1,
            assignmentSubmission: {
              id: '1',
              status: ASSESSMENT_SUBMISSION_STATUS.SUBMITTED,
              grade: null,
              files: [],
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: lessonInCourseQuery,
      // This variables are taken from useParams
      variables: {
        courseId: undefined,
        lessonId: undefined,
        track: false,
      },
    },
    result: () => {
      lessonInCourseQueryCalled = true;

      return {
        data: {
          course: null,
        },
      };
    },
  },
  {
    request: {
      query: currentCoursesQuery,
    },
    result: () => {
      currentCoursesQueryCalled = true;

      return {
        data: {
          currentCourses: [],
        },
      };
    },
  },
  {
    request: {
      query: courseQuery,
      // This variables are taken from useParams
      variables: {
        id: undefined,
        track: true,
      },
    },
    result: () => ({
      data: null,
    }),
  },
  {
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
    result: () => {
      generatePresignedUrlMutationCalled = true;

      return {
        data: {
          generatePresignedUploadUrl: {
            url: 'someurl',
            uuid: 'some-uuid',
          },
        },
      };
    },
  },
];

const defaultAssignment = {
  id: '1',
  submission: {
    id: '1',
    status: ASSESSMENT_SUBMISSION_STATUS.DRAFT,
    files: [],
  },
};

const renderAssignment = (props, passedMocks) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={passedMocks || mocks}>
      <UserInfoProvider value={{ userInfo: userInfoMock.result.data.userInfo }}>
        <StudentLessonAssignment assignment={defaultAssignment} {...props} />
      </UserInfoProvider>
    </MockedProvider>
  );

describe('StudentLessonAssignment', () => {
  beforeEach(() => {
    deleteAssignmentSubmissionFileMutationCalled = false;
    createAssignmentSubmissionMutationCalled = false;
    currentCoursesQueryCalled = false;
    lessonInCourseQueryCalled = false;
    generatePresignedUrlMutationCalled = false;
    updateAssignmentSubmissionMutationCalled = false;

    jest.clearAllMocks();
    // eslint-disable-next-line no-undef

    xhrMock.open.mockImplementation(() => {
      process.nextTick(() => xhrMock.onreadystatechange?.());
    });

    global.XMLHttpRequest = jest.fn(() => xhrMock);
  });

  it('renders with default file upload selected', () => {
    renderAssignment();

    const dropzoneContainer = screen.getByTestId('drop-container');

    expect(dropzoneContainer).toHaveTextContent('Drop or choose file to upload');
  });

  it('renders empty files list when no files', () => {
    renderAssignment();

    expect(screen.queryAllByTestId(/assignment-file/)).toHaveLength(0);
  });

  it('renders files on the list when files provided', () => {
    const assignment = {
      id: '1',
      submission: {
        files: [
          { id: '1', filename: 'somename1.pdf' },
          { id: '2', filename: 'somename2.pdf' },
          { id: '3', filename: 'somename3.pdf' },
          { id: '4', filename: 'somename4.pdf' },
        ],
        grade: null,
        status: SUBMISSION_STATUS.SUBMITTED,
      },
    };

    renderAssignment({ assignment });

    const fileList = screen.getByRole('list', { name: 'File list' });
    const files = within(fileList).getAllByRole('listitem');

    expect(files).toHaveLength(4);
    expect(files[0]).toHaveTextContent('somename1.pdf');
    expect(files[1]).toHaveTextContent('somename2.pdf');
    expect(files[2]).toHaveTextContent('somename3.pdf');
    expect(files[3]).toHaveTextContent('somename4.pdf');
  });

  it('calls delete file mutation for saved files when clicking remove button and update list', async () => {
    const assignment = {
      id: '1',
      submission: {
        files: [
          { id: '1', filename: 'somename1.pdf' },
          { id: '2', filename: 'somename2.pdf' },
          { id: '3', filename: 'somename3.pdf' },
          { id: '4', filename: 'somename4.pdf' },
        ],
        grade: null,
        status: SUBMISSION_STATUS.SUBMITTED,
      },
    };

    renderAssignment({ assignment });

    const fileList = screen.getByRole('list', { name: 'File list' });
    const [firstFile] = within(fileList).getAllByRole('listitem');

    userEvent.click(within(firstFile).getByRole('button', { name: 'Remove file' }));

    const confirmationModal = await screen.findByRole('dialog');
    expect(confirmationModal).toHaveTextContent('Do you want to archive this file?');

    const archiveButton = within(confirmationModal).getByRole('button', { name: 'Archive' });
    userEvent.click(archiveButton);

    await waitFor(() => {
      expect(deleteAssignmentSubmissionFileMutationCalled).toBe(true);
      const files = within(fileList).getAllByRole('listitem');
      expect(files).toHaveLength(3);
      expect(files[0]).toHaveTextContent('somename2.pdf');
    });

    await act(() => Promise.resolve());
  });

  it('when no submission exists it calls create submission on first file upload with lesson refetch', async () => {
    const assignment = {
      id: '1',
    };

    renderAssignment({ assignment });

    fireEvent.change(screen.getByTestId('drop-zone-input'), {
      target: {
        files: [{ name: 'first_file.pdf', size: 100 }],
      },
    });

    await waitFor(() => {
      expect(createAssignmentSubmissionMutationCalled).toBe(true);
      expect(lessonInCourseQueryCalled).toBe(true);
    });

    await act(() => Promise.resolve());
  });

  it('when submission exists it does not call create submission on file upload', async () => {
    renderAssignment();

    fireEvent.change(screen.getByTestId('drop-zone-input'), {
      target: {
        files: [{ name: 'first file', size: 100 }],
      },
    });

    await act(() => Promise.resolve());

    await waitFor(() => {
      expect(createAssignmentSubmissionMutationCalled).toBe(false);
      expect(lessonInCourseQueryCalled).toBe(false);
    });

    await act(() => Promise.resolve());
  });

  it('calls generate presigned url and send file on file added and adds file to list', async () => {
    renderAssignment();

    fireEvent.change(screen.getByTestId('drop-zone-input'), {
      target: {
        files: [{ name: 'first_file.pdf', size: 100 }],
      },
    });

    await waitFor(() => {
      expect(generatePresignedUrlMutationCalled).toBe(true);
      expect(xhrMock.open).toHaveBeenCalled();
      expect(xhrMock.send).toHaveBeenCalled();
    });

    const fileList = await screen.findByRole('list', { name: 'File list' });
    const files = within(fileList).getAllByRole('listitem');
    expect(files[0]).toHaveTextContent('first_file.pdf');

    await act(() => Promise.resolve());
  });

  it('validates max number of files = 10', async () => {
    renderAssignment();

    fireEvent.change(screen.getByTestId('drop-zone-input'), {
      target: {
        files: [
          { name: 'first_file.pdf', size: 100 },
          { name: 'sec_file.pdf', size: 100 },
          { name: 'th_ile.pdf', size: 100 },
          { name: 'ft_file.pdf', size: 100 },
          { name: 'fi_file.pdf', size: 100 },
          { name: 'sx_file.pdf', size: 100 },
          { name: 'sev_file.pdf', size: 100 },
          { name: 'ei_file.pdf', size: 100 },
          { name: 'ni_file.pdf', size: 100 },
          { name: 'ten_file.pdf', size: 100 },
          { name: 'el_file.pdf', size: 100 },
        ],
      },
    });

    await waitFor(() => {
      expect(screen.getByText('Max number of files is 10')).toBeInTheDocument();
      const fileList = screen.queryByRole('list', { name: 'File list' });
      expect(fileList).not.toBeInTheDocument();
    });

    await act(() => Promise.resolve());
  });

  it('validates if file size is larger than 1GB', async () => {
    renderAssignment();
    const oneGBBytes = 1000000000;

    fireEvent.change(screen.getByTestId('drop-zone-input'), {
      target: {
        files: [
          { name: 'first_file.pdf', size: 100 },
          { name: 'second_file.pdf', size: 1000 },
          { name: 'third_file.pdf', size: 10000 },
          { name: 'fourth-file.pdf', size: oneGBBytes * 1.1 },
        ],
      },
    });

    await waitFor(() => {
      expect(screen.getByText('Your file has exceeded maximum size (1GB).')).toBeInTheDocument();
      const fileList = screen.queryByRole('list', { name: 'File list' });
      expect(fileList).not.toBeInTheDocument();
    });

    await act(() => Promise.resolve());
  });

  it('updates submission status on submit button click', async () => {
    renderAssignment();
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(updateAssignmentSubmissionMutationCalled).toBe(true);
      expect(currentCoursesQueryCalled).toBe(true);
    });
  });

  it('validates type of file and discard .gdoc type', async () => {
    renderAssignment();

    fireEvent.change(screen.getByTestId('drop-zone-input'), {
      target: {
        files: [
          { name: 'first_file.gdoc', size: 10 },
          { name: 'second_file.gdraw', size: 10 },
          { name: 'third_file.gform', size: 10 },
          { name: 'fourth_file.gmap', size: 10 },
          { name: 'fifth_file.gsheet', size: 10 },
          { name: 'sixth_file.gslides', size: 10 },
          { name: 'seventh_file.gtable', size: 10 },
        ],
      },
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          'Use the Google Drive option if trying to select Google Files (Google Docs, Sheets, Slides, etc..)'
        )
      ).toBeInTheDocument();
      const fileList = screen.queryByRole('list', { name: 'File list' });
      expect(fileList).not.toBeInTheDocument();
    });

    await act(() => Promise.resolve());
  });
});
