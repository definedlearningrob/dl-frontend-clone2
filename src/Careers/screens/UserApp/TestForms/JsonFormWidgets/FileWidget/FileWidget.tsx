import { WidgetProps } from '@rjsf/utils';
import { useState } from 'react';
import { isEmpty } from 'lodash-es';

import SharedDropableArea from '@shared/components/DropableArea/DropableArea';
import FileItem from '@shared/components/FileList/FileItem/FileItem';
import { TFile as OriginalTFile } from '@shared/resources/types';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

import styles from './FileWidget.module.sass';

type TFile = {
  filename: string;
  id: string;
  url: string;
};

export const getFilename = (value: string) => {
  const fallback = 'Unknown.pdf';
  const filename = value.split(';base64,')[0].split('name=')[1] || fallback;

  return filename;
};

export const FileWidget = (props: WidgetProps) => {
  const { label, required, options, onChange, id, value, rawErrors } = props;
  const [selectedFile, setSelectedFile] = useState<TFile | null>(() => {
    if (!value) return null;

    const filename = getFilename(value);

    return { filename, id, url: value };
  });

  const acceptedFiles = options.accept?.toString();

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (files: File[]) => {
    const [file] = files;
    // TODO: handle file validation
    try {
      const convertedFile = await toBase64(file);
      const url = URL.createObjectURL(file);
      const [filetype, rest] = String(convertedFile).split(';base64,');
      const data = `${filetype};name=${file.name};base64,${rest}`;
      onChange(data);
      setSelectedFile({ url, id, filename: file.name });
    } catch (error) {}
  };

  return (
    <div className='flex flex-col gap-xs'>
      <SharedDropableArea
        accept={acceptedFiles}
        className='!h-[200px] !pt-0'
        label={
          <InputLabel isRequired={required} isSmall={false}>
            <InjectedContent content={label} />
          </InputLabel>
        }
        multiple={false}
        onDrop={handleChange}
      />
      {selectedFile && (
        <FileItem
          archiveDisabled={true}
          className={styles.fileItem}
          disabled={isEmpty(selectedFile.url)}
          file={selectedFile as OriginalTFile}
          rounded={true}
          variant='light'
        />
      )}
      <ErrorMessage errorMessage={rawErrors?.join(', ')} />
    </div>
  );
};
