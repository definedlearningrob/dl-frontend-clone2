describe('screens | Extensions E2E', () => {
  it('should create new extensions', () => {
    cy.app('clean_and_seed');
    cy.adminLogin();

    cy.log('Create new extension');
    cy.findByRole('link', { name: 'Extensions' }).click();
    cy.findByRole('heading', { name: 'Extensions' }).should('exist');
    cy.findByRole('button', { name: 'New Extension' }).click();
    cy.findByTestId('modal-heading').should('exist');
    cy.findByLabelText('Extension Name').type('New Extension');
    cy.findByTestId('extension-image-input').attachFile('dummyImage.png');
    cy.findByText('Accept').click();

    cy.get('.modal').within(() => {
      cy.wait(3000);
      cy.getIframe('iframe').clear().type('This is a test description.');
    });

    cy.get('.accordion').find('button').first().click();

    cy.findByLabelText('Link Name').type('First Link');
    cy.findByLabelText('Link URL').type('https://www.google.com/');

    cy.findByRole('button', { name: 'Add another link' }).click();
    cy.findAllByText('Remove Link').eq(1).click();

    cy.findByText('Extension Files').click();
    cy.findByTestId('drop-zone-input').attachFile('dummyImage.png');
    cy.findByText('Click Create Extension to save dummyImage.png...').should('exist');

    cy.findByRole('button', { name: 'Create Extension' }).click();
    cy.findByRole('button', { name: 'Create Extension', timeout: 20000 }).should('be.disabled');

    cy.findByRole('heading', { name: 'New Extension', timeout: 20000 }).should('exist');
    cy.findByRole('heading', { name: 'Create New Extension' }).should('not.exist');

    cy.log('Draft extension visible on list');
    cy.get('[data-testid=back-button] > [data-testid=icon-button]').click();
    cy.findByText('New Extension');
    cy.findByText('DRAFT');

    cy.findByText('View details').click();

    cy.findByText('This is a test description.');
    cy.findByText('First Link');
    cy.findByText('dummyImage.png');

    cy.log('Publish extension');
    cy.findByText('Publish Extension').click();
    cy.scrollTo('top');

    // gets overflow by appheader and cannot scroll it intoView
    cy.findByLabelText('Cluster 1').click('bottom', { force: true });

    cy.findByLabelText('Pathway 1').scrollIntoView().click('bottom', { force: true });
    cy.findByLabelText('Course 1').scrollIntoView().click('bottom', { force: true });

    cy.findByText('Publish Now').scrollIntoView().click();

    cy.findByText('PUBLISHED');
    cy.get('[data-testid=back-button] > [data-testid=icon-button]').click();
    cy.findByText('New Extension');
    cy.findByText('PUBLISHED');

    // TODO: Add course with lessons on BE, then assign & check extension on lesson
  });
});
