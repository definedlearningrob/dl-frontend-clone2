import { useMutation } from '@apollo/client';

import { GENERATE_FERPA_URL } from '../mutations/generateFerpaUrl';

export const useGenerateFerpaUrl = () =>
  useMutation(GENERATE_FERPA_URL, { variables: { input: {} } });
