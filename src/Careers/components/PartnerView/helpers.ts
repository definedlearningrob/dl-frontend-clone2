export const getOuterHeight = (element: HTMLDivElement) => {
  if (!element) return 0;

  const style = window.getComputedStyle(element);

  return element.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
};
