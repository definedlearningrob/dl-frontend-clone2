import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { capitalize, isEmpty } from 'lodash-es';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { shapeCatalog } from '@dc/resources/typeDefs';
import { ListItemActions } from '@dc/shared/ListItemActions/ListItemActions';

import SharedImage from '@shared/components/Image/Image';
import { Badge } from '@shared/components/Badge/Badge';
import { SERVICE_NAME } from '@shared/resources/enums';
import { Tooltip } from '@shared/components/Tooltip';

AdminCatalogsListItem.propTypes = {
  catalog: shapeCatalog,
  setDetailsModalOpen: PropTypes.func,
};

function AdminCatalogsListItem({ catalog, setDetailsModalOpen }) {
  const { id, name, status, thumbnailUrl, tracks, service, archivedAt } = catalog;
  const { t } = useTranslation();
  const { setRecordToArchive, setRecordToShow, setRecordToRestore } = useForm();

  const onArchiveClick = () => {
    setRecordToArchive(catalog);
  };

  const onRestoreClick = () => {
    setRecordToRestore(catalog);
  };

  const onShowClick = () => {
    setRecordToShow(catalog);
    setDetailsModalOpen(true);
  };

  const badgeType = service === SERVICE_NAME.LEARNING ? 'info' : 'danger';

  const trackList = tracks.map((track) => (
    <p key={track.name} className='mb-xxs last-of-type:mb-0'>
      {track.name}
    </p>
  ));

  const isItemActive = archivedAt === null;

  return (
    <SharedTableList.Row data-testid='catalogs-list-item'>
      <SharedTableList.Cell>
        <SharedImage
          alt={t('admin.catalogs.list.item.altImage')}
          className='w-[86px] h-lg object-cover'
          src={thumbnailUrl}
        />
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='catalogs-list-item-name'>{name}</SharedTableList.Cell>
      <SharedTableList.Cell>{status}</SharedTableList.Cell>
      <SharedTableList.Cell className='cursor-pointer' data-testid='course-lessons'>
        <Tooltip delayDuration={300} disabled={isEmpty(tracks)} message={trackList}>
          {t('admin.catalogs.list.tracks', { count: tracks.length })}
        </Tooltip>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <Badge className='!inline-block' type={badgeType}>
          {capitalize(service)}
        </Badge>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <ListItemActions
          editUrl={`/admin/catalogs/${id}/edit`}
          onArchiveClick={isItemActive ? onArchiveClick : undefined}
          onRestoreClick={!isItemActive ? onRestoreClick : undefined}
          onShowClick={onShowClick}
        />
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminCatalogsListItem;
