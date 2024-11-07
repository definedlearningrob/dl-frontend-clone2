import { getFilename } from './FileWidget';

const examplePDFBase64WithName = 'data:application/pdf;name=test.pdf;base64,SGVsbG8sIFdvcmxkIQ==';
const examplePDFBase64WithoutName = 'data:application/pdf;base64,SGVsbG8sIFdvcmxkIQ==';
// const examplePDFBase64WithName = 'data:application/pdf;name=test.pdf;base64,SGVsbG8sIFdvcmxkIQ==';

describe('FileWidget Forms', () => {
  it('getFilename should return filename if correctly provided base64', () => {
    expect(getFilename(examplePDFBase64WithName)).toEqual('test.pdf');
  });
  it('getFilename should return placeholder if name is not provided', () => {
    expect(getFilename(examplePDFBase64WithoutName)).toEqual('Unknown.pdf');
    expect(getFilename(examplePDFBase64WithoutName)).toEqual('Unknown.pdf');
  });
});
