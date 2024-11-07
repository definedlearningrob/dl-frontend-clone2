const disabledPaths = ['announcements'];

export const pathwaysNotUsingReadSpeaker = (location) =>
  disabledPaths.some((pathway) => location.pathname.includes(pathway));
