import { useState } from 'react';
import { ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { TProductSubmission as TStudentProductSubmissison } from '@pbl/graphql/student/queries/projectProducts';
import { TProductSubmission as TUserProductSubmission } from '@pbl/graphql/user/queries/productSubmissionToGrade';
import useCreateProductSubmissionFile from '@pbl/graphql/shared/hooks/useCreateProductSubmissionFile';
import useCreateProductSubmissionGoogleFile from '@pbl/graphql/shared/hooks/useCreateProductSubmissionGoogleFile';
import useDeleteProductSubmissionFile from '@pbl/graphql/shared/hooks/useDeleteProductSubmissionFile';

import { fileUpload } from '@shared/services/aws';
import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/enums';
import { GoogleUploadHandlerData } from '@shared/resources/types';
import useGeneratePresignedUploadUrl from '@shared/graphql/hooks/useGeneratePresignedUploadUrl';
import { callToast } from '@shared/components/Toaster/Toaster';

import { useCreateProductSubmission } from './useCreateProductSubmission';

type ProductSubmissionOptions = {
  projectId: string;
  productId: string;
  studentId?: string;
  teamId?: string;
  isUser?: boolean;
};

const useProductSubmission = (
  submission: TStudentProductSubmissison | TUserProductSubmission | null,
  { productId, projectId, teamId, studentId, isUser }: ProductSubmissionOptions
) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  //mutations
  const [getPresignedUrl, { loading: presignedLoading }] = useGeneratePresignedUploadUrl();
  const [createSubmission, { loading: submissionLoading }] = useCreateProductSubmission({
    projectId,
    productId,
    teamId,
    studentId,
    isUser,
  });
  const [createSubmissionFile, { loading: fileLoading }] = useCreateProductSubmissionFile();
  const [createProductSubmissionGoogleFile, { loading: googleFileLoading }] =
    useCreateProductSubmissionGoogleFile();
  const [deleteSubmissionFile, { loading: deleteFileLoading }] = useDeleteProductSubmissionFile();

  const loadingStatuses = [
    presignedLoading,
    submissionLoading,
    fileLoading,
    googleFileLoading,
    deleteFileLoading,
  ];
  const isLoading = loadingStatuses.includes(true);
  const files = submission?.files || [];

  const getSubmissionId = async () => {
    if (submission) return submission.id;
    try {
      const { data } = await createSubmission();

      return data?.createProductSubmission.productSubmission.id;
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) callToast('error', e.message);
      callToast('error', t('student.project.submission.upload.error'));

      return null;
    }
  };

  const onFilePick = async (files: File[]) => {
    setLoading(true);
    try {
      const submissionId = await getSubmissionId();

      if (!submissionId) return;

      await handleFilesUpload(files, submissionId);

      setLoading(false);
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('student.project.submission.upload.error'));
      }
      setLoading(false);
    }
  };

  const onGoogleFilePick = async ({ data, token }: GoogleUploadHandlerData) => {
    if (data.action === 'picked') {
      setLoading(true);
      try {
        const submissionId = await getSubmissionId();

        if (!submissionId) return;

        await handleGoogleFilesUpload({ data, token }, submissionId);
        setLoading(false);
      } catch (e: ApolloError | unknown) {
        if (e instanceof ApolloError) {
          callToast('error', e.message);
        } else {
          callToast('error', t('student.project.submission.upload.error'));
        }
        setLoading(false);
      }
    }
  };

  const handleFilesUpload = async (files: File[], submissionId: string) => {
    try {
      await Promise.all(
        files.map(async (file) => {
          const response = await fileUpload(
            file as File,
            getPresignedUrl,
            RESOURCE_CLASS.PRODUCT_SUBMISSION_FILE,
            ASSET_TYPE.FILE
          );
          await response.promise;

          await createSubmissionFile(response, submissionId);
        })
      );
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('student.project.submission.upload.error'));
      }
    }
  };

  const handleGoogleFilesUpload = async (
    { data, token }: GoogleUploadHandlerData,
    submissionId: string
  ) => {
    try {
      const googleFiles = data.docs.map((doc) => ({
        filename: doc.name,
        id: doc.id,
        size: doc.sizeBytes,
        source: 'google',
        token,
      }));

      await Promise.all(
        googleFiles.map(
          async (file) => await createProductSubmissionGoogleFile(token, file.id, submissionId)
        )
      );
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('student.project.submission.upload.error'));
      }
    }
  };

  const handleArchiveFile = async (fileId: string) => {
    try {
      await deleteSubmissionFile(fileId);
      callToast('success', t('student.project.submissions.archive.success'));
    } catch (e) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('student.project.submissions.archive.error'));
      }
    }
  };

  return {
    files,
    isMutationLoading: isLoading,
    isFilePickLoading: loading,
    onFilePick,
    onGoogleFilePick,
    handleArchiveFile,
  };
};
export default useProductSubmission;
