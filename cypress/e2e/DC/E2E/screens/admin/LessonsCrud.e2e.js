describe('scenarios | LessonsCrud', () => {
  it('admin can create, read, update and delete lesson', () => {
    cy.app('clean_and_seed');
    cy.adminLogin();

    cy.findByTestId('app-header-dropdown-trigger').click();
    cy.findByText('Admin panel').click();

    cy.findByRole('link', { name: 'Lessons' }).click();
    cy.findByText('New').click();
    cy.get('[name=imageData]').attachFile('dummyImage.png');
    cy.findByText('Accept').click();
    cy.findByLabelText('Name').type('name');
    cy.findByLabelText('Type').type('pathway{enter}');

    // Checkin questions adding
    cy.findByText('Individual Questions')
      .parent()
      .within(() => {
        cy.findAllByRole('button').eq(1).click();
        cy.findAllByRole('button').eq(1).click();
      });

    // Vocabularies adding
    cy.findByText('Add').click();
    cy.findByText('Vocabulary').click();
    cy.findByText('Add').click();
    cy.findByTestId('vocabulary-term-input').type('term');
    cy.findByLabelText('Term').type('desc');
    cy.get('#Definition_ifr').then(($iframe) => {
      const doc = $iframe.contents().find('body#tinymce');
      cy.wait(3000);
      cy.wrap(doc).type('Def');
    });
    cy.findAllByText('Save').eq(0).click();
    cy.findByTestId('section-close').click();

    cy.findByText('Vocabulary').should('exist');
    cy.findAllByRole('button', { name: 'close' }).click();

    // Research links adding
    cy.findByText('Add').click();
    cy.findByText('Research Link').click();
    cy.findByText('Add').click();
    cy.findByLabelText('Author').type('aut');
    cy.findByLabelText('Display name').type('dpn');
    cy.findByLabelText('Source Name').type('src name');
    cy.findByLabelText('Resource Link').type('http://link');
    // name and id collision with global lesson name
    cy.findByTestId('research-link-name-input').type('name');
    cy.findAllByText('Save').eq(0).click();

    cy.findByTestId('section-close').click();

    cy.findByText('Research Link').should('exist');
    cy.findAllByRole('button', { name: 'close' }).click();

    // Assignments adding
    cy.findByText('Add').click();
    cy.findByText('Assignment').click();
    cy.findByText('Add').click();
    cy.findByTestId('assignment-name-input').type('Assignment name');
    cy.findByTestId('assignment-display-name-input').type('Assignment Display Name');
    cy.get('#Description_ifr').then(($iframe) => {
      const doc = $iframe.contents().find('body#tinymce');
      cy.wait(3000);
      cy.wrap(doc).type('Assignment description');
    });
    cy.findAllByText('Save').eq(0).click();

    cy.findByTestId('section-close').click();

    cy.findByText('Assignment').should('exist');
    cy.findAllByRole('button', { name: 'close' }).click();

    // Texts adding
    cy.findByText('Add').click();
    cy.findByText('Text').click();
    cy.findByText('Add').click();
    cy.findByTestId('text-name-input').type('name');
    cy.findByTestId('text-display-name-input').type('dpn');
    cy.get('#Content_ifr').then(($iframe) => {
      const doc = $iframe.contents().find('body#tinymce');
      cy.wait(3000);
      cy.wrap(doc).type('Content');
    });
    cy.findAllByText('Save').eq(0).click();

    cy.findByTestId('section-close').click();

    cy.findByText('Text').should('exist');
    cy.findAllByRole('button', { name: 'close' }).click();

    // Attachment adding
    cy.findByText('Add').click();
    cy.findByText('Attachment').click();
    cy.findByText('Add').click();
    cy.findByTestId('attachment-name-input').type('name');
    cy.findByTestId('attachment-display-name-input').type('dpn');

    cy.get('#Description_ifr').then(($iframe) => {
      const doc = $iframe.contents().find('body#tinymce');
      cy.wait(3000);
      cy.wrap(doc).type('Desc');
    });

    cy.findByTestId('attachment-files-input').attachFile('document.pdf', { allowEmpty: true });
    cy.findByTestId('attachment-files-input').attachFile('document.xls', { allowEmpty: true });
    cy.findAllByText('Save').eq(0).click();

    cy.findByTestId('section-close').click();

    cy.findByText('Attachment').should('exist');
    cy.findAllByRole('button', { name: 'close' }).click();

    // Saving lesson
    cy.findAllByText('Save').eq(0).click();
    // Default survey lesson here
    cy.findByRole('cell', { name: 'name' }).should('exist');

    // Show lesson
    cy.findAllByText('Show').eq(0).click();

    cy.findByText('Vocabulary').should('exist');
    cy.findByText('termdesc').should('exist');

    cy.findByText('Research Link').should('exist');
    cy.findByRole('link', { name: 'http://link' }).should('exist');
    cy.findByText('aut, src name').should('exist');

    cy.findByText('Assignment Display Name').should('exist');
    cy.findByText('Assignment description').should('exist');
    cy.findByText('Career Project Rubric').should('exist');
    cy.findByText('Assignment status:').should('exist');
    cy.findByText('Draft').should('exist');

    cy.findAllByTestId('attachment-file-link').should('have.length', 2);
    cy.findAllByTestId('lesson-item-check-in-question').should('have.length', 2);

    cy.findByRole('button', { name: 'Back' }).click();

    //Close toasts
    cy.findAllByRole('button', { name: 'close' }).click();

    // // Editing lesson
    cy.findAllByText('Edit').eq(0).click();

    cy.findByLabelText('Name').type(' updated');
    cy.findByText('Vocabulary')
      .parent()
      .within(() => {
        cy.findAllByRole('button').eq(1).click();
      });
    cy.findByText('Text')
      .parent()
      .within(() => {
        cy.findAllByRole('button').eq(1).click();
      });
    cy.findByText('Assignment')
      .parent()
      .within(() => {
        cy.findAllByRole('button').eq(1).click();
      });

    cy.findByText('Save').click();
    cy.findByText('name updated').should('exist');

    // // Archiving lesson
    cy.findAllByRole('button', { name: 'Archive' }).eq(0).click();
    cy.findByRole('button', { name: 'Archive' }).click();

    cy.findByText('name updated').should('not.exist');
  });
});
