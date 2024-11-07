Feature: Sending messages

  Scenario: Creating conversation and sending first message
    Given the user is logged in
    And the user goes to message section
    When the user clicks button "Create conversation"
    And the user described all information
    Then the first message is sent

  Scenario: Sending new messages
    Given the user goes to messages in menu
    When the user clicks button with plus
    Then the user can send new message

  Scenario: Refreshing messages
    Given the user goes to messages in menu
    When the user clicks button with double arrow
    Then the messages are refreshed

  Scenario: Backing to inbox
    Given the user goes to messages
    And the user goes to conversation
    When the user clicks button "Back to inbox" on top of page
    Then the inbox is displayed

  Scenario: Replying to message
    Given the user goes to conversation
    When the user describes something
    And the user send message
    Then the user replyed on message

  Scenario: Displaying message history
    Given the user goes to conversation
    When the user clicks button "Back to inbox" on top of page
    And the user click button "Message History"
    Then The message history is displayed
