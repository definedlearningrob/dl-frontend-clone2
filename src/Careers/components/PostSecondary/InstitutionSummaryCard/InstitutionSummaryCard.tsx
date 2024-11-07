import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useParams } from 'react-router-dom';
import cx from 'classnames';

import { TInstitution } from '@dc/resources/types';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { useToggleInstitutionFavorite } from '@dc/graphql/student/hooks/useToggleInstitutionFavorite';
import { InstitutionApplicationActions } from '@dc/components/PostSecondary/InstitutionSummaryCard/InstitutionApplicationActions';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { ReactComponent as CommonAppLogo } from '@dc/svg/CommonApp.svg';

import defaultThumbnail from '@shared/assets/images/institution-fallback-image.jpeg';
import { HeaderBox } from '@shared/components/HeaderBox';
import { callToast } from '@shared/components/Toaster/Toaster';

import { InstitutionSummaryCardActions } from './InstitutionSummaryCardActions';

type Props = {
  institution: TInstitution;
  isTeacher?: boolean;
};

export const InstitutionSummaryCard = ({ institution, isTeacher }: Props) => {
  const { t } = useTranslation();

  const { userInfo } = useUserInfo<TStudentInfo | TUserInfo>();

  const isStudent = 'postSecondaryApplicationsEnabled' in userInfo;

  const {
    name,
    imageUrl,
    address,
    sizeType,
    commonAppEnabled,
    type,
    degrees,
    contact,
    commonAppApplicationUrl,
    hasApplied,
    applicationId,
    applicationType,
    isIpeds: isIpedsInstitution,
  } = institution;

  const [toggleFavorite, { loading }] = useToggleInstitutionFavorite();
  const { id } = useParams<{ id: string }>();
  const location = [address.city, address.stateCode].join(', ');
  const size = t(`postSecondary.institution.sizes.${sizeType}`);
  const descriptionKey = sizeType
    ? 'postSecondary.institution.descriptionWithSize'
    : 'postSecondary.institution.description';
  const institutionDegrees = isEmpty(degrees)
    ? t('postSecondary.institution.degreesFallback')
    : degrees.join(', ');
  const isFavorite = institution.isFavorite;
  const handleFavorite = async () => {
    try {
      await toggleFavorite({ institutionId: id });
      !loading && isFavorite
        ? callToast('info', t('student.institutionSearch.institutionRemovedFromFavorite'))
        : callToast('favorite', t('student.institutionSearch.institutionAddedToFavorite'));
    } catch {}
  };

  const checkIfHasPostSecondaryApplicationsEnabled = (userInfo: TUserInfo | TStudentInfo) => {
    if ('postSecondaryApplicationsEnabled' in userInfo) {
      return userInfo.postSecondaryApplicationsEnabled;
    }

    return userInfo.entities.nodes.some(
      ({ settings }) => settings.postSecondaryApplicationsEnabled
    );
  };

  const showCommonAppLogo =
    commonAppEnabled && checkIfHasPostSecondaryApplicationsEnabled(userInfo);

  return (
    <HeaderBox
      actions={
        <InstitutionSummaryCardActions
          isFavorite={isFavorite}
          toggleFavorite={handleFavorite}
          websiteUrl={contact.urlGeneral}
          withoutFavorite={isTeacher}
        />
      }
      fallbackSrc={defaultThumbnail}
      imageTag={showCommonAppLogo && <CommonAppLogo />}
      imageUrl={imageUrl || defaultThumbnail}
      tag={location}
      title={name}>
      {isIpedsInstitution && (
        <p className='mb-base xxxl:mb-md'>
          {t(descriptionKey, {
            name,
            type,
            size,
            areaKind: address.area.kind,
            areaType: address.area.type,
            degrees: institutionDegrees,
          })}
        </p>
      )}
      {isStudent && (
        <div className={cx({ 'mt-sm': !isIpedsInstitution })}>
          <p>{t('postSecondary.institution.beginApplication')}:</p>
          <InstitutionApplicationActions
            applicationId={applicationId}
            applicationType={applicationType}
            commonAppApplicationUrl={commonAppApplicationUrl}
            commonAppEnabled={commonAppEnabled}
            directApplicationURL={contact.urlGeneral}
            hasApplied={hasApplied}
          />
        </div>
      )}
    </HeaderBox>
  );
};
