import debounce from '@shared/utils/debounce';

describe('utils | debounce', () => {
  it('calls function only once after delay passed', () => {
    jest.useFakeTimers();
    const functionToDebounce = jest.fn();
    const debouncedFunction = debounce(functionToDebounce, 700);

    debouncedFunction();

    expect(functionToDebounce).not.toBeCalled();

    jest.advanceTimersByTime(300);

    debouncedFunction();

    expect(functionToDebounce).not.toBeCalled();

    jest.advanceTimersByTime(400);

    expect(functionToDebounce).not.toBeCalled();

    debouncedFunction();

    jest.advanceTimersByTime(700);

    expect(functionToDebounce).toHaveBeenCalledTimes(1);
  });
});
