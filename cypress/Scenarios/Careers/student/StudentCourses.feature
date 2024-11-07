Feature: Student courses

  Scenario: Displaying recommended and matched courses
    Given the user completed assessment and chose pathway
    When the user opens courses tab
    Then the user sees recommended and matched courses

  Scenario: Enrolling to courses
    Given the user is logged in as a student
    When the user opens courses tab
    Then the user can search and enroll to courses

  Scenario: Unenrolling courses
    Given the user is logged in as a student
    When the user goes to course that is already enrolled
    Then the user can click the button and unenroll courses

  Scenario: Creating portfolio
    Given the user is logged in as a student
    When the course is finished
    Then attachments and projects are added to portfolio

  Scenario: Displaying courses progress
    Given the user is logged in as a student
    When the user opens courses tab
    Then the user can see courses progress

  Scenario: Searching courses
    Given the user is logged in as a student
    When the user goes to courses in menu
    Then the user can searching courses in all courses

  Scenario: Filtering courses
    Given the user is logged in as a student
    When the user goes to courses in menu
    Then the user can filtering courses

  Scenario: Displaying course content
    Given list of courses is displayed
    When the user goes to lesson in course
    Then the course content is displaying


