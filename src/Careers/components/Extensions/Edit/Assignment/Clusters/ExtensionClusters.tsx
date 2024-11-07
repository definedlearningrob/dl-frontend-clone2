import { useField } from 'formik';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import GET_CLUSTERS, { type TClustersData } from '@dc/graphql/shared/queries/clusters';

import { ReactComponent as Search } from '@shared/svg/search.svg';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

import { type TExtensionAssignment } from '../../Edit';
import styles from '../Assignment.module.sass';

type TParsedExtensionAssignmentFields = Omit<
  TExtensionAssignment,
  'publishedFrom' | 'publishedTo' | 'status'
>;

type Props = {
  onChange: (
    type: keyof TParsedExtensionAssignmentFields,
    value: { id: string; name: string }
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
};

const ExtensionClusters = ({ onChange }: Props) => {
  const [field] = useField<TExtensionAssignment['clusters']>('clusters');
  const [filter, setFilter] = useState('');
  const { t } = useTranslation();

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const getFilteredClusters = (clusters: TClustersData['clusters']) =>
    clusters.filter((cluster) => cluster.name.toLowerCase().includes(filter.toLowerCase()));

  const getSortedClusters = (clusters: TClustersData['clusters']) =>
    clusters.sort((a, b) => {
      if (
        field.value.find((obj) => obj.id === a.id) &&
        !field.value.find((obj) => obj.id === b.id)
      ) {
        return -1;
      }

      return 1;
    });

  const parseClusters = (clusters: TClustersData['clusters']) =>
    getSortedClusters(getFilteredClusters(clusters));

  return (
    <SharedDataLoader<TClustersData> query={GET_CLUSTERS}>
      {({ clusters }) => (
        <>
          <div className={styles.assignmentHeader}>
            <h4 className={styles.header}>
              {t('user.dashboard.extensionFields.settings.clusters')}
            </h4>
            <div className='filter__search'>
              <Search className='filter__search-icon' />
              <input
                className='filter__search-input'
                data-testid={`filter-search-bar-${field}`}
                placeholder={t('common.placeholders.search')}
                type='text'
                onChange={handleFilterChange}
              />
            </div>
          </div>
          <div className={styles.list}>
            {parseClusters(clusters).map((cluster) => (
              <SharedCheckbox
                key={cluster.id}
                checked={!!field.value.find((obj) => obj.id === cluster.id)}
                label={cluster.name}
                //@ts-ignore
                value={{ id: cluster.id, name: cluster.name }}
                onChange={onChange('clusters', { id: cluster.id, name: cluster.name })}
              />
            ))}
          </div>
        </>
      )}
    </SharedDataLoader>
  );
};

export default ExtensionClusters;
