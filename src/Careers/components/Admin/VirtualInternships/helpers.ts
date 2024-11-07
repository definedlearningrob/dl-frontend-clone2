import * as yup from 'yup';
import i18next from 'i18next';
import { pickBy } from 'lodash-es';

import { getLessonLabel } from '@dc/utils/lessons';
import { LESSON_TYPES } from '@dc/resources/constants';

import { FormValues, Lesson } from './types';

type Badge = {
  id: string;
  name: string;
  imageUrl: string;
};

export const parseData = ({
  badges,
  pathways,
  tags,
  calendarLessons,
  experienceOpportunityLessons,
  postExperienceLessons,
  readinessSkillsLessons,
  ...values
}: FormValues) => {
  const pathwayIds = pathways.map((pathway) => pathway.value);
  const parsedTags = tags.map((tag) => tag.value);
  const parsedValues = pickBy(values, (value) => value || value === 0);
  const parsedLessons = (lessons: Lesson[]) =>
    lessons.map((lesson: Lesson) => ({ lessonId: lesson.id, step: lesson.step }));

  return {
    ...parsedValues,
    pathwayIds,
    badgeIds: badges.map((badge: Badge) => badge.id),
    tags: parsedTags,
    status: values.status,
    calendarLessonsIds: parsedLessons(calendarLessons),
    experienceOpportunityLessonsIds: parsedLessons(experienceOpportunityLessons),
    postExperienceLessonsIds: parsedLessons(postExperienceLessons),
    readinessSkillsLessonsIds: parsedLessons(readinessSkillsLessons),
  };
};

export const virtualInternshipFormSchema = yup.object().shape({
  calendarLessons: yup
    .array()
    .required()
    .length(4, () => i18next.t('admin.virtualInternship.formMessages.requiredCalendarLessons')),
  description: yup.string().required(),
  experienceOpportunityLessons: yup
    .array()
    .when('requiredExperiences', (requiredExperiences, schema) => schema.min(requiredExperiences)),
  name: yup.string().required(),
  pathways: yup
    .array()
    .min(1, () => i18next.t('admin.virtualInternship.formMessages.pathwaysRequired')),
  requiredExperiences: yup
    .number()
    .min(0, () => i18next.t('admin.virtualInternship.formMessages.requiredExperiences')),
});

export const getLessonTypeOptions = () => {
  const allLessonsType = { value: null, label: i18next.t('common.fields.common.all') };
  const lessonTypes = Object.keys(LESSON_TYPES).map((key) => ({
    value: key.toLowerCase(),
    label: getLessonLabel(i18next.t, { type: key }),
  }));

  return [allLessonsType, ...lessonTypes];
};

export const getLessonFilters = (
  providedFilters: { nameCont: string },
  selectedLessonType: { value: string | null; label: string }
) => {
  if (selectedLessonType.value) {
    return { ...providedFilters, typeEq: selectedLessonType.value };
  }

  return providedFilters;
};
