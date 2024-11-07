import { FieldArray, Form, useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';

import { ReactComponent as Building } from '@shared/svg/building.svg';
import { ReactComponent as Stars } from '@shared/svg/stars.svg';
import { ReactComponent as Rating } from '@shared/svg/rating.svg';
import { ReactComponent as Education } from '@shared/svg/education_outlined.svg';
import { PersonalInformation } from '@shared/components/EditPortfolio/PersonalInformation/PersonalInformation';
import { EditPortfolioCardWithSections } from '@shared/components/EditPortfolio/EditPortfolioCard';
import Divider from '@shared/components/Divider';
import { BadgesSection } from '@shared/components/EditPortfolio/EditPortfolioBadges';
import { EditPortfolioHighlightedProjects } from '@shared/components/EditPortfolio/EditPortfolioHighlightedProjects';
import { EditPortfolioSettings } from '@shared/components/EditPortfolio/EditPortfolioSettings';
import usePortfolioResumesQuery from '@shared/graphql/student/hooks/usePortfolioResumesQuery';

export const EditPortfolioForm = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();

  const { data: resumesData, loading } = usePortfolioResumesQuery();

  const hasBadges = !loading && !isEmpty(resumesData?.portfolio?.sharedResume?.badges);

  useEffect(() => {
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  }, []);

  useScrollToInvalidFormElement();

  const [highlightedProjectsEnabledField] = useField('highlightedProjectsEnabled');

  return (
    <Form>
      <header className='w-full pb-sm xxxl:pb-md flex gap-md bg-neutral-200 z-higher sticky pt-base xxxl:pt-md'>
        <div className='w-1/3 flex items-end'>
          <h1 className='text-base xxxl:text-lg mb-0 leading-base'>
            {t('portfolio.editPortfolio')}
          </h1>
        </div>
      </header>
      <main className='flex flex-col sm:flex-row gap-base xxxl:gap-md'>
        <div className='flex flex-col gap-base xxxl:gap-md flex-[6_6_0%]'>
          <PersonalInformation />
          <FieldArray
            name='experiences'
            render={(formikArrayProps) => (
              <EditPortfolioCardWithSections
                Icon={Education}
                description={t('portfolio.creator.experienceInfo')}
                resourceName={t('portfolio.creator.experience')}
                title={t('portfolio.creator.experience')}
                {...formikArrayProps}
              />
            )}
          />
          {hasBadges && (
            <>
              <div className='w-full h-xl -my-md bg-white flex justify-center items-center px-base'>
                <Divider className='w-full' />
              </div>
              <FieldArray
                name='highlightedBadgeIds'
                render={(formikArrayProps) => (
                  <BadgesSection
                    Icon={Rating}
                    description={t('portfolio.creator.badgesInfo')}
                    title={t('portfolio.creator.badges')}
                    {...formikArrayProps}
                  />
                )}
              />
            </>
          )}
          <FieldArray
            name='educations'
            render={(formikArrayProps) => (
              <EditPortfolioCardWithSections
                Icon={Building}
                description={t('portfolio.creator.educationInfo')}
                resourceName={t('portfolio.creator.education')}
                title={t('portfolio.creator.education')}
                {...formikArrayProps}
              />
            )}
          />
          <FieldArray
            name='extraCurriculars'
            render={(formikArrayProps) => (
              <EditPortfolioCardWithSections
                Icon={Stars}
                description={t('portfolio.creator.extraCurrInfo')}
                resourceName={t('portfolio.creator.extraCurr')}
                title={t('portfolio.creator.extraCurr')}
                {...formikArrayProps}
              />
            )}
          />
          <AnimatePresence>
            {highlightedProjectsEnabledField.value && (
              <motion.div
                key='highlightedProjects'
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                initial={{ height: 0 }}
                style={{ overflow: 'hidden' }}
                transition={{ duration: 0.5 }}>
                <div className='h-full  max-h-[calc(100vh-48px-24px)] xxxl:max-h-[calc(100vh-48px-32px)]'>
                  <EditPortfolioHighlightedProjects />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className='flex flex-col flex-[3_3_0%] sticky top-lg self-start'>
          <EditPortfolioSettings />
        </div>
      </main>
    </Form>
  );
};
