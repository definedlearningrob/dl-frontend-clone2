describe('Teams Management', () => {
  beforeEach(() => {
    cy.app('clean_and_seed');
    cy.teacherLogin('learning');
  });

  const teamName = 'The Fellowship of the Ring';

  it('should allow creating team and assigning members', () => {
    cy.log('**Create new team and add members**');
    cy.findByText('My Classes').click();
    cy.findByText('Go to Class').click();
    cy.findByText('Create new team').click();
    cy.findByRole('dialog').should('be.visible');

    cy.findByPlaceholderText(/Type name*/).type(teamName);
    cy.get('.select__option').click({ multiple: true });
    cy.findByRole('button', { name: 'Create Team' }).click();
    cy.findByText('Team created successfully!').should('be.visible');

    cy.findByText('Teams')
      .parent()
      .parent()
      .within(($teamContainer) => {
        cy.findByText(teamName).should('be.visible');
        cy.findAllByTestId('avatar-image').should('be.visible');
        cy.findAllByTestId('avatar-image').last().should('be.visible');
        expect($teamContainer).to.contain(teamName);
      });

    cy.log('**Delete created team**');
    cy.get('.dropdown-portal-options__trigger-icon-wrapper').eq(0).click({ force: true });
    cy.findAllByTestId('dropdown-options-container')
      .eq(0)
      .within(() => {
        cy.findByText('Delete').click();
      });
    cy.findAllByRole('dialog').within(() => {
      cy.findByRole('button', { name: 'Delete' }).click();
    });
    cy.findByText('Team deleted successfully!').should('be.visible');
    cy.findByText('Teams')
      .parent()
      .parent()
      .within(($teamContainer) => {
        expect($teamContainer).to.not.contain(teamName);
      });
  });

  it('should show error messages on incomplete new team form', () => {
    cy.findByText('My Classes').click();
    cy.findByText('Go to Class').click();

    cy.findByText('Create new team').click();
    cy.findByRole('dialog').should('be.visible');

    cy.get('.select__option').click({ multiple: true });
    cy.findByRole('button', { name: 'Create Team' }).click();
    cy.findByText('This field is required.').should('be.visible');
    cy.findByRole('button', { name: 'Cancel' }).click();
    cy.findByRole('dialog').should('not.exist');

    cy.findByText('Create new team').click();
    cy.findByRole('dialog').should('be.visible');

    cy.findByPlaceholderText(/Type name*/).type(teamName);
    cy.findByRole('button', { name: 'Create Team' }).click();
    cy.findByText('To create a team, select at least two students.').should('be.visible');
    cy.findByRole('button', { name: 'modal close' }).click();
    cy.findByRole('dialog').should('not.exist');
  });

  it('should allow user to edit team name', () => {
    cy.findByText('My Classes').click();
    cy.findByText('Go to Class').click();
    cy.findByText('Create new team').click();
    cy.findByRole('dialog').should('be.visible');

    cy.log('**Create new team and add members**');
    cy.findByPlaceholderText(/Type name*/).type(teamName);
    cy.get('.select__option').click({ multiple: true });
    cy.findByRole('button', { name: 'Create Team' }).click();
    cy.findByText('Team created successfully!').should('be.visible');

    cy.get('.dropdown-portal-options__trigger-icon-wrapper').eq(0).click({ force: true });
    cy.findAllByTestId('dropdown-options-container')
      .eq(0)
      .within(() => {
        cy.findByText('Edit').click();
      });

    cy.log('**Edit team**');
    cy.findByRole('dialog').within(() => {
      cy.findByRole('textbox', { value: teamName }).clear().type('Fantastic Four');
    });
    cy.findByTestId('modal-footer').within(() => {
      cy.findByRole('button', { name: 'Add & save' }).click();
    });
    cy.findByText('Team updated successfully!').should('be.visible');
    cy.findByText('Teams')
      .parent()
      .parent()
      .within(($teamContainer) => {
        expect($teamContainer).to.contain('Fantastic Four');
      });
  });
});
