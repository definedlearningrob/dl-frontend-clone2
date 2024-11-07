export default function debounce<T>(
  func: (...args: any[]) => any,
  wait: number
): (...args: any[]) => Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | null;

  return (...args: any[]) =>
    new Promise((res) => {
      const later = async () => {
        timeout = null;
        const data = await func(...args);
        res(data);
      };
      timeout && clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    });
}
