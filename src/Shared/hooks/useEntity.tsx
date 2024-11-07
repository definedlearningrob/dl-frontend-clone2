import { createContext, useContext } from 'react';
import { ReactNode } from 'react';

import {
  TEntity as TEntityDC,
  TSchoolYearStartDate,
} from '@dc/graphql/user/queries/adminEntityInfo';

import { TEntity as TEntityDL } from '@pbl/graphql/user/queries/adminEntityInfo';

export type TSetting = {
  value: boolean | string;
  applyToHierarchy: boolean;
};

export type EntitySettingsFormValues = {
  assessmentEnabled?: TSetting;
  assessmentType?: TSetting;
  onboardingEnabled?: TSetting;
  selfEvaluationEnabled?: TSetting;
  isMiddleSchool?: TSetting;
};

export type AvailableSettings = {
  hasAssessmentEnabledSetting: boolean;
  hasAssessmentTypeSetting: boolean;
  hasOnboardingSetting: boolean;
  hasSelfEvaluationSetting: boolean;
  schoolYearStartDate: TSchoolYearStartDate;
};

type EntityContextType = {
  saveEntitySetting: (entityPayload: EntitySettingsFormValues) => void;
  availableSettings: AvailableSettings;
  entity: TEntityDC | TEntityDL;
};

const EntityContext = createContext<EntityContextType>({} as EntityContextType);

type Props = {
  children: ReactNode;
  saveEntitySetting: (entityPayload: EntitySettingsFormValues) => void;
  entity: TEntityDC | TEntityDL;
};

export function EntityProvider(props: Props) {
  const { children, saveEntitySetting, entity } = props;

  const { settings } = entity;

  const availableSettings = {
    hasAssessmentEnabledSetting: 'assessmentEnabled' in settings,
    hasAssessmentTypeSetting: 'assessmentType' in settings,
    hasOnboardingSetting: 'onboardingEnabled' in settings,
    hasSelfEvaluationSetting: 'selfEvaluationEnabled' in settings,
    schoolYearStartDate: settings.schoolYearStartDate,
  };

  return (
    <EntityContext.Provider
      value={{
        availableSettings,
        saveEntitySetting,
        entity: entity,
      }}>
      {children}
    </EntityContext.Provider>
  );
}

export function useEntity<T extends TEntityDC | TEntityDL>() {
  const { entity, ...rest } = useContext(EntityContext);

  return { entity: entity as T, ...rest };
}
