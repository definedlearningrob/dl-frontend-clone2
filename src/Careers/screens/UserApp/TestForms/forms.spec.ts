import { parseBase64ForUpload } from './forms';

const examplePDFBase64WithName = 'data:application/pdf;name=test.pdf;base64,SGVsbG8sIFdvcmxkIQ==';

describe('parseBase64ForUpload', () => {
  it('should return filename and response separetely', () => {
    expect(parseBase64ForUpload(examplePDFBase64WithName)).toEqual({
      filename: 'test.pdf',
      response: 'SGVsbG8sIFdvcmxkIQ==',
    });
  });
});
