import { useState } from 'react';

import { APPLICATIONS_TYPE } from '@dc/resources/enums';

import { ApplyToInstitutionButton } from './ApplyToInstitutionButton';
import { InstitutionAppliedActions } from './InstitutionAppliedActions';

type Props = {
  hasApplied: boolean;
  directApplicationURL: string | null;
  commonAppEnabled: boolean;
  commonAppApplicationUrl: string | null;
  applicationId: string | null;
  applicationType: APPLICATIONS_TYPE | null;
};

export const InstitutionApplicationActions = ({
  hasApplied,
  directApplicationURL,
  commonAppEnabled,
  commonAppApplicationUrl,
  applicationId,
  applicationType,
}: Props) => {
  const [hasAppliedToCommonApp, setHasAppliedToCommonApp] = useState(false);
  const hasAppliedToInstitution = hasApplied || hasAppliedToCommonApp;

  if (hasAppliedToInstitution) {
    return (
      <InstitutionAppliedActions applicationId={applicationId} applicationType={applicationType} />
    );
  }

  return (
    <ApplyToInstitutionButton
      commonAppApplicationUrl={commonAppApplicationUrl}
      commonAppEnabled={commonAppEnabled}
      directApplicationURL={directApplicationURL}
      onCommonAppApplication={() => setHasAppliedToCommonApp(true)}
    />
  );
};
