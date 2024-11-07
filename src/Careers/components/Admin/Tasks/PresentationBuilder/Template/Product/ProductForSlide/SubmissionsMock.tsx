import { useTranslation } from 'react-i18next';
import { noop } from 'lodash-es';

import { ProductSubmissionFooter } from '@pbl/components/Student/Project/Products/ProductSubmissionFooter';

import FilesUploadSection from '@shared/components/FileUpload/FileUpload';
import { Tooltip } from '@shared/components/Tooltip';

export const SubmissionsMock = () => {
  const { t } = useTranslation();

  return (
    <Tooltip className='w-full' message={t('products.previewMode')}>
      <div className='flex flex-col gap-md pointer-events-none [&&_p]:!text-base'>
        {/* @ts-ignore*/}
        <FilesUploadSection />
        <ProductSubmissionFooter
          disabled={true}
          isLoading={false}
          openModal={noop}
          submission={null}
        />
      </div>
    </Tooltip>
  );
};
