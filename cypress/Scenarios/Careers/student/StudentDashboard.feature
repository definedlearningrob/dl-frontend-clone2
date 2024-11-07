Feature: Student dashboard

  Scenario: Logging in for the first time when onboarding option is enabled
    Given Onboarding option is enabled for the user's entity
    When the user logs in for the first time as a student
    Then the assessment screen is displayed

  Scenario: Logging in for the first time when assessment option is enabled
    Given Assessment option is enabled for the user's entity
    When the dashboard is displayed
    And the user clicks on the start button in assessment section
    Then the assessment screen is displayed

  Scenario: Completing an assessment
    Given Assessment screen is displayed
    When the user completes the assessment
    Then the assessment results are displayed
    And the user can choose the pathway

  Scenario: Taking the assessment again
    Given the user has completed the assessment
    When the user takes the assessment again
    Then the user may changes the assessment results and pathway

  Scenario: Displaying final report
    Given the user is logging
    When the user goes to "final report" in menu
    Then final report is displaying
    And assessment results are displaying
    And careers experienced is displaying
    And recommended careers are displaying

  Scenario: Viewing assessment roccomendations
    Given the user has completed the assessment
    When the user goes to "assessment" section in dashboard
    And the user clicks button "View your assessment recommendations"
    Then the assessment result is displaying

  Scenario: Displaying courses on the dashboard
    Given the user has completed the assessment
    And the user has choosen the pathway
    When the dashboard is displayed
    Then the user can see courses

  Scenario: Displaying overall progress
    Given the user has completed assessment
    When the dashboard is displayed
    Then overall progress is displayed

  Scenario: Displaying portfolio
    Given the dashboard is displayed
    When the user goes to "Portfolio" section
    And the user clicks "Start Creating" button
    Then the portfolio is displayed
