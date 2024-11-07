describe('screens | Assessment E2E', () => {
  it('allows to complete onboarding by student', () => {
    cy.app('clean_and_seed');

    //replace with studentLogin once working
    cy.studentLogin();
    //end replace

    //Go to assessment - Force
    cy.findByTestId('create-first-attempt');
    cy.findByRole('button', { name: 'Get Started' }).click({ force: true });
    cy.findByText('Begin').click();

    const stepsCountPart1 = Array.from({ length: 3 });

    cy.wrap(stepsCountPart1).each(() => {
      cy.findAllByRole('listitem')
        .eq(0)
        .within(() => {
          cy.findAllByRole('button').eq(1).click();
        });
      cy.findAllByRole('listitem')
        .eq(1)
        .within(() => {
          cy.findAllByRole('button').eq(0).click();
        });
      cy.findByText('Next Question').click();
    });

    // //Filling step 2 of assessment
    cy.findByText('Begin').click();
    const stepsCountPart2 = Array.from({ length: 6 });

    cy.wrap(stepsCountPart2).each(() => {
      cy.findAllByRole('listitem').eq(0).click();
      cy.findAllByRole('listitem').eq(4).click();
      cy.findByText('Next Question').click();
    });

    // //Filling step 3 of assessment
    cy.findByText('Begin').click();
    const stepsCountPart3 = Array.from({ length: 30 });
    cy.wrap(stepsCountPart3).each(() => {
      cy.get('.assessment__step3').within(() => {
        cy.findAllByRole('button').eq(0).click();
        cy.findAllByRole('button').eq(0).click();
        cy.findAllByRole('button').eq(1).click();
      });
      cy.findByText('Next Question').click();
    });

    cy.findByText('Please wait,').should('exist');
  });
});
