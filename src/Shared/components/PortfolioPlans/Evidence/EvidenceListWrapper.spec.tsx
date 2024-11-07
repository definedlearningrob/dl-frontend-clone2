import { MockedProvider } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DELETE_PLAN_GROUP_STATEMENT_EVIDENCE } from '@shared/graphql/shared/mutations/deletePlanGroupStatementEvidence';
import { renderWithRouter } from '@shared/utils/test';
import {
  automaticallyAddedEvidence,
  manuallyAddedEvidence,
} from '@shared/components/PortfolioPlans/Evidence/mocks';

import { EvidenceListWrapper } from './EvidenceListWrapper';

describe('EvidenceListWrapper', () => {
  it('should render empty evidence list with add new evidence button', async () => {
    const { container } = renderWithRouter(
      <MockedProvider>
        <EvidenceListWrapper evidence={[]} statementId='1' />
      </MockedProvider>
    );

    const addEvidenceButton = await screen.findByRole('button', { name: 'New evidence' });

    expect(addEvidenceButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render automatically added evidence list with add new evidence button', async () => {
    const { container } = renderWithRouter(
      <MockedProvider>
        <EvidenceListWrapper evidence={automaticallyAddedEvidence} statementId='1' />
      </MockedProvider>
    );

    const addEvidenceButton = await screen.findByRole('button', { name: 'New evidence' });

    const automaticEvidenceItem = screen.getByRole('listitem', {
      name: 'Digital Journalist: The 80s Had Game-Motion Graphics',
    });

    expect(addEvidenceButton).toBeInTheDocument();
    expect(automaticEvidenceItem).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render manually added evidence list with add new evidence button', async () => {
    const { container } = renderWithRouter(
      <MockedProvider>
        <EvidenceListWrapper evidence={manuallyAddedEvidence} statementId='1' />
      </MockedProvider>
    );

    const addEvidenceButton = await screen.findByRole('button', { name: 'New evidence' });

    expect(addEvidenceButton).toBeInTheDocument();

    const expectedEvidence = [
      'Motion Graphics DL',
      'Motion Graphics DC',
      'Schedule',
      'Medical Supply Checklist Assignment',
      'test :)',
      'Motion Graphics',
      'Family Picture Book',
      'Classroom Learning List',
      'Bike project',
    ];

    expectedEvidence.forEach((evidence) => {
      const evidenceItem = screen.getByRole('listitem', {
        name: evidence,
      });

      expect(evidenceItem).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });

  it('should remove manually added evidence', async () => {
    const removeEvidenceItemSpy = jest.fn();

    const mocks = [
      {
        request: {
          query: DELETE_PLAN_GROUP_STATEMENT_EVIDENCE,
          variables: { input: { id: '179' } },
        },
        result: () => {
          removeEvidenceItemSpy();

          return {
            data: {
              deletePlanGroupStatementEvidence: {
                planGroupStatement: {
                  id: '1',
                  evidences: [],
                },
              },
            },
          };
        },
      },
    ];

    renderWithRouter(
      <MockedProvider mocks={mocks}>
        <EvidenceListWrapper evidence={[manuallyAddedEvidence[0]]} statementId='1' />
      </MockedProvider>
    );

    const evidenceItem = screen.getByRole('listitem', {
      name: 'Motion Graphics DL',
    });

    expect(evidenceItem).toBeInTheDocument();

    const removeIcon = await within(evidenceItem).findByRole('button', {
      name: 'Remove evidence',
    });

    const actionsWrapper = removeIcon.closest('div');

    expect(actionsWrapper).toHaveClass('invisible');

    userEvent.hover(evidenceItem);

    expect(actionsWrapper).toHaveClass('group-hover/evidence-item:visible');

    userEvent.click(removeIcon);

    const confirmationModal = await screen.getByRole('dialog', { name: 'Delete evidence item' });

    expect(confirmationModal).toBeInTheDocument();

    const confirmButton = within(confirmationModal).getByRole('button', { name: 'Confirm' });

    userEvent.click(confirmButton);

    await waitFor(() => {
      expect(removeEvidenceItemSpy).toHaveBeenCalledTimes(1);
    });
  });
});
