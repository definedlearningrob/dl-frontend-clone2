export const getFileExtension = (filename: string) =>
  filename.substring(filename.lastIndexOf('.') + 1);
