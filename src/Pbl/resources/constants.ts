export const GOOGLE_CLASSROOM_URL = 'https://apis.google.com/js/platform.js';

// eslint-disable-next-line no-undef
export const IS_TEST_ENV = import.meta.env.NODE_ENV === 'test';

export const TOKEN_KEY = 'pbl-access-token';

export const SHARED_RESOURCE_TYPES = {
  TASK: 'TASK',
} as const;

export const CONVERSATION_CONTEXT_TYPES = {
  TASK: 'TASK',
  PRODUCT: 'PRODUCT',
  CHECK_IN_ANSWER: 'CHECK_IN_ANSWER',
};

export const EXTERNAL_LINKS = {
  DL_KNOWLEDGE_BASE:
    'https://support.definedlearning.com/article/228-defined-learning-updated-knowledge-base',
};
