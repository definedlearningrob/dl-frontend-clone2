Feature: Check-ins in admin panel

  Scenario: Displaying check-ins
    Given the user is logged in as system admin
    When the user goes to admin panel
    And the user goes to check-ins
    Then the check-ins are displayed

  Scenario: Searching check-ins
    Given the list of check-ins is displayed
    When the user type something in searchbar
    Then the list of searching check-ins is displayed

  Scenario: Creating new check-in
    Given the list of check-ins is displayed
    When the user clicks "New" button
    And the user described all information
    And the user save changes
    Then the new check-in is created

  Scenario: Archiving check-ins
    Given the list of check-ins is displayed
    When the user clicks "Archive" button
    Then the check-in is archived

  Scenario: Editing check-ins
    Given the list of check-ins is displayed
    When the user clicks "Edit" button
    And the user changes something
    And the user saves changes
    Then the check-in is edited
