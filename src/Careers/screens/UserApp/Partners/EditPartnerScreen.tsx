import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VisibilityScope } from '@graphql/dc/shared/types';
import {
  usePartnerQuery,
  useUpdatePartnerMutation,
  PartnerOverviewDocument,
} from '@graphql/dc/users/hooks';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { PartnerForm } from '@dc/components/User/Partners/PartnerForm/PartnerForm';
import { CreatePartnerFormValues } from '@dc/screens/UserApp/Partners/CreatePartnerScreen';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { handleError } from '@shared/utils/handleError';
import { callToast } from '@shared/components/Toaster/Toaster';
import { fileUploadWithPresignedUrl } from '@shared/services/aws';

import { useSavePartnerDocuments } from './useSavePartnerDocuments';

export const EditPartnerScreen = () => {
  const history = useHistory();

  const { setBackNavButton } = useNavigation();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [updatePartner] = useUpdatePartnerMutation();
  const { saveDocuments } = useSavePartnerDocuments();

  const { data, loading } = usePartnerQuery({
    variables: { id },
  });

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  if (loading || !data) {
    return null;
  }

  const { partner } = data;
  const initialValues = {
    about: partner.about,
    name: partner.name,
    pathways: partner.pathways.map((pathway) => ({ value: pathway.id, label: pathway.name })),
    additionalUrls: partner.additionalUrls,
    address: partner.address,
    details: partner.details,
    email: partner.email,
    entityUuids: partner.entities.map((entity) => ({ value: entity.uuid, label: entity.name })),
    imageFilename: '',
    imageUuid: '',
    courseIds: partner.courses.map((course) => course.id),
    opportunities: partner.opportunities,
    phone: partner.phone,
    imageData: { url: partner.imageUrl || partner.thumbnailUrl },
    imageFitToContainer: partner.imageFitToContainer,
    status: partner.status,
    url: partner.url,
    visibilityScope: partner.visibilityScope,
    documents: partner.documents,
    newDocuments: [],
  };

  const handleSubmit = async (values: CreatePartnerFormValues) => {
    const {
      about,
      additionalUrls,
      address,
      courseIds,
      details,
      email,
      entityUuids,
      imageData,
      name,
      pathways,
      opportunities,
      phone,
      status,
      url,
      visibilityScope,
      imageFitToContainer,
    } = values;

    const isGlobalPartner = visibilityScope === VisibilityScope.ALL;
    const normalizedEntityUuids = isGlobalPartner ? [] : entityUuids.map((entity) => entity.value);
    const normalizedPathways = pathways.map((pathway) => pathway.value);

    const baseBody = {
      about,
      additionalUrls,
      address,
      courseIds,
      details,
      email,
      entityUuids: normalizedEntityUuids,
      name,
      pathwayIds: normalizedPathways,
      phone: phone && phone.toString(),
      opportunityIds: opportunities?.map((opportunity) => opportunity.id),
      status,
      url,
      visibilityScope,
      imageFitToContainer,
    };

    const isFileAdded = imageData?.uuid && imageData.file?.name;

    const updatedImage = {
      imageUuid: imageData?.uuid,
      imageFilename: imageData?.file?.name,
    };

    const input = {
      ...baseBody,
      ...(isFileAdded && updatedImage),
    };

    try {
      await updatePartner({
        variables: {
          input: {
            ...input,
            id,
          },
        },
        refetchQueries: [{ query: PartnerOverviewDocument, variables: { id } }],
      });

      if (imageData?.file && imageData.urlForUpload) {
        await fileUploadWithPresignedUrl(imageData.file, imageData.urlForUpload);
      }

      await saveDocuments({
        documents: values.documents,
        newDocuments: values.newDocuments,
        initialDocuments: partner.documents,
        partnerId: id,
      });

      callToast('success', t('user.partners.form.editSuccess'));
      history.push(`/partner/${id}`);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <SharedMainContent>
      <PartnerForm
        buttonLabel={t('user.partners.form.updatePartner')}
        initialValues={initialValues}
        title={t('user.partners.editPartner', { name: partner.name })}
        onSubmit={handleSubmit}
      />
    </SharedMainContent>
  );
};
