Feature: Entity in system admin's dashboard

    Scenario: Displaying list of parent entities
        Given the user is logged as system admin
        When the user goes to dashboard
        Then list of parent entities is displayed
        And number of children entities, teachers, classes, students are displayed

    Scenario: Searching parent entity
        Given list of entities is displayed
        When the user goes to searching bar
        And the user types something
        Then Searching records are displayed

    Scenario: Displaying parent entity details
        Given list of entities is displayed
        When the user clicks in name's entity
        Then parent entity details are displayed
        And reports, top pathways enrolled, top career cluster enrolled are displayed
        And list of children entities are displayed

    Scenario: Displaying children entity details
        Given list of entities is displayed
        When the user clicks in name's entity
        Then children entity details are displayed

    Scenario: Displaying list of users in children entity
        Given parent entity details are displayed
        When the user click button "users"
        Then the list of users is displayed
        And the role, parent entitity, actions are displayed

    Scenario: Changing assessment, onboarding, foundational, self-evaluation settings
        Given settings are displayed
        When the user changes clicks assessment, onboarding, self-evaluation, foundational settings
        Then the settings are changed

    Scenario: Searching users
        Given entity details are displayed
        And the user clicks button "users"
        When the user types something in searching bar
        Then records are displayed

    Scenario: Searching children entity
        Given entity details are displayed
        When the user types something in searching bar
        Then records are displayed

    Scenario: Generate reports
        Given the user is in entity details
        And the user goes to "Entity Reports" section
        And the user clicks "Generate Report" button
        When the user chooses course or plan
        And the user clicks "Generate" button
        Then the report is generated
