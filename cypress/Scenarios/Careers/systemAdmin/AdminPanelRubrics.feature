Feature: Rubrics in admin panel

  Scenario: Displaying list of rubrics
    Given the user is logged in as system admin
    When the user goes to admin panel
    And the user goes to rubrics
    Then the list of rubrics is displayed

  Scenario: Searching rubrics
    Given the list of rubrics is displayed
    When the user type something in searchbar
    Then the list of searching rubrics is displayed

  Scenario: Creating new rubric
    Given the list of rubrics is displayed
    When the user clicks "New" button
    And the user described all information
    And the user save changes
    Then the new rubric is created

  Scenario: Archiving rubrics
    Given the list of rubrics is displayed
    When the user clicks "Archive" button
    Then the rubric is archived

  Scenario: Editing rubrics
    Given the list of rubrics is displayed
    When the user clicks "Edit" button
    And the user changes something
    And the user saves changes
    Then the rubric is edited

  Scenario: Duplicating rubrics
    Given the list of rubrics is displayed
    When the user clicks "Duplicate" button
    Then the rubric is duplicated
    And the rubric is added to list of rubrics
