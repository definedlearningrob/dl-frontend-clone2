Feature: Logging into the application

  Scenario: Log in with valid credentials
    Given Log in page is displayed
    When user logs in using valid credentials
    Then user is logged in as a student

  Scenario: Log in with invalid credentials
    Given Log in page is displayed
    When user logs in using invalid credentials
    Then user isn't logged in as a student
    And warning about invalid credentials is displayed

