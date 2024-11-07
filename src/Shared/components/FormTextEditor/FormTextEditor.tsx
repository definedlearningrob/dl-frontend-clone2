import { useField } from 'formik';

import SharedTextEditor, {
  type Props as SharedTextEditorProps,
} from '@shared/components/TextEditor/TextEditor';

type Props = Omit<SharedTextEditorProps, 'value' | 'onChange'> & {
  name: string;
};

const SharedFormTextEditor = ({ name, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);
  const errorMessage = meta.touched && meta.error ? meta.error : undefined;

  return (
    <SharedTextEditor
      errorMessage={errorMessage}
      value={field.value}
      onChange={helpers.setValue}
      {...props}
    />
  );
};

export default SharedFormTextEditor;
