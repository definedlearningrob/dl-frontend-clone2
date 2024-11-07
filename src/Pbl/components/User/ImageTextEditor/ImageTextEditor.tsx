/* eslint-disable camelcase */
import { useMutation } from '@apollo/client';
import { useRef, useState, type HTMLProps } from 'react';
import { Editor, IAllProps } from '@tinymce/tinymce-react';

import { fileUpload } from '@dc/services/aws';

import CREATE_PUBLIC_RESOURCE, {
  type TCreatePublicResourceData,
  TCreatePublicResourceVariables,
} from '@pbl/graphql/user/mutations/createPublicResource';

import GENERATE_PRESIGNED_UPLOAD_URL from '@shared/graphql/shared/mutations/generatePresignedUploadUrl';
import { extractImgTags, extractUuid, extractSrc } from '@shared/utils/editor';
import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/enums';

import styles from './ImageTextEditor.module.sass';

export type Props = HTMLProps<HTMLDivElement> & {
  defaultToolbarType?: boolean;
  onChange: (value: string) => void;
  value: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
};

type UploadHandler = NonNullable<IAllProps['init']>['images_upload_handler'];

// TinyMCE editor setup files

const defaultToolbar = `undo redo | link image | formatselect | bold italic backcolor |
alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
removeformat | bullist numlist outdent indent | removeformat | code`;

const announcementsToolbar = `undo redo | formatselect | bold italic backcolor |
alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
removeformat | link unlink `;

const plugins = [
  'advlist',
  'autolink',
  'lists',
  'link',
  'image',
  'charmap',
  'print',
  'preview',
  'anchor',
  'searchreplace',
  'visualblocks',
  'code',
  'fullscreen',
  'insertdatetime',
  'media',
  'table',
  'paste',
  'help',
  'wordcount',
];

function SharedImageTextEditor({
  defaultToolbarType = true,
  onChange,
  errorMessage,
  label,
  placeholder,
  value,
  ...attributes
}: Props) {
  const [getPresignedUrl] = useMutation(GENERATE_PRESIGNED_UPLOAD_URL);
  const [createPublicResource] = useMutation<
    TCreatePublicResourceData,
    TCreatePublicResourceVariables
  >(CREATE_PUBLIC_RESOURCE);
  const [addedImageUuid, setAddedImageUuid] = useState<string | null>(null);

  const prevValue = useRef(value);

  const handleEditorChange = (content: string) => {
    prevValue.current = value;
    const previousImages = extractImgTags(prevValue.current);
    const currentImages = extractImgTags(content);
    const hasNoImages = currentImages.length === 0 && previousImages.length === 0;

    if (hasNoImages) {
      onChange(content);

      return;
    }

    const isAddingImage = currentImages.length > previousImages.length;
    const isRemovingImage = currentImages.length < previousImages.length;

    if (isRemovingImage) {
      onChange(content);
    } else if (isAddingImage) {
      const newImageTags = Array.from(currentImages);
      const unidentifiedImageTag = newImageTags.find((newTag) => !newTag.includes('longdesc='));

      if (unidentifiedImageTag) {
        const identifier = ` longdesc="${addedImageUuid}" `;
        const identifiedImageTag = unidentifiedImageTag.replace(' ', identifier);
        const newContent = content.replace(unidentifiedImageTag, identifiedImageTag);
        onChange(newContent);
        setAddedImageUuid(null);
      }
    } else {
      const previousImageSrcs = previousImages.map((img) => extractSrc(img));
      // We detect updated image by searching for image with new src value
      const updatedImage = currentImages.find(
        (img) => !previousImageSrcs.includes(extractSrc(img))
      );

      if (updatedImage) {
        const updatedImageWithNewUuid = updatedImage.replace(
          ` longdesc="${extractUuid(updatedImage)}" `,
          ` longdesc="${addedImageUuid}" `
        );
        const newContent = content.replace(updatedImage, updatedImageWithNewUuid);

        onChange(newContent);
      } else {
        onChange(content);
      }
    }
  };
  const poll = async function (url: string): Promise<Error | Response> {
    let iteration = 1;

    return new Promise((resolve, reject) => {
      const refetch = setInterval(async () => {
        const result = await fetch(url).catch(() => {});

        if (typeof result === 'object' && result.ok && result.status === 200) {
          clearInterval(refetch);
          resolve(result);
        }
        if (iteration > 3) {
          clearInterval(refetch);
          reject(new Error('Polling failed'));
        }
        iteration++;
      }, 1500);
    });
  };

  const uploadImage: UploadHandler = async (blobInfo, success, failure, progress) => {
    try {
      //@ts-ignore
      progress(1);

      const response = await fileUpload(
        blobInfo.blob() as File,
        getPresignedUrl,
        //@ts-ignore
        RESOURCE_CLASS.PUBLIC_RESOURCE,
        ASSET_TYPE.IMAGE
      );

      await response.promise;

      //@ts-ignore
      progress(50);

      const { data } = await createPublicResource({
        variables: {
          input: { uuid: response.uuid, filename: response.file.name, type: ASSET_TYPE.IMAGE },
        },
      });

      if (data === null || data === undefined) {
        failure('Failed to upload image');

        return;
      }

      //@ts-ignore
      progress(75);

      setAddedImageUuid(response.uuid);

      const imgResponse = await poll(data.createPublicResource.publicResource.url);

      if ('status' in imgResponse) {
        success(data.createPublicResource.publicResource.url);
      } else {
        throw new Error('no access to image');
      }
      //@ts-ignore
      progress(100);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      failure('Image upload failed due to' + JSON.stringify(e));
    }
  };

  return (
    <div className={styles.textEditor} data-testid='text-editor' {...attributes}>
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
      <Editor
        id={label}
        init={{
          license_key: 'gpl',
          menubar: false,
          plugins,
          toolbar: defaultToolbarType ? defaultToolbar : announcementsToolbar,
          placeholder: placeholder || 'Type here...',
          paste_as_text: true,
          images_upload_handler: uploadImage,
        }}
        textareaName={label}
        tinymceScriptSrc='/node_modules/tinymce/tinymce.min.js'
        value={value}
        onEditorChange={handleEditorChange}
      />
      {errorMessage && <div className='input-error-message'>{errorMessage}</div>}
    </div>
  );
}

export default SharedImageTextEditor;
