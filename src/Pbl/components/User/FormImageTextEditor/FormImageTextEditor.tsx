import { useField } from 'formik';

import SharedImageTextEditor, {
  type Props as SharedTextEditorProps,
} from '@pbl/components/User/ImageTextEditor/ImageTextEditor';

type Props = Omit<SharedTextEditorProps, 'value' | 'onChange'> & {
  name: string;
};

const SharedFormImageTextEditor = ({ name, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);
  const errorMessage = meta.touched && meta.error ? meta.error : undefined;

  return (
    <SharedImageTextEditor
      errorMessage={errorMessage}
      value={field.value}
      onChange={helpers.setValue}
      {...props}
    />
  );
};

export default SharedFormImageTextEditor;
