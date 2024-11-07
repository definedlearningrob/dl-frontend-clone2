export const mapFilterOptions = (
  data: (Record<string, unknown> | string)[] | undefined,
  optionValueKey = 'id',
  optionLabelKey = 'name'
) => {
  if (!data) {
    return [];
  }

  return data.map((option) => {
    if (typeof option === 'string') {
      return { label: option, value: option };
    }

    return {
      label: option[optionLabelKey] as string,
      value: option[optionValueKey] as string,
    };
  });
};
