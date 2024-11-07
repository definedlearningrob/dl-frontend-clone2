describe('screens | TeacherClass E2E', () => {
  it('should displaying classes information, send message to student and annoucement to whole class', () => {
    cy.app('clean_and_seed');
    cy.assessmentOff();
    cy.teacherLogin();
    cy.findByTestId('teacher-dashboard-schoolclass-assessments').should('exist').click();
    cy.get('.user-class__students__list > :nth-child(1)').should('exist');

    //send message
    cy.get(
      ':nth-child(1) > .user-class__student__header > .user-class__student__message-button > [data-testid=icon]'
    ).click();
    cy.findByTestId('new-conversation-text-area').type('test test');
    cy.findByTestId('send-message-button').click();
    cy.findByTestId('navigation-item-messaging').click();
    cy.deleteNotification();
    cy.findByTestId('navigation-item-messaging').should('exist');

    //make annoucement
    cy.findByTestId('navigation-item-dashboard').click();
    cy.findByTestId('teacher-dashboard-schoolclass-assessments').should('exist').click();
    cy.get('.-primary').click();
    cy.getIframe('iframe').should('exist');
    cy.get('.modal').within(() => {
      cy.getIframe('iframe').clear().type('This is a test description.');
    });
    cy.findByTestId('announcement-modal-button').should('exist').click();
    cy.contains('Your announcement has been sent successfully.').should('exist');
    cy.deleteNotification();
  });
});
