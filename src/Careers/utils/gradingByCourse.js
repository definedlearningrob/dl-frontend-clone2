/**
 * Current BE implementation returns `gradingNeeded` label in overall scope.
 * To get list of items with correct `gradingNeeded` label, which is scoped by certain course
 * we upload set of schoolClasses/students with `gradingNeeded` status, and rest schoolClasses/students without `gradingNeeded`,
 * then we add `gradingByCourseNeeded` label on FE in order to get desired set of data.
 */

export const getListItemsWithGradingNeededByCourse = (
  gradingNeededItems,
  withoutGradingNeededItems
) => {
  const gradingNeededItemsWithGradingLabel = gradingNeededItems.map((item) => ({
    ...item,
    gradingByCourseNeeded: true,
  }));

  return [...gradingNeededItemsWithGradingLabel, ...withoutGradingNeededItems];
};
