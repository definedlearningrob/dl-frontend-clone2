import dayjs from 'dayjs';

export const parseCreatedDate = (createdDate: string) => {
  const date = dayjs(createdDate).format('M/D/YYYY');
  const hour = dayjs(createdDate).format('h:mmA');

  return `${date} at ${hour}`;
};
