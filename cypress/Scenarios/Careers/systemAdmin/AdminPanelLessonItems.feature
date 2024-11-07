Feature: Lesson items in admin panel

    Scenario: Displaying lesson items
        Given the user is logged in as system admin
        When the user goes to admin panel
        And the user goes to lessons items section
        Then the lessons items are displayed

    Scenario: Showing lesson items details
        Given the lesson items are displayed
        When the user clicks button "show"
        Then the lesson items details are displayed

    Scenario: Editing lesson items
        Given the lesson items are displayed
        When the user clicks button "edit"
        Then the lesson item is editable

    Scenario: Archiving lesson items
        Given the lesson items are displayed
        When the user clicks button "archived"
        Then the lesson item is archived

    Scenario: Searching archived/active lesson items
        Given list of lesson items is displayed
        When the user chooses "archive" or "active" in searching
        Then the lesson items of choosen status are displayed

    Scenario: Searching lessons items for description
        Given list of lesson items is displayed
        When the user chooses description
        Then the lessons items with descryption are displayed

    Scenario: Adding new lesson item
        Given list of lesson items is displayed
        When the user clicks button "new"
        And the user fills in required fields
        And the user clicks button "save"
        Then the new lesson item is added

    Scenario: Adding rubrics to lesson items
        Given the details of lesson items are displayed
        When the user goes to rubris section
        And the user clicks plus button
        And the user save changes
        Then the rubrics are added to lesson items

    Scenario: Removing rubrics from lesson items
        Given the lesson item details are displayed
        When the user goes to rubrics section
        And the user clicks minus button
        And the user save changes
        Then the rubric is removed from lesson item
