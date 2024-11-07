import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LinkIcon } from '@shared/svg/link.svg';
import { ReactComponent as Delete } from '@shared/svg/delete_outlined.svg';
import { TextInput } from '@shared/components/TextInput/TextInput';
import { Tooltip } from '@shared/components/Tooltip';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  onRemove: () => void;
  index: number;
};

export const SingleCustomContactLink = ({ index, onRemove }: Props) => {
  const [inputField] = useField(`additionalUrls[${index}]`);
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  return (
    <div key={index} className='flex w-full'>
      <li className='flex flex-1 items-center'>
        <TextInput
          Icon={LinkIcon}
          className='flex-1 mr-sm'
          field={inputField}
          iconPlacement='start'
          placeholder={t('user.partners.links.customLinkPlaceholder')}
        />
      </li>
      <Tooltip className='flex items-center' message={t('common.actions.delete')}>
        <IconButton
          Icon={Delete}
          size={isFullHD ? 'lg' : 'md'}
          variant='danger'
          onClick={onRemove}
        />
      </Tooltip>
    </div>
  );
};
