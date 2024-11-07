Feature: Dashboard Entity Admin

    Scenario: Displaying entities details
        Given the user is logged an entity admin
        When the user goes to dashboard
        Then names of entities are displayed
        And number of teachers, classes, students in entity are displayed

    Scenario: Displaying users in parent entity
        Given dashboard is displayed
        When the user goes to users view
        Then names of users are displayed
        And role of user is displayed
        And user's entity is displayed
        And actions are displayed

    Scenario: Displaying users in children entity
        Given parent entity details are displayed
        When the user clicks name children entity
        And the user goes to user section
        Then users in children entity are displayed

    Scenario: Searching by entity
        Given dashboard is displayed
        And the user goes to searching
        When the user types name of entity
        Then list of entities is displayed

    Scenario: Searching by users
        Given users details are displayed
        And the user goes to searching
        When the user types name of user
        Then list of users is displayed

    Scenario: Displaying parent entity details
        Given dashboard is displayed
        When the user goes to section with parent entity name
        Then parent entity details are displayed
        And number of entities, teachers, classes, students are displayed
        And status of assessment, onboarding are displayed
        And added plans and catalogs are displayed

    Scenario: Dispalying children entity details
        Given parent entity details are displayed
        When the user clicks in name children entity
        And the user goes to entity details section
        Then children entity details are displayed
        And number of entities, teachers, classes, students are displayed
        And status of assessment and onboarding is displayed
        And added plans and catalogs to entity are displayed

    Scenario: Displaying my reports
        Given dashboard is displayed
        When the user goes to section with reports
        Then the reports are displayed
        And number of completed assessment, courses and submitted assignments are displayed

    Scenario: Displaying top pathways enrolled
        Given dashboard is displayed
        When the user goes to "top pathways enrolled" section
        Then top pathways enrolled are displayed

    Scenario: Displaying top career cluster enrolled
        Given dashboard is displayed
        When the user goes to "top caree cluster enrolled" section
        Then top career cluster enrolled is displayed

    Scenario: Generate reports
        Given the user is in entity details
        And the user goes to "Entity Reports" section
        And the user clicks "Generate Report" button
        When the user chooses course or plan
        And the user clicks "Generate" button
        Then the report is generated
