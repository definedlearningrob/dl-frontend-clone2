import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

import Card from '@shared/components/Card/Card';
import { EntityInfoContent, EntityInfoList } from '@shared/components/EntityInfo';
import { useEntity } from '@shared/hooks/useEntity';

import styles from './EntityInfo.module.sass';

type Props = {
  additionalContent?: ReactNode;
};

export const EntityInfo = ({ additionalContent }: Props) => {
  const { t } = useTranslation();
  const { entity } = useEntity();

  return (
    <Card className={styles.entityInfo} roundedCorners={true}>
      <EntityInfoContent />
      {additionalContent}
      <EntityInfoList
        emptyLabel={t('entityInfo.emptyList', { items: 'plans' })}
        items={entity.plans}
        title={t('entityInfo.plans')}
      />
      <EntityInfoList
        emptyLabel={t('entityInfo.emptyList', { items: 'catalogs' })}
        items={entity.catalogs}
        title={t('entityInfo.catalogs')}
      />
      <EntityInfoList
        emptyLabel={t('entityInfo.emptyList', { items: 'standard sets' })}
        items={entity.standardSets}
        title={t('entityInfo.standardSets')}
      />
    </Card>
  );
};
