/* eslint max-len: 0*/
describe('screens | UserSignIn E2E', () => {
  it('should login after correct BE response', () => {
    cy.visit('sign-in/users');

    cy.findByTestId('login-input').type('system_admin');
    cy.findByTestId('password-input').type('dummy');
    cy.findByTestId('login-submit').click();

    cy.findByTestId('user-app').should('exist');
  });

  it('should not login after error BE response', () => {
    cy.visit('sign-in/users');

    cy.findByTestId('login-input').type('a');
    cy.findByTestId('password-input').type('a');
    cy.findByTestId('login-submit').click();

    cy.findByTestId('user-app').should('not.exist');
  });
});
