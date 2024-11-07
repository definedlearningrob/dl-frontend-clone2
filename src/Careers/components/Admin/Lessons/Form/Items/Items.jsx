import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { startCase } from 'lodash-es';

import Assignment from '@dc/components/Admin/Lessons/Form/Items/Assignment/Assignment';
import Attachment from '@dc/components/Admin/Lessons/Form/Items/Attachment/Attachment';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import ItemSectionWrapper from '@dc/components/Admin/Lessons/Form/Items/Shared/ItemSectionWrapper/ItemSectionWrapper';
import Presentation from '@dc/components/Admin/Lessons/Form/Items/ExternalPresentation/ExternalPresentation';
import ResearchLink from '@dc/components/Admin/Lessons/Form/Items/ResearchLink/ResearchLink';
import SharedDropdown from '@dc/shared/Dropdown/Dropdown';
import Text from '@dc/components/Admin/Lessons/Form/Items/Text/Text';
import Video from '@dc/components/Admin/Lessons/Form/Items/Video/Video';
import Vocabulary from '@dc/components/Admin/Lessons/Form/Items/Vocabulary/Vocabulary';
import assignmentsQuery from '@dc/graphql/user/queries/assignments';
import attachmentsQuery from '@dc/graphql/user/queries/attachments';
import externalPresentationsQuery from '@dc/graphql/user/queries/externalPresentations';
import researchLinksQuery from '@dc/graphql/user/queries/researchLinks';
import textsQuery from '@dc/graphql/user/queries/texts';
import videosQuery from '@dc/graphql/user/queries/videos';
import vocabulariesQuery from '@dc/graphql/user/queries/vocabularies';
import { LessonsItemsProvider } from '@dc/hooks/useLessonItems';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';
import { LessonItemDetailsModal } from '@dc/components/Admin/Lessons/Form/Items/LessonItemDetailsModal/LessonItemDetailsModal';

import { ReactComponent as AssignmentIcon } from '@shared/assets/icons/file_document.svg';
import { ReactComponent as AttachmentIcon } from '@shared/assets/icons/attachment_icon.svg';
import { ReactComponent as PresentationIcon } from '@shared/assets/icons/presentation_icon.svg';
import { ReactComponent as ResearchLinkIcon } from '@shared/assets/icons/link.svg';
import { ReactComponent as TextIcon } from '@shared/assets/icons/text_icon.svg';
import { ReactComponent as VideoIcon } from '@shared/assets/icons/video_icon.svg';
import { ReactComponent as VocabularyIcon } from '@shared/assets/icons/vocabulary_icon.svg';
import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedButton from '@shared/components/Button/Button';

const lessonItemsEditLinksMap = {
  Assignment: '/admin/lesson-items/assignment',
  Attachment: '/admin/lesson-items/attachments',
  ExternalPresentation: '/admin/lesson-items/externalPresentations',
  ResearchLink: '/admin/lesson-items/research-links',
  Text: '/admin/lesson-items/texts',
  Video: '/admin/lesson-items/videos',
  Vocabulary: '/admin/lesson-items/vocabularies',
};

const getBadge = (item) => ({ text: startCase(item.__typename), type: 'secondary' });

const getIcon = (item) => {
  const icons = {
    Assignment: AssignmentIcon,
    Attachment: AttachmentIcon,
    ExternalPresentation: PresentationIcon,
    ResearchLink: ResearchLinkIcon,
    Text: TextIcon,
    Video: VideoIcon,
    Vocabulary: VocabularyIcon,
  };

  return icons[item.__typename];
};

export const LessonItems = () => {
  const { t } = useTranslation();
  const [activeLessonItemType, setActiveLessonItemType] = useState(null);
  const [itemToPreview, setItemToPreview] = useState(null);
  const lessonItemsField = useField('lessonItems');
  const [lessonItemsInput] = lessonItemsField;

  const closeLessonItem = () => setActiveLessonItemType(null);

  const getConfigurationItem = ({
    assignments,
    attachments,
    externalPresentations,
    researchLinks,
    texts,
    videos,
    vocabularies,
  } = {}) =>
    ({
      assignment: {
        component: <Assignment />,
        query: assignmentsQuery,
        items: assignments,
        label: t('admin.lessons.items.assignments'),
        filterField: { field: 'assetName', label: t('common.fields.common.name').toLowerCase() },
      },
      attachment: {
        component: <Attachment />,
        query: attachmentsQuery,
        items: attachments,
        label: t('admin.lessons.items.attachments'),
        filterField: { field: 'name', label: t('common.fields.common.name').toLowerCase() },
      },
      externalPresentation: {
        component: <Presentation />,
        query: externalPresentationsQuery,
        items: externalPresentations,
        label: t('admin.lessons.items.externalPresentation.label'),
        filterField: { field: 'name', label: t('common.fields.common.name').toLowerCase() },
      },
      researchLink: {
        component: <ResearchLink />,
        query: researchLinksQuery,
        items: researchLinks,
        label: t('admin.lessons.items.researchLinks'),
        filterField: { field: 'name', label: t('common.fields.common.name').toLowerCase() },
      },
      text: {
        component: <Text />,
        query: textsQuery,
        items: texts,
        label: t('admin.lessons.items.texts'),
        filterField: { field: 'name', label: t('common.fields.common.name').toLowerCase() },
      },
      video: {
        component: <Video />,
        query: videosQuery,
        items: videos,
        label: t('admin.lessons.items.videos'),
        filterField: { field: 'name', label: t('common.fields.common.name').toLowerCase() },
      },
      vocabulary: {
        component: <Vocabulary />,
        query: vocabulariesQuery,
        items: vocabularies,
        label: t('admin.lessons.items.vocabularies'),
        filterField: { field: 'term', label: t('common.fields.vocabulary.term').toLowerCase() },
      },
    }[activeLessonItemType]);

  const openLessonItem = (item) => () => setActiveLessonItemType(item);
  const handleEditClick = (item) => {
    window.open(
      `${lessonItemsEditLinksMap[item.__typename]}/${item.id}/edit?standaloneEdit=true`,
      '_blank',
      'noreferrer'
    );
  };

  return (
    <>
      <h4 data-testid='lessons-form-title'>{t('admin.lessons.lessonItems')}</h4>
      <SortableSelectedList
        field='lessonItems'
        getBadge={getBadge}
        getIcon={getIcon}
        items={lessonItemsInput.value}
        onDetailsOpen={setItemToPreview}
        onEditClick={handleEditClick}
      />
      <LessonItemDetailsModal
        isOpen={!!itemToPreview}
        item={itemToPreview}
        onClose={() => setItemToPreview(null)}
      />
      {activeLessonItemType ? (
        <FilterProvider omitUrl={true}>
          {({ SearchBar, filter }) => {
            const variables = useMemo(
              () => ({
                scope: ARCHIVABLE_STATUSES.ACTIVE.value,
                filter,
              }),
              [filter]
            );

            return (
              <SharedPaginatedLoader
                omitUrl={true}
                options={{
                  fetchPolicy: 'network-only',
                  variables,
                }}
                query={getConfigurationItem().query}>
                {({ data, refetchQuery, ...props }) => (
                  <LessonsItemsProvider
                    items={getConfigurationItem(data).items?.nodes || []}
                    lessonItemsField={lessonItemsField}
                    refetchQuery={refetchQuery}
                    type={activeLessonItemType}>
                    <ItemSectionWrapper
                      SearchBar={SearchBar}
                      filterField={getConfigurationItem().filterField}
                      pagingProps={props}
                      testPrefix={getConfigurationItem().label.toLowerCase()}
                      title={getConfigurationItem().label}
                      onClose={closeLessonItem}>
                      <SharedPaginatedLoader.Content data={data} {...props}>
                        {() => getConfigurationItem(data).component}
                      </SharedPaginatedLoader.Content>
                    </ItemSectionWrapper>
                  </LessonsItemsProvider>
                )}
              </SharedPaginatedLoader>
            );
          }}
        </FilterProvider>
      ) : (
        <SharedDropdown>
          <SharedDropdown.Dropdown className='lessons__items-dropdown'>
            <SharedDropdown.Trigger>
              <SharedButton
                className='lessons__items-new-button'
                data-testid='new-lesson-item'
                size='md'
                variant='success'>
                {t('common.actions.add')}
              </SharedButton>
            </SharedDropdown.Trigger>
            <SharedDropdown.Options>
              <SharedDropdown.Option
                data-testid='assignments-option'
                onClick={openLessonItem('assignment')}>
                {t('admin.lessons.items.assignment.label')}
              </SharedDropdown.Option>
              <SharedDropdown.Option
                data-testid='attachments-option'
                onClick={openLessonItem('attachment')}>
                {t('admin.lessons.items.attachment.label')}
              </SharedDropdown.Option>
              <SharedDropdown.Option
                data-testid='externalPresentations-option'
                onClick={openLessonItem('externalPresentation')}>
                {t('admin.lessons.items.presentation.label')}
              </SharedDropdown.Option>
              <SharedDropdown.Option
                data-testid='research-links-option'
                onClick={openLessonItem('researchLink')}>
                {t('admin.lessons.items.researchLink.label')}
              </SharedDropdown.Option>
              <SharedDropdown.Option data-testid='texts-option' onClick={openLessonItem('text')}>
                {t('admin.lessons.items.text.label')}
              </SharedDropdown.Option>
              <SharedDropdown.Option data-testid='videos-option' onClick={openLessonItem('video')}>
                {t('admin.lessons.items.video.label')}
              </SharedDropdown.Option>
              <SharedDropdown.Option
                data-testid='vocabularies-option'
                onClick={openLessonItem('vocabulary')}>
                {t('admin.lessons.items.vocabulary.label')}
              </SharedDropdown.Option>
            </SharedDropdown.Options>
          </SharedDropdown.Dropdown>
        </SharedDropdown>
      )}
    </>
  );
};
