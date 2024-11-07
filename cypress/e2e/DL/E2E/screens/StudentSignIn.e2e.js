describe('screens | StudentSignIn E2E', () => {
  it('should login after correct BE response', () => {
    cy.app('clean_and_seed');
    cy.visit('sign-in/students');

    cy.get('[data-testid=domain-input]').type('a');
    cy.get('[data-testid=login-input]').type('student');
    cy.get('[data-testid=password-input]').type('dummy');
    cy.get('[data-testid=login-submit]').click();

    cy.get('[data-testid=student-app]').should('exist');
  });

  it('should not login after error BE response', () => {
    cy.app('clean_and_seed');
    cy.visit('sign-in/students');

    cy.get('[data-testid=domain-input]').type('a');
    cy.get('[data-testid=login-input]').type('a');
    cy.get('[data-testid=password-input]').type('a');
    cy.get('[data-testid=login-submit]').click();

    cy.get('[data-testid=student-app]').should('not.exist');
  });
});
