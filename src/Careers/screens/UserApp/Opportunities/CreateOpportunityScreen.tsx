import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { omit } from 'lodash-es';

import { OpportunityForm } from '@dc/components/User/Opportunities/OpportunityForm';
import { useCreateOpportunity } from '@dc/graphql/user/hooks/useCreateOpportunity';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormValues, parseOpportunityFormData } from '@dc/components/User/Opportunities/helpers';
import { VISIBILITY_SCOPE } from '@dc/resources/enums';

import { callToast } from '@shared/components/Toaster/Toaster';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { fileUploadWithPresignedUrl } from '@shared/services/aws';

const initialValues = {
  automaticAcceptance: false,
  availableSpots: 0,
  creditsOutcomes: '',
  visibilityScope: VISIBILITY_SCOPE.ENTITY,
  imageFilename: '',
  imageUuid: '',
  name: '',
  description: '',
  image: '',
  opportunityType: null,
  pathways: [],
  location: '',
  salaryInformation: '',
  tags: [],
  periodStart: null,
  periodEnd: null,
  deadline: null,
  partner: null,
  entityUuids: [],
  imageData: { url: '', file: undefined, urlForUpload: '', uuid: '' },
  imageFitToContainer: true,
};

export const CreateOpportunityScreen = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { setBackNavButton } = useNavigation();
  const [createOpportunity] = useCreateOpportunity();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  const handleSubmit = async (values: FormValues) => {
    const { imageData, ...newValues } = omit(values, ['image']);
    const isGlobalOpportunity = newValues.visibilityScope === VISIBILITY_SCOPE.ALL;
    const entityUuids = isGlobalOpportunity
      ? []
      : newValues.entityUuids.map((entity) => entity.value);

    const isFileAdded = imageData?.uuid && imageData.file?.name;

    const updatedImage = {
      imageUuid: imageData?.uuid,
      imageFilename: imageData?.file?.name,
    };

    const { pathways, ...data } = parseOpportunityFormData(newValues);

    const input = {
      ...data,
      pathwayIds: pathways.map((pathway) => pathway.value),
      entityUuids,
      ...(isFileAdded && updatedImage),
    };

    try {
      const response = await createOpportunity({
        variables: {
          input,
        },
      });

      if (imageData?.file && imageData.urlForUpload) {
        await fileUploadWithPresignedUrl(imageData.file, imageData.urlForUpload);
      }

      const opportunityId = response?.data?.createOpportunity.opportunity.id;

      callToast('success', t('user.opportunities.form.newSuccess'));

      history.push(`/opportunities/${opportunityId}`);
    } catch (e) {
      callToast('error', t('user.opportunities.form.newFailed'));
    }
  };

  return (
    <SharedMainContent>
      <OpportunityForm
        buttonLabel={t('user.opportunities.form.publishOpportunity')}
        initialValues={initialValues}
        title={t('user.opportunities.createOpportunity')}
        onSubmit={handleSubmit}
      />
    </SharedMainContent>
  );
};
