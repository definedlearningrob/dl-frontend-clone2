import { sortBy } from 'lodash-es';
import { useMemo } from 'react';

import {
  TAssignment,
  TAttachment,
  TResearchLink,
  TText,
  TVideo,
  TVocabulary,
} from '@dc/components/Student/Lesson/types';
import type { LessonItemGroup } from '@dc/components/VirtualInternship/VirtualInternshipLesson/LessonItemGroup';

import { TLesson } from './types';

type LessonItem = TVocabulary | TAttachment | TAssignment | TText | TVideo | TResearchLink;
type StandaloneGroupType = Exclude<
  LessonItem['__typename'],
  TVocabulary['__typename'] | TResearchLink['__typename']
>;

type Props = {
  lesson: TLesson;
};

const standaloneGroups: StandaloneGroupType[] = ['Assignment', 'Attachment', 'Text', 'Video'];

export const useLessonItems = ({ lesson }: Props) => {
  const lessonItemGroups = useMemo(() => {
    const lessonItems = [
      lesson.vocabularies,
      lesson.texts,
      lesson.attachments,
      lesson.videos,
      lesson.assignments,
      lesson.researchLinks,
    ]
      .flat()
      .sort((a, b) => a.step - b.step);

    return lessonItems.reduce((acc, item) => {
      const previousGroup = acc.at(-1);

      const shouldCreateNewGroup =
        !previousGroup ||
        previousGroup.type !== item.__typename ||
        (standaloneGroups as string[]).includes(item.__typename);

      if (shouldCreateNewGroup) {
        acc.push({
          type: item.__typename,
          items: [item],
          id: item.id,
        } as LessonItemGroup);
      } else {
        (previousGroup.items as unknown[]).push(item);
      }

      return acc;
    }, [] as LessonItemGroup[]);
  }, [lesson]);

  const checkInItems = sortBy([...lesson.checkInGroups, ...lesson.checkInQuestions], 'step');
  const externalPresentations = sortBy(lesson.externalPresentations, 'step');

  return { lessonItemGroups, checkInItems, externalPresentations };
};
