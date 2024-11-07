import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { VISIBILITY_SCOPE } from '@dc/resources/enums';
import { ImportantDatesFormElement } from '@dc/components/User/Opportunities/OpportunityForm/ImportantDatesFormElement';
import { EntitySelect } from '@dc/components/User/Opportunities/OpportunityForm/EntitySelect/EntitySelect';
import { TagsSelect } from '@dc/components/User/Opportunities/OpportunityForm/TagsSelect/TagsSelect';
import { ImageSection } from '@dc/components/User/Opportunities/OpportunityForm/ImageSection/ImageSection';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedFormTextEditor from '@shared/components/FormTextEditor/FormTextEditor';
import SharedButton from '@shared/components/Button/Button';
import { FormSelect } from '@shared/components/FormSelect';
import SharedCard from '@shared/components/Card/Card';
import { FormNumberInput } from '@shared/components/FormNumberInput/FormNumberInput';
import { RESOURCE_CLASS } from '@shared/resources/enums';

import { FormValues } from '../helpers';

import styles from './OpportunityForm.module.sass';
import { OpportunityPreview } from './OpportunityPreview';
import { ClustersSelect } from './ClustersSelect/ClustersSelect';
import { AutomaticAcceptanceSwitch } from './AutomaticAcceptanceSwitch';
import { OpportunityPartnerSelect } from './OpportunityPartnerSelect/OpportunityPartnerSelect';

type Props = {
  title: string;
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
  buttonLabel: string;
};

export const OpportunityForm = ({ onSubmit, initialValues, title, buttonLabel }: Props) => {
  const { t } = useTranslation();
  const opportunityTypeOptions = Object.entries(OpportunityTypes)
    .map(([key, value]) => ({
      label: t(`opportunities.types.${key}`, { defaultValue: 'Other' }),
      value,
    }))
    .filter((type) => type.value !== OpportunityTypes.VIRTUAL_INTERNSHIP);

  const validationSchema = yup.object().shape({
    deadline: yup
      .date()
      .min(new Date(), t('validation.messages.deadlineMustBeAfterToday'))
      .nullable()
      .default(undefined)
      .when('periodEnd', {
        is: (periodEnd: string) => periodEnd !== null,
        then: (schema) =>
          schema.max(yup.ref('periodEnd'), t('validation.messages.deadlineNotAfterEndDate')),
      })
      .when('periodStart', {
        is: (periodStart: string) => periodStart !== null,
        then: (schema) =>
          schema.max(yup.ref('periodStart'), t('validation.messages.deadlineNotBeforeStartDate')),
      }),
    description: yup.string().required(t('validation.messages.required')),
    entityUuids: yup.array().when('visibilityScope', {
      is: (visibilityScope: VISIBILITY_SCOPE) => visibilityScope === VISIBILITY_SCOPE.ENTITY,
      then: (schema) => schema.min(1, t('validation.messages.required')),
    }),
    name: yup.string().required(t('validation.messages.required')),
    opportunityType: yup.mixed().required(t('validation.messages.required')),
    pathways: yup.array().min(1, t('validation.messages.required')),
    periodEnd: yup.date().nullable().default(undefined),
    periodStart: yup
      .date()
      .min(new Date(), t('validation.messages.startMustBeAfterToday'))
      .nullable()
      .default(undefined),
    visibilityScope: yup.string().oneOf([VISIBILITY_SCOPE.ALL, VISIBILITY_SCOPE.ENTITY]),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div className='flex gap-base xxxl:gap-md'>
            <SharedCard className='w-2/3 xxxl:w-3/4'>
              <h5 className='text-sm mb-base xxxl:text-base xxxl:mb-md'>{title}</h5>
              <div className='mb-base xxxl:mb-md'>
                <ImageSection resourceClass={RESOURCE_CLASS.OPPORTUNITY} />
              </div>
              <h6 className='text-xs xxxl:text-sm'>
                {t('user.opportunities.form.mainInformation')}
              </h6>
              <div className='flex gap-sm xxxl:gap-base mb-sm'>
                <SharedFormTextInput
                  className='flex-1'
                  isRequired={true}
                  label={t('user.opportunities.title')}
                  name='name'
                />
                <div className='flex-1'>
                  <FormSelect
                    isRequired={true}
                    label={t('user.opportunities.type')}
                    name='opportunityType'
                    options={opportunityTypeOptions}
                  />
                </div>
              </div>
              <SharedFormTextEditor
                label={t('user.opportunities.description')}
                name='description'
                size='sm'
              />
              <ImportantDatesFormElement />
              <h6 className='text-xs xxxl:text-sm'>
                {t('user.opportunities.form.detailsInformation')}
              </h6>
              <SharedFormTextEditor
                label={t('user.opportunities.location')}
                name='location'
                size='sm'
              />
              <SharedFormTextEditor
                label={t('user.opportunities.salaryInformation')}
                name='salaryInformation'
                size='sm'
              />
              <SharedFormTextEditor
                label={t('user.opportunities.creditOutcomes')}
                name='creditsOutcomes'
                size='sm'
              />
            </SharedCard>
            <SharedCard className='h-fit w-1/3 xxxl:w-1/4'>
              <h5 className='text-sm mb-base xxxl:text-base xxxl:mb-md'>
                {t('user.opportunities.opportunitySettings')}
              </h5>
              <h6 className='text-xs mb-xs xxxl:text-sm xxxl:mb-sm'>
                {t('user.opportunities.form.preview')}
              </h6>
              <div className='bg-neutral-200 py-base px-md mb-xs rounded-sm xxxl:py-md xxxl:mb-sm'>
                <OpportunityPreview className={cx(styles.opportunityPreview, 'm-auto')} />
              </div>
              <p className=' text-font-secondary text-xxs leading-lg mb-base xxxl:mb-md'>
                {t('user.opportunities.previewDescription')}
              </p>
              <div className='mb-base xxxl:mb-md'>
                <label
                  className='inline-block font-bold text-xs mb-xs xxxl:text-sm xxxl:mb-sm'
                  htmlFor='number-of-posiitons'>
                  {t('user.opportunities.form.numberOfPositions')}
                </label>
                <FormNumberInput id='number-of-posiitons' minValue={0} name='availableSpots' />
              </div>
              <h6 className='text-xs mb-sm xxxl:text-sm '>
                {t('user.opportunities.form.connectionAndTags')}
              </h6>
              <div className='flex flex-col gap-sm'>
                <EntitySelect />
                <ClustersSelect />
                <OpportunityPartnerSelect />
                <TagsSelect />
                <SharedButton
                  className='w-full'
                  disabled={isSubmitting}
                  size='lg'
                  type='submit'
                  variant='primary'>
                  {buttonLabel}
                </SharedButton>
                <AutomaticAcceptanceSwitch />
              </div>
            </SharedCard>
          </div>
        </Form>
      )}
    </Formik>
  );
};
