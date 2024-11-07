Feature: Products in admin panel

  Scenario: Displaying products
    Given the user is logged in as system admin
    When the user goes to admin panel
    And the user goes to products section
    Then the tasks are displayed

  Scenario: Showing products details
    Given list of products is displayed
    When the user clicks button "show"
    Then the details are displayed

  Scenario: Editing products
    Given list of products is displayed
    When the user clicks button "edit"
    Then the unit is editable

  Scenario: Archiving products
    Given list of products is displayed
    When the user clicks button "archive"
    Then the unit is archived

  Scenario: Filtering archived/active products
    Given list of products is displayed
    When the user chooses "archive" or "active" in filtering
    Then the products of choosen status are displayed

  Scenario: Filtering published/draft products
    Given list of products is displayed
    When the user chooses "draft" or "published" in filtering
    Then the products of choosen status are displayed

  Scenario: Searching products
    Given the list of products is displayed
    When the user describe something in searchbar
    Then the list of searching products is displayed

  Scenario: Adding new products
    Given list of products is displayed
    When the user clicks button "new"
    And the user fills in required fields
    And the user clicks button "save"
    Then the new product is added
