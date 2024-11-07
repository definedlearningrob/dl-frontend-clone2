import { useTranslation } from 'react-i18next';
import { capitalize } from 'lodash-es';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { TUnit } from '@dc/graphql/user/queries/unit';
import { ListItemActions } from '@dc/shared/ListItemActions/ListItemActions';

import SharedImage from '@shared/components/Image/Image';
import { Badge } from '@shared/components/Badge/Badge';
import { SERVICE_NAME } from '@shared/resources/enums';

type Props = {
  setDetailsModalOpen: (value: boolean) => void;
  unit: TUnit;
};

export const AdminUnitsListItem = ({ setDetailsModalOpen, unit }: Props) => {
  const { imageUrl, name, status, thumbnailUrl, service, archivedAt } = unit;
  const { t } = useTranslation();
  const { setRecordToArchive, setRecordToShow, setRecordToRestore } = useForm();

  const onArchiveClick = () => {
    setRecordToArchive(unit);
  };

  const onRestoreClick = () => {
    setRecordToRestore(unit);
  };

  const onShowClick = () => {
    setRecordToShow(unit);
    setDetailsModalOpen(true);
  };

  const badgeType = service === SERVICE_NAME.LEARNING ? 'info' : 'danger';

  const isItemActive = archivedAt === null;

  return (
    <SharedTableList.Row data-testid='units-list-item'>
      <SharedTableList.Cell>
        <SharedImage
          alt={t('admin.units.list.item.altImage')}
          className='w-[86px] h-lg object-cover'
          src={imageUrl || thumbnailUrl}
        />
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='units-list-item-name'>{name}</SharedTableList.Cell>
      <SharedTableList.Cell>{status}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <Badge className='!inline-block' type={badgeType}>
          {capitalize(service)}
        </Badge>
      </SharedTableList.Cell>

      <SharedTableList.Cell>
        <ListItemActions
          editUrl={`/admin/units/${unit.id}/edit`}
          onArchiveClick={isItemActive ? onArchiveClick : undefined}
          onRestoreClick={!isItemActive ? onRestoreClick : undefined}
          onShowClick={onShowClick}
        />
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
};
