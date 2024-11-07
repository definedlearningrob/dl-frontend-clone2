export const objectMap = (obj: object, mapFn: Function) =>
  Object.fromEntries(Object.entries(obj).map(([key, value], i) => [key, mapFn(value, key, i)]));
