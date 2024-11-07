describe('screens | StudentSignIn E2E', () => {
  it('should login after correct BE response', () => {
    cy.visit('sign-in/students');

    cy.findByLabelText('Domain / Site Code').type('a');
    cy.findByLabelText('Username').type('student');
    cy.findByLabelText('Password').type('dummy');
    cy.findByText('Login').click();

    cy.findByTestId('student-app').should('exist');
  });

  it('should not login after error BE response', () => {
    cy.visit('sign-in');

    cy.findByText('Student').click();

    cy.findByLabelText('Domain / Site Code').type('a');
    cy.findByLabelText('Username').type('a');
    cy.findByLabelText('Password').type('a');
    cy.findByText('Login').click();

    cy.findAllByText('Incorrect login, password or domain').should('exist');
  });
});
