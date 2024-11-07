import { getByStringKey, isEqual } from '@dc/utils';

const john = {
  firstName: 'John',
  lastName: 'Doe',
  age: 50,
  eyeColor: 'blue',
};

const sara = {
  firstName: 'Sara',
  lastName: 'Doe',
  age: 18,
  eyeColor: 'red',
};

describe('utils', () => {
  describe('isEqual', () => {
    it('returns perform deep eqality of two objects correctly', () => {
      expect(isEqual(john, john)).toBeTruthy();
      expect(isEqual(john, sara)).toBeFalsy();
    });
  });

  describe('getByStringKey', () => {
    it('returns proper value based on passed string', () => {
      const testingObject = {
        person: {
          details: {
            address: {
              street: 'some street',
            },
          },
        },
      };

      expect(getByStringKey(testingObject, 'person')).toEqual({
        details: {
          address: {
            street: 'some street',
          },
        },
      });
      expect(getByStringKey(testingObject, 'person.details')).toEqual({
        address: {
          street: 'some street',
        },
      });
      expect(getByStringKey(testingObject, 'person.details.address')).toEqual({
        street: 'some street',
      });
      expect(getByStringKey(testingObject, 'person.details.address.street')).toEqual('some street');
      expect(getByStringKey(testingObject, 'person.details.address.street.morenest.more')).toEqual(
        undefined
      );
    });
  });
});
