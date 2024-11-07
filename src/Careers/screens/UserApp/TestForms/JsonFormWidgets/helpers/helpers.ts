export const getLabel = (label: string, required?: boolean) =>
  required && label ? `${label}*` : label;
