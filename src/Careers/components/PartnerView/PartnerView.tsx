import cx from 'classnames';
import { usePartnerOverviewQuery as usePartnerOverviewQueryUser } from '@graphql/dc/users/hooks';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FC, SVGProps, useLayoutEffect, useRef, useState } from 'react';
import { compact, isEmpty } from 'lodash-es';
import { usePartnerOverviewQuery as usePartnerOverviewQueryStudent } from '@graphql/dc/students/hooks';
import { VisibilityScope } from '@graphql/dc/shared/types';

import { PartnerDetails } from '@dc/components/PartnerView/PartnerDetails';
import { PartnerHeaderUser } from '@dc/components/PartnerView/PartnerHeaderUser';
import { PartnerHeaderStudent } from '@dc/components/PartnerView/PartnerHeaderStudent';
import { getOuterHeight } from '@dc/components/PartnerView/helpers';
import { useCanManagePartner } from '@dc/hooks/useCanManagePartner';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import { ReactComponent as WorldIcon } from '@shared/svg/world_icon.svg';
import { ReactComponent as PhoneIcon } from '@shared/assets/icons/phone.svg';
import { ReactComponent as LocationIcon } from '@shared/assets/icons/location-marker.svg';
import { ReactComponent as EnvelopeIcon } from '@shared/assets/icons/mail.svg';
import { ReactComponent as LinkIcon } from '@shared/assets/icons/link.svg';
import Card from '@shared/components/Card/Card';
import Image from '@shared/components/Image/Image';
import { Tabs } from '@shared/components/Tabs/Tabs';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { formatExternalLink } from '@shared/utils/formatExternalLink';
import { useRole } from '@shared/hooks/useRole';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

import { PartnerOpportunities } from './PartnerOpportunities/PartnerOpportunities';
import { PartnerCourses } from './PartnerCourses/PartnerCourses';
import { PartnerNotFound } from './PartnerNotFound';
import { PartnerDocumentation } from './PartnerDocumentation/PartnerDocumentation';

type ContactType = {
  [key: string]: {
    value: (value: string) => string;
    icon: FC<SVGProps<SVGSVGElement>>;
    status: string;
  };
};

export const PartnerView = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { isUser } = useRole();
  const { userInfo } = useUserInfo<TStudentInfo | TUserInfo>();
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  const canManagePartner = useCanManagePartner();
  const isWBLAdmin = 'permissions' in userInfo && userInfo.permissions.wblAdmin;

  const computedPartnerQueryHook = isUser
    ? usePartnerOverviewQueryUser
    : usePartnerOverviewQueryStudent;

  const { data, loading, error } = computedPartnerQueryHook({ variables: { id } });

  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(getOuterHeight(headerRef.current!));
    }
  }, [headerRef]);

  const isPartnerArchived = data && 'isArchived' in data.partner && data.partner.isArchived;
  const isPartnerGlobal =
    data &&
    'visibilityScope' in data.partner &&
    data.partner.visibilityScope === VisibilityScope.ALL;

  if (error || (!canManagePartner && isPartnerArchived)) {
    return <PartnerNotFound />;
  }

  const showDocumentationTab = isWBLAdmin && !isPartnerGlobal;

  const tabs = compact([
    {
      children: <PartnerDetails />,
      tabId: 'details',
      label: t('partners.details'),
    },
    {
      children: (
        <PartnerOpportunities isLoading={loading} opportunities={data?.partner.opportunities} />
      ),
      tabId: 'opportunities',
      label: t('partners.opportunities'),
    },
    !isEmpty(data?.partner.courses) && {
      children: <PartnerCourses courses={data!.partner.courses} />,
      tabId: 'courses',
      label: t('partners.courses'),
    },
    showDocumentationTab && {
      children: <PartnerDocumentation />,
      tabId: 'documentation',
      label: t('partners.documentation'),
    },
  ]);

  const additionalUrls = data?.partner?.additionalUrls || [];

  const contactLinks = [
    {
      type: 'ADDRESS',
      value: data?.partner?.address,
    },
    {
      type: 'PHONE',
      value: data?.partner?.phone,
    },
    {
      type: 'EMAIL',
      value: data?.partner?.email,
    },
    {
      type: 'URL',
      value: data?.partner?.url,
    },
    ...additionalUrls.map((url) => ({ type: 'CUSTOM', value: url })),
  ].filter(({ value }) => !isEmpty(value));

  const linkIconMap: ContactType = {
    EMAIL: { value: (value: string) => `mailto:${value}`, icon: EnvelopeIcon, status: 'draft' },
    PHONE: { value: (value: string) => `tel:${value}`, icon: PhoneIcon, status: 'primary' },
    ADDRESS: {
      value: (value: string) =>
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          data?.partner?.name + ' ' + value
        )}`,
      icon: LocationIcon,
      status: 'primary',
    },
    URL: {
      value: (value: string) => formatExternalLink(value),
      icon: WorldIcon,
      status: 'primary',
    },
    CUSTOM: {
      value: (value: string) => formatExternalLink(value),
      icon: LinkIcon,
      status: 'primary',
    },
  };

  const imageFit = data?.partner.imageFitToContainer;

  const imageClassName = cx({
    'h-full mx-auto object-contain': !imageFit,
    'object-cover w-full h-full': imageFit,
  });

  const isDataLoaded = !loading && data?.partner;

  return (
    <div className='h-full'>
      <div ref={headerRef} className='mb-sm'>
        {!isUser && <PartnerHeaderStudent />}
        {isUser && <PartnerHeaderUser />}
      </div>
      <div className='flex gap-base' style={{ height: `calc(100% - ${headerHeight}px)` }}>
        <Card className='w-[318px] xxxl:w-[512px] shrink-0 flex flex-col'>
          <div className='h-[140px] xxxl:h-[220px] shrink-0 rounded-sm overflow-hidden mb-sm'>
            {!isDataLoaded && (
              <SkeletonRectangle height='full-height' radius='xs' size='full-width' />
            )}
            {isDataLoaded && (
              <Image
                className={imageClassName}
                fallbackSrc={data?.partner?.imageUrl}
                src={data?.partner?.thumbnailUrl}
              />
            )}
          </div>
          <div className='grow min-h-0 flex flex-col'>
            <div className='flex items-center gap-sm mb-sm'>
              <h3 className='text-xs xxxl:text-sm mb-0'>{t('partners.about')}</h3>
              <div className='w-full border border-neutral-300 h-px rounded-full' />
            </div>
            <div className='h-full flex flex-col min-h-0'>
              <div className='text-font-secondary leading-lg tracking-normal text-xxs xxxl:text-xs mb-base overflow-auto scrollbar pr-xs grow-0 shrink'>
                {!isDataLoaded && <SkeletonRectangle />}
                {isDataLoaded && (
                  <InjectedContent content={data?.partner?.about.replace(/\n/g, '<br />')} />
                )}
              </div>
              {!isEmpty(contactLinks) && (
                <div className='min-h-0 flex flex-col grow shrink-0 basis-1/2'>
                  <div className='flex items-center gap-sm mb-sm'>
                    <h3 className='text-xs xxxl:text-sm mb-0'>{t('partners.contact')}</h3>
                    <div className='w-full border border-neutral-300 h-px rounded-full' />
                  </div>
                  <div className='overflow-auto scrollbar min-h-0'>
                    {!isDataLoaded && <SkeletonRectangle />}
                    {isDataLoaded && (
                      <div className='flex flex-wrap gap-xs shrink min-h-0'>
                        {contactLinks.map((contact, index) => (
                          <a
                            key={index}
                            className='flex !p-xxs xxxl:!p-xs justify-center items-center gap-xxs bg-neutral-200 !text-neutral-800 rounded-sm text-xxs font-medium leading-lg hover:bg-primary-200 hover:!text-primary-500 !no-underline active:bg-primary-500 active:!text-white'
                            href={linkIconMap[contact.type].value(contact.value!)}
                            target='_blank'>
                            <IconContainer
                              Icon={linkIconMap[contact.type].icon}
                              paddingSize='none'
                              size='sm'
                            />
                            {contact.value}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
        <div className='grow h-full'>
          <Tabs className='h-full flex flex-col' defaultTabId='details'>
            <Tabs.List className='!mb-sm' tabs={tabs} />
            {tabs.map((tab) => (
              <Tabs.Content key={tab.tabId} tabId={tab.tabId}>
                {tab.children}
              </Tabs.Content>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
