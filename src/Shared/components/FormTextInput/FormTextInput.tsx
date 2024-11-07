import { useField } from 'formik';

import { TextInput, TextInputProps } from '@shared/components/TextInput/TextInput';

interface Props extends TextInputProps {
  name: string;
}

const SharedFormTextInput = (props: Props) => {
  const { className, name } = props;
  const [field, meta] = useField(name);
  const errorMessage = meta.error && meta.touched ? meta.error : undefined;

  return <TextInput className={className} errorMessage={errorMessage} field={field} {...props} />;
};

export default SharedFormTextInput;
