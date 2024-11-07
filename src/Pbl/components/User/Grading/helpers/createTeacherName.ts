export const createTeacherName = (name?: string, lastName?: string) => {
  const nameToDisplay = [name, lastName].filter(Boolean).join(' ');

  return nameToDisplay || 'Teacher';
};
