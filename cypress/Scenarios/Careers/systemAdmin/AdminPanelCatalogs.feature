Feature: Catalogs in admin panel

    Scenario: Displaying catalogs
        Given the user is logged in as system admin
        When the user goes to admin panel
        And the user goes to catalogs section
        Then the catalogs are displayed

    Scenario: Showing catalog details
        Given list of catalogs are displayed
        When the user clicks button "show"
        Then the details are displayed

    Scenario: Editing catalogs
        Given list of catalogs are displayed
        When the user clicks button "edit"
        Then the catalog is editable

    Scenario: Archiving catalogs
        Given list of catalogs are displayed
        When the user clicks button "archive"
        Then the catalog is archived

    Scenario: Filtering archived/active catalogs
        Given list of catalogs is displayed
        When the user chooses "archive" or "active" in filtering
        Then the catalogs of choosen status are displayed

    Scenario: Filtering published/draft catalogs
        Given list of catalogs is displayed
        When the user chooses "draft" or "published" in filtering
        Then the catalogs of choosen status are displayed

    Scenario: Searching catalogs
        Given the list of catalogs is displayed
        When the user describe something in searchbar
        Then the list of searching catalogs is displayed

    Scenario: Adding tracks to catalog
        Given list of catalogs are displayed
        When the user clicks "edit" button
        And the user clicks plus button
        Then the track is added to catalog

    Scenario: Adding new catalog
        Given list of catalogs are displayed
        When the user clicks button "new"
        And the user fills in required fields
        And the user clicks button "save"
        Then the new catalog is added
