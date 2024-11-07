Feature: Courses in teacher account

    Scenario: Searching courses
        Given the user is logged as a teacher
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

    Scenario: Reset filters in courses section
        Given the user chooses filters
        When the user goes to filters
        And the user clicks button "reset filters"
        Then the list of filtering course is reset

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

    Scenario: Unassigning class
        Given list of courses is displayed
        When the user clicks button "unassign to class"
        And the user chooses a class
        Then the course is unassign to class