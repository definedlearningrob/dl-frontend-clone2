import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { omit } from 'lodash-es';

import { OpportunityForm } from '@dc/components/User/Opportunities/OpportunityForm';
import { useUpdateOpportunity } from '@dc/graphql/user/hooks/useUpdateOpportunity';
import { FormValues, parseOpportunityFormData } from '@dc/components/User/Opportunities/helpers';
import { useOpportunityQuery } from '@dc/graphql/user/hooks/useOpportunityQuery';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { VISIBILITY_SCOPE } from '@dc/resources/enums';

import { callToast } from '@shared/components/Toaster/Toaster';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { fileUploadWithPresignedUrl } from '@shared/services/aws';

export const EditOpportunityScreen = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { setBackNavButton } = useNavigation();
  const [updateOpportunity] = useUpdateOpportunity();
  const { data, loading } = useOpportunityQuery({ id });

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  if (loading || !data) {
    return null;
  }

  const { opportunity } = data;

  const initialValues = {
    automaticAcceptance: opportunity.automaticAcceptance,
    availableSpots: opportunity.availableSpots ?? 0,
    creditsOutcomes: opportunity.creditsOutcomes,
    name: opportunity.name,
    visibilityScope: opportunity.visibilityScope,
    description: opportunity.description, // Rich text
    image: opportunity.imageUrl,
    opportunityType: {
      label: t(`opportunities.types.${opportunity.opportunityType}`),
      value: opportunity.opportunityType,
    },
    entityUuids: opportunity.entities.map((entity) => ({ value: entity.uuid, label: entity.name })),
    pathways: opportunity.pathways.map((pathway) => ({ value: pathway.id, label: pathway.name })),
    location: opportunity.location,
    salaryInformation: opportunity.salaryInformation,
    tags: opportunity.tags.map((tag) => ({
      label: tag,
      value: tag,
    })),
    periodStart: opportunity.periodStart ? new Date(opportunity.periodStart) : null,
    periodEnd: opportunity.periodEnd ? new Date(opportunity.periodEnd) : null,
    deadline: opportunity.deadline ? new Date(opportunity.deadline) : null,
    imageData: { url: opportunity.imageUrl || opportunity.thumbnailUrl },
    imageFitToContainer: opportunity.imageFitToContainer,
    partner: opportunity.partner
      ? { label: opportunity.partner.name, value: opportunity.partner.id }
      : null,
  };

  const handleSubmit = async (values: FormValues) => {
    const { imageData, ...newValues } = omit(values, ['image']);

    const isFileAdded = imageData?.uuid && imageData.file?.name;

    const updatedImage = {
      imageUuid: imageData?.uuid,
      imageFilename: imageData?.file?.name,
    };

    const isGlobalOpportunity = newValues.visibilityScope === VISIBILITY_SCOPE.ALL;
    const entityUuids = isGlobalOpportunity
      ? []
      : newValues.entityUuids.map((entity) => entity.value);

    const { pathways, ...data } = parseOpportunityFormData(newValues);

    const input = {
      ...data,
      pathwayIds: pathways.map((pathway) => pathway.value),
      entityUuids,
      id: opportunity.id,
      ...(isFileAdded && updatedImage),
    };

    try {
      await updateOpportunity({
        variables: {
          input,
        },
      });

      if (imageData?.file && imageData.urlForUpload) {
        await fileUploadWithPresignedUrl(imageData.file, imageData.urlForUpload);
      }

      callToast('success', t('user.opportunities.form.editSuccess'));

      history.goBack();
    } catch (e) {
      callToast('error', t('user.opportunities.form.editFailed'));
    }
  };

  return (
    <SharedMainContent>
      <OpportunityForm
        buttonLabel={t('user.opportunities.form.updateOpportunity')}
        initialValues={initialValues}
        title={t('user.opportunities.editOpportunity', { name: opportunity.name })}
        onSubmit={handleSubmit}
      />
    </SharedMainContent>
  );
};
