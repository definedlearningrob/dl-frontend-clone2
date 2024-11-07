export const assignSteps = <T extends {}>(items: T[]) =>
  items.map((item, index) => ({ ...item, step: index + 1 }));
