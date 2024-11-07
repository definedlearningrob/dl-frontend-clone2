describe('screens | TeacherMessages E2E', () => {
  // eslint-disable-next-line max-len
  it('should create conversation and send first message, refresh conversation, backing to inbox and displaying message history, replying on message', () => {
    cy.app('clean_and_seed');
    cy.assessmentOff();
    cy.teacherLogin();
    cy.get('[data-testid=navigation-item-messaging]').click();
    cy.get('[data-testid=create-conversation]').click();
    cy.get('.dc-async-select__value-container').click();
    cy.get('[data-testid="option"]').first().click();
    cy.get('[data-testid=new-conversation-text-area]').type('test text');
    cy.get('[data-testid=send-message-button]').click();
    cy.findByText('test text').should('exist');
    cy.findAllByText('Now').should('exist');

    //new conversation
    cy.findByRole('button', { name: 'New conversation' }).type('test text');
    cy.get('.dc-async-select__value-container').click();
    cy.get('[data-testid="option"]').eq(1).click();
    cy.get('[data-testid=new-conversation-text-area]').type('test text');
    cy.get('[data-testid=send-message-button]').click();
    cy.findAllByTestId('conversation-group').should('have.length', 2);
    cy.findByText('Message history').should('exist');

    //refresh message
    cy.findByRole('button', { name: 'Refresh' }).click();
    cy.findByText('Message history').should('exist');

    //impersonate as a student, check and reply on message
    cy.get('[data-testid=navigation-item-dashboard]').click();
    cy.get('[data-testid=teacher-dashboard-schoolclass-assessments]').should('exist').click();
    cy.get('.user-class__student__view-profile-button').first().click();
    cy.get('.user-student__info__actions-container > :nth-child(3)').click();
    cy.get('[data-testid=navigation-item-messages]').click();
    cy.get('[data-testid=conversation-context]').should('exist').click();
    cy.get('[data-testid=messages-text-area]').should('be.visible').type('something');
    cy.findByRole('button', { name: 'Send button' }).click();

    cy.wait(2000);

    cy.get('[data-testid=stop-impersonating-button]').click();
    cy.get('[data-testid=navigation-item-messaging]').click();
    cy.get('[data-testid=conversation-context]').click();
  });
});
