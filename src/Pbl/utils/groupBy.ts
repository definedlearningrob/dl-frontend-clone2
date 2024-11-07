type TItemsContains = {
  items: any[];
};

export function groupBy<T extends TItemsContains>(list: object[], groupBy: string[]): T[] {
  const output = list.reduce((acc: T[], curr: any) => {
    const foundIndex = acc.findIndex((group: any) =>
      groupBy.every((byItem) => group[byItem] === curr[byItem])
    );
    const elementNotFound = foundIndex === -1;
    if (elementNotFound) {
      const newObject = groupBy.reduce((acc, next) => ({ ...acc, [next]: curr[next] }), {});
      acc.push({ ...newObject, items: [curr] } as any as T);
    } else {
      acc[foundIndex].items.push(curr);
    }

    return acc;
  }, []);

  return output;
}
