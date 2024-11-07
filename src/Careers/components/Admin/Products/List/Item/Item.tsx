import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';

import { ReactComponent as ShowIcon } from '@shared/assets/icons/eye.svg';
import { ReactComponent as EditIcon } from '@shared/assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '@shared/assets/icons/delete_outlined.svg';
import { Tooltip } from '@shared/components/Tooltip';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

type Product = {
  id: string;
  description: string;
  displayName: string;
  name: string;
  status: string;
  step: string;
  archivedAt: string;
  owner: {
    name: string;
    uuid: string;
  };
};

type Props = {
  product: Product;
  setDetailsModalOpen: (value: boolean) => void;
  showCopies?: boolean;
};

export const AdminProductsListItem = ({ setDetailsModalOpen, product, showCopies }: Props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setRecordToArchive, setRecordToShow } = useForm();

  const onEditClick = () => {
    history.push(`/admin/products/${product.id}/edit`);
  };

  const onArchiveClick = () => {
    setRecordToArchive(product);
  };

  const onShowClick = () => {
    setRecordToShow(product);
    setDetailsModalOpen(true);
  };

  return (
    <SharedTableList.Row>
      <SharedTableList.Cell>{product.name}</SharedTableList.Cell>
      {showCopies && <SharedTableList.Cell>{product?.owner?.name}</SharedTableList.Cell>}
      <SharedTableList.Cell>{product.status}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='flex gap-xs justify-end'>
          <Tooltip message={t('common.actions.show')}>
            <DeprecatedIconButton
              data-testid='task-show-button'
              icon={<ShowIcon />}
              size='sm'
              square={true}
              variant='primary-outlined'
              onClick={onShowClick}
            />
          </Tooltip>
          <Tooltip message={t('common.actions.edit')}>
            <DeprecatedIconButton
              data-testid='task-edit-button'
              icon={<EditIcon />}
              size='sm'
              square={true}
              variant='primary-outlined'
              onClick={onEditClick}
            />
          </Tooltip>
          <Tooltip message={t('common.actions.archive')}>
            <DeprecatedIconButton
              data-testid='task-archive-button'
              disabled={!!product.archivedAt}
              icon={<DeleteIcon />}
              size='sm'
              square={true}
              variant='danger-outlined'
              onClick={onArchiveClick}
            />
          </Tooltip>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
};
