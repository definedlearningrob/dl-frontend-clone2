describe.skip('components | AutHandler E2E', () => {
  it('should authorize users after correct BE response', () => {
    cy.visit('/users/auth?code=system_admin');

    cy.get('[data-testid=user-app]').should('exist');
  });

  it('should authorize students after correct BE response', () => {
    cy.visit('/students/auth?code=student');

    cy.get('[data-testid=student-app]').should('exist');
  });

  it('should not authorize users after error BE response displaying error notification', () => {
    cy.visit('/users/auth?code=somecode');

    cy.get('[data-testid=user-app]').should('not.exist');
    cy.get('.Toastify__toast-body').should('have.text', 'OAuth2 error');
  });

  it('should not authorize students after error BE response displaying error notification', () => {
    cy.visit('/students/auth?code=somecode');

    cy.get('[data-testid=user-app]').should('not.exist');
    cy.get('.Toastify__toast-body').should('have.text', 'OAuth2 error');
  });
});
