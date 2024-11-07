describe('screens | Tasks E2E', () => {
  it('should display list of tasks', () => {
    cy.app('clean_and_seed');

    cy.adminLogin();

    cy.findByText('Dashboard').should('exist');
    cy.findByTestId('app-header-dropdown-trigger').click();
    cy.findByText('Admin panel').click();

    cy.findByRole('link', { name: 'Tasks' }).click();
    cy.findByText('Task 1').should('exist');
  });

  it('should be able to create new task and archive it', () => {
    cy.app('clean_and_seed');
    cy.adminLogin();
    cy.findByText('Dashboard').should('exist');

    cy.findByTestId('app-header-dropdown-trigger').click();
    cy.findByText('Admin panel').click();

    cy.findByRole('link', { name: 'Tasks' }).click();
    cy.findByText('New').click();

    cy.findByTestId('task-image-input').attachFile('dummyImage.png');
    cy.findByText('Accept').click();

    cy.findByLabelText('Name').type('Task #1');
    cy.findByLabelText('Display name').type('Task #1');
    cy.findByLabelText('Status').type('Published{enter}');
    cy.get('#Description_ifr').then(($iframe) => {
      const doc = $iframe.contents().find('body#tinymce');
      cy.wrap(doc).type('Random description');
    });

    cy.findByLabelText('Presentation Url').type(
      'https://definedlearning.slides.com/dlearn/creating-a-musical-superstar/embed?token=u_nlPm3a'
    );

    cy.findByText('Save').click();
    cy.findAllByTestId('tasks-list-item-name').eq(0).should('have.text', 'Task #1');
    cy.findAllByTestId('task-archive-button').eq(0).click();
    cy.findByRole('dialog').should('exist');
    cy.findByTestId('archive-modal-accept').click();
    cy.findByRole('dialog').should('not.exist');
    cy.findAllByTestId('tasks-list-item-name').contains('Task #1').should('not.exist');
  });
});
