export const removeTags = (text: string) =>
  text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/(&nbsp;|<br>|<br \/>)/g, '')
    .trim();
