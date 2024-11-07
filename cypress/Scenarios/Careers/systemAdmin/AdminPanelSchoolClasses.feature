Feature: School classes in admin panel

  Scenario: Displaying information about school classes
    Given the user is logged in as a system admin
    And the user goes to admin panel
    When the user goes to "School Classes"
    Then the information abot classes are displayed

  Scenario: Change type of displaying classes
    Given the list of school clases is displayed
    When the user  change type on top of page from "Demo" to "Non Demo"
    Then the type is changed

  Scenario: Searching by entity or class
    Given the list of school classes is displayed
    When the user type something in searchbar
    Then the searching classes are displayed

  Scenario: Changing class settings
    Given the list of school classes is displayed
    When the user clicks "Show" button
    And the user changes a settings
    Then the settings are changed
