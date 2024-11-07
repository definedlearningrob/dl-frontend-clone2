import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

import checkinsQuery from '@dc/graphql/user/queries/checkinQuestions';
import checkinGroupsQuery from '@dc/graphql/user/queries/checkInGroups';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';

import { ReactComponent as QuestionIcon } from '@shared/svg/question.svg';
import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import Card from '@shared/components/Card/Card';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';

import Checkins from './Items/Checkins';
import CheckinGroups from './Items/CheckinGroups';
import CheckinGroupsModal from './DetailsModal/DetailsModal';

function AdminLessonsFormCheckins() {
  const { t } = useTranslation();
  const [activeGroup, setActiveGroup] = useState(null);
  const [checkinsInput] = useField('checkins');
  const isDetailsModalOpen = activeGroup !== null;

  const selectedCheckins = useMemo(() => {
    const sortedCheckins = checkinsInput.value.sort((a, b) => parseInt(a.step) - parseInt(b.step));

    return sortedCheckins.map((checkin) => ({
      ...checkin,
      name: checkin.name || checkin.question,
    }));
  }, [checkinsInput.value]);

  const closeDetailsModal = () => setActiveGroup(null);

  const openItemDetails = (item) => {
    if (item.__typename === 'CheckInGroup') {
      setActiveGroup(item);
    }
  };

  const getKicker = (item) => {
    const translationKey =
      item.__typename === 'CheckInGroup' ? 'checkInGroups' : 'checkInQuestions';
    const kickerText = t(`admin.${translationKey}.label`);

    return { text: kickerText, variant: 'default' };
  };

  const handleEditClick = (resource) => {
    const url =
      resource.__typename === 'CheckInGroup'
        ? `/admin/checkin-groups/${resource.id}/edit`
        : `/admin/check-ins/${resource.id}/edit`;
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <Card>
      <h4>{t('admin.lessons.checkins.label')}</h4>
      <ListWrapper title={`${t('common.statuses.selected')} (${selectedCheckins.length})`}>
        <SortableSelectedList
          ListItemIcon={QuestionIcon}
          field='checkins'
          getKicker={getKicker}
          isDragDisabled={false}
          items={selectedCheckins}
          onDetailsOpen={openItemDetails}
          onEditClick={handleEditClick}
        />
      </ListWrapper>

      <div className='admin-form__details-lists mt-base'>
        <FilterProvider omitUrl={true}>
          {({ SearchBar, filter }) => {
            const variables = useMemo(() => ({ filter }), [filter]);

            return (
              <SharedPaginatedLoader
                omitUrl={true}
                options={{
                  variables,
                }}
                query={checkinsQuery}>
                {(props) => (
                  <Checkins
                    SearchBar={SearchBar}
                    pagingProps={props}
                    onEditClick={handleEditClick}
                  />
                )}
              </SharedPaginatedLoader>
            );
          }}
        </FilterProvider>
        <FilterProvider omitUrl={true}>
          {({ SearchBar, filter }) => (
            <SharedPaginatedLoader
              omitUrl={true}
              options={{
                variables: {
                  filter,
                },
              }}
              query={checkinGroupsQuery}>
              {(props) => (
                <CheckinGroups
                  SearchBar={SearchBar}
                  pagingProps={props}
                  onEditClick={handleEditClick}
                />
              )}
            </SharedPaginatedLoader>
          )}
        </FilterProvider>
      </div>
      {isDetailsModalOpen && (
        <CheckinGroupsModal
          groupId={activeGroup?.id}
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
        />
      )}
    </Card>
  );
}

export default AdminLessonsFormCheckins;
