import { useTranslation } from 'react-i18next';
import { camelCase } from 'lodash-es';

import { LessonItemDetail } from '@dc/components/Admin/Lessons/Form/Items/LessonItemDetailsModal/LessonItemDetail';

import SharedModal from '@shared/components/Modal/Modal';

const lessonItemsRelevantFields = {
  Assignment: ['name', 'displayName', 'description'],
  Attachment: ['name', 'displayName', 'description', 'files'],
  Vocabulary: ['term', 'definition'],
  ExternalPresentation: ['name', 'displayName', 'source'],
  ResearchLink: ['name', 'displayName', 'author', 'resourceLink', 'sourceName'],
  Text: ['name', 'displayName', 'content'],
  Video: ['name', 'displayName', 'description', 'url'],
} as const;

export type LessonItemTypename = keyof typeof lessonItemsRelevantFields;

export type ItemFile = {
  id: string;
  filename: string;
  url: string;
};

type Props<T> = {
  isOpen: boolean;
  onClose: () => void;
  item: T;
};

export type LessonItem = {
  name: string;
  displayName?: string;
  description?: string;
  files?: ItemFile[];
  definition?: string;
  source?: string;
  term?: string;
  author?: string;
  resourceLink?: string;
  sourceName?: string;
  content?: string;
  url?: string;
  __typename: string;
};

export const LessonItemDetailsModal = <T extends LessonItem>({
  isOpen,
  onClose,
  item,
}: Props<T>) => {
  const { t } = useTranslation();

  if (!item) {
    return null;
  }

  const typename = item.__typename as LessonItemTypename;
  const typenameKey = camelCase(typename);
  const relevantFields = lessonItemsRelevantFields[typename];

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t(`admin.lessons.items.${typenameKey}.label`)}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        {relevantFields.map((field) => (
          <div key={field} className='mb-sm'>
            <h3 className='bg-neutral-200 rounded-sm text-font-primary text-base font-bold mb-xs px-sm py-xs'>
              {t(`admin.lessons.items.${typenameKey}.${field}`)}
            </h3>
            <LessonItemDetail fieldKey={field} value={item[field]} />
          </div>
        ))}
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary' onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
