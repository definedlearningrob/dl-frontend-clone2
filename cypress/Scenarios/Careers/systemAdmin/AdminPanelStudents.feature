Feature: Students in admin panel

  Scenario: Displaying information about students
    Given the user is logged in as a system admin
    And the user goes to admin panel
    When the user goes to "Students"
    Then the information abot students are displayed

  Scenario: Searching by student
    Given the list of students is displayed
    When the user type something in searchbar
    Then the searching students are displayed

  Scenario: Changing students settings
    Given the list of students is displayed
    When the user clicks "Show" button
    And the user changes a settings
    Then the settings are changed
