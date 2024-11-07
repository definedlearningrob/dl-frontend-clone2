Feature: Units in admin panel

    Scenario: Displaying units
        Given the user is logged in as system admin
        When the user goes to admin panel
        And the user goes to units section
        Then the units are displayed

    Scenario: Showing units details
        Given list of units is displayed
        When the user clicks button "show"
        Then the details are displayed

    Scenario: Editing units
        Given list of units is displayed
        When the user clicks button "edit"
        Then the unit is editable

    Scenario: Archiving units
        Given list of units is displayed
        When the user clicks button "archive"
        Then the unit is archived

    Scenario: Filtering archived/active units
        Given list of units is displayed
        When the user chooses "archive" or "active" in filtering
        Then the units of choosen status are displayed

    Scenario: Filtering published/draft units
        Given list of units is displayed
        When the user chooses "draft" or "published" in filtering
        Then the units of choosen status are displayed

    Scenario: Searching units
        Given the list of units is displayed
        When the user describe something in searchbar
        Then the list of searching units is displayed

    Scenario: Adding new units
        Given list of units is displayed
        When the user clicks button "new"
        And the user fills in required fields
        And the user clicks button "save"
        Then the new unit is added
