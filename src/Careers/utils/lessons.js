import { LESSON_TYPES } from '@dc/resources/constants';

export const getLessonLabel = (t, lesson) =>
  ({
    [LESSON_TYPES.CAREER_CLUSTER]: t('common.fields.lesson.type.careerCluster'),
    [LESSON_TYPES.PROJECT]: t('common.fields.lesson.type.project'),
    [LESSON_TYPES.PATHWAY]: t('common.fields.lesson.type.pathway'),
    [LESSON_TYPES.DIG_DEEPER_INTO_CAREER]: t('common.fields.lesson.type.digDeeperIntoCareer'),
    [LESSON_TYPES.CAREER_REVIEW_SURVEY]: t('common.fields.lesson.type.careerReviewSurvey'),
    [LESSON_TYPES.CAREER_REVIEW_SURVEY]: t('common.fields.lesson.type.careerReviewSurvey'),
    [LESSON_TYPES.VIRTUAL_INTERNSHIP]: t('common.fields.lesson.type.virtualInternship'),
    [LESSON_TYPES.EXPERIENCE_OPPORTUNITY]: t('common.fields.lesson.type.experience'),
    [LESSON_TYPES.CAREER_READINESS]: t('common.fields.lesson.type.readiness'),
    [LESSON_TYPES.GENERIC]: t('common.fields.lesson.type.generic'),
  }[lesson.type.toUpperCase()]);
