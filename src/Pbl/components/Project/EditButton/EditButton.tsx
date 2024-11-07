import DeprecatedIconButton, {
  type TSharedIconButtonProps as DeprecatedIconButtonProps,
} from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as EditIcon } from '@shared/assets/icons/edit.svg';

type Props = Omit<DeprecatedIconButtonProps, 'icon'>;

const EditButton = (props: Props) => (
  <DeprecatedIconButton
    data-testid='edit-button'
    icon={<EditIcon />}
    square={true}
    variant='primary-outlined'
    {...props}
  />
);

export default EditButton;
