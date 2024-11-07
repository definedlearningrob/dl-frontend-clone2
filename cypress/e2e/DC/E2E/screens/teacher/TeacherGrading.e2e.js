// we should have prefilled data for this test instead of creating everything from scratch
describe.skip('screens | TeacherGrading E2E', () => {
  it('should evaluate the tasks and send message with context', () => {
    //turn off assessment
    cy.app('clean_and_seed');
    cy.adminLogin();
    cy.get('.shared-table__body').contains('California State University').should('exist').click();
    cy.get('[data-testid=entity-settings-button]').click();
    cy.get('.switch__content__slider').first().click();
    cy.get('[data-testid=save-settings-button]').click();
    cy.get('[data-testid=dropdown-section]').click();
    cy.get('[data-testid=app-header-dropdown] > :nth-child(1)').click();
    cy.get('[data-testid=navigation-item-lessons]').click();

    //create new lessons
    cy.createNewLesson();
    cy.get('[data-testid=lessons-type-input] .dc-select__control').click();
    cy.get('.dc-select__option:nth-child(1)').click();
    cy.get('[data-testid=lessons-form-submit]').click();
    cy.contains('Lesson created successfully!').should('exist');
    cy.deleteNotification();

    cy.createNewLesson();
    cy.get('[data-testid=lessons-type-input] .dc-select__control').click();
    cy.get('.dc-select__option:nth-child(1)').click();
    cy.get('[data-testid=lessons-form-submit]').should('exist').should('be.visible').click();
    cy.contains('Lesson created successfully!').should('exist');
    cy.deleteNotification();

    cy.createNewLesson();
    cy.get('[data-testid=lessons-type-input] .dc-select__control').click();
    cy.get('.dc-select__option:nth-child(1)').click();
    cy.get('[data-testid=lessons-form-submit]').should('exist').should('be.visible').click();
    cy.contains('Lesson created successfully!').should('exist');
    cy.deleteNotification();

    cy.createNewLesson();
    cy.get('[data-testid=lessons-type-input] .dc-select__control').click();
    cy.get('.dc-select__option:nth-child(1)').click();
    cy.get('[data-testid=lessons-form-submit]').should('exist').should('be.visible').click();
    cy.contains('Lesson created successfully!').should('exist');
    cy.deleteNotification();

    //add lessons to courses
    cy.get('[data-testid=navigation-item-lessons]').should('exist');
    cy.get('[data-testid=navigation-item-courses]').invoke('show');
    cy.get('[data-testid=navigation-item-courses]').should('exist').click();
    cy.get('[data-testid=courses-edit-button]').eq(3, 5).click();
    cy.get('[data-testid=add-lesson]').first().should('be.visible').click();
    cy.get('[data-testid=add-lesson]').first().should('be.visible').click();
    cy.get('[data-testid=add-lesson]').first().should('be.visible').click();
    cy.get('[data-testid=add-lesson]').first().should('be.visible').click();
    cy.get('[data-testid=courses-form-submit]').click();
    cy.deleteNotification();
    cy.get('[data-testid=dropdown-section]').should('be.visible').click();
    cy.contains('Logout').click();

    //go to student profile and do lessons
    cy.goToStudentProfile();
    cy.get('[data-testid=student-impersonate-button]').click();
    cy.get('[data-testid=navigation-item-courses]').should('exist').should('be.visible').click();
    cy.get('[data-testid=toggle-filter-panel]').should('exist');
    cy.get('[data-testid="enroll-button"]').should('exist').eq(0).click();
    cy.get('[data-testid="enroll-in-course"]').should('exist').click();
    cy.get('[data-testid="close-modal"]').should('not.exist');
    cy.get('.course-skeleton__description-wrapper > :nth-child(1)').should('not.exist');
    cy.get('.course-header__button').should('exist').click();

    const stepsCount1 = Array.from(Array(4).keys());
    cy.wrap(stepsCount1).each(() => {
      cy.get('[data-testid=lesson-item-attachment]').should('exist');
      cy.get('#CheckInQuestion1 > .textarea > #Answer')
        .should('exist')
        .should('have.length', 1)
        .type('test text');
      cy.get('[data-testid="lesson-item-check-in-question"]')
        .contains('Save')
        .contains('Save')
        .should('exist')
        .click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.get('#CheckInQuestion2 > .textarea > #Answer').should('exist').type('test text');
      cy.get('#CheckInQuestion2 > [data-testid=button]').contains('Save').click();
      cy.get('.student-check-in-question__text').should('exist');
      cy.get('[data-testid="lesson-item-check-in-question"]').contains('Save').should('not.exist');
      cy.get('a > [data-testid=button]').click();
    });

    cy.get('.course-skeleton__description-wrapper > :nth-child(1)').should('not.exist');
    cy.get('[data-testid="course-lesson-card-button"]').eq(3).contains('Done');
    cy.get('.course-header__button').should('exist').click();
    // cy.get(':nth-child(1) > .lesson-survey__question-options > :nth-child(1)', {
    //   timeout: 15000,
    // }).click();s
    // cy.get(':nth-child(2) > .lesson-survey__question-options > :nth-child(1)').click();
    // cy.get('.lesson-survey__question-options').eq(2, 0).click();
    // cy.get('.lesson-survey__question-options').eq(3, 0).click();
    // cy.get('.lesson-survey__question-options').eq(4, 0).click();
    // cy.get('.lesson-survey__question-options').eq(5, 0).click();
    // cy.get('.dashboard-card > [data-testid=button]').click();
    // cy.contains('You completed the survey successfully').should('exist');
    // cy.deleteNotification();
    // cy.get('.course-complete__content-wrapper').should('exist');

    // // stop impersonate and grading
    // cy.get('[data-testid=stop-impersonating-button]').click();
    // cy.get('.user-student__current-courses-header__title').should('exist');
    // cy.get('.user-student__courses-activity-list__list-item-date-indicator').should('exist');

    // // check answers
    // cy.get('[data-testid=the-list] > :nth-child(1)')
    //   .find('[data-testid=dropdown-container]')
    //   .click();
    // cy.get('[data-testid=review-option]').click();
    // cy.get('[data-testid=grade-button-accept]').click();
    // cy.get('[data-testid="item-status"]').contains('Accepted').should('exist');
    // cy.get('[data-testid=modal-close-button]').click();
    // cy.get('[data-testid=the-list] > :nth-child(1)')
    //   .find(
    //     // eslint-disable-next-line max-len
    //     '.-for-review > .user-student__courses-activity-list__list-item-date > .user-student__courses-activity-list__list-item-date-indicator'
    //   )
    //   .should('not.exist');
    // // Wait for refetches (to prevent authorization error on refetches when fast impersonate click)
    // // eslint-disable-next-line cypress/no-unnecessary-waiting
    // cy.wait(3000);
    // cy.get('[data-testid=student-impersonate-button]').click();

    // //go to lesson and check status
    // cy.get('[data-testid=navigation-item-courses]').should('exist').click();
    // cy.get('.course-card__container').click();
    // cy.get('[data-testid=course-lesson-card-button]').first().click();
    // cy.get('[data-testid=item-status]').should('exist');
  });
});
