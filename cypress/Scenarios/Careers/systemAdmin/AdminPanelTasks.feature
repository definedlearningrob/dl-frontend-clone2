Feature: Tasks in admin panel

  Scenario: Displaying tasks
    Given the user is logged in as system admin
    When the user goes to admin panel
    And the user goes to tasks section
    Then the tasks are displayed

  Scenario: Showing tasks details
    Given list of tasks is displayed
    When the user clicks button "show"
    Then the details are displayed

  Scenario: Editing tasks
    Given list of tasks is displayed
    When the user clicks button "edit"
    Then the unit is editable

  Scenario: Archiving tasks
    Given list of tasks is displayed
    When the user clicks button "archive"
    Then the unit is archived

  Scenario: Filtering archived/active tasks
    Given list of tasks is displayed
    When the user chooses "archive" or "active" in filtering
    Then the tasks of choosen status are displayed

  Scenario: Filtering published/draft tasks
    Given list of tasks is displayed
    When the user chooses "draft" or "published" in filtering
    Then the tasks of choosen status are displayed

  Scenario: Searching tasks
    Given the list of tasks is displayed
    When the user describe something in searchbar
    Then the list of searching tasks is displayed

  Scenario: Adding new tasks
    Given list of tasks is displayed
    When the user clicks button "new"
    And the user fills in required fields
    And the user clicks button "save"
    Then the new task is added

  Scenario: Adding check-in questions and check-in questions groups to tasks
    Given the tasks details are displayed
    When the user goes to questions section
    And the user clicks plus buttons
    And the user clicks "Save" button
    Then the check-ins are added to tasks

  Scenario: Removing check-ins from taskss
    Given the tasks details are displayed
    When the user goes to questions section
    And the user clicks minus button
    And the user save changes
    Then the check-ins are removed from tasks
