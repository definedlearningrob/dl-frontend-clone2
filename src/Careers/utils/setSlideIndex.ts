export const setSlideIndex = (subSlideIndex: number, slideIndex: number) => {
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const newSlideListIndex =
    subSlideIndex !== -1 ? `${++slideIndex}${alphabet[subSlideIndex]}.` : `${++slideIndex}.`;

  return newSlideListIndex;
};
