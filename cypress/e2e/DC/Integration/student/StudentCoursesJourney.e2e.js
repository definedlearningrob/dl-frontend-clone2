import '@percy/cypress';

// prepare BE with student that has assessment disabled
describe.skip('snapshots | StudentCoursesJourney', () => {
  it('should login after correct BE response and go to courses page', () => {
    cy.app('clean_and_seed');
    cy.percySnapshot('studentLogin');
    cy.visit('sign-in/courses');

    //login
    cy.studentLogin();
    cy.percySnapshot('studentDashboard');

    //enroll to course
    cy.get('[data-testid=navigation-item-courses]').click();
    cy.get('.recommended-card-skeleton').should('exist');
    cy.percySnapshot('studentCourses');
    cy.get('.recommended-card-skeleton').should('not.exist');
    cy.percySnapshot('studentCoursesList');
    cy.findAllByRole('button', { name: 'Enroll in Course' }).eq(0).click();
    cy.findByRole('button', { name: 'Enroll in Course' }).eq(0).click();

    //go to courses
    cy.findByRole('link', { name: 'Courses' }).click();
    cy.get('.student-courses-current__list').first().click();
    cy.get('[data-testid="course-lesson-card-title"]').contains('Test Course').should('exist');
    cy.percySnapshot('studentLessons');

    //filtering courses
    cy.get('[data-testid=navigation-item-courses]').click();
    cy.get('[data-testid=toggle-filter-panel]').click();
    cy.get('[data-testid=expand-cluster] > [data-testid=icon] > svg').click();
    cy.get('[data-testid=check-pathway]').first().should('exist');
    cy.percySnapshot('studentCourseFilters');
  });
});
