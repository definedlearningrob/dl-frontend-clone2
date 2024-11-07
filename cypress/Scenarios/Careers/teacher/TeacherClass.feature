Feature: Teacher class

  Scenario: Displaying classes
    Given the user is in dashboard tab
    When the user goes to class
    Then students are displayed 

  Scenario: Displaying student information 
    Given list of class is displaying
    When assessments status is displaying 
    Then course progress is displaying 
    And label "needs review" is displaying 

  Scenario: Sending messagess to student 
    Given list of class is displaying
    When the user clicks button 
    Then the user can send messages to student 

  Scenario: Searching students
    Given the user is in dashboard tab 
    When the user goes to class
    Then the user can search for student 

  Scenario: Makeing announcements
    Given list of class is displaying
    When the user click button "make announcements"
    Then the user can send message to all class

