import { useQuery } from '@apollo/client';

import { TASK_TEMPLATES } from '@pbl/graphql/user/queries/taskTemplates';

export const useTaskTemplates = () => useQuery(TASK_TEMPLATES);
