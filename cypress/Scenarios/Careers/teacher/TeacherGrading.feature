Feature: Grading student courses

    Scenario: Sending messages with course context
        Given the user is logged in
        And the user goes to class
        And the user goes to student profile
        When the user goes to courses activity
        And the user goes to message button
        And the user describe all required textarea
        Then the message is send

    Scenario: Sending message with lesson context
        Given the user is in studen't portfolio
        And the user goes to courses activity
        When the user clicks more in lesson
        And the user chceck messasge button
        And the user describe all required textarea
        Then the message is send

    Scenario: Displaying status of lesson
        Given the user is in student's portfolio
        When the user goes to courses activity
        And the user clicks name of lesson
        Then the status of lesson is displaying

    Scenario: Reviewing student lessons
        Given the user is in courses activity
        When the user goes to lesson
        And the user clicks review button
        And the user clicks "reject or "accept" button
        Then the review is dones