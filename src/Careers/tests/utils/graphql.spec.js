import { getFormErrors } from '@dc/utils/graphql';

describe('utils | graphql', () => {
  describe('getFormErrors', () => {
    it('transforms errors properly', () => {
      const errors = {
        graphQLErrors: [
          {
            extensions: {
              name: ['Empty not allowed'],
              description: ['Cant be blank'],
            },
          },
        ],
      };

      const expectedParsedErrors = {
        name: 'Empty not allowed',
        description: 'Cant be blank',
      };

      expect(getFormErrors(errors)).toEqual(expectedParsedErrors);
    });
  });
});
