import { useMutation } from '@apollo/client';

import { GENERATE_ASSESSMENT_REPORT } from '@dc/graphql/user/mutations/generateAssessmentReport';

import { useFileDownload } from '@shared/hooks/useFileDownload';

export const useReportGenerator = () => {
  const { setFileToDownload, fileToDownload } = useFileDownload();

  const [generateFile, { loading }] = useMutation(
    fileToDownload?.mutation || GENERATE_ASSESSMENT_REPORT,
    {
      variables: { input: { ...fileToDownload?.variables } },
    }
  );

  const generateReport = async () => {
    const { data } = await generateFile();

    if (data && fileToDownload?.query) {
      const [dataAccessor] = Object.keys(data);
      const [dataObjectAccessor] = Object.keys(data[dataAccessor]);

      setFileToDownload({
        ...fileToDownload,
        id: data[dataAccessor][dataObjectAccessor].id,
      });
    }
  };

  return {
    generateReport,
    loading,
  };
};
