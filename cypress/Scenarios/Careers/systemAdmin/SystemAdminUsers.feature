Feature: Users in system admin

    Scenario: Displaying users
        Given the user is logged as system admin
        When the user goes to "users" section
        Then list of users is displayed
        And user's role is displayed
        And user's entity is displayed
        And actions are displayed

    Scenario: Searching users
        Given list of users is displayed
        When the user goes to searching 
        And the user types name or surname 
        Then searching users are displayed

    Scenario: Going to user's entity
        Given list of users is displayed
        When the user goes to entities section
        And the user clicks in entity name
        Then the user's entity is displayed

    Scenario: Going to class
        Given list of users is displayed
        When the user goes to "action" section 
        And the user clicks in action
        Then the same class like in teacher dashboard is displayed