import { useTranslation } from 'react-i18next';
import { FC, SVGProps } from 'react';
import { isEmpty, isNull } from 'lodash-es';

import Person from '@shared/assets/icons/portrait_placeholder.svg';
import DefinedIcon from '@shared/assets/icons/defined_Logo.svg';
import { ReactComponent as PhoneIcon } from '@shared/assets/icons/phone.svg';
import { ReactComponent as LinkedInIcon } from '@shared/assets/icons/linkedin.svg';
import { ReactComponent as EnvelopeIcon } from '@shared/assets/icons/mail.svg';
import { ReactComponent as LinkIcon } from '@shared/assets/icons/link.svg';
import { ReactComponent as EditIcon } from '@shared/assets/icons/edit.svg';
import Card from '@shared/components/Card/Card';
import Image from '@shared/components/Image/Image';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { formatExternalLink } from '@shared/utils/formatExternalLink';
import Link from '@shared/components/Link';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ContactLink, TExternalResumes } from '@shared/resources/types';
import { PartiallyOptional } from '@shared/utils/types';
import ExternalResume from '@shared/components/PortfolioResume/ExternalResume';

type ContactType = {
  [key: string]: {
    value: (value: string) => string;
    icon: FC<SVGProps<SVGSVGElement>>;
    status: string;
  };
};

type Props = {
  isPublic: boolean;
  isStudent: boolean;
  previousPortfolioResumes?: TExternalResumes[];
  studentBio: {
    name: string;
    avatarUrl: string | null;
    bio: string | null;
    contactLinks: PartiallyOptional<ContactLink, 'id'>[];
  };
};

export const PortfolioResumesBio = ({
  studentBio,
  isPublic,
  isStudent,
  previousPortfolioResumes,
}: Props) => {
  const { avatarUrl, name, bio, contactLinks } = studentBio;

  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const linkIconMap: ContactType = {
    EMAIL: { value: (value: string) => `mailto:${value}`, icon: EnvelopeIcon, status: 'draft' },
    PHONE: { value: (value: string) => `tel:${value}`, icon: PhoneIcon, status: 'primary' },
    LINKEDIN: {
      value: (value: string) => formatExternalLink(value),
      icon: LinkedInIcon,
      status: 'primary',
    },
    CUSTOM: {
      value: (value: string) => formatExternalLink(value),
      icon: LinkIcon,
      status: 'primary',
    },
  };

  const studentsEmptyBio = isStudent
    ? t('portfolioResume.emptyBio')
    : t('portfolioResume.emptyStudentBio');
  const bioToDisplay = isNull(bio) ? studentsEmptyBio : bio;

  const linksToRender = contactLinks.filter((link) => {
    const hasValue = !isEmpty(link.value);

    if (isStudent) return link.visible && hasValue;

    return hasValue;
  });

  return (
    <Card className='p-sm xxxl:p-base w-full sticky top-base xxxl:top-md'>
      <div className='flex justify-between mb-sm xxxl:mb-base'>
        <Image
          className='rounded-full w-[120px] xxxl:w-[160px] h-[120px] xxxl:h-[160px] border border-neutral-300 object-cover'
          fallbackSrc={Person}
          src={avatarUrl || Person}
          title={name}
        />
      </div>
      <div className='flex flex-col text-xxs xxxl:text-xs font-regular leading-lg text-neutral-700'>
        <div className=' pb-sm'>
          <h6 className='mb-0 whitespace-nowrap text-neutral-800 text-xs xxxl:text-sm after:h-[1px] after:bg-neutral-300 after:grow flex justify-start items-center gap-sm'>
            <span className='min-w-0 text-ellipsis overflow-hidden'>{name}</span>
          </h6>
        </div>
        <div className='pb-base xxxl:pb-md'>{bioToDisplay}</div>
        {isStudent && isNull(bio) && (
          <Link
            Icon={EditIcon}
            className='!no-underline'
            iconPlacement='start'
            size={isFullHD ? 'md' : 'sm'}
            to='/portfolio/edit'
            variant='primary-outlined'>
            {t('portfolioResume.fillPortfolio')}
          </Link>
        )}
      </div>
      {!isEmpty(linksToRender) && (
        <div className='pb-base'>
          <div className='flex gap-sm items-center pb-sm'>
            <h6 className='mb-0 min-w-0 text-neutral-800 text-xs xxxl:text-sm'>
              {t('portfolio.public.contact')}
            </h6>
            <hr className='flex-1 h-px text-neutral-300' />
          </div>
          <div className='flex flex-wrap gap-xs'>
            {linksToRender.map((contact, index) => (
              <a
                key={index}
                className='flex !p-xxs xxxl:!p-xs justify-center items-center gap-xxs bg-neutral-200 !text-neutral-800 rounded-sm text-xxs font-medium leading-lg hover:bg-primary-200 hover:!text-primary-500 !no-underline  active:bg-primary-500 active:!text-white'
                href={linkIconMap[contact.type].value(contact.value)}
                target='_blank'>
                <IconContainer Icon={linkIconMap[contact.type].icon} paddingSize='none' size='sm' />
                {contact.value}
              </a>
            ))}
          </div>
        </div>
      )}
      {!isEmpty(previousPortfolioResumes) && <ExternalResume resumes={previousPortfolioResumes} />}
      {isPublic && <Image className='!justify-start' src={DefinedIcon} />}
    </Card>
  );
};
