import useHardcodedOptions from '@dc/hooks/useHardcodedOptions';

import { renderWithI18N } from '@pbl/utils/test';

const renderWithProvider = (HookConsumer: () => null) => renderWithI18N(<HookConsumer />);

describe('hooks | useHardcodedOptions', () => {
  it('returns proper values', () => {
    let optionsCheck;
    let defaultOptionCheck;

    enum testingOptions {
      FIRST = 'FIRST',
      SECOND = 'SECOND',
      THIRD = 'THIRD',
      FOURTH = 'FOURTH',
    }
    const HookConsumer = () => {
      const { options, defaultOption } = useHardcodedOptions<testingOptions>({
        defaultOption: testingOptions.THIRD,
        baseKey: 'some.key',
        options: testingOptions,
      });

      optionsCheck = options;
      defaultOptionCheck = defaultOption;

      return null;
    };

    renderWithProvider(HookConsumer);

    expect(optionsCheck).toEqual([
      {
        label: `some.key.first`,
        value: testingOptions.FIRST,
      },
      {
        label: `some.key.second`,
        value: testingOptions.SECOND,
      },
      {
        label: `some.key.third`,
        value: testingOptions.THIRD,
      },
      {
        label: `some.key.fourth`,
        value: testingOptions.FOURTH,
      },
    ]);
    expect(defaultOptionCheck).toEqual({
      label: `some.key.third`,
      value: testingOptions.THIRD,
    });
  });
});
