import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { MockedProvider } from '@apollo/client/testing';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { DetailsHeader } from '@dc/components/User/Opportunities/ManageOpportunityApplications/DetailsHeader/DetailsHeader';
import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import { MessagingProvider } from '@shared/hooks/useMessaging';
import MessagingModal from '@shared/components/Messaging/Modal/Modal';

const application = {
  id: '1',
  appliedAt: '2023-05-01',
  updatedAt: '2023-05-02',
  status: OPPORTUNITY_APPLICATION_STATUS.REJECTED,
  answers: [{ id: '1', opportunityQuestionId: '1', answer: 'To sleep better!', step: 1 }],
  lastChangedBy: {
    uuid: '123',
    name: 'Teacher Name',
  },
  student: {
    uuid: '123',
    fullName: 'Applicant Student 1',
    schoolClasses: [{ uuid: 'class-uuid', name: 'Class name' }],
  },
  __typename: 'OpportunityApplication',
};

describe('DetailsHeader', () => {
  it('should render correctly', () => {
    const { container } = renderWithRouterAndReduxProvider(
      <DetailsHeader opportunityName='Opportunity Name' selectedApplication={application} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should allow sending message to given student', async () => {
    renderWithRouterAndReduxProvider(
      <MockedProvider>
        <MessagingProvider refreshUser={jest.fn()} userInfo={{} as TUserInfo}>
          <DetailsHeader opportunityName='Opportunity Name' selectedApplication={application} />
          <MessagingModal />
        </MessagingProvider>
      </MockedProvider>
    );

    userEvent.click(screen.getByLabelText('Send Message'));

    expect(screen.getByRole('dialog')).toBeVisible();
  });
});
