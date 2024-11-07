import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import archiveCourseMutation from '@dc/graphql/user/mutations/archiveCourse';
import duplicateCourseMutation from '@dc/graphql/user/mutations/duplicateCourse';
import Courses from '@dc/screens/AdminApp/Courses/Courses';
import coursesQuery from '@dc/graphql/user/queries/courses';
import { PAGING } from '@dc/resources/constants';
import { PUBLISHING_STATUSES, ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

let archiveCourseCalled = false;
let duplicateCourseCalled = false;
let refetchCoursesCalled = false;

const mocks = [
  {
    request: {
      query: coursesQuery,
      variables: {
        filter: { statusEq: PUBLISHING_STATUSES.PUBLISHED },
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
        withCopies: false,
      },
    },
    result: {
      data: {
        courses: {
          pagesCount: 1,
          nodesCount: 3,
          nodes: [
            {
              metadata: {
                alternativeTitles: `Agricultural Produce Packer, Ampoule Sealer, 
                Apple Packing Header, Bag Filler, Bag Loader, Bag Sealer, Bagger,
                Band Shover, Bandoleer Packer, Barrel Filler, Batt Packer, Bin Filler,
                Cigar Packer, Cigar Wrapper`,
                averageSalary: '$29,510',
                jobZone: '2',
                onetCode: '53-7062.00',
                outlook: 'Bright',
                __typename: 'CourseMetadata',
              },
              archivedAt: null,
              id: '1',
              description: 'This is a course',
              displayName: 'First course display name',
              imageUrl: 'first-image-url',
              lessons: [],
              name: 'First course',
              status: 'draft',
              pathway: {
                name: 'some pathway',
                id: '1',
              },
              thumbnailUrl: 'https://thumbnails.com',
              type: 'course',
              collection: {
                id: '1',
                name: 'Career',
              },
              __typename: 'Course',
            },
            {
              metadata: {
                alternativeTitles: `Abrasive Grader Helper, Acid Dumper, Archery Equipment Hay Sorter
                , Assembly Machine Operator, Assistant Floor Covering Printer, Automatic Glove Former`,
                averageSalary: '$31,180',
                jobZone: '2',
                onetCode: '53-7063.00',
                outlook: 'Below Average',
                __typename: 'CourseMetadata',
              },
              archivedAt: null,
              description: 'This is a course',
              displayName: '',
              id: '2',
              imageUrl: 'second-image-url',
              lessons: [],
              name: 'Second course',
              pathway: {
                name: 'some pathway',
                id: '1',
              },
              status: 'draft',
              thumbnailUrl: 'https://thumbnails.com',
              type: 'course',
              collection: {
                id: '2',
                name: 'Financial Literacy',
              },
              __typename: 'Course',
            },
            {
              metadata: {
                alternativeTitles: `Air and Water Filler, Airport Maintenance Laborer, 
                Aluminum Can Collector, Ash Collector, Ash Handler, Ash Pit Worker, Ash Worker`,
                averageSalary: '$29,510',
                jobZone: '2',
                onetCode: '53-7062.00',
                outlook: 'Bright',
                __typename: 'CourseMetadata',
              },
              archivedAt: null,
              description: 'This is a course',
              displayName: 'Third course display name',
              id: '3',
              imageUrl: 'third-image-url',
              lessons: [],
              name: 'Third course',
              pathway: {
                name: 'some pathway',
                id: '1',
              },
              status: 'draft',
              thumbnailUrl: 'https://thumbnails.com',
              type: 'course',
              collection: {
                id: '3',
                name: 'Soft skills',
              },
              __typename: 'Course',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: coursesQuery,
      variables: {
        filter: { statusEq: PUBLISHING_STATUSES.PUBLISHED },
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
        withCopies: false,
      },
    },
    result: () => {
      refetchCoursesCalled = true;

      return {
        data: {
          courses: {
            pagesCount: 0,
            nodesCount: 0,
            nodes: [],
          },
        },
      };
    },
  },
  {
    request: {
      query: archiveCourseMutation,
      variables: {
        input: {
          id: '1',
        },
      },
    },
    result: () => {
      archiveCourseCalled = true;

      return {
        data: {
          archiveCourse: {
            course: {
              id: '1',
              archivedAt: null,
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: duplicateCourseMutation,
      variables: {
        input: {
          id: '1',
        },
      },
    },
    result: () => {
      duplicateCourseCalled = true;

      return {
        data: {
          duplicateCourse: {
            course: {
              id: '1',
              archivedAt: null,
            },
          },
        },
      };
    },
  },
];

const renderAdminAppCourses = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <Courses />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminAppCourses', () => {
  beforeEach(() => {
    archiveCourseCalled = false;
    duplicateCourseCalled = false;
    refetchCoursesCalled = false;
  });

  it('renders spinner before response is resolved', async () => {
    renderAdminAppCourses();

    expect(screen.getByTestId(/loading-spinner/)).toBeInTheDocument();

    await act(() => Promise.resolve());
  });

  it('renders courses list correctly', async () => {
    const { container } = renderAdminAppCourses();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(screen.getAllByTestId(/courses-list-item$/i).length).toEqual(3);
      const coursesNames = screen.getAllByTestId(/courses-list-item-name/);
      expect(coursesNames[0].textContent).toEqual('First course');
      expect(coursesNames[1].textContent).toEqual('Second course');
      expect(coursesNames[2].textContent).toEqual('Third course');
    });

    expect(container).toMatchSnapshot();
  });

  it('opens archive modal on archive click', async () => {
    renderAdminAppCourses();

    await waitFor(() => {
      const [firstCourseArchiveButton] = screen.getAllByRole('button', { name: 'Archive' });
      userEvent.click(firstCourseArchiveButton);
    });

    await act(() => Promise.resolve({}));

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(screen.getByTestId(/modal-header/)).toHaveTextContent('Archiving course');
  });

  it('closes archive modal on archive modal cancel click', async () => {
    renderAdminAppCourses();

    await waitFor(() => {
      const [firstCourseArchiveButton] = screen.getAllByRole('button', { name: 'Archive' });
      userEvent.click(firstCourseArchiveButton);
    });

    await waitFor(() => {
      userEvent.click(screen.getByTestId(/archive-modal-cancel/));
    });

    expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
  });

  it('calls archive course on archive modal accept and refetches data for current scope', async () => {
    renderAdminAppCourses();

    expect(archiveCourseCalled).toBe(false);
    expect(refetchCoursesCalled).toBe(false);

    const archiveButtons = await screen.findAllByRole('button', { name: 'Archive' });
    userEvent.click(archiveButtons[0]);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    userEvent.click(await screen.findByTestId(/archive-modal-accept/));

    await waitFor(() => {
      expect(archiveCourseCalled).toBe(true);
      expect(refetchCoursesCalled).toBe(true);

      expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
    });
  });

  it('opens duplicate modal on duplicate click', async () => {
    renderAdminAppCourses();

    await waitFor(() => {
      const [firstCourseDuplicateButton] = screen.getAllByRole('button', { name: 'Duplicate' });
      userEvent.click(firstCourseDuplicateButton);
    });

    await act(() => Promise.resolve({}));

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(screen.getByTestId(/modal-header/)).toHaveTextContent('Duplicating course');
  });

  it('closes duplicate modal on duplicate modal cancel click', async () => {
    renderAdminAppCourses();

    await waitFor(() => {
      const [firstCourseDuplicateButton] = screen.getAllByRole('button', { name: 'Duplicate' });
      userEvent.click(firstCourseDuplicateButton);
    });

    await waitFor(() => {
      userEvent.click(screen.getByTestId(/duplicate-modal-cancel/));
    });

    expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
  });

  it('calls duplicate course on duplicate modal accept and refetches data for current scope', async () => {
    renderAdminAppCourses();

    expect(duplicateCourseCalled).toBe(false);
    expect(refetchCoursesCalled).toBe(false);

    const duplicateButtons = await screen.findAllByRole('button', { name: 'Duplicate' });
    userEvent.click(duplicateButtons[0]);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    userEvent.click(await screen.findByTestId(/duplicate-modal-accept/));

    await waitFor(() => {
      expect(duplicateCourseCalled).toBe(true);
      expect(refetchCoursesCalled).toBe(true);

      expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
    });
  });
});
