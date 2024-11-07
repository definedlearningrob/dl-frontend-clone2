import { noop } from 'lodash-es';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { renderWithI18N } from '@dc/utils/test';
import {
  SCHOOL_CLASSES_STUDENTS_QUERY,
  TSchoolClassesStudentsData,
} from '@dc/graphql/user/queries/schoolClassesStudents';
import {
  RECOMMEND_OPPORTUNITY,
  TRecommendOpportunityData,
  TRecommendOpportunityMutationInput,
} from '@dc/graphql/user/mutations/recommendOpportunity';

import { RecommendOpportunityModal } from './RecommendOpportunityModal';

const schoolClassesMock: MockedResponse<TSchoolClassesStudentsData> = {
  request: {
    query: SCHOOL_CLASSES_STUDENTS_QUERY,
  },
  result: {
    data: {
      schoolClasses: {
        nodes: [
          {
            name: 'Calculus',
            uuid: '1234',
            students: {
              nodes: [
                { fullName: 'John Doe', uuid: '1234-1111' },
                { fullName: 'Jennifer Fox', uuid: '1234-2222' },
              ],
            },
          },
          {
            name: 'Statistics',
            uuid: '5678',
            students: {
              nodes: [{ fullName: 'Amy Smith', uuid: '5678-1111' }],
            },
          },
        ],
      },
    },
  },
};

const recommendOpportunitySpy = jest.fn();

const recommendOpportunityMock: MockedResponse<
  TRecommendOpportunityData,
  TRecommendOpportunityMutationInput
> = {
  request: {
    query: RECOMMEND_OPPORTUNITY,
    variables: {
      input: {
        opportunityId: '1',
        studentUuids: ['1234-1111', '1234-2222'],
      },
    },
  },
  result() {
    recommendOpportunitySpy();

    return {
      data: {
        recommendOpportunity: {
          status: 'ok',
        },
      },
    };
  },
};

const renderComponent = (onClose = noop) =>
  renderWithI18N(
    <MockedProvider mocks={[schoolClassesMock, recommendOpportunityMock]}>
      <RecommendOpportunityModal isOpen={true} opportunityId='1' onClose={onClose} />
    </MockedProvider>
  );

describe('RecommendOpportunityModal', () => {
  it('displays correct options', async () => {
    renderComponent();

    const schoolClasses = await screen.findAllByRole('listitem');
    expect(schoolClasses).toHaveLength(2);

    userEvent.click(within(schoolClasses[0]).getByRole('button', { name: 'Expand' }));
    userEvent.click(within(schoolClasses[1]).getByRole('button', { name: 'Expand' }));

    const schoolClassesWithStudents = screen.getAllByRole('listitem');
    expect(schoolClassesWithStudents).toHaveLength(5);

    expect(schoolClassesWithStudents[0]).toHaveTextContent('Calculus');
    expect(schoolClassesWithStudents[1]).toHaveTextContent('John Doe');
    expect(schoolClassesWithStudents[2]).toHaveTextContent('Jennifer Fox');
    expect(schoolClassesWithStudents[3]).toHaveTextContent('Statistics');
    expect(schoolClassesWithStudents[4]).toHaveTextContent('Amy Smith');
  });

  it('closes after clicking "Cancel" button', async () => {
    const onClose = jest.fn();
    renderComponent(onClose);

    const cancelButton = await screen.findByRole('button', { name: 'Cancel' });
    userEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('sends recommendation after clicking "Recommend" button', async () => {
    const onClose = jest.fn();
    renderComponent(onClose);

    const schoolClassOption = await screen.findByRole('listitem', { name: 'Calculus' });
    userEvent.click(schoolClassOption);

    const recommendButton = screen.getByRole('button', { name: 'Recommend' });
    userEvent.click(recommendButton);

    await waitFor(() => {
      expect(recommendOpportunitySpy).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
