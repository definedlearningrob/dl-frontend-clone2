Feature: Plans groups in admin panel 

    Scenario: Displaying plan groups
        Given the user is logged in as system admin
        When the user goes to admin panel
        And the user goes to plan groups section
        Then the plan groups are displayed

    Scenario: Editing plan groups
        Given list of plan groups is displayed
        When the user clicks button "edit"
        Then the plan groups is editable 

    Scenario: Archiving plan groups
        Given list of plan groups is displayed
        When the user clicks button "archive"
        Then the plan groups is archived 

    Scenario: Searching archived/active plan groups
        Given list of plan groups is displayed
        When the user chooses "archive" or "active" in searching
        Then the plan groups of choosen status are displayed 

    Scenario: Adding statements to plan groups
        Given list of plan groups is displayed
        When the user clicks button "edit" 
        And the user clicks "add" button
        Then the statement is added to plan group

    Scenario: Adding new plan group
        Given list of plan groups is displayed
        When the user clicks button "new" 
        And the user fills in required fields
        And the user clicks button "save"
        Then the new plan groups is added