/* eslint max-len: 0*/
describe('screens | UserSignIn E2E', () => {
  it('should login after correct BE response', () => {
    cy.app('clean_and_seed');
    cy.visit('sign-in/users');

    cy.get('[data-testid=login-input]').type('system_admin');
    cy.get('[data-testid=password-input]').type('dummy');
    cy.get('[data-testid=login-submit]').click();

    cy.get('[data-testid=user-app]').should('exist');
  });

  it('should not login after error BE response', () => {
    cy.app('clean_and_seed');
    cy.visit('sign-in/users');

    cy.get('[data-testid=login-input]').type('a');
    cy.get('[data-testid=password-input]').type('a');
    cy.get('[data-testid=login-submit]').click();

    cy.get('[data-testid=user-app]').should('not.exist');
  });
});
