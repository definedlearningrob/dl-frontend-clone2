import { useField } from 'formik';

import SharedTextarea, { Props as TextareaProps } from '@shared/components/Textarea/Textarea';

interface Props extends TextareaProps {
  name: string;
}

function SharedFormTextarea(props: Props) {
  const { name } = props;
  const [field, meta] = useField(name);
  const errorMessage = meta.error && meta.touched ? meta.error : undefined;

  return <SharedTextarea errorMessage={errorMessage} field={field} {...props} />;
}

export default SharedFormTextarea;
