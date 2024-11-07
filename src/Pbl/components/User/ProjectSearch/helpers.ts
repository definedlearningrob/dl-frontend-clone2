// @ts-nocheck
export const sortGrades = <T extends string>(grades: T[]) =>
  grades.sort((a: string, b: string) => {
    if (isNaN(a) && isNaN(b)) return a.localeCompare(b);
    if (isNaN(a) && !isNaN(b)) return -1;
    if (!isNaN(a) && isNaN(b)) return 1;

    return a - b;
  });
