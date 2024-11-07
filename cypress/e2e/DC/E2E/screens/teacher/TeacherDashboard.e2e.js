import '@percy/cypress';

describe('snapshots | TeacherDashboard', () => {
  it('should display teacher dashboard', () => {
    cy.teacherLogin();
    cy.findByText('My Classes').should('exist');
    cy.findAllByTestId('teacher-dashboard-schoolclass-assessments').first().should('exist');
    cy.percySnapshot('teacherdashboard');

    //generate report
    cy.findByRole('button', { name: 'Generate Report' }).click();
    cy.findByText('Assessment Report').should('exist');
    cy.percySnapshot('teacherReport');
    cy.findByRole('button', { name: 'Modal close' }).click();

    //go to class
    cy.findAllByTestId('teacher-dashboard-schoolclass-assessments').first().should('exist').click();
    cy.get('.user-class__student__name').should('exist');
    cy.percySnapshot('teacherClass');
    cy.findAllByTestId('button').eq(0).click();
    cy.get('[data-testid=text-editor] > .tox').should('exist');
    cy.percySnapshot('teacherAnnouncement');
    cy.findByRole('button', { name: 'Modal close' }).click();
    cy.get('.user-class__student__message-button > [data-testid=icon]').should('exist').click();
    cy.findByRole('button', { name: 'Modal close' }).click();
  });
});
