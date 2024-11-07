import { removeTags } from '@shared/utils/removeTags';

describe('utils | removeTags', () => {
  it('remove all the tags from passed string', () => {
    const mockedBody = '<div>Test&nbsp;<span>removeTags</span> method</div>';

    expect(removeTags(mockedBody)).toEqual('Test removeTags method');
  });
});
