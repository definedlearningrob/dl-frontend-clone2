import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminCoursesListItem from '@dc/components/Admin/Courses/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import archiveCourseMutation from '@dc/graphql/user/mutations/archiveCourse';
import duplicateCourseMutation from '@dc/graphql/user/mutations/duplicateCourse';
import useForm from '@dc/hooks/useForm';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminCoursesList.propTypes = {
  pagingProps: PropTypes.object,
  pathwayFilter: PropTypes.string,
  refetchQuery: PropTypes.object,
  searchableFilter: PropTypes.string,
  showCopies: PropTypes.bool,
};

function AdminCoursesList({
  pagingProps,
  pathwayFilter,
  refetchQuery,
  searchableFilter,
  showCopies,
}) {
  const { recordToArchive, recordToDuplicate } = useForm();
  const { t } = useTranslation();
  const [mutateArchiveCourse] = useMutation(archiveCourseMutation);
  const [mutateDuplicateCourse] = useMutation(duplicateCourseMutation);

  const archiveCourse = async () => {
    await mutateArchiveCourse({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.archived', { name: t('admin.courses.typeName') })
    );
  };

  const duplicateCourse = async () => {
    const results = await mutateDuplicateCourse({
      variables: {
        input: {
          id: recordToDuplicate.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.duplicated', { name: t('admin.courses.typeName') })
    );

    return results;
  };

  const headers = [
    { label: '', id: 'image', classNames: '!w-[100px]' },
    { label: t('common.fields.common.name'), id: 'name', classNames: '!w-1/5' },
    { label: t('common.fields.common.displayName'), id: 'display_name', classNames: '!w-1/5' },
    { label: t('common.fields.common.status'), id: 'status' },
    { label: t('admin.courses.pathway'), id: 'pathway', classNames: '!w-1/5' },
    { label: t('admin.courses.collection'), id: 'collection' },
    { label: t('admin.courses.lessons.label'), id: 'lessons' },
    { label: t('sharedCommon.actions'), id: 'actionButtons' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='courses'
      pagingProps={pagingProps}
      onArchive={archiveCourse}
      onDuplicate={duplicateCourse}>
      {(item) => (
        <AdminCoursesListItem
          key={item.id}
          course={item}
          pathwayFilter={pathwayFilter}
          searchableFilter={searchableFilter}
          showCopies={showCopies}
        />
      )}
    </AdminSharedList>
  );
}

export default AdminCoursesList;
