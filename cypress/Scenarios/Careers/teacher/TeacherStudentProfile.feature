Feature: Student view

  Scenario: Displaying student information 
    Given the user is in dashboard tab
    When the user goes to class
    And the user goes to student view
    Then student's enrolled courses are displayed
    And Courses Activity is displayed 

  Scenario: Displaying portfolio 
    Given the user goes to class
    When the user goes to student view
    And the user click button "View Portfolio"
    Then portfolio is displaying 

  Scenario: Sending messagess to student 
    Given the user is in dashboard tab 
    When the user goes to class
    And the user goes to student view
    And the user clicks button "Send message"
    Then the user can send message to student 

  Scenario: Displaying all messages
    Given the user is in dashboard tab 
    When the user goes to class
    And the user goes to student view
    And the user clicks button "Message history"
    Then all messages are displaying  

  Scenario: Displaying assessment result
    Given the user is in dashboard tab 
    When the user goes to class
    And the user goes to student view
    And the user clicks button "Assessment result"
    Then assessment result is displaying 
    
  Scenario: Displaying final report
    Given the user is in dashboard tab 
    When the user goes to class
    And the user goes to student view
    And the user clicks button "Final Report"
    Then final report is displaying 

  Scenario: Displaying student's enrolled courses
    Given the user is in dashboard tab 
    When the user goes to class
    And the user goes to student view
    Then student's enrolled courses are displaying

  Scenario: Deleting course
    Given the user is in dashboard tab
    When the user goes to class
    And the user goes to student view
    And the user clicks button "unenroll student from course"
    Then student is unenrolled from course

  Scenario: Checking course
    Given the user is in dashboard tab
    When the user goes to class
    And the user goes to student view
    And the user goes to "courses activity"
    And the user clicks in course
    Then the user can review lesson in course 
    And the user can change status "reject" or "accept"

  Scenario: Sending messages with context
    Given courses activity is displaying
    When the user goes to course
    Then the user can send messagess to student with context, course's name
