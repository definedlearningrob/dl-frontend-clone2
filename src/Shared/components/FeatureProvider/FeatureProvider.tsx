import { createContext, ReactNode, useContext } from 'react';

const isDev = import.meta.env.DEV;

// Remember that the environment variables are always strings so you need to convert them to boolean.
// Also when using feature flags with envs - rembember to use the `OFF FIRST` approach.
// const FEATURE_NAME = import.meta.env.FEATURE_NAME === 'true';

/**
 * This constant contains all the feature flags for the application.
 * They can be static booleans or accuired from environment variables.
 * @param {boolean} FEATURE_NAME - Enables the FEATURE if true
 */
export const FEATURE_FLAGS = {
  EXPERIENCES_ON: isDev || import.meta.env.VITE_FEATURE_FLAG_EXPERIENCES === 'true',
  EXPERIENCES_ON_USER: isDev || import.meta.env.VITE_FEATURE_FLAG_EXPERIENCES_USER === 'true',
  SCHOOL_YEAR_ON: isDev || import.meta.env.VITE_FEATURE_FLAG_SCHOOL_YEAR === 'true',
  LOCALIZE_ON: isDev || import.meta.env.VITE_FEATURE_FLAG_LOCALIZE === 'true',
  LOCALIZE_SYSADMIN_ON: isDev || import.meta.env.VITE_FEATURE_FLAG_LOCALIZE_SYSADMIN === 'true',
  DL_ADMIN: isDev || import.meta.env.VITE_FEATURE_FLAG_DL_ADMIN === 'true',
  POST_SECONDARY_ON: isDev || import.meta.env.VITE_FEATURE_FLAG_POST_SECONDARY === 'true',
  OPPORTUNITIES_ON: isDev || import.meta.env.VITE_FEATURE_FLAG_OPPORTUNITIES === 'true',
  TEACHER_OPPORTUNITIES_ON:
    isDev || import.meta.env.VITE_FEATURE_FLAG_TEACHER_OPPORTUNITIES_ON === 'true',
  ENTITY_BRANDING_ON: isDev || import.meta.env.VITE_FEATURE_FLAG_ENTITY_BRANDING_ON === 'true',
  SHARED_RESUME_ON: isDev || import.meta.env.VITE_FEATURE_FLAG_SHARED_RESUME_ON === 'true',
  QUICK_PROJECT_ON: isDev || import.meta.env.VITE_FEATURE_FLAG_QUICK_PROJECT_ON === 'true',
  QUICK_PROJECT_TAB_ON: isDev || import.meta.env.VITE_FEATURE_FLAG_QUICK_PROJECT_TAB_ON === 'true',
  // FEATURE_NAME: boolean,
};

const FeatureContext = createContext(FEATURE_FLAGS);

type Props = {
  children: ReactNode;
};

/**
 * Provider to make the feature flags available to the whole application
 * It allows to use UserInfo inside the provider to support targeted feature flags
 */
export const FeatureProvider = ({ children }: Props) => (
  <FeatureContext.Provider value={FEATURE_FLAGS}>{children}</FeatureContext.Provider>
);

/**
 * Hook to access the values of the feature flags
 */
export const useFeatureFlags = () => useContext(FeatureContext);
