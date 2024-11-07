Feature: Courses in admin panel

    Scenario: Displaying courses
        Given the user is logged in as system admin
        When the user goes to admin panel
        Then the courses are displayed

    Scenario: Displaying lessons in course
        Given list of courses is displayed
        When the user clicks button "show"
        Then the lessons are displayed

    Scenario: Editing courses
        Given list of courses is displayed
        When the user clicks button "edit"
        Then the edit screen is displayed

    Scenario: Archiving course
        Given list of courses is displayed
        When the user clicks button "archive"
        Then the course is archived

    Scenario: Searching archived course
        Given list of courses is displayed
        When the user chooses "archive" in searching
        Then the archive courses are displayed

    Scenario: Searching active course
        Given list of courses is displayed
        When the user chooses "archive" in searching
        Then the active courses are displayed

    Scenario: Searching published course
        Given list of courses is displayed
        When the user chooses "published" in searching
        Then the published courses are displayed

    Scenario: Searching draft course
        Given list of courses is displayed
        When the user chooses "draft" in searching
        Then the draft courses are displayed

    Scenario: Adding new course
        Given list of courses is displayed
        And the user clicks button "new"
        Then the new course is added

    Scenario: Adding lesson to course
        Given list of courses is displayed
        When the user clicks button "edit"
        And the user goes to lessons section
        And the user clicks plus button
        Then the lesson is added to course

    Scenario: Changing status
        Given list of courses is displayed
        When the user clicks button "edit"
        And the user chooses status
        And the user clicks button "save"
        Then the course status is changed

    Scenario: Adding foundational status to course
        Given the course details are displayed
        When the user checks foundational status
        Then the course is sign as a foundational course

    Scenario: Adding alternative names
        Given the course details are displayed
        When the user describe alternative names
        Then the alternative names are added
