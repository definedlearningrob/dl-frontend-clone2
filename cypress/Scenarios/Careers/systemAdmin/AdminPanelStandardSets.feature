Feature: Standard sets in admin panel

  Scenario: Displaying standard Sets
    Given the user is logged in as system admin
    When the user goes to admin panel
    And the user goes to standard Sets section
    Then the standard Sets are displayed

  Scenario: Editing standard Sets
    Given list of standard Sets is displayed
    When the user clicks button "edit"
    Then the standard Sets is editable

  Scenario: Displaying standard set details
    Given the list of standards is displayed
    When the user clicks "Show" button
    Then the details are displayed

  Scenario: Synchronizing standards
    Given the list of standards is displayed
    When the user clicks "Synchronize standards" button
    Then the standards are synchronized
