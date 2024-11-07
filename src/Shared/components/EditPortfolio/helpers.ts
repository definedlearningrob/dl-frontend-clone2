import { match } from 'ts-pattern';
import { t } from 'i18next';
import { groupBy, map, omit } from 'lodash-es';

import { CONTACT_LINK_TYPES } from '@shared/resources/enums';
import { Badge, BadgeGroupedById } from '@shared/resources/types';

export const getItemConfig = (fieldName: string) =>
  match(fieldName)
    .with('experiences', () => ({
      placeholders: {
        name: t('portfolio.creator.experiencesNamePlaceholder'),
        description: t('portfolio.creator.experiencesDescriptionPlaceholder'),
        period: t('portfolio.creator.experiencesPeriodPlaceholder'),
      },
    }))
    .with('educations', () => ({
      placeholders: {
        name: t('portfolio.creator.educationsNamePlaceholder'),
        description: t('portfolio.creator.educationsDescriptionPlaceholder'),
        period: t('portfolio.creator.educationsPeriodPlaceholder'),
      },
    }))
    .with('extraCurriculars', () => ({
      placeholders: {
        name: t('portfolio.creator.extraCurrNamePlaceholder'),
        description: t('portfolio.creator.extraCurrDescriptionPlaceholder'),
        period: t('portfolio.creator.extraCurrPeriodPlaceholder'),
      },
    }))
    .otherwise(() => ({
      placeholders: {
        description: '',
        name: '',
        period: '',
      },
    }));

export const emptyItem = {
  description: '',
  name: '',
  endedAt: null,
  startedAt: null,
  visible: true,
};

export const defaultContactLinks = [
  CONTACT_LINK_TYPES.EMAIL,
  CONTACT_LINK_TYPES.PHONE,
  CONTACT_LINK_TYPES.LINKEDIN,
].map((type) => ({
  value: '',
  visible: true,
  type,
}));

export const groupBadgesById = (badges: Badge[]) =>
  map(groupBy(badges, 'id'), (groupedBadges) => {
    const badgeWithoutResource = omit(groupedBadges[0], 'resource');

    return {
      ...badgeWithoutResource,
      resources: map(groupedBadges, 'resource'),
    } as BadgeGroupedById;
  });
