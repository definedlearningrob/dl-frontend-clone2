Feature: Tracks in admin panel

    Scenario: Displaying tracks
        Given the user is logged in as system admin
        When the user goes to admin panel
        And the user goes to tracks section
        Then the tracks are displayed

    Scenario: Showing tracks details
        Given list of tracks is displayed
        When the user clicks button "edit"
        Then the tracks details are displayed

    Scenario: Editing tracks
        Given list of tracks is displayed
        When the user clicks button "edit"
        Then the track is editable

    Scenario: Archiving tracks
        Given list of tracks is displayed
        When the user clicks button "archive"
        Then the tracks is archived

    Scenario: Filtering archived/active tracks
        Given list of tracks is displayed
        When the user chooses "archive" or "active" in filtering
        Then the tracks of choosen status are displayed

    Scenario: Filtering published/draft tracks
        Given list of tracks is displayed
        When the user chooses "draft" or "published" in filtering
        Then the tracks of choosen status are displayed

    Scenario: Searching tracks
        Given the list of tracks is displayed
        When the user describe something in searchbar
        Then the list of searching tracks is displayed

    Scenario: Adding units to track
        Given list of tracks is displayed
        When the user clicks "edit" button
        And the user clicks plus button
        Then the unit is added to track

    Scenario: Adding new tracks
        Given list of tracks is displayed
        When the user clicks button "new"
        And the user fills in required fields
        And the user clicks button "save"
        Then the new track is added
