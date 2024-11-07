import '@percy/cypress';
describe('snapshots | TeacherCourses', () => {
  it('should go to courses, assign and unassign students to course, go to grading ', () => {
    cy.teacherLogin();
    cy.visit('/courses');
    cy.percySnapshot('TeacherCourses');
    cy.findAllByRole('button', { name: 'Go to Course' }).eq(0).click();
    cy.percySnapshot('teacherLesson');

    //assign to class
    cy.findAllByTestId('button').eq(1).click();
    cy.findByTestId('assign-modal-button').should('exist');
    cy.percySnapshot('teacherAssignToClass');
    cy.findByRole('button', { name: 'Modal close' }).click();

    //unassign class
    cy.findAllByTestId('button').eq(2).click();
    cy.findByTestId('assign-modal-button').should('exist');
    cy.percySnapshot('teacherUnassingClass');
    cy.findByRole('button', { name: 'Modal close' }).click();
  });
});
