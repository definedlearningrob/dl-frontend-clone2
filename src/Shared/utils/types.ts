export type ToStringLiteral<T> = T[keyof T];

export type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
