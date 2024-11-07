import dayjs from 'dayjs';
import { sortBy } from 'lodash-es';

import type { TInstitutionDate } from '@dc/resources/types';

export const sortDates = (dates: TInstitutionDate[]) =>
  sortBy(dates, (date) => dayjs(date.deadlineDate).unix());
