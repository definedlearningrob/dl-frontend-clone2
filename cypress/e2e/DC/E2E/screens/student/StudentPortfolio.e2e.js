describe('screens | StudentPortfolio E2E', () => {
  it('should create project, show portfolio and add file to resume', () => {
    //turn off assessment, login as teacher, impersonate as a student and go to portfolio
    cy.app('clean_and_seed');
    cy.assessmentOff();
    cy.teacherLogin();
    cy.get('[data-testid=teacher-dashboard-schoolclass-assessments]').should('exist').click();
    cy.findByRole('button', { name: 'View Profile' }).click();
    cy.findByRole('button', { name: 'Impersonate' }).click();
    cy.findByRole('link', { name: 'Portfolio' }).click();
    cy.findByText('Personal').click();

    //create new project
    cy.findAllByText('Defined Careers').eq(1).click();
    cy.wait(500);
    cy.findByText('Personal').click();
    cy.findByRole('button', { name: 'Create Project' }).click();
    cy.findByLabelText('Project name').type('test');
    cy.findByLabelText('Project description').type('test description');
    cy.get('[data-testid="image-input"]').attachFile('dummyImage.png');
    cy.findByText('Accept').click();
    cy.findByText('Create').click();
    cy.deleteNotification();
    cy.findByText('test').should('exist');

    //edit project
    cy.findByRole('button', { name: 'Edit' }).click();
    cy.findByLabelText('Project name').type('{selectall} test 2');
    cy.get('[data-testid="portfolio-drop-zone-input"]').attachFile('document.pdf', {
      allowEmpty: true,
    });
    cy.findByText('Update').click();
    cy.findByText('test 2').should('exist');

    //upload resume
    cy.findByRole('button', { name: 'Upload' }).click();
    cy.get('[data-testid="drop-zone-input"]').attachFile('document.pdf', { allowEmpty: true });
    cy.get('[data-testid=upload-modal-save-button]').click();
    cy.findByText('document.pdf').should('exist');
    cy.deleteNotification();

    //stop impersonate and check student portfolio as a teacher
    cy.findByRole('button', { name: 'Stop Impersonating' }).click();
    cy.findByRole('button', { name: 'View Portfolio' }).click();
    cy.findByText('Personal').click();
    cy.findByText('test 2').should('exist');
    cy.findByRole('button', { name: 'Back' }).click();
    cy.findByRole('button', { name: 'Back' }).click();

    // impersonate as a student and delete project and resume
    cy.findByRole('button', { name: 'Impersonate' }).click();
    cy.findByRole('link', { name: 'Portfolio' }).click();
    cy.findAllByText('Defined Careers').eq(1).click();
    cy.wait(500);
    cy.findByText('Personal').click();
    cy.findByRole('button', { name: 'Delete' }).click();
    cy.findByRole('button', { name: 'Delete' }).click();
    // cy.findByText('test 2').should('not.exist');
    cy.deleteNotification();
  });
});
