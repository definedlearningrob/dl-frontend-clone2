Feature: Plans in admin panel 

    Scenario: Displaying plans
        Given the user is logged in as system admin
        When the user goes to admin panel
        And the user goes to plans section
        Then the plans are displayed

    Scenario: Editing plans
        Given list of plans is displayed
        When the user clicks button "edit"
        Then the plan is editable

    Scenario: Archiving plans
        Given list of plans is displayed
        When the user clicks button "archive"
        Then the plan is archived 

    Scenario: Searching archived/active plans
        Given list of plans is displayed
        When the user chooses "archive" or "active" in searching
        Then the plans of choosen status are displayed 

    Scenario: Adding plan groups to plans 
        Given list of plans is displayed
        And some plan groups exist 
        When the user clicks button "edit" 
        And the user clicks plus button
        Then the plan groups is added to plan

    Scenario: Adding new plan 
        Given list of plans is displayed
        When the user clicks button "new" 
        And the user fills in required fields
        And the user clicks button "save"
        Then the new plan is added