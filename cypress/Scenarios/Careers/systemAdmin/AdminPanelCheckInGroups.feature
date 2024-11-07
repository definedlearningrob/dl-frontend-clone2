Feature: Check-in groups in admin panel

  Scenario: Displaying check-in groups
    Given the user is logged in as system admin
    When the user goes to admin panel
    And the user goes to check-in groups
    Then the check-in groups are displayed

  Scenario: Searching check-in groups
    Given the list of check-in groups is displayed
    When the user type something in searchbar
    Then the list of searching check-in groups is displayed

  Scenario: Creating new check-in groups
    Given the list of check-in groups is displayed
    When the user clicks "New" button
    And the user described all information
    And the user save changes
    Then the new check-in groups is created

  Scenario: Archiving check-in groups
    Given the list of check-in groups is displayed
    When the user clicks "Archive" button
    Then the check-in groups is archived

  Scenario: Editing check-in groups
    Given the list of check-in groups is displayed
    When the user clicks "Edit" button
    And the user changes something
    And the user saves changes
    Then the check-in groups is edited

  Scenario: Showing details
    Given the list of check-in groups is displayed
    When the user clicks "Show" button
    Then details are displayed
