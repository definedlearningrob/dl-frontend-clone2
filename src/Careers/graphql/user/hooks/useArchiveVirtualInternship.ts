import { useMutation } from '@apollo/client';

import { ARCHIVE_VIRTUAL_INTERNSHIP } from '../mutations/archiveVirtualInternship';

export function useArchiveVirtualInternship() {
  return useMutation(ARCHIVE_VIRTUAL_INTERNSHIP);
}
