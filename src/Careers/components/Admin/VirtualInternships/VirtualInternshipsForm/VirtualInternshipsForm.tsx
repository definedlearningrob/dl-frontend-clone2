import { Formik, FormikValues } from 'formik';
import { isEmpty } from 'lodash-es';
import { useHistory, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useCareerReviewSurveyLessonQuery } from '@dc/graphql/user/hooks/useCareerReviewSurveyLessonQuery';
import { useCreateVirtualInternship } from '@dc/graphql/user/hooks/useCreateVirtualInternship';
import { useUpdateVirtualInternship } from '@dc/graphql/user/hooks/useUpdateVirtualInternship';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';
import { VirtualInternshipFields } from '@dc/components/Admin/VirtualInternships/VirtualInternshipsForm/VirtualInternshipFields';
import { useAdminVirtualInternshipQuery } from '@dc/graphql/user/hooks/useAdminVirtualInternshipQuery';

import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';
import { RESOURCE_CLASS } from '@shared/resources/enums';
import { useImageUpload } from '@shared/hooks/useImageUpload';
import { callToast } from '@shared/components/Toaster/Toaster';
import Heading from '@shared/components/Heading/Heading';

import { parseData, virtualInternshipFormSchema } from '../helpers';

export const VirtualInternshipsForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const { data: virtualInternshipData } = useAdminVirtualInternshipQuery({ id: id!, skip: !id });

  const isEditing = !!id;

  const courseStatusOptions = [
    { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    { value: PUBLISHING_STATUSES.PUBLISHED, label: t('common.publishingStatuses.published') },
  ];
  const [createVirtualInternship, { loading: createVirtualInternshipLoading }] =
    useCreateVirtualInternship();
  const [updateVirtualInternship, { loading: updateVirtualInternshipLoading }] =
    useUpdateVirtualInternship();
  const [uploadImage] = useImageUpload();
  const { data } = useCareerReviewSurveyLessonQuery();
  const initialPostExperienceLessonsWithSurvey = isEmpty(data)
    ? []
    : [{ ...data.careerReviewSurveyLesson, step: 1 }];

  useClearCacheOnUnmount('virtualInternship');

  const initialValues = useMemo(
    () => ({
      badges: virtualInternshipData?.virtualInternship.badges || [],
      description: virtualInternshipData?.virtualInternship.opportunity.description || '',
      name: virtualInternshipData?.virtualInternship.opportunity.name || '',
      pathways:
        virtualInternshipData?.virtualInternship.opportunity.pathways.map((pathway) => ({
          label: pathway.name,
          value: pathway.id,
        })) || [],
      availableSpots: virtualInternshipData?.virtualInternship.opportunity.availableSpots || 0,
      creditsOutcomes: virtualInternshipData?.virtualInternship.opportunity.creditsOutcomes || '',
      image: virtualInternshipData?.virtualInternship.opportunity.imageUrl || '',
      tags:
        virtualInternshipData?.virtualInternship.opportunity.tags.map((tag) => ({
          label: tag,
          value: tag,
        })) || [],
      requiredExperiences: virtualInternshipData?.virtualInternship.requiredExperiences || 0,
      status:
        courseStatusOptions.find(
          (option) => option.value === virtualInternshipData?.virtualInternship?.status
        ) || courseStatusOptions[0],
      calendarLessons: virtualInternshipData?.virtualInternship.calendarLessons || [],
      experienceOpportunityLessons:
        virtualInternshipData?.virtualInternship.experienceOpportunityLessons || [],
      postExperienceLessons:
        virtualInternshipData?.virtualInternship.postExperienceLessons ||
        initialPostExperienceLessonsWithSurvey,
      readinessSkillsLessons: virtualInternshipData?.virtualInternship.readinessSkillsLessons || [],
    }),
    [data, virtualInternshipData]
  );

  const handleCreateNewVirtualInternship = async (values: FormikValues) => {
    const { image, ...newValues } = values;

    try {
      const imageData = image && (await uploadImage(image.file, RESOURCE_CLASS.OPPORTUNITY));

      //@ts-ignore
      const data = parseData(newValues);
      await createVirtualInternship({
        variables: {
          input: {
            ...imageData,
            ...data,
            status: data.status.value,
          },
        },
      });

      callToast('success', t('admin.virtualInternship.formMessages.newSuccess'));
      history.push(`/admin/virtual-internships`);
    } catch (error) {
      callToast('error', t('admin.virtualInternship.formMessages.newFailed'));
    }
  };

  const handleEditVirtualInternship = async (values: FormikValues) => {
    const { image, ...newValues } = values;

    try {
      const imageData =
        image &&
        typeof image !== 'string' &&
        (await uploadImage(image.file, RESOURCE_CLASS.OPPORTUNITY));

      //@ts-ignore
      const data = parseData(newValues);

      await updateVirtualInternship({
        variables: {
          input: {
            ...imageData,
            ...data,
            status: data.status.value,
            id: virtualInternshipData?.virtualInternship.id,
          },
        },
      });

      callToast('success', t('admin.virtualInternship.formMessages.editSuccess'));
      history.goBack();
    } catch (error) {
      callToast('error', t('admin.virtualInternship.formMessages.editFailed'));
    }
  };

  return (
    <>
      <Heading>
        {isEditing
          ? t('admin.virtualInternship.editVirtualInternship')
          : t('admin.virtualInternship.createVirtualInternship')}
      </Heading>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={virtualInternshipFormSchema}
        onSubmit={isEditing ? handleEditVirtualInternship : handleCreateNewVirtualInternship}>
        <VirtualInternshipFields
          courseStatusOptions={courseStatusOptions}
          isLoading={createVirtualInternshipLoading || updateVirtualInternshipLoading}
        />
      </Formik>
    </>
  );
};
