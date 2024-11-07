import { WidgetProps } from '@rjsf/utils';
import PhoneInput, { CountryData } from 'react-phone-input-2';

// Bootstrap one is the closest to what we want
import 'react-phone-input-2/lib/bootstrap.css';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';

import styles from './PhoneWidget.module.sass';

export const PhoneWidget = (props: WidgetProps) => {
  const { label, disabled, id, name, placeholder, rawErrors, onChange, required, value } = props;

  const handleOnChange = (value: string, data: CountryData) => {
    if (!required && value === '') {
      onChange(undefined);

      return;
    }
    onChange(`${data.dialCode}||${value}`);
  };

  // Basically due to the common app parsing logic, we need to store the country code and the phone number separately
  // to be able to parse it correctly during the submission and validation
  // We use the || separator to split the value into two parts
  const inputValue = value?.includes('||') ? value.split('||')[1] : value;

  return (
    <div>
      <InputLabel isRequired={required} isSmall={false}>
        {label}
      </InputLabel>
      <PhoneInput
        containerClass='mt-xs bg-white'
        country='us'
        disableSearchIcon={true}
        disabled={disabled}
        enableSearch={true}
        inputClass={styles.input}
        inputProps={{
          id,
          name,
          required,
        }}
        placeholder={placeholder}
        preferredCountries={['us', 'ca', 'mx']}
        prefix='+'
        searchClass={styles.search}
        value={inputValue}
        onChange={handleOnChange}
      />
      <ErrorMessage errorMessage={rawErrors?.join(', ')} />
    </div>
  );
};
