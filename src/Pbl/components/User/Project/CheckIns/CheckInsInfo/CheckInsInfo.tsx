import { ReactComponent as WarningIcon } from '@shared/assets/icons/warning_outlined.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  infoText: string;
};

const CheckInsInfo = ({ infoText }: Props) => (
  <div className='inline-flex flex-row justify-items-start items-center bg-warning-100 rounded-xs p-xs'>
    <IconContainer
      Icon={WarningIcon}
      className='mr-xs text-warning-600'
      paddingSize='none'
      size='sm'
    />
    <p className='text-neutral-800 text-xxs font-regular leading-lg mb-0'>{infoText}</p>
  </div>
);

export default CheckInsInfo;
