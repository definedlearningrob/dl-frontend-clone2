import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { createMemoryHistory } from 'history';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ParticipantContextMenu } from '@dc/components/User/Opportunities/ParticipantListCard/ParticipantContextMenu/ParticipantContextMenu';
import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';

const statusChangeSpy = jest.fn();

const getStudentMock = (applicationStatus: OPPORTUNITY_APPLICATION_STATUS) => ({
  applicationId: '1',
  applicationStatus,
  fullName: 'Student Name',
  uuid: '123',
});

describe('ParticipantContextMenu', () => {
  it('should render correctly', () => {
    const { container } = renderWithRouterAndReduxProvider(
      <ParticipantContextMenu
        isOpen={true}
        opportunityName='Opportunity name'
        setUpdateStatusModalOpen={jest.fn()}
        student={getStudentMock(OPPORTUNITY_APPLICATION_STATUS.ACCEPTED)}
        toggleOpen={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe('should have proper options for', () => {
    it('Not Accepted application', async () => {
      renderWithRouterAndReduxProvider(
        <div id='portal'>
          <ParticipantContextMenu
            isOpen={true}
            opportunityName='Opportunity name'
            setUpdateStatusModalOpen={jest.fn()}
            student={getStudentMock(OPPORTUNITY_APPLICATION_STATUS.REJECTED)}
            toggleOpen={() => {}}
          />
        </div>
      );

      const items = await screen
        .findAllByRole('listitem')
        .then((elements) => elements.map((item) => item.textContent));

      expect(items).toEqual(['Show Portfolio', 'Send Message']);
    });

    it('Accepted application', async () => {
      renderWithRouterAndReduxProvider(
        <div id='portal'>
          <ParticipantContextMenu
            isOpen={true}
            opportunityName='Opportunity name'
            setUpdateStatusModalOpen={jest.fn()}
            student={getStudentMock(OPPORTUNITY_APPLICATION_STATUS.ACCEPTED)}
            toggleOpen={() => {}}
          />
        </div>
      );

      const items = await screen
        .findAllByRole('listitem')
        .then((elements) => elements.map((item) => item.textContent));

      expect(items).toEqual(['Show Portfolio', 'Send Message', 'Set as In Progress']);
    });

    it('In-Progress application', async () => {
      renderWithRouterAndReduxProvider(
        <div id='portal'>
          <ParticipantContextMenu
            isOpen={true}
            opportunityName='Opportunity name'
            setUpdateStatusModalOpen={jest.fn()}
            student={getStudentMock(OPPORTUNITY_APPLICATION_STATUS.STARTED)}
            toggleOpen={() => {}}
          />
        </div>
      );

      const items = await screen
        .findAllByRole('listitem')
        .then((elements) => elements.map((item) => item.textContent));

      expect(items).toEqual(['Show Portfolio', 'Send Message', 'Set as Completed']);
    });

    it('Completed application', async () => {
      renderWithRouterAndReduxProvider(
        <div id='portal'>
          <ParticipantContextMenu
            isOpen={true}
            opportunityName='Opportunity name'
            setUpdateStatusModalOpen={jest.fn()}
            student={getStudentMock(OPPORTUNITY_APPLICATION_STATUS.FINISHED)}
            toggleOpen={() => {}}
          />
        </div>
      );

      const items = await screen
        .findAllByRole('listitem')
        .then((elements) => elements.map((item) => item.textContent));

      expect(items).toEqual(['Show Portfolio', 'Send Message', 'Set as In Progress']);
    });
  });

  describe('should allow to change status to', () => {
    it('in-progress', async () => {
      renderWithRouterAndReduxProvider(
        <div id='portal'>
          <ParticipantContextMenu
            isOpen={true}
            opportunityName='Opportunity name'
            setUpdateStatusModalOpen={statusChangeSpy}
            student={{
              applicationId: '1',
              applicationStatus: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED,
              fullName: 'Student Name',
              uuid: '123',
            }}
            toggleOpen={() => {}}
          />
        </div>
      );

      const progressChangeItem = await screen.findByText('Set as In Progress');
      userEvent.click(progressChangeItem);

      expect(statusChangeSpy).toHaveBeenCalledWith({
        applicationId: '1',
        applicationStatus: 'ACCEPTED',
        fullName: 'Student Name',
      });
    });

    it('completed', async () => {
      renderWithRouterAndReduxProvider(
        <div id='portal'>
          <ParticipantContextMenu
            isOpen={true}
            opportunityName='Opportunity name'
            setUpdateStatusModalOpen={statusChangeSpy}
            student={{
              applicationId: '1',
              applicationStatus: OPPORTUNITY_APPLICATION_STATUS.STARTED,
              fullName: 'Student Name',
              uuid: '123',
            }}
            toggleOpen={() => {}}
          />
        </div>
      );

      const progressChangeItem = await screen.findByText('Set as Completed');
      userEvent.click(progressChangeItem);

      expect(statusChangeSpy).toHaveBeenCalledWith({
        applicationId: '1',
        applicationStatus: 'STARTED',
        fullName: 'Student Name',
      });
    });
  });

  it('should allow to navigate to student portfolio', async () => {
    const history = createMemoryHistory({ initialEntries: ['/opportunities/1'] });

    renderWithRouterAndReduxProvider(
      <div id='portal'>
        <ParticipantContextMenu
          isOpen={true}
          opportunityName='Opportunity name'
          setUpdateStatusModalOpen={() => {}}
          student={{
            applicationId: '1',
            applicationStatus: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED,
            fullName: 'Student Name',
            uuid: '123',
          }}
          toggleOpen={() => {}}
        />
      </div>,
      { history }
    );

    const showPortfolioItem = await screen.findByText('Show Portfolio');
    userEvent.click(showPortfolioItem);

    expect(history.location.pathname).toEqual('/students/123/portfolio');
  });
});
