import { useTranslation } from 'react-i18next';

import { StageLabel } from '@shared/components/StageLabel';
import {
  EDUCATIONAL_SETTINGS_TYPES,
  EDUCATIONAL_RESOURCE_TYPES,
} from '@shared/components/EntityInfo/types';
import { EntitySettings } from '@shared/components/EntityInfo';
import { ReactComponent as EntityIcon } from '@shared/svg/entity.svg';
import { ReactComponent as ClassIcon } from '@shared/svg/class.svg';
import { ReactComponent as TeacherIcon } from '@shared/svg/educator.svg';
import { ReactComponent as StudentIcon } from '@shared/svg/student.svg';
import { useEntity } from '@shared/hooks/useEntity';

import { EntityInfoContentUnit } from './EntityInfoContentUnit';
import styles from './EntityInfoContent.module.sass';

export const EntityInfoContent = () => {
  const { entity, availableSettings } = useEntity();
  const { hierarchyMetrics, name, settings } = entity;

  const { t } = useTranslation();

  const isMiddleSchool = settings.assessmentType === EDUCATIONAL_SETTINGS_TYPES.MIDDLE_SCHOOL;
  const assessmentLabel = settings.assessmentEnabled
    ? t('entityInfo.enabled')
    : t('entityInfo.disabled');
  const assessmentTypeLabel = isMiddleSchool
    ? t('entityInfo.middleSchool')
    : t('entityInfo.highSchool');

  const onboardingLabel = settings.onboardingEnabled
    ? t('entityInfo.enabled')
    : t('entityInfo.disabled');

  return (
    <div className={styles.entityInfoContent}>
      <header className={styles.header}>
        <div className={styles.labelWrapper}>
          <h4 className={styles.heading}>{name}</h4>
          <StageLabel
            inline={true}
            resourceType={EDUCATIONAL_RESOURCE_TYPES.ENTITY}
            stage={settings.assessmentType}
          />
        </div>
        <EntitySettings />
      </header>
      <div className={styles.unitsWrapper}>
        <EntityInfoContentUnit
          icon={<EntityIcon />}
          label={t('entityInfo.entities')}
          value={hierarchyMetrics?.entitiesCount || '-'}
        />
        <EntityInfoContentUnit
          icon={<TeacherIcon />}
          label={t('entityInfo.teachers')}
          value={hierarchyMetrics?.teachersCount || '-'}
        />
        <EntityInfoContentUnit
          icon={<ClassIcon />}
          label={t('entityInfo.classes')}
          value={hierarchyMetrics?.schoolClassesCount || '-'}
        />
        <EntityInfoContentUnit
          icon={<StudentIcon />}
          label={t('entityInfo.students')}
          value={hierarchyMetrics?.studentsCount || '-'}
        />
      </div>
      {availableSettings.hasAssessmentEnabledSetting && (
        <EntityInfoContentUnit
          badge={true}
          badgeState={settings.assessmentEnabled}
          label={t('entityInfo.assessment')}
          value={assessmentLabel}
        />
      )}
      {availableSettings.hasAssessmentTypeSetting && (
        <EntityInfoContentUnit
          badge={true}
          badgeState={isMiddleSchool}
          label={t('entityInfo.assessmentType')}
          value={assessmentTypeLabel}
        />
      )}
      {availableSettings.hasOnboardingSetting && (
        <EntityInfoContentUnit
          badge={true}
          badgeState={settings.onboardingEnabled}
          label={t('entityInfo.onboarding')}
          value={onboardingLabel}
        />
      )}
    </div>
  );
};
