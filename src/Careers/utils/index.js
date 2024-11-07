const isObject = (object) => object !== null && typeof object === 'object';

export const isEqual = (object1, object2) => {
  if (object1 === object2) return true;

  if (
    object1 === null ||
    object2 === null ||
    typeof object1 !== 'object' ||
    typeof object2 !== 'object'
  )
    return false;

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      // eslint-disable-next-line
      areObjects && !isEqual(val1, val2) ||
      // eslint-disable-next-line
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
};

export const getByStringKey = (object, key) => {
  const keys = key.split('.');

  return keys.reduce((acc = {}, key) => acc[key], object);
};
