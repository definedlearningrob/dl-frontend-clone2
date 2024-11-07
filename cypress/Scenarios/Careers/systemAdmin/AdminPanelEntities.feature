Feature: Entities in admin panel

    Scenario: Displaying names of parent entities
        Given the user is logged in as system admin
        When the user goes to admin panel
        And the user goes to entities
        Then the parent entities are displayed

    Scenario: Displaying children entities
        Given the parent entities are displayed
        When the user opens entity
        Then the children entities are displayed

    Scenario: Assigning plans to entities
        Given list of entities is displayed
        When the user clicks button "settings"
        And the user clicks button "assign" in plans section
        And the user chooses plan
        And the user clicks button "assign"
        Then the plan is assign to entity

    Scenario: Assigning plans to children entities
        Given entity is opened
        When the user clicks button "assign" in plans section
        And the user chooses plan
        And the user clicks "Assign to children entities"
        And the user clicks button "assign"
        Then the plan is assigned to children entities

    Scenario: Assigning catalogs to entities
        Given entity is opened
        When the user clicks button "assign" in catalogs section
        And the user chooses catalog
        And the user clicks button "assign"
        Then the catalog is assign to entity

    Scenario: Assigning catalogs to children entity
        Given entity is opened
        When the user clicks button "assign" in catalogs section
        And the user chooses catalog
        And the user clicks "Assign to children entities"
        And the user clicks button "assign"
        Then the catalog is assigned to children entities

    Scenario: Assigning standards sets to entity
        Given entity is opened
        When the user clicks button "assign" in standards sets section
        And the user chooses standard set
        And the user clicks button "assign"
        Then the standard set is assigned to children entities

    Scenario: Assigning standards sets to children entity
        Given entity is opened
        When the user clicks button "assign" in standards sets section
        And the user chooses standard set
        And the user clicks "Assign to children entities"
        And the user clicks button "assign"
        Then the standard set is assigned to children entities

    Scenario: Changing assessment, onboarding, foundational and self-evaluation settings
        Given entity is opened
        When the user goes to "settings" section
        And the user changes settings
        Then the settings are changed
