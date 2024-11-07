import { ALLOWED_EVALUATOR_ROLES } from '@shared/resources/constants';

import { StudentInfo, UserInfo } from './types';

export const getCanEvaluate = (userInfo: UserInfo | StudentInfo) => {
  if ('role' in userInfo) {
    return ALLOWED_EVALUATOR_ROLES.includes(userInfo.role);
  }

  return userInfo.settings.selfEvaluationEnabled;
};
