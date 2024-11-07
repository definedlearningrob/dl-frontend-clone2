import { getLabel } from '@dc/screens/UserApp/TestForms/JsonFormWidgets';

describe('getLabel', () => {
  it('should return the label without an asterisk when required is false', () => {
    const label = 'First Name';
    const required = false;
    const expectedOutput = 'First Name';
    expect(getLabel(label, required)).toEqual(expectedOutput);
  });

  it('should return the label with an asterisk when required is true', () => {
    const label = 'Last Name';
    const required = true;
    const expectedOutput = 'Last Name*';
    expect(getLabel(label, required)).toEqual(expectedOutput);
  });

  it('should return an empty string when label is an empty string', () => {
    const label = '';
    const required = false;
    const expectedOutput = '';
    expect(getLabel(label, required)).toEqual(expectedOutput);
  });
});
