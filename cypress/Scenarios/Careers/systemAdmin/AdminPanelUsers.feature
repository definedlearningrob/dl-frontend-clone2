Feature: Users in admin panel

  Scenario: Displaying information about users
    Given the user is logged in as system admin
    When the user goes to admin panel
    And the user goes to "Users"
    Then the user informations are displayed

  Scenario: Searching by user
    Given the list of users is displayed
    When the user goes to searchbar on top of page
    And the user disribe name, surname
    Then searching users are displayed

  Scenario: Changing user's role
    Given the list of users is displayed
    When the user clicks "Show" button
    And the user changes a role
    And the user save changes
    Then the role of user is changed

  Scenario: Displaying user's email
    Given the list of users is displayed
    When the user clicks "Show" button
    Then the email is displayed on top of page
