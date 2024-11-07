import '@percy/cypress';

import { adminUserInfo } from '@dc/mocks/adminUserInfo';

import { mockResponse } from '../../../../utils/graphql-test-utils';

describe('snapshots | AdminPanelProducts', () => {
  it('should go to admin panel', () => {
    cy.intercept('POST', 'api/users/graphql', (req) => {
      mockResponse(req, 'UserInfo', {
        data: adminUserInfo,
      });

      mockResponse(req, 'Products', {
        data: {
          products: {
            nodes: [
              {
                archivedAt: false,
                description: '',
                displayName: 'First Product',
                id: '1',
                name: 'First',
                rubricsUrl: '',
                status: 'PUBLISHED',
              },
            ],
            nodesCount: 1,
            pagesCount: 1,
          },
        },
      });

      mockResponse(req, 'Product', {
        data: {
          product: {
            archivedAt: null,
            description: 'Sample desc',
            displayName: 'First Product',
            id: '1',
            name: 'First',
            rubrics: [
              {
                id: '1',
                name: '#1 rubric',
                description: 'Sample',
                __typename: 'Rubric',
              },
            ],
            rubricsUrl: 'test url',
            status: 'PUBLISHED',
            __typename: 'Product',
          },
        },
      });

      mockResponse(req, 'Rubrics', {
        data: {
          rubrics: {
            nodesCount: 1,
            pagesCount: 1,
            nodes: [
              {
                archivedAt: false,
                description: '',
                displayName: '#1 rubrics',
                id: '1',
                name: 'rubric',
              },
            ],
          },
        },
      });

      mockResponse(req, 'ProductTasks', {
        data: {
          product: {
            id: '1',
            tasks: [
              {
                id: '1',
                name: 'task',
              },
            ],
          },
        },
      });
    });

    cy.adminLogin();
    cy.visit('/admin/products');
    cy.findAllByTestId('button').eq(0).should('exist');
    cy.percySnapshot('AdminPanelProducts');

    //view detials
    cy.findByRole('button', { name: 'Show' }).eq(0).click();
    cy.findByTestId('modal-heading').should('exist');
    cy.percySnapshot('ProductsDetails');

    //go to edit page
    cy.findByRole('button', { name: 'Close' }).click();
    cy.findAllByTestId('button').eq(1).click();
    cy.findByTestId('affected-resources').should('exist');
    cy.percySnapshot('ProductEditView');
    cy.findAllByTestId('button').eq(1).click();
    cy.findByTestId('admin-list-new-button').click();

    //new product
    cy.contains('Status').should('exist');
    cy.percySnapshot('CreateNewProduct');
    cy.findAllByTestId('button').eq(1).click();
  });
});
