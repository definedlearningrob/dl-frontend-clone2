import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AssignmentsEdit from '@dc/components/Admin/LessonItems/Assignments/Edit/Edit';
import AssignmentsList from '@dc/components/Admin/LessonItems/Assignments/List/List';
import AssignmentsNew from '@dc/components/Admin/LessonItems/Assignments/New/New';
import assignmentsQuery from '@dc/graphql/user/queries/assignments';
import AttachmentsEdit from '@dc/components/Admin/LessonItems/Attachments/Edit/Edit';
import AttachmentsList from '@dc/components/Admin/LessonItems/Attachments/List/List';
import AttachmentsNew from '@dc/components/Admin/LessonItems/Attachments/New/New';
import attachmentsQuery from '@dc/graphql/user/queries/attachments';
import PresentationsEdit from '@dc/components/Admin/LessonItems/ExternalPresentations/Edit/Edit';
import PresentationsList from '@dc/components/Admin/LessonItems/ExternalPresentations/List/List';
import PresentationsNew from '@dc/components/Admin/LessonItems/ExternalPresentations/New/New';
import externalPresentationsQuery from '@dc/graphql/user/queries/externalPresentations';
import ResearchLinksEdit from '@dc/components/Admin/LessonItems/ResearchLinks/Edit/Edit';
import ResearchLinksList from '@dc/components/Admin/LessonItems/ResearchLinks/List/List';
import ResearchLinksNew from '@dc/components/Admin/LessonItems/ResearchLinks/New/New';
import researchLinksQuery from '@dc/graphql/user/queries/researchLinks';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import SharedSelect from '@dc/shared/Select/Select';
import TextsEdit from '@dc/components/Admin/LessonItems/Texts/Edit/Edit';
import TextsList from '@dc/components/Admin/LessonItems/Texts/List/List';
import TextsNew from '@dc/components/Admin/LessonItems/Texts/New/New';
import textsQuery from '@dc/graphql/user/queries/texts';
import VideosEdit from '@dc/components/Admin/LessonItems/Videos/Edit/Edit';
import VideosList from '@dc/components/Admin/LessonItems/Videos/List/List';
import VideosNew from '@dc/components/Admin/LessonItems/Videos/New/New';
import videosQuery from '@dc/graphql/user/queries/videos';
import VocabulariesEdit from '@dc/components/Admin/LessonItems/Vocabularies/Edit/Edit';
import VocabulariesList from '@dc/components/Admin/LessonItems/Vocabularies/List/List';
import VocabulariesNew from '@dc/components/Admin/LessonItems/Vocabularies/New/New';
import vocabulariesQuery from '@dc/graphql/user/queries/vocabularies';
import { FormProvider } from '@dc/hooks/useForm';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';

function AdminAppLessonItems() {
  const { t } = useTranslation();
  const typeOptions = {
    assignment: { value: 'assignment', label: t('admin.lessons.items.assignments') },
    attachment: { value: 'attachment', label: t('admin.lessons.items.attachments') },
    externalPresentation: {
      value: 'externalPresentation',
      label: t('admin.lessons.items.externalPresentation.label'),
    },
    researchLink: { value: 'researchLink', label: t('admin.lessons.items.researchLinks') },
    text: { value: 'text', label: t('admin.lessons.items.texts') },
    video: { value: 'video', label: t('admin.lessons.items.videos') },
    vocabulary: { value: 'vocabulary', label: t('admin.lessons.items.vocabularies') },
  };
  const { params, updateQueryParams } = useQueryParams();
  const initialScope = params.scope
    ? ARCHIVABLE_STATUSES[params.scope]
    : ARCHIVABLE_STATUSES.ACTIVE;
  const initialItemType = params.type
    ? typeOptions[params.type]
    : { value: 'assignment', label: t('admin.lessons.items.assignments') };
  const [scope, setScope] = useState(initialScope);
  const [selectedLessonItemType, setSelectedLessonItemType] = useState(initialItemType);

  useEffect(() => {
    !params.type && updateQueryParams({ type: typeOptions.assignment.value });
  }, []);

  const itemsConfiguration = {
    assignment: {
      query: assignmentsQuery,
      searchField: { field: 'assetName', label: t('common.fields.common.name').toLowerCase() },
      name: 'assignments',
      ListComponent: AssignmentsList,
      NewComponent: AssignmentsNew,
      EditComponent: AssignmentsEdit,
    },
    attachment: {
      query: attachmentsQuery,
      searchField: { field: 'name', label: t('common.fields.common.name').toLowerCase() },
      name: 'attachments',
      ListComponent: AttachmentsList,
      NewComponent: AttachmentsNew,
      EditComponent: AttachmentsEdit,
    },
    externalPresentation: {
      query: externalPresentationsQuery,
      searchField: { field: 'name', label: t('common.fields.common.name').toLowerCase() },
      name: 'externalPresentations',
      ListComponent: PresentationsList,
      NewComponent: PresentationsNew,
      EditComponent: PresentationsEdit,
    },
    researchLink: {
      query: researchLinksQuery,
      searchField: { field: 'name', label: t('common.fields.common.name').toLowerCase() },
      name: 'researchLinks',
      ListComponent: ResearchLinksList,
      NewComponent: ResearchLinksNew,
      EditComponent: ResearchLinksEdit,
    },
    text: {
      query: textsQuery,
      searchField: { field: 'name', label: t('common.fields.common.name').toLowerCase() },
      name: 'texts',
      ListComponent: TextsList,
      NewComponent: TextsNew,
      EditComponent: TextsEdit,
    },
    video: {
      query: videosQuery,
      searchField: { field: 'name', label: t('common.fields.common.name').toLowerCase() },
      name: 'videos',
      ListComponent: VideosList,
      NewComponent: VideosNew,
      EditComponent: VideosEdit,
    },
    vocabulary: {
      query: vocabulariesQuery,
      searchField: { field: 'term', label: t('common.fields.vocabulary.term').toLowerCase() },
      name: 'vocabularies',
      ListComponent: VocabulariesList,
      NewComponent: VocabulariesNew,
      EditComponent: VocabulariesEdit,
    },
  }[selectedLessonItemType.value];

  const selectLessonItemType = (selectPage, clearFilter) => (itemType) => {
    selectPage(1);
    clearFilter();
    setSelectedLessonItemType(itemType);
    updateQueryParams({ type: itemType.value });
  };

  const selectScope = (selectPage) => (scope) => {
    selectPage(1);
    setScope(scope);
    updateQueryParams({ scope: scope.value });
  };

  return (
    <FormProvider>
      <SharedFilterProvider>
        {({ clearFilter, filter, ...filterProps }) => {
          const variables = useMemo(() => ({ filter, scope: scope.value }), [filter, scope]);

          return (
            <SharedMainContent>
              <SharedPaginatedLoader
                options={{
                  fetchPolicy: 'network-only',
                  variables,
                }}
                query={itemsConfiguration.query}>
                {({ refetchQuery, ...pagingProps }) => (
                  <>
                    <AdminFilters>
                      <SharedFilterProvider.Search
                        field={itemsConfiguration.searchField.field}
                        placeholder={t('common.placeholders.searchBy', {
                          field: itemsConfiguration.searchField.label,
                        })}
                        {...filterProps}
                      />
                      <SharedSelect
                        options={Object.values(ARCHIVABLE_STATUSES)}
                        showError={false}
                        value={scope}
                        onChange={selectScope(pagingProps.selectPage)}
                      />
                      <SharedSelect
                        options={Object.values(typeOptions)}
                        showError={false}
                        value={selectedLessonItemType}
                        onChange={selectLessonItemType(pagingProps.selectPage, clearFilter)}
                      />
                    </AdminFilters>
                    <SharedPaginatedLoader.Content {...pagingProps}>
                      {(data) => (
                        <itemsConfiguration.ListComponent
                          itemName={itemsConfiguration.name}
                          items={data[itemsConfiguration.name].nodes}
                          pagingProps={pagingProps}
                          refetchQuery={refetchQuery}
                          selectPage={pagingProps.selectPage}
                        />
                      )}
                    </SharedPaginatedLoader.Content>
                  </>
                )}
              </SharedPaginatedLoader>
            </SharedMainContent>
          );
        }}
      </SharedFilterProvider>
    </FormProvider>
  );
}

export default AdminAppLessonItems;
