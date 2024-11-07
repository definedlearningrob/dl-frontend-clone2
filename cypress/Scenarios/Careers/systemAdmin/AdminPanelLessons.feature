Feature: Lessons in admin panel

    Scenario: Displaying lessons
        Given the user is logged in as system admin
        When the user goes to admin panel
        And the user goes to lessons section
        Then the lessons are displayed

    Scenario: Showing lesson items in lesson
        Given lessons are displayed
        When the user clicks button "show"
        Then the lesson items are displayed

    Scenario: Editing lesson
        Given lessons are displayed
        When the user clicks button "edit"
        Then the lesson is editable

    Scenario: Archiving lesson
        Given lessons are displayed
        When the user clicks button "archive"
        Then the lesson is archived

    Scenario: Searching archived/active lesson
        Given list of lessons is displayed
        When the user chooses "archive" or "active" in searching
        Then the lessons of choosen status are displayed

    Scenario: Searching lessons for type
        Given list of lessons is displayed
        When the user chooses type in searching
        Then the lessons are displayed by type

    Scenario: Adding new lesson
        Given list of lessons is displayed
        When the user clicks button "new"
        And the user fills in required fields
        And the user clicks button "save"
        Then the new lesson is added

    Scenario: Adding items to lesson
        Given edit screen of lesson is displayed
        And some items exist
        When the user clicks plus button in lesson item section
        Then the item is added to lesson

    Scenario: Adding check-in questions and check-in questions groups to lesson
        Given the lesson details are displayed
        When the user goes to questions section
        And the user clicks plus buttons
        And the user clicks "Save" button
        Then the check-ins are added to lesson

    Scenario: Removing check-ins from lessons
        Given the lesson details are displayed
        When the user goes to questions section
        And the user clicks minus button
        And the user save changes
        Then the check-ins are removed from lesson
