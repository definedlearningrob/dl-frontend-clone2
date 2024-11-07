Feature: Notifications and annoucements

  Scenario: Displaying notifications
    Given the user is logged in as a student
    When the teacher or admin sends message to student
    Then the user sees notifications

  Scenario: Displaying announcements
    Given the user is logged in as a student
    When the teacher or admin sends annoucements to that class
    Then the user sees annoucements
    And the user is in some class

  Scenario: Getting messages
    Given the user goes to messages tab
    When the teacher or admin sends messages to student
    Then the user sees messages

  Scenario: Sending messages with context
    Given the user goes to course
    When the user clicks button ask for guidance
    Then the user sends messages with context of that course

  Scenario: Sending new messages
    Given the user goes to messages in menu
    When the user clicks button with plus
    Then the user can sending new message

  Scenario: Refreshing messages
    Given the user goes to messages in menu
    When the user clicks button with double arrow
    Then the messages are refreshing
