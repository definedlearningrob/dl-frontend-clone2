import { FunctionComponent, SVGProps } from 'react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { TextInput } from '@shared/components/TextInput/TextInput';
import SharedSwitch from '@shared/components/Switch/Switch';
import { cx } from '@shared/utils/cx';
import { ReactComponent as Delete } from '@shared/svg/delete_outlined.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  onRemove?: (index: number) => void;
  isCustom?: boolean;
  index: number;
  placeholder: string;
};

export const ContactsAndLinksSectionItem = ({
  Icon,
  isCustom,
  onRemove,
  index,
  placeholder,
}: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const [inputField, inputMeta] = useField(`contactLinks[${index}].value`);
  const [visibleField, _, visibleFieldHelpers] = useField(`contactLinks[${index}].visible`);

  const handleChangeVisibility = () => {
    visibleFieldHelpers.setValue(!visibleField.value);
  };

  return (
    <li className='flex flex-1 items-center'>
      <TextInput
        Icon={Icon}
        className='flex-1 mr-sm'
        errorMessage={inputMeta.error}
        field={inputField}
        iconPlacement='start'
        placeholder={placeholder}
      />
      <SharedSwitch
        additionalLabel={t('common.actions.hide')}
        className='me-xs'
        label={t('common.actions.show')}
        value={visibleField.value}
        onChange={handleChangeVisibility}
      />
      <Tooltip delayDuration={300} message={t('common.actions.delete')}>
        <IconButton
          Icon={Delete}
          className={cx({
            '!opacity-0': !isCustom,
          })}
          disabled={!isCustom}
          size={isFullHD ? 'lg' : 'md'}
          variant='danger'
          onClick={() => onRemove && onRemove(index)}
        />
      </Tooltip>
    </li>
  );
};
