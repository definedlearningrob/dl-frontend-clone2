import { useTranslation } from 'react-i18next';
import { Formik, FormikHelpers } from 'formik';
import { isEmpty, uniq } from 'lodash-es';
import * as Yup from 'yup';
import { useEffect } from 'react';

import { customLinkUrlValidationSchema } from '@dc/resources/validationSchemas';

import { useUpdateResume } from '@shared/graphql/student/hooks/useUpdateResume';
import usePortfolioResumesQuery from '@shared/graphql/student/hooks/usePortfolioResumesQuery';
import { ContactLink, ResumeItemAttributes } from '@shared/resources/types';
import { callToast } from '@shared/components/Toaster/Toaster';
import { File } from '@shared/components/FileList/FileItem/FileItem';
import { PartiallyOptional } from '@shared/utils/types';
import { EditPortfolioForm } from '@shared/components/EditPortfolio/EditPortfolioForm';
import { EditPortfolioLoader } from '@shared/components/EditPortfolio/EditPortfolioLoader';
import { handleError } from '@shared/utils/handleError';
import { omitTypename } from '@shared/utils/omitTypename';
import { EditPortfolioPreview } from '@shared/components/EditPortfolio/EditPortfolioPreview';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import { defaultContactLinks } from './helpers';
import { HighlightedProject } from './types';

export type PortfolioFormValues = {
  avatar: {
    uuid: string | null;
    filename: string | null;
    url: string | null;
    file: File | null;
    isUpdated: boolean;
  };
  bio: string;
  contactLinks: PartiallyOptional<ContactLink, 'id'>[];
  highlightedProjectsEnabled: boolean;
  name: string;
  sharedUrlEnabled: boolean;
  experiences: PartiallyOptional<ResumeItemAttributes, 'id'>[];
  educations: PartiallyOptional<ResumeItemAttributes, 'id'>[];
  extraCurriculars: PartiallyOptional<ResumeItemAttributes, 'id'>[];
  highlightedProjects: HighlightedProject[];
  highlightedBadgeIds: string[];
};

export const EditPortfolio = () => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const [updateResume] = useUpdateResume();
  const { params } = useQueryParams<{ preview: string }>();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  const { data: resumesData } = usePortfolioResumesQuery();

  if (!resumesData) return <EditPortfolioLoader />;

  const {
    portfolio: { sharedResume },
  } = resumesData;

  const onSubmit = async (
    values: PortfolioFormValues,
    actions: FormikHelpers<PortfolioFormValues>
  ) => {
    const { avatar, highlightedProjects, ...rest } = values;

    const avatarData = { avatarUuid: avatar.uuid, avatarFilename: avatar.filename };
    const highlightedProjectPayload = highlightedProjects.map((project) => ({
      projectType: project.projectType,
      projectId: project.projectId,
    }));

    const payload = {
      highlightedProjects: highlightedProjectPayload,
      ...rest,
      ...(avatar.isUpdated && avatarData),
    };

    try {
      await updateResume(payload);
      actions.setFieldValue('avatar.isUpdated', false);

      callToast(
        'success',
        t('common.notifications.success.updated', { name: t('portfolio.portfolio') })
      );
    } catch (error) {
      handleError(error);
    }
  };
  const isPreview = params.preview === 'true';

  const contactLinks = sharedResume?.contactLinks || [];
  const experiences = sharedResume?.experiences || [];
  const educations = sharedResume?.educations || [];
  const extraCurriculars = sharedResume?.extraCurriculars || [];
  const dcProjects = sharedResume?.dcProjects.nodes || [];
  const dlProjects = sharedResume?.dlProjects.nodes || [];
  const personalProjects = sharedResume?.personalProjects.nodes || [];
  const highlightedBadges = sharedResume?.highlightedBadges || [];
  const highlightedProjects = [...dcProjects, ...dlProjects, ...personalProjects].reduce(
    (acc, current) => {
      if (current.isHighlighted) {
        acc.push({
          ...current,
          projectId: current.id,
          projectType: current.resourceClass,
        });
      }

      return acc;
    },
    [] as HighlightedProject[]
  );

  const initialContactLinks = contactLinks.map(omitTypename);

  const initialValues = {
    avatar: {
      uuid: null,
      filename: null,
      url: sharedResume?.avatarUrl || '',
      file: null,
      isUpdated: false,
    },
    bio: sharedResume?.bio || '',
    contactLinks: !isEmpty(contactLinks) ? initialContactLinks : defaultContactLinks,
    highlightedProjectsEnabled: !!sharedResume?.highlightedProjectsEnabled,
    name: sharedResume?.name || '',
    sharedUrlEnabled: !!sharedResume?.sharedUrlEnabled,
    experiences: experiences.map(omitTypename),
    educations: educations.map(omitTypename),
    extraCurriculars: extraCurriculars.map(omitTypename),
    highlightedBadgeIds: uniq(highlightedBadges.map((badge) => badge.id)),
    highlightedProjects: highlightedProjects.map(omitTypename),
  };

  const resumeItemValidationSchema = Yup.array().of(
    Yup.object().shape({
      description: Yup.string(),
      name: Yup.string().required(t('validation.messages.required')),
      startedAt: Yup.date().required(t('portfolio.creator.startDateRequired')).nullable(),
    })
  );

  const validationSchema = Yup.object().shape({
    contactLinks: Yup.array().of(customLinkUrlValidationSchema),
    educations: resumeItemValidationSchema,
    experiences: resumeItemValidationSchema,
    extraCurriculars: resumeItemValidationSchema,
    name: Yup.string().required(t('validation.messages.required')),
  });

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {!isPreview ? <EditPortfolioForm /> : <EditPortfolioPreview />}
    </Formik>
  );
};
