import { Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import ExtensionsModalImagePicker from '@dc/components/Extensions/Modal/ImagePicker/ImagePicker';
import styles from '@dc/components/Admin/VirtualInternships/VirtualInternshipsForm/VirtualInternshipsForm.module.sass';
import {
  CalendarLessons,
  ExperienceOpportunityLessons,
  PostExperienceLessons,
  ReadinessSkillsLessons,
} from '@dc/components/Admin/VirtualInternships/VirtualInternshipsForm/Lessons';
import PATHWAYS_QUERY, { TPathwaysData } from '@dc/graphql/user/queries/pathways';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';
import { BadgesSelector } from '@dc/components/Admin/BadgeManagement/BadgesSelector/BadgesSelector';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import { FormSelect } from '@shared/components/FormSelect';
import SharedFormTextEditor from '@shared/components/FormTextEditor/FormTextEditor';
import { FormCreatable } from '@shared/components/FormCreatable/FormCreatable';
import Card from '@shared/components/Card/Card';

type Props = {
  courseStatusOptions: { value: string; label: string }[];
  isLoading: boolean;
};

export const VirtualInternshipFields = ({ courseStatusOptions, isLoading }: Props) => {
  const { t } = useTranslation();
  const { data: pathwaysData, loading } = useQuery<TPathwaysData>(PATHWAYS_QUERY);
  const history = useHistory();

  useScrollToInvalidFormElement();

  const pathwaysOptions = pathwaysData?.pathways.map((pathway) => ({
    label: pathway.name,
    value: pathway.id,
  }));

  return (
    <Form className='flex flex-col gap-base'>
      <div className='flex'>
        <ExtensionsModalImagePicker />
        <div className='flex flex-col grow ml-base'>
          <SharedFormTextInput
            className='mb-sm'
            isRequired={true}
            label={t('user.opportunities.name')}
            name='name'
          />
          <div className='w-1/3'>
            <FormSelect
              isRequired={true}
              label={t('common.fields.common.status')}
              name='status'
              options={courseStatusOptions}
            />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <SharedFormTextEditor label={t('user.opportunities.description')} name='description' />
        <SharedFormTextEditor
          label={t('user.opportunities.creditOutcomes')}
          name='creditsOutcomes'
        />
        <div className={styles.container}>
          <FormSelect
            isDisabled={loading}
            isMulti={true}
            isRequired={true}
            label={t('user.opportunities.assignedPathways')}
            name='pathways'
            options={pathwaysOptions}
          />
          <FormCreatable
            isMulti={true}
            label={t('user.opportunities.tags')}
            name='tags'
            placeholder={t('user.opportunities.createTag')}
          />
        </div>
        <div className='flex gap-base mb-sm basis-1/2'>
          <SharedFormTextInput
            label={t('admin.virtualInternship.requiredExperiences')}
            name='requiredExperiences'
            type='number'
          />
        </div>
      </div>
      <CalendarLessons />
      <ExperienceOpportunityLessons />
      <PostExperienceLessons />
      <ReadinessSkillsLessons />
      <Card>
        <BadgesSelector />
      </Card>
      <FormActions isLoading={isLoading} onCancel={history.goBack} />
    </Form>
  );
};
