Feature: Student's portfolio

  Scenario: Displayed plans
    Given the user is logged in
    And the user goes to portfolio
    When the user choosees plan on top of page
    Then the plan is displayed

  Scenario: Self-evaluate as a student
    Given the "Portfolio" page is displayed
    And the user chooses a plan
    When the user clicks some grade
    Then Student is evaluated

  Scenario: Add new coments and displayed activity history
    Given plan is displayed
    When the user clicks "Ativity History"
    Then history is displayed and the user can add new comment.

  Scenario: Displayed a portfolio projects
    Given the "Portfolio" page is Displayed
    When the user chooses a "Project Showcase"
    And the user chooses a "Portfolio Projects"
    Then the portfolio projects are displayed

  Scenario: Displayed personal projects
    Given the "Projet Showcase" page is displayed
    When the user clicks "Personal Projects"
    Then the personal projects are displayed

  Scenario: Created new projet
    Given the "Persobnal projects" page is displayed
    When the user clicks "Create project" button
    And the user uploads file
    And the user adds project name
    And the user clicks "Create" button
    Then the new portfolio is created

  Scenario: Added resume to profile
    Given the "Portfolio" page is displayed
    When the user goes to "Resume" section
    And the user clicks upload button
    And the user adds file
    And the user click save button
    Then the resume is added

