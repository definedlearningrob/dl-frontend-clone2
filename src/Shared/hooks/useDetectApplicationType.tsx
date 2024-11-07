export const useDetectApplicationType = () => {
  const appElement = document.getElementsByClassName('app')[0];
  const appType = appElement && (appElement.getAttribute('app-type') as 'careers' | 'learning');
  const isCareersApp = appType === 'careers';
  const isPblApp = appType === 'learning';

  return {
    isCareersApp,
    isPblApp,
    appType,
  };
};
