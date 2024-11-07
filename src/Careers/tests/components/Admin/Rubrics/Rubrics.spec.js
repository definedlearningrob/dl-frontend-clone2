import { fireEvent, screen, waitFor, within, act } from '@testing-library/react';
import { InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { cloneDeep, set } from 'lodash-es';
import { ToastContainer } from 'react-toastify';
import userEvent from '@testing-library/user-event';

import archiveRubricMutation from '@dc/graphql/user/mutations/archiveRubric';
import duplicateRubricMutation from '@dc/graphql/user/mutations/duplicateRubric';
import RubricsEdit from '@dc/components/Admin/Rubrics/Edit/Edit.jsx';
import { RUBRIC_QUERY } from '@dc/graphql/user/queries/rubric';
import rubricAssignmentsQuery from '@dc/graphql/user/queries/rubricAssignments';
import rubricProductsQuery from '@dc/graphql/user/queries/rubricProducts';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ROLES } from '@dc/resources/constants';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { TAGS } from '@dc/graphql/user/queries/tags';
import { UPDATE_RUBRIC_HEADING_DC } from '@dc/graphql/user/mutations/updateRubricHeading';

import updateRubricMutation from '@shared/graphql/user/mutations/updateRubric';
import createRubricCriteriaMutation from '@shared/graphql/user/mutations/createRubricCriteria';
import deleteRubricHeadingMutation from '@shared/graphql/user/mutations/deleteRubricHeading';
import updateRubricCriteriaLabelMutation from '@shared/graphql/user/mutations/updateRubricCriteriaLabel';
import updateRubricCriteriaMutation from '@shared/graphql/user/mutations/updateRubricCriteria';
import deleteRubricCriteriaLabelMutation from '@shared/graphql/user/mutations/deleteRubricCriteriaLabel';
import { USER_ROLE } from '@shared/graphql/user/query/userRole';

const getCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          rubric: {
            merge: true,
          },
        },
      },
    },
  });

const defaultRubricNoCells = (canEdit) => ({
  criteriaLabels: [
    {
      displayName: 'Test criteria label 1',
      id: '1',
      score: 1,
    },
    {
      displayName: null,
      id: '2',
      score: 2,
    },
  ],
  criterias: [],
  description: '<p>New rubric</p>',
  headings: [
    {
      id: '1',
      multiplier: 1,
      name: 'Test heading 1',
    },
    {
      id: '2',
      multiplier: 2,
      name: 'Test heading 2',
    },
  ],
  id: '1',
  name: 'New rubric',
  displayName: 'Display Name',
  __typename: 'Rubric',
  canEdit: canEdit,
});

const defaultRubricTwoCells = {
  criteriaLabels: [
    {
      displayName: null,
      id: '1',
      score: 1,
    },
    {
      displayName: 'Criteria label 2 - filled',
      id: '2',
      score: 2,
    },
  ],
  criterias: [
    {
      id: '1',
      rubricCriteriaLabelId: '1',
      rubricHeadingId: '1',
      text: 'Test criterion 1',
    },
    {
      id: '2',
      rubricCriteriaLabelId: '2',
      rubricHeadingId: '2',
      text: 'Test criterion 2',
    },
  ],
  description: '<p>New rubric</p>',
  headings: [
    {
      id: '1',
      multiplier: 1,
      name: 'Filled rubrics heading 1',
    },
    {
      id: '2',
      multiplier: 2,
      name: 'Filled rubrics heading 2',
    },
  ],
  id: '1',
  name: 'New filled rubric',
  displayName: 'Display Name',
  __typename: 'Rubric',
};

const rubricMocks = [
  {
    request: {
      query: RUBRIC_QUERY,
      variables: { id: '1' },
    },
    result: {
      data: {
        rubric: {
          id: '1',
          criteriaLabels: [
            {
              displayName: null,
              id: '1',
              score: 1,
            },
            {
              displayName: 'Label 2',
              id: '2',
              score: 2,
            },
          ],
          criterias: [],
          description: '<p>New rubric</p>',
          headings: [
            {
              id: '1',
              multiplier: 1,
              name: 'Click to add heading',
            },
            {
              id: '2',
              multiplier: 2,
              name: 'Click to add heading',
            },
          ],
          name: 'New rubric',
          displayName: 'Display Name',
          __typename: 'Rubric',
        },
      },
    },
  },
  {
    request: {
      query: rubricAssignmentsQuery,
      variables: { id: '1' },
    },
    result: {
      data: {
        rubric: {
          id: '1',
          assignments: [
            {
              id: '1',
              name: 'test',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: rubricProductsQuery,
      variables: { id: '1' },
    },
    result: {
      data: {
        rubric: {
          id: '1',
          products: [
            {
              id: '1',
              name: 'test',
            },
          ],
        },
      },
    },
  },
  userInfoMock,
];

const tagsMock = {
  request: {
    query: TAGS,
    variables: { filter: undefined, page: 1, perPage: 25, infiniteScroll: true },
  },
  result: {
    data: {
      tags: {
        nodes: [
          {
            name: '56h56h56',
            id: '10',
            type: 'SYSTEM',
            hasRubricHeadings: true,
            __typename: 'Tag',
          },
        ],
        nodesCount: 0,
        pagesCount: 1,
      },
    },
  },
};

const renderRubricEdit = (mocks = [], withCells = false, role, canEdit = true) => {
  const userRoleMock = {
    request: {
      query: USER_ROLE,
      variables: {},
    },
    result: {
      data: {
        userInfo: {
          username: 'role-test',
          uuid: '123',
          role: role || ROLES.SYSTEM_ADMIN,
        },
      },
    },
  };

  return renderWithRouterAndReduxProvider(
    <>
      <ToastContainer />
      <MockedProvider cache={getCache()} mocks={[userRoleMock, ...rubricMocks, ...mocks]}>
        <UserInfoProvider value={{ userInfo: { role: role || ROLES.SYSTEM_ADMIN } }}>
          <RubricsEdit rubric={withCells ? defaultRubricTwoCells : defaultRubricNoCells(canEdit)} />
        </UserInfoProvider>
      </MockedProvider>
    </>,
    { initialState: { session: { user: { type: 'user' } } } }
  );
};

describe('AdminAppRubricEdit', () => {
  it('renders with correct values', async () => {
    const { container } = renderRubricEdit();

    const rubricHeader = await screen.findByRole('heading', {
      level: 5,
      name: 'Main information',
    });

    const header = rubricHeader.parentNode;

    const duplicateButton = await within(header).findByRole('button', { name: 'Duplicate' });
    const archiveButton = within(header).getByRole('button', { name: 'Archive' });

    const nameInput = screen.getByTestId('rubric-name-input');
    const displayNameInput = screen.getByTestId('rubric-displayname-input');

    const rubricDescription = await screen.findByLabelText(/Description/);
    const rubricTable = screen.getByRole('table', { name: 'Rubric editor: New rubric' });

    expect(rubricHeader).toBeInTheDocument();

    expect(nameInput).toHaveValue('New rubric');
    expect(displayNameInput).toHaveValue('Display Name');
    expect(rubricDescription).toBeInTheDocument();

    expect(duplicateButton).toBeInTheDocument();
    expect(archiveButton).toBeInTheDocument();
    expect(rubricTable).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  describe('Header', () => {
    it('hide [Display name input, Duplicate button, Archive button] for users different than SYSTEM_ADMIN', async () => {
      const { container } = renderRubricEdit([], false, ROLES.TEACHER);

      const rubricHeader = await screen.findByRole('heading', {
        level: 5,
        name: 'Main information',
      });

      const duplicateButton = screen.queryByRole('button', { name: 'Duplicate' });
      const archiveButton = screen.queryByRole('button', { name: 'Archive' });

      const nameInput = await screen.findByTestId('rubric-name-input');
      const displayNameInput = screen.queryByTestId('rubric-displayname-input');

      const rubricDescription = await screen.findByLabelText(/Description/);
      const rubricTable = screen.getByRole('table', { name: 'Rubric editor: New rubric' });

      expect(rubricHeader).toBeInTheDocument();

      expect(displayNameInput).not.toBeInTheDocument();
      expect(duplicateButton).not.toBeInTheDocument();
      expect(archiveButton).not.toBeInTheDocument();

      expect(nameInput).toHaveValue('New rubric');
      expect(rubricDescription).toBeInTheDocument();
      expect(rubricTable).toBeInTheDocument();

      expect(container).toMatchSnapshot();
    });

    it('properly edits header and display name value', async () => {
      const spy = jest.fn();

      const updateHeaderMock = {
        request: {
          query: updateRubricMutation,
          variables: {
            input: {
              id: '1',
              name: 'New rubric - new name',
              displayName: 'Display Name - new display name',
              description: '<p>New rubric</p>',
            },
          },
        },
        result: () => {
          spy();

          return {
            data: {
              updateRubric: {
                rubric: {
                  id: '1',
                  name: 'New rubric - new name',
                  description: '<p>New rubric</p>',
                  displayName: 'Display Name - new display name',
                  uuid: '',
                },
              },
            },
          };
        },
      };

      renderRubricEdit([updateHeaderMock]);
      await waitFor(() => {});

      const rubricHeader = await screen.findByRole('heading', {
        level: 5,
        name: 'Main information',
      });

      expect(rubricHeader).toBeInTheDocument();

      const nameInput = screen.getByTestId('rubric-name-input');
      const displayNameInput = screen.getByTestId('rubric-displayname-input');

      userEvent.paste(nameInput, ' - new name');
      userEvent.paste(displayNameInput, ' - new display name');

      // TODO: find way to test description input (TinyMCE)
      // const rubricDescription = await screen.findByLabelText('Description');
      // userEvent.type(rubricDescription, ' - new description');

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    it('sends proper query on duplicate rubric click', async () => {
      const spy = jest.fn();
      const duplicateRubricMock = {
        request: {
          query: duplicateRubricMutation,
          variables: {
            input: {
              id: '1',
            },
          },
        },
        result: () => {
          spy();

          return {
            data: {
              duplicateRubric: {
                rubric: {
                  id: '2',
                },
              },
            },
          };
        },
      };

      renderRubricEdit([duplicateRubricMock]);

      const rubricHeader = await screen.findByRole('heading', {
        level: 5,
        name: 'Main information',
      });

      expect(rubricHeader).toBeInTheDocument();

      const duplicateButton = await screen.findByRole('button', { name: 'Duplicate' });

      userEvent.click(duplicateButton);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    it('sends proper query on archive rubric click', async () => {
      const spy = jest.fn();
      const archiveRubricMock = {
        request: {
          query: archiveRubricMutation,
          variables: {
            input: {
              id: '1',
            },
          },
        },
        result: () => {
          spy();

          return {
            data: {
              archiveRubric: {
                rubric: {
                  archivedAt: '',
                  id: '1',
                },
              },
            },
          };
        },
      };

      renderRubricEdit([archiveRubricMock]);
      const rubricHeader = await screen.findByRole('heading', {
        level: 5,
        name: 'Main information',
      });

      expect(rubricHeader).toBeInTheDocument();

      const archiveButton = await screen.findByRole('button', { name: 'Archive' });

      userEvent.click(archiveButton);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Description', () => {
    //TODO: fix description tests
    it.skip('properly sends update description query', async () => {
      const spy = jest.fn();
      const value = '<p>New rubric</p>';

      const updateDescriptionMock = {
        request: {
          query: updateRubricMutation,
          variables: {
            input: {
              id: '1',
              description: value,
            },
          },
        },
        result: () => {
          spy();

          return {
            data: {
              updateRubric: {
                rubric: {
                  id: '1',
                  name: 'New rubric2',
                  description: value,
                  displayName: 'name',
                  uuid: '',
                },
              },
            },
          };
        },
      };

      const { getByTestId } = renderRubricEdit([updateDescriptionMock]);
      await waitFor(() => {});

      const rubricDescriptionEditButton = getByTestId(/rubric-description-edit-button$/i);

      fireEvent.click(rubricDescriptionEditButton);

      await waitFor(() => {
        const rubricDescriptionSubmitButton = getByTestId(/rubric-description-submit$/i);

        fireEvent.click(rubricDescriptionSubmitButton);
      });

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('RubricsBuilder', () => {
    it('renders table properly with no cells created', async () => {
      const { container } = renderRubricEdit();
      await waitFor(() => {});

      const rubricHeader = await screen.findByRole('heading', {
        level: 5,
        name: 'Main information',
      });

      expect(rubricHeader).toBeInTheDocument();

      const firstHeading = screen.getByRole('cell', {
        name: 'Test heading 1 Statements: 0 Performance Indicators: 0 Multiplier: x1',
      });
      const secondHeading = screen.getByRole('cell', {
        name: 'Test heading 2 Statements: 0 Performance Indicators: 0 Multiplier: x2',
      });

      const firstCriterion = screen.getByRole('columnheader', {
        name: 'Score Name Test criteria label 1',
      });
      const secondCriterion = screen.getByRole('columnheader', {
        name: 'Score Name',
      });

      const rubricTable = screen.getByRole('table', { name: 'Rubric editor: New rubric' });

      const emptyCriteria = within(rubricTable).getAllByPlaceholderText('Type here...');

      expect(firstHeading).toBeInTheDocument();
      expect(secondHeading).toBeInTheDocument();
      expect(firstCriterion).toBeInTheDocument();
      expect(secondCriterion).toBeInTheDocument();
      expect(emptyCriteria).toHaveLength(4);

      expect(container).toMatchSnapshot();
    });

    it('renders table properly with 2 cells provided', async () => {
      const { container } = renderRubricEdit([], true);
      await waitFor(() => {});

      const rubricHeader = await screen.findByRole('heading', {
        level: 5,
        name: 'Main information',
      });

      expect(rubricHeader).toBeInTheDocument();

      const firstHeading = screen.getByRole('cell', {
        name: 'Filled rubrics heading 1 Statements: 0 Performance Indicators: 0 Multiplier: x1',
      });
      const secondHeading = screen.getByRole('cell', {
        name: 'Filled rubrics heading 2 Statements: 0 Performance Indicators: 0 Multiplier: x2',
      });

      const firstCriterion = screen.getByRole('columnheader', {
        name: 'Score Name',
      });
      const secondCriterion = screen.getByRole('columnheader', {
        name: 'Score Name Criteria label 2 - filled',
      });

      const rubricTable = screen.getByRole('table', { name: 'Rubric editor: New filled rubric' });

      const criteriaTextarea = within(rubricTable).getAllByPlaceholderText('Type here...');

      const firstCriteria = within(rubricTable).getByDisplayValue('Test criterion 1');
      const secondCriteria = within(rubricTable).getByDisplayValue('Test criterion 2');

      expect(firstHeading).toBeInTheDocument();
      expect(secondHeading).toBeInTheDocument();
      expect(firstCriterion).toBeInTheDocument();
      expect(secondCriterion).toBeInTheDocument();
      expect(criteriaTextarea).toHaveLength(4);
      expect(firstCriteria).toBeInTheDocument();
      expect(secondCriteria).toBeInTheDocument();

      expect(container).toMatchSnapshot();
    });

    it('properly displays criteria labels with/without displayName', async () => {
      renderRubricEdit([], true);

      const firstCriterion = await screen.findByRole('columnheader', {
        name: 'Score Name',
      });
      const secondCriterion = screen.getByRole('columnheader', {
        name: 'Score Name Criteria label 2 - filled',
      });

      const firstScore = within(firstCriterion).getByRole('input', {
        type: 'number',
      });
      const firstName = within(firstCriterion).getByRole('textbox');

      expect(firstScore).toHaveValue('1');
      expect(firstName).toHaveValue('');

      const secondScore = within(secondCriterion).getByRole('input', {
        type: 'number',
      });

      const secondName = within(secondCriterion).getByRole('textbox');

      expect(secondScore).toHaveValue('2');
      expect(secondName).toHaveValue('Criteria label 2 - filled');
    });

    it('sends proper query on criteria label update', async () => {
      const spy = jest.fn();
      const newLabel = 'I am updated!';

      const updateCriteriaLabelMock = {
        request: {
          query: updateRubricCriteriaLabelMutation,
          variables: {
            input: {
              id: '1',
              score: 1,
              displayName: newLabel,
            },
          },
        },
        result: () => {
          spy();

          return {
            data: {
              updateRubricCriteriaLabel: {
                rubricCriteriaLabel: {
                  id: '1',
                  score: 1,
                  displayName: newLabel,
                },
              },
            },
          };
        },
      };

      renderRubricEdit([updateCriteriaLabelMock], true);

      const rubricTable = await screen.findByRole('table', {
        name: 'Rubric editor: New filled rubric',
      });

      const firstCriterion = within(rubricTable).getByRole('columnheader', {
        name: 'Score Name',
      });

      const firstName = within(firstCriterion).getByRole('textbox');

      // to blur input

      userEvent.type(firstName, newLabel);

      userEvent.click(firstCriterion);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    it('sends proper query on heading update', async () => {
      const spy = jest.fn();

      const updateHeadingMock = {
        request: {
          query: UPDATE_RUBRIC_HEADING_DC,
          variables: {
            input: {
              id: '1',
              name: 'Filled rubrics heading 1 - new display name',
              multiplier: 3,
              tagIds: [],
            },
          },
        },
        result: () => {
          spy();

          return {
            data: {
              updateRubricHeading: {
                rubricHeading: {
                  id: '1',
                  multiplier: 2,
                  name: 'Filled rubrics heading 1 - new display name',
                  tags: [],
                },
              },
            },
          };
        },
      };

      renderRubricEdit([updateHeadingMock, tagsMock], true);

      const rubricTable = await screen.findByRole('table', {
        name: 'Rubric editor: New filled rubric',
      });

      expect(rubricTable).toBeInTheDocument();

      const firstHeading = screen.getByRole('cell', {
        name: 'Filled rubrics heading 1 Statements: 0 Performance Indicators: 0 Multiplier: x1',
      });

      userEvent.hover(firstHeading);

      const dropdownTrigger = await within(firstHeading).findByRole('button', {
        name: 'Filled rubrics heading 1 - actions',
      });

      await userEvent.type(dropdownTrigger, '{enter}');

      await act(async () => {});

      const editButton = screen.getByRole('menuitem', { name: 'Edit' });
      const deleteButton = screen.getByRole('menuitem', { name: 'Delete row' });

      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();

      userEvent.click(editButton);

      const editModal = await screen.findByRole('dialog', {
        name: 'Edit rubric criteria',
      });

      const headingNameInput = within(editModal).getByLabelText('Heading');

      userEvent.paste(headingNameInput, ' - new display name');

      const multiplierInput = within(editModal).getByRole('input', { type: 'number' });

      expect(multiplierInput).toHaveValue('1');

      const increaseMultiplierButton = within(editModal).getByRole('button', { name: 'Increase' });

      userEvent.click(increaseMultiplierButton);
      userEvent.click(increaseMultiplierButton);

      const saveButton = within(editModal).getByRole('button', { name: 'Save' });

      userEvent.click(saveButton);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    it('sends proper query on criteria update', async () => {
      const spyUpdate = jest.fn();
      const newText = '- updated criterion';

      const updateCriteriaMock = {
        request: {
          query: updateRubricCriteriaMutation,
          variables: {
            input: {
              id: '2',
              text: 'Test criterion 2- updated criterion',
            },
          },
        },
        result: () => {
          spyUpdate();

          return {
            data: {
              updateRubricCriteria: {
                rubricCriteria: {
                  id: '1',
                  rubricHeadingId: '1',
                  rubricCriteriaLabelId: '1',
                  text: newText,
                  uuid: '1',
                },
              },
            },
          };
        },
      };

      renderRubricEdit([updateCriteriaMock], true);

      const rubricTable = await screen.findByRole('table', {
        name: 'Rubric editor: New filled rubric',
      });

      expect(rubricTable).toBeInTheDocument();

      const criterion = within(screen.getByRole('cell', { name: 'Test criterion 2' })).getByRole(
        'textbox'
      );

      userEvent.paste(criterion, newText);

      userEvent.click(rubricTable);

      await waitFor(() => {
        expect(spyUpdate).toHaveBeenCalledTimes(1);
      });
    });

    it('sends proper query on criteria placeholder creation', async () => {
      const spyCreate = jest.fn();
      const newText = 'Haha!';

      const createCriteriaMock = {
        request: {
          query: createRubricCriteriaMutation,
          variables: {
            input: {
              rubricHeadingId: '1',
              rubricCriteriaLabelId: '2',
              text: newText,
            },
          },
        },
        result: () => {
          spyCreate();

          return {
            data: {
              createRubricCriteria: {
                rubricCriteria: {
                  id: '3',
                  rubricHeadingId: '1',
                  rubricCriteriaLabelId: '2',
                  text: newText,
                },
              },
            },
          };
        },
      };

      renderRubricEdit([createCriteriaMock], true);

      const rubricTable = await screen.findByRole('table', {
        name: 'Rubric editor: New filled rubric',
      });

      expect(rubricTable).toBeInTheDocument();

      const tableRow = screen.getByRole('row', {
        name: 'Filled rubrics heading 1 Statements: 0 Performance Indicators: 0 Multiplier: x1 Test criterion 1',
      });

      const criteria = await within(tableRow).findAllByRole('cell');

      const emptyCriterionInput = within(criteria[2]).getByRole('textbox');

      expect(emptyCriterionInput).toHaveTextContent('');

      userEvent.paste(emptyCriterionInput, newText);

      await waitFor(() => {
        expect(spyCreate).toHaveBeenCalledTimes(1);
      });
    });

    it('sends proper query on column delete', async () => {
      const spy = jest.fn();
      const deleteColumnMock = {
        request: {
          query: deleteRubricCriteriaLabelMutation,
          variables: {
            input: {
              id: '1',
            },
          },
        },
        result: () => {
          spy();

          return {
            data: {
              deleteRubricCriteriaLabel: {
                status: 'done',
              },
            },
          };
        },
      };

      renderRubricEdit([deleteColumnMock]);

      const rubricTable = await screen.findByRole('table', {
        name: 'Rubric editor: New rubric',
      });

      expect(rubricTable).toBeInTheDocument();

      const firstCriteriaLabel = screen.getByRole('columnheader', {
        name: 'Score Name Test criteria label 1',
      });

      const deleteColumnButton = within(firstCriteriaLabel).getByRole('button', { name: 'Delete' });

      userEvent.click(deleteColumnButton);

      const deleteModal = await screen.findByRole('dialog', {
        name: 'Delete column',
      });

      const deleteConfirmationButton = within(deleteModal).getByRole('button', { name: 'Delete' });

      userEvent.click(deleteConfirmationButton);

      await waitFor(() => {
        expect(spy).toBeCalledTimes(1);
      });
    });

    it('show toast when user cannot delete column - already used for grading', async () => {
      const spy = jest.fn();

      const deleteColumnMock = {
        request: {
          query: deleteRubricCriteriaLabelMutation,
          variables: {
            input: {
              id: '1',
            },
          },
        },
        result: () => {
          spy();

          return {
            data: {},
          };
        },
      };

      const clonedRubricMock = cloneDeep(rubricMocks);

      set(clonedRubricMock[0], 'result.data.rubric.canEdit', false);

      renderRubricEdit([deleteColumnMock], false, ROLES.TEACHER, false);

      const rubricTable = await screen.findByRole('table', {
        name: 'Rubric editor: New rubric',
      });

      expect(rubricTable).toBeInTheDocument();

      const firstCriteriaLabel = screen.getByRole('columnheader', {
        name: 'Score Name Test criteria label 1',
      });

      const deleteColumnButton = within(firstCriteriaLabel).getByRole('button', { name: 'Delete' });

      userEvent.click(deleteColumnButton);

      const warningToast = await screen.findByRole('alert');

      expect(warningToast).toHaveTextContent(
        'You cannot edit rubric dimensions because it is already used for grading.'
      );

      await waitFor(() => {
        expect(spy).toBeCalledTimes(0);
      });
    });

    it('sends proper query on row delete', async () => {
      const spy = jest.fn();

      const deleteRowMock = {
        request: {
          query: deleteRubricHeadingMutation,
          variables: {
            input: {
              id: '1',
            },
          },
        },
        result: () => {
          spy();

          return {
            data: {
              deleteRubricHeading: {
                status: 'done',
              },
            },
          };
        },
      };

      renderRubricEdit([deleteRowMock]);

      const rubricTable = await screen.findByRole('table', {
        name: 'Rubric editor: New rubric',
      });

      expect(rubricTable).toBeInTheDocument();

      const firstHeading = await screen.findByRole('cell', {
        name: 'Test heading 1 Statements: 0 Performance Indicators: 0 Multiplier: x1',
      });
      userEvent.hover(firstHeading);

      const dropdownTrigger = await within(firstHeading).findByRole('button', {
        name: 'Test heading 1 - actions',
      });

      await userEvent.type(dropdownTrigger, '{enter}');

      await act(async () => {});

      const editButton = screen.getByRole('menuitem', { name: 'Edit' });
      const deleteButton = screen.getByRole('menuitem', { name: 'Delete row' });

      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();

      userEvent.click(deleteButton);

      const deleteModal = await screen.findByRole('dialog', {
        name: 'Delete row',
      });

      const deleteConfirmationButton = within(deleteModal).getByRole('button', { name: 'Delete' });

      userEvent.click(deleteConfirmationButton);

      await waitFor(() => {
        expect(spy).toBeCalledTimes(1);
      });
    });

    it('show toast when user cannot delete row - already used for grading', async () => {
      const spy = jest.fn();

      const deleteRowMock = {
        request: {
          query: deleteRubricHeadingMutation,
          variables: {
            input: {
              id: '1',
            },
          },
        },
        result: () => {
          spy();

          return {
            data: {},
          };
        },
      };

      renderRubricEdit([deleteRowMock], false, ROLES.TEACHER, false);

      const rubricTable = await screen.findByRole('table', {
        name: 'Rubric editor: New rubric',
      });

      expect(rubricTable).toBeInTheDocument();

      const firstHeading = screen.getByRole('cell', {
        name: 'Test heading 1 Multiplier: x1',
      });

      userEvent.hover(firstHeading);

      const dropdownTrigger = await within(firstHeading).findByRole('button', {
        name: 'Test heading 1 - actions',
      });

      await userEvent.type(dropdownTrigger, '{enter}');

      await act(async () => {});

      const editButton = screen.getByRole('menuitem', { name: 'Edit' });
      const deleteButton = screen.getByRole('menuitem', { name: 'Delete row' });

      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();

      userEvent.click(deleteButton);

      const warningToast = await screen.findByRole('alert');

      expect(warningToast).toHaveTextContent(
        'You cannot edit rubric dimensions because it is already used for grading.'
      );
      await waitFor(() => {
        expect(spy).toBeCalledTimes(0);
      });
    });
  });
});
