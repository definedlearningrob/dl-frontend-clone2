import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCreatePartnerMutation } from '@graphql/dc/users/hooks';
import { PartnerStatuses, VisibilityScope } from '@graphql/dc/shared/types';
import { Opportunity } from '@graphql/dc/users/types';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { PartnerForm } from '@dc/components/User/Partners/PartnerForm/PartnerForm';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { handleError } from '@shared/utils/handleError';
import { callToast } from '@shared/components/Toaster/Toaster';
import { fileUploadWithPresignedUrl } from '@shared/services/aws';

import { DocumentFile, NewDocumentFile, useSavePartnerDocuments } from './useSavePartnerDocuments';

type Entity = {
  uuid: string;
  name: string | null;
}[];

type Pathways = {
  name: string;
}[];

export type PartnerOpportunity = Pick<
  Opportunity,
  'id' | 'name' | 'imageUrl' | 'thumbnailUrl' | 'opportunityType' | 'visibilityScope'
> & { entities: Entity; pathways: Pathways };

export type CreatePartnerFormValues = {
  about: string;
  name: string;
  pathways: {
    label: string;
    value: string;
  }[];
  additionalUrls: string[] | null;
  address: string | null;
  details: string | null;
  email: string | null;
  entityUuids: {
    label: string | null;
    value: string;
  }[];
  imageFilename?: string;
  imageFitToContainer: boolean;
  courseIds: string[];
  opportunities?: PartnerOpportunity[];
  imageUuid?: string;
  phone: string | null;
  imageData?: { url?: string | null; file?: File; urlForUpload?: string; uuid?: string };
  status: PartnerStatuses;
  url: string | null;
  visibilityScope: VisibilityScope;
  documents: DocumentFile[];
  newDocuments: NewDocumentFile[];
};

export const CreatePartnerScreen = () => {
  const [createPartner] = useCreatePartnerMutation();
  const history = useHistory();
  const { setBackNavButton } = useNavigation();
  const { t } = useTranslation();
  const { saveDocuments } = useSavePartnerDocuments();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  const initialValues = {
    about: '',
    name: '',
    pathways: [],
    additionalUrls: [],
    address: '',
    details: '',
    email: '',
    entityUuids: [],
    imageFilename: '',
    imageUuid: '',
    courseIds: [],
    opportunities: [],
    opportunityIds: [],
    phone: '',
    imageData: { url: '', file: undefined, urlForUpload: '', uuid: '' },
    imageFitToContainer: false,
    status: PartnerStatuses.DRAFT,
    url: '',
    visibilityScope: VisibilityScope.ENTITY,
    documents: [],
    newDocuments: [],
  };

  const handleSubmit = async (values: CreatePartnerFormValues) => {
    const {
      imageData,
      name,
      about,
      address,
      courseIds,
      details,
      email,
      phone,
      url,
      visibilityScope,
      pathways,
      additionalUrls,
      status,
      entityUuids,
      imageFitToContainer,
    } = values;

    const isGlobalPartner = visibilityScope === VisibilityScope.ALL;
    const normalizedEntityUuids = isGlobalPartner ? [] : entityUuids.map((entity) => entity.value);
    const normalizedPathways = pathways.map((pathway) => pathway.value);

    const baseBody = {
      name,
      about,
      address,
      courseIds,
      details,
      email,
      phone: phone && phone.toString(),
      url,
      visibilityScope,
      additionalUrls,
      opportunityIds: values.opportunities?.map((opportunity) => opportunity.id),
      imageFilename: imageData?.file?.name,
      imageUuid: imageData?.uuid,
      pathwayIds: normalizedPathways,
      status: status,
      entityUuids: normalizedEntityUuids,
      imageFitToContainer,
    };

    const input = {
      ...baseBody,
    };

    try {
      const { data } = await createPartner({
        variables: {
          input,
        },
      });

      if (imageData?.file && imageData.urlForUpload) {
        await fileUploadWithPresignedUrl(imageData.file, imageData.urlForUpload);
      }

      const partnerId = data?.createPartner?.partner?.id;

      await saveDocuments({
        documents: [],
        initialDocuments: [],
        newDocuments: values.newDocuments,
        partnerId: partnerId!,
      });

      setTimeout(() => {
        callToast('success', t('user.partners.form.addSuccess'));
        history.push(`/partner/${partnerId}`);
      }, 600);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <SharedMainContent>
      <PartnerForm
        buttonLabel={t('user.partners.form.createPartner')}
        initialValues={initialValues}
        title={t('user.partners.createNewPartner')}
        onSubmit={handleSubmit}
      />
    </SharedMainContent>
  );
};
