import { CourseStatuses } from '@graphql/dc/users/types';
import { Form, useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { VisibilityScope } from '@graphql/dc/shared/types';

import { PartnerImageSection } from '@dc/components/User/Partners/PartnerForm/PartnerImageSection';
import { PartnerContactLinks } from '@dc/components/User/Partners/PartnerForm/PartnerContactLinks/PartnerContactLinks';
import { PartnerSectionWrapper } from '@dc/components/User/Partners/PartnerForm/PartnerSectionWrapper';
import { PartnerOpportunities } from '@dc/components/User/Partners/PartnerForm/PartnerOpportunities';
import { PartnerCourses } from '@dc/components/User/Partners/PartnerForm/PartnerCourses';
import { EntitySelect } from '@dc/components/User/Opportunities/OpportunityForm/EntitySelect/EntitySelect';
import { ClustersSelect } from '@dc/components/User/Opportunities/OpportunityForm/ClustersSelect/ClustersSelect';
import { StatusSelect } from '@dc/components/User/Partners/PartnerForm/StatusSelect/StatusSelect';
import { PartnerPreviewContainer } from '@dc/components/User/Partners/PartnerForm/PartnerPreview/PartnerPreviewContainer';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import { FilterProvider } from '@shared/components/FilterProvider/FilterProvider';
import SharedFormTextEditor from '@shared/components/FormTextEditor/FormTextEditor';
import SharedFormTextarea from '@shared/components/FormTextarea/FormTextarea';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedCard from '@shared/components/Card/Card';
import SharedButton from '@shared/components/Button/Button';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { ReactComponent as MatchIcon } from '@shared/svg/match.svg';
import { ReactComponent as BookIcon } from '@shared/svg/book_opened.svg';
import { ReactComponent as DocumentIcon } from '@shared/svg/file_document.svg';

import { PartnerDocuments } from './PartnerDocuments';

type Props = {
  buttonLabel: string;
  title: string;
};

export const PartnerFormContainer = ({ buttonLabel, title }: Props) => {
  const { isSubmitting } = useFormikContext();
  const { t } = useTranslation();
  const [opportunitiesField] = useField('opportunities');
  const [courseIds] = useField('courseIds');
  const [visibilityScope] = useField('visibilityScope');
  const { userInfo } = useUserInfo<TUserInfo>();

  const isGlobal = visibilityScope.value === VisibilityScope.ALL;
  const isWBLAdmin = userInfo.permissions.wblAdmin;

  return (
    <Form className='flex gap-base xxxl:gap-md'>
      <div className='w-[722px] xxxl:w-[1144px] flex flex-col gap-base'>
        <SharedCard>
          <h5 className='text-sm mb-base xxxl:text-base xxxl:mb-md leading-lg'>{title}</h5>
          <div className='mb-base xxxl:mb-md'>
            <PartnerImageSection />
          </div>
          <h6 className='text-xs xxxl:text-sm'>{t('user.partners.form.mainInformation')}</h6>
          <div className='flex flex-col gap-sm xxxl:gap-base mb-sm'>
            <SharedFormTextInput
              className='flex-1'
              isRequired={true}
              label={t('user.partners.form.partnerName')}
              name='name'
              placeholder={t('user.partners.form.partnerNamePlaceholder')}
            />
            <div className='flex-1'>
              <SharedFormTextarea
                isRequired={true}
                label={t('user.partners.form.aboutPartner')}
                name='about'
                placeholder={t('user.partners.form.aboutPartnerPlaceholder')}
              />
            </div>
          </div>
          <h6 className='text-xs xxxl:text-sm mb-0'>{t('user.partners.form.contactLinks')}</h6>
          <p className='text-xs xxxl:text-sm font-regular leading-lg text-neutral-700'>
            {t('user.partners.form.contactLinksDescription')}
          </p>
          <PartnerContactLinks />
        </SharedCard>
        <PartnerSectionWrapper
          Icon={InfoIcon}
          description={t('user.partners.form.detailsDescription')}
          title={t('user.partners.form.detailsTitle')}>
          <SharedFormTextEditor name='details' size='sm' />
        </PartnerSectionWrapper>
        <FilterProvider
          initialFilters={{
            nameCont: '',
            pathwaysIdIn: [],
            typeIn: [],
            includeGlobal: true,
          }}>
          <PartnerSectionWrapper
            Icon={MatchIcon}
            counter={opportunitiesField.value.length}
            description={t('user.partners.form.opportunitiesDescription')}
            title={t('user.partners.form.opportunitiesTitle')}>
            <PartnerOpportunities />
          </PartnerSectionWrapper>
        </FilterProvider>
        <FilterProvider
          initialFilters={{
            nameCont: '',
            pathwayIdIn: [],
            statusEq: CourseStatuses.PUBLISHED,
            collectionIdIn: [],
          }}>
          <PartnerSectionWrapper
            Icon={BookIcon}
            counter={courseIds.value.length}
            description={t('user.partners.form.coursesDescription')}
            title={t('user.partners.form.coursesTitle')}>
            <PartnerCourses />
          </PartnerSectionWrapper>
          {isWBLAdmin && !isGlobal && (
            <PartnerSectionWrapper
              Icon={DocumentIcon}
              description={t('user.partners.form.documentationDescription')}
              title={t('user.partners.form.documentationTitle')}>
              <PartnerDocuments />
            </PartnerSectionWrapper>
          )}
        </FilterProvider>
      </div>
      <SharedCard className='h-fit grow sticky top-lg'>
        <h5 className='text-sm xxxl:text-base mb-sm xxxl:mb-base'>
          {t('user.partners.partnerSettings')}
        </h5>
        <PartnerPreviewContainer />
        <h6 className='text-xs xxxl:text-sm my-sm xxxl:my-base'>
          {t('user.partners.partnerConnections')}
        </h6>
        <div className='flex flex-col gap-sm'>
          <EntitySelect checkboxLabel='user.partners.globalPartner' />
          <ClustersSelect />
          <StatusSelect />
          <SharedButton
            className='w-full'
            disabled={isSubmitting}
            size='lg'
            type='submit'
            variant='primary'>
            {buttonLabel}
          </SharedButton>
        </div>
      </SharedCard>
    </Form>
  );
};
