import 'cypress-file-upload';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('appCommands', function (body) {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('api_host')}/__cypress__/command`,
    body: JSON.stringify(body),
    log: true,
    failOnStatusCode: true,
  });
});

Cypress.Commands.add('app', function (name, commandOptions) {
  cy.appCommands({ name: name, options: commandOptions });
});

Cypress.Commands.add('appScenario', function (name) {
  cy.app('scenarios/' + name);
});

Cypress.Commands.add('appFactories', function (options) {
  cy.app('factory_bot', options);
});

Cypress.Commands.add('adminLogin', function () {
  cy.request({
    headers: {
      'Service-Name': 'careers',
    },
    method: 'POST',
    url: `${Cypress.env('api_host')}/api/v1/users/sign_in`,
    body: { user: { username: 'system_admin', password: 'dummy' } },
  }).then((response) => {
    window.localStorage.setItem('defined-careers-access-token', response.body.token);
  });
  cy.visit('/');
});

Cypress.Commands.add('entityAdminLogin', function () {
  cy.request({
    headers: {
      'Service-Name': 'careers',
    },
    method: 'POST',
    url: `${Cypress.env('api_host')}/api/v1/users/sign_in`,
    body: { user: { username: 'c1_e1_admin', password: 'dummy' } },
  }).then((response) => {
    window.localStorage.setItem('defined-careers-access-token', response.body.token);
  });
  cy.visit('/');
});

Cypress.Commands.add('studentLogin', function (serviceName = 'careers') {
  cy.request({
    headers: {
      'Service-Name': serviceName,
    },
    method: 'POST',
    url: `${Cypress.env('api_host')}/api/v1/students/sign_in`,
    body: { student: { username: 'c1_e1_sc1_student', password: 'stem', domain: 'defined_stem' } },
  }).then((response) => {
    window.localStorage.setItem('defined-careers-access-token', response.body.token);
  });
  cy.visit('/');
});

Cypress.Commands.add('teacherLogin', function (serviceName = 'careers') {
  const isPbl = serviceName === 'learning';
  const apiUrl = isPbl ? '/api/learning/v1/users/sign_in' : '/api/v1/users/sign_in';
  const accessTokenName = isPbl ? 'pbl-access-token' : 'defined-careers-access-token';

  cy.request({
    headers: {
      'Service-Name': serviceName,
    },
    method: 'POST',
    url: `${Cypress.env('api_host')}${apiUrl}`,
    body: { user: { username: 'c2_e1_sc1_teacher', password: 'stem' } },
  }).then((response) => {
    window.localStorage.setItem(accessTokenName, response.body.token);
  });
  cy.visit('/');
});

Cypress.Commands.add('goToStudentProfile', function () {
  cy.teacherLogin();
  cy.get('[data-testid=teacher-dashboard-schoolclass-assessments]').should('exist').click();
  cy.get(':nth-child(1) > .user-class__student__view-profile-button').click();
});

Cypress.Commands.add('assessmentOff', function () {
  cy.adminLogin();
  cy.findByRole('link', { name: 'California State University' }).click();
  cy.findByRole('button', { name: 'Settings' }).click();
  cy.findAllByRole('switch').eq(0).click({ force: true });
  cy.findByRole('button', { name: 'Save' }).click();

  cy.findByRole('link', { name: 'Dashboard' }).click();
  cy.findByRole('link', { name: 'Harvard University' }).click();
  cy.findByRole('button', { name: 'Settings' }).click();
  cy.findAllByRole('switch').eq(0).click({ force: true });
  cy.findByRole('button', { name: 'Save' }).click();
  cy.get('.shared-table__body').should('exist');
  window.localStorage.clear();
  cy.reload();
});

Cypress.Commands.add('createNewLesson', function () {
  cy.get('[data-testid=admin-list-new-button]').click();
  cy.get('[data-testid=lessons-image-input]').attachFile('dummyImage.png');
  cy.get('[data-testid=accept-button]').click();
  cy.get('[data-testid=lessons-name-input]').type('test');
  cy.get(':nth-child(1) > .sortable-list-item__action-buttons > [data-testid=add-item]').click();
  cy.get(':nth-child(1) > .sortable-list-item__action-buttons > [data-testid=add-item]').click();
  cy.get('[data-testid=new-lesson-item]').click();
  cy.get('[data-testid="attachments-option"]').click();
  cy.get('[data-testid=lesson-item-new]').click();
  cy.get('[data-testid=attachment-name-input]').type('test');
  cy.get('[data-testid=attachment-display-name-input]').should('exist').type('test');
  cy.get('.tox-toolbar__primary').should('exist').should('be.visible');
  cy.get('#Description_ifr').then(($iframe) => {
    const doc = $iframe.contents().find('body#tinymce');
    cy.wrap(doc).type('Desc');
  });
  cy.get('[data-testid=button]').attachFile('document.pdf', { allowEmpty: true });
  cy.get('[data-testid=attachment-form-submit]').click();
  cy.deleteNotification();
});

Cypress.Commands.add('getIframe', (iframe) =>
  cy.get(iframe).its('0.contentDocument.body').should('be.visible').then(cy.wrap)
);

Cypress.Commands.add('deleteNotification', function () {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);
  cy.get('.Toastify__close-button').should('exist').click({ multiple: true });
});

Cypress.Commands.add('setupStudentToken', function () {
  const dummyStudentScopeToken =
    // eslint-disable-next-line max-len
    'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkbGNhcmVlcnMiLCJ1c2VybmFtZSI6ImRjc3R1ZGVudCIsInN1YiI6IjExYjVkZmE0LThkMDEtNGMyNC04YjIyLWYxOTUwZWNiZGI0YiIsInNjcCI6InN0dWRlbnQiLCJhdWQiOm51bGwsImlhdCI6MTYyMzg0MzIwMSwiZXhwIjoxNjIzODcyMDAxLCJqdGkiOiIxNTEwMDNhZi1mZTkwLTRiMWMtYmRiZC05MjA5NDc4Mjk2M2EifQ';

  window.localStorage.setItem('defined-careers-access-token', dummyStudentScopeToken);
  window.localStorage.setItem('pbl-access-token', dummyStudentScopeToken);
});

Cypress.Commands.add('setupUserToken', function () {
  const dummyUserScopeToken =
    // eslint-disable-next-line max-len
    'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkbGNhcmVlcnMiLCJ1c2VybmFtZSI6ImRjYWRtaW4iLCJzdWIiOiJiMzdmMWUzMS1iMjAyLTRiZGUtOWJjYy1mMDIzZjEzYTE5ZWMiLCJzY3AiOiJ1c2VyIiwiYXVkIjoiY2FyZWVycyIsImlhdCI6MTY0MTgxNzgyOCwiZXhwIjoxNjQxODQ2NjI4LCJqdGkiOiJkZGU1NjZmYi04YzM4LTRlMGUtOWI2ZS1mOGNlM2UwNTI2ODUifQ.ApSKRefJR-3LxwwoEBnuLRvbfuvfhwv3fUoN_33vo3o';

  window.localStorage.setItem('defined-careers-access-token', dummyUserScopeToken);
  window.localStorage.setItem('pbl-access-token', dummyUserScopeToken);
});
