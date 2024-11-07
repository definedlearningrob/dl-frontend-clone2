import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminLessonsListItem from '@dc/components/Admin/Lessons/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import archiveLessonMutation from '@dc/graphql/user/mutations/archiveLesson';
import useForm from '@dc/hooks/useForm';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonsList.propTypes = {
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
};

function AdminLessonsList({ pagingProps, refetchQuery }) {
  const { recordToArchive } = useForm();
  const { t } = useTranslation();
  const [mutateArchiveLesson] = useMutation(archiveLessonMutation);

  const archiveLesson = async () => {
    await mutateArchiveLesson({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.archived', { name: t('admin.lessons.typeName') })
    );
  };

  const headers = [
    { label: '', id: 'image', classNames: '!w-[100px]' },
    { label: t('common.fields.common.name'), id: 'name', classNames: '!w-[400px]' },
    { label: '', id: 'actionButtons' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='lessons'
      pagingProps={pagingProps}
      onArchive={archiveLesson}>
      {(item) => <AdminLessonsListItem key={item.id} lesson={item} />}
    </AdminSharedList>
  );
}

export default AdminLessonsList;
