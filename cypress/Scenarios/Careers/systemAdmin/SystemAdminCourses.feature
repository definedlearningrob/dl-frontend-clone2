Feature: Courses in system admin account

    Scenario: Searching courses
        Given the user is logged as a entity admin
        When the user goes to "courses"
        And the user goes to searching
        And the user types name of course
        Then the list of course is displayed

    Scenario: Filtering courses
        Given list of courses is displayed
        When the user clicks button "filters"
        And the user chooses filters
        And the user clicks button "apply"
        Then list of filtering course is displayed

    Scenario: Displaying courses details
        Given list of courses is displayed
        When the user clicks "go to course"
        Then courses details are displayed

    Scenario: Displaying lesson details in courses
        Given course details are displayed
        When the user clicks button "show"
        Then the lesson details are displayed

    Scenario: Assigning to class
        Given list of courses is displayed
        When the user clicks button "assign to class"
        And the user chooses a class
        Then the course is assign to class

    Scenario: Unassigning to class
        Given list of courses is displayed
        When the user clicks button "unassign to class"
        And the user chooses a class
        Then the course is unassign to class

    Scenario: Grading by course
        Given the list of courses is displayed
        And the user clicks "Grading" button
        And the user chooses class
        And the user chooses a student
        When the user clicks "Grading" button
        And the user choose grade
        Then the lesson in course is graded
