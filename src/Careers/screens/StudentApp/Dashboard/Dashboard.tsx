import { Trans } from 'react-i18next';
import { useRef } from 'react';
import { useCustomCatalogOverviewQuery } from '@graphql/dc/shared/hooks';
import { isEmpty } from 'lodash-es';

import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { CoursesSummary } from '@dc/screens/StudentApp/Dashboard/CoursesSummary';
import { LatestActivitySection } from '@dc/screens/StudentApp/Dashboard/LatestActivitySection/LatestActivitySection';
import { OnboardingFirstLogin } from '@dc/components/Onboarding/FirstLogin/FirstLogin';
import { QuickLinks } from '@dc/screens/StudentApp/Dashboard/QuickLinks/QuickLinks';
import { ModuleLinks } from '@dc/screens/StudentApp/Dashboard/ModuleLinks/ModuleLinks';

import { WelcomeMessage } from '@shared/components/WelcomeMessage';
import { useResizeWidthObserver } from '@shared/hooks/useResizeWidthObserver';
import { MainContent } from '@shared/components/MainContent/MainContent';
import Card from '@shared/components/Card/Card';

import { CustomCatalogSection } from './CustomCatalogSection/CustomCatalogSection';
import { PlanProgressCard } from './PlanProgressCard/PlanProgressCard';

const ADDITIONAL_OFFSET = 8;

type Props = {
  beforeOnboarding: boolean;
};

export const Dashboard = ({ beforeOnboarding }: Props) => {
  const { data: customCatalogData } = useCustomCatalogOverviewQuery();
  const { userInfo } = useUserInfo<TStudentInfo>();

  const contentWrapperRef = useRef(null);
  const nameRef = useRef(null);

  const nameWidth = useResizeWidthObserver(nameRef);
  const welcomeMessageWidth = useResizeWidthObserver(contentWrapperRef);

  const {
    lastName,
    firstName,
    welcomeMessage,
    hasPlans,
    hasOpportunitiesEnabled,
    postSecondaryApplicationsEnabled,
  } = userInfo;

  const hasCustomCatalog = !isEmpty(customCatalogData?.careersCatalog?.id);

  return (
    <MainContent className='h-full xl:h-[theme(layout.containerHeight)] xxxl:!pt-sm !pt-xs relative'>
      {beforeOnboarding && <OnboardingFirstLogin />}
      <div className='h-full flex flex-col xl:flex-row gap-base xxxl:gap-md'>
        <div className='flex flex-col grow gap-sm xxxl:gap-md'>
          <div>
            <div className='flex items-start gap-xs'>
              <h4 ref={nameRef} className='text-base xxxl:text-lg !mb-xs xxxl:!mb-sm'>
                <Trans
                  components={{
                    neutralText: <span className='text-neutral-600' />,
                  }}
                  i18nKey='student.dashboard.helloMessage'
                  values={{
                    firstName,
                    lastName,
                  }}
                />
              </h4>
              {welcomeMessage && (
                <WelcomeMessage
                  leftOffset={-nameWidth - ADDITIONAL_OFFSET}
                  welcomeMessage={welcomeMessage}
                  width={welcomeMessageWidth}
                />
              )}
            </div>
            <CoursesSummary />
          </div>
          <div className='flex flex-col gap-base min-h-0 grow'>
            <div
              ref={contentWrapperRef}
              className='flex gap-sm shrink min-h-0 xxxl:gap-base grow basis-[349px] xxxl:basis-[560px]'>
              <div className='grow  min-h-0'>
                <LatestActivitySection />
              </div>
              {hasCustomCatalog && (
                <div className='shrink-0 basis-[240px] xxxl:basis-[380px]'>
                  <CustomCatalogSection />
                </div>
              )}
            </div>
            <div className='grow lg:h-[205px] xxxl:h-[296px] h-full'>
              <ModuleLinks
                hasOpportunitiesEnabled={hasOpportunitiesEnabled}
                hasPostSecondaryApplicationsEnabled={postSecondaryApplicationsEnabled}
              />
            </div>
          </div>
        </div>

        <div className='shrink-0 basis-[318px] xxxl:basis-[512px] h-full flex flex-row xl:flex-col gap-base xxxl:gap-md'>
          {hasPlans && <PlanProgressCard />}
          <Card className='grow'>
            <QuickLinks />
          </Card>
        </div>
      </div>
    </MainContent>
  );
};
