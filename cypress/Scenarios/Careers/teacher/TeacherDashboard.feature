Feature: Teacher dashboard

  Scenario: Displaying classess
    Given the user is logged as a teacher 
    When the user goes to dashboard tab
    Then classess are displayed
    And number of students in classes are displayed
    And completed assessments in classes are displayed
    And completed courses in classes are displayed

  Scenario: Displaying label "needs review" 
    Given the user is logged as a teacher
    And the user does any action in any course
    When the user goes to dashboard tab
    Then the label "needs review" is displayed 

  Scenario: Displaying student latest activity 
    Given the user is logged as a teacher 
    When the user goes to dashboard tab
    Then latest activity of students is displayed 

  Scenario: Displaying top pathways enrolled
    Given the user is logged as a teacher 
    When the user goes to dashboard tab
    Then top pathways enrolled are displaying 

  Scenario: Displaying top career cluster enrolled 
    Given the user is logged as a teacher 
    When the user goes to dashboard tab
    Then top career cluster enrolled is displaying 

  Scenario: Displaying reports
    Given the user is logged as a teacher 
    When the user goes to dashboard tab
    Then reports are displaying with completed assessments, enrolled/completed courses and completed products/experiences

  Scenario: Going to latest activity
    Given the user is logged as a teacher
    When the user goes to dashboard and click on activity in latest activity
    Then going to activity

