import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'lodash-es';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { shapeTrack } from '@dc/resources/typeDefs';
import { ListItemActions } from '@dc/shared/ListItemActions/ListItemActions';

import SharedImage from '@shared/components/Image/Image';
import { Badge } from '@shared/components/Badge/Badge';
import { SERVICE_NAME } from '@shared/resources/enums';

AdminTracksListItem.propTypes = {
  setDetailsModalOpen: PropTypes.func,
  track: shapeTrack,
};

function AdminTracksListItem({ setDetailsModalOpen, track }) {
  const { id, name, status, thumbnailUrl, service, archivedAt } = track;
  const { t } = useTranslation();
  const { setRecordToArchive, setRecordToShow, setRecordToRestore } = useForm();

  const onArchiveClick = () => {
    setRecordToArchive(track);
  };

  const onRestoreClick = () => {
    setRecordToRestore(track);
  };

  const onShowClick = () => {
    setRecordToShow(track);
    setDetailsModalOpen(true);
  };

  const isItemActive = archivedAt === null;

  const badgeType = service === SERVICE_NAME.LEARNING ? 'info' : 'danger';

  return (
    <SharedTableList.Row data-testid='tracks-list-item'>
      <SharedTableList.Cell>
        <SharedImage
          alt={t('admin.tracks.list.item.altImage')}
          className='w-[86px] h-lg object-cover'
          src={thumbnailUrl}
        />
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='tracks-list-item-name'>{name}</SharedTableList.Cell>
      <SharedTableList.Cell>{status}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <Badge className='!inline-block' type={badgeType}>
          {capitalize(service)}
        </Badge>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <ListItemActions
          editUrl={`/admin/tracks/${id}/edit`}
          onArchiveClick={isItemActive ? onArchiveClick : undefined}
          onRestoreClick={!isItemActive ? onRestoreClick : undefined}
          onShowClick={onShowClick}
        />
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminTracksListItem;
