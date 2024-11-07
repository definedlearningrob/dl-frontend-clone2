import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

export const getFlattenedSlides = (arr: TTaskPresentationSlide[]): TTaskPresentationSlide[] => {
  const flattenedSlides: TTaskPresentationSlide[] = arr.reduce(
    (acc: any, cur: TTaskPresentationSlide) => acc.concat(cur, cur.subslides),
    []
  );

  return flattenedSlides;
};
