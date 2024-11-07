import i18n from 'i18next';

import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';

export const projectTabs = [
  { label: i18n.t('sharedCommon.dl'), id: 'pbl', type: PORTFOLIO_PROJECT_TYPES.PBL },
  {
    label: i18n.t('sharedCommon.dc'),
    id: 'careers',
    type: PORTFOLIO_PROJECT_TYPES.CAREERS,
  },
  {
    label: i18n.t('portfolioProjects.personal'),
    id: 'personal',
    type: PORTFOLIO_PROJECT_TYPES.PERSONAL,
  },
];
