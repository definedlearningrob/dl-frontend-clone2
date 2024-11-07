import camelize from '@shared/utils/camelize';

describe('utils | camelize', () => {
  it('camelizes properly', () => {
    expect(camelize('THIS_IS_SOME_TEXT')).toEqual('thisIsSomeText');
    expect(camelize('THISISSOMETEXT')).toEqual('thisissometext');
    expect(camelize('THIS IS SOME TEXT')).toEqual('thisIsSomeText');
    expect(camelize('ThisIsSomeText')).toEqual('thisissometext');
  });
});
