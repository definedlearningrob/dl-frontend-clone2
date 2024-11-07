describe('screens | TeacherStudetProfile E2E', () => {
  it('should displaying student profile with courses', () => {
    cy.app('clean_and_seed');
    //turn off assessment
    cy.assessmentOff();

    //go to student profile
    cy.goToStudentProfile();

    //assign course
    cy.get('.user-student__current-courses__assign-button').click();
    cy.findAllByTestId('enroll-button').first().click();
    cy.findByTestId('enroll-in-course').click();
    cy.get('.course-card__container').should('exist');
    cy.deleteNotification();
    cy.get('[data-testid=back-button] > button').click();
    cy.findByTestId('current-courses-item').should('exist');

    //view portfolio
    cy.get('.student-portfolio-card > [data-testid=button]').click();
    cy.findByTestId('tab-showcase').should('exist');
    cy.get('[data-testid=back-button] > button').click();

    //send message
    cy.get('.user-student__info__actions-container__message-button').click();
    cy.findByTestId('new-conversation-text-area').type('test');
    cy.findByTestId('send-message-button').click();
    cy.contains('Your message has been sent successfully.').should('exist');
    cy.deleteNotification();

    //impersonate as a student
    cy.get('.user-student__info__actions-container > :nth-child(3)').click();
    cy.findByTestId('stop-impersonating-button').should('exist').click({ timeout: 10000 });
    cy.findByTestId('student-name').should('exist');

    //show message history
    cy.get('.user-student__info__actions-container > :nth-child(2)').click();
    cy.findByTestId('conversation-group').should('exist');
    cy.get('.backward-button__icon').click();

    //unenroll student from course
    cy.get('.shared-tooltip-portal__placeholder > [data-testid=icon-button]').click();
    cy.get('[data-testid=modal-footer] > .-primary').click();
    cy.findByTestId('current-courses-item').should('not.exist');
  });
});
