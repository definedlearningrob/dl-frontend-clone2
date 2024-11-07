import { AssetType, ResourceClass } from '@dc/resources/enums';

/* eslint-disable no-undef */
export const fileUpload = async (
  file: File,
  presignedMutation: Function,
  resourceClass: ResourceClass,
  assetType: AssetType,
  onProgress?: (a: number) => unknown
): Promise<{
  uuid: string;
  url: string;
  file: File;
  promise: Promise<unknown>;
  abort: Function;
}> => {
  const baseBody = {
    filename: file.name,
    resourceClass,
    assetType,
  };

  const { data } = await presignedMutation({
    variables: {
      input: baseBody,
    },
  });

  const {
    generatePresignedUploadUrl: { url, uuid },
  } = data;

  const xhr = new XMLHttpRequest();

  const promise = new Promise((resolve, reject) => {
    _uploadFile(xhr, file, url, resolve, reject, onProgress);
  });

  const abort = () => xhr.abort();

  return { uuid, url, file, promise, abort };
};

const _uploadFile = (
  xhr: XMLHttpRequest,
  file: File,
  uploadUrl: string,
  resolve: (value: unknown) => void,
  reject: Function,
  onProgress?: (a: number) => unknown
): void => {
  xhr.open('PUT', uploadUrl);
  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percent = Math.round((event.loaded / event.total) * 100);

      if (onProgress) {
        onProgress(percent);
      }
    }
  };
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve(null);
      } else {
        reject(new Error('An error occured during upload'));
      }
    }
  };
  xhr.send(file);
};
