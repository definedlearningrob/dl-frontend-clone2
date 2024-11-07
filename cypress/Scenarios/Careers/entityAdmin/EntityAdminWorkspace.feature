Feature: Workspace in entity admin

  Scenario: Switching workspaces
    Given the user is logged as a entity admin 
    When the user clicks first button on menu 
    And the user chooses workspace 
    Then workspace is switched 

  Scenario: Displaying teacher workspace
    Given the user is logged as entity admin 
    When the user chooses workspace in menu
    Then the teacher workspace is displayed
    And the workspace is exactly the same like teacher dashboard

