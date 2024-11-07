Feature: Contracts in admin panel

    Scenario: Displaying contracts
        Given the user is logged in as system admin
        When the user goes to admin panel
        And the user goes to contracts
        Then the contracts are displayed

    Scenario: Syncing one contract
        Given contracts are displayed
        When the user clicks button "sync"
        Then the one contract is synced
        And data such as classes, students, teachers, entities is synced with the servers

    Scenario: Syncing all contracts
        Given contracts are displayed
        When the user clicks button "sync all contracts"
        Then the contracts are synced
        And data such as classes, students, teachers, entities is synced with the servers

    Scenario: Turn off and turn on syncability
        Given contracts are displayed
        When the user clicks switch slider
        Then the sync is turned off or turned on

    Scenario: Searching contracts
        Given the list of contracts is displayed
        When the user type something in searchbar
        Then the list of searching contracts is displayed

    Scenario: Displaying all, careers, pbl contracts
        Given the list of contracts is displayeed
        When the user chooses type of contracts on top of page
        Then the list of contracts is displayed
