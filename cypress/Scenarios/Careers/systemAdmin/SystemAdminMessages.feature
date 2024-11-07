Feature: Messages in entity admin 

  Scenario: Sending new messages 
    Given the user goes to messages in menu
    When the user clicks button with plus
    Then the user can sending new message 

  Scenario: Refreshing messages
    Given the user goes to messages in menu 
    When the user clicks button with double arrow
    Then the messages are refreshing 