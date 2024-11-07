import { useField } from 'formik';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import GET_PATHWAYS, { type TPathwaysData } from '@dc/graphql/user/queries/pathways';

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

const ExtensionPathways = ({ onChange }: Props) => {
  const [field] = useField<TExtensionAssignment['pathways']>('pathways');
  const [filter, setFilter] = useState('');
  const { t } = useTranslation();

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const getFilteredPathways = (pathways: TPathwaysData['pathways']) =>
    pathways.filter((pathway) => pathway.name.toLowerCase().includes(filter.toLowerCase()));

  const getSortedPathways = (pathways: TPathwaysData['pathways']) =>
    pathways.sort((a, b) => {
      if (
        field.value.find((obj) => obj.id === a.id) &&
        !field.value.find((obj) => obj.id === b.id)
      ) {
        return -1;
      }

      return 1;
    });

  const parsePathways = (pathways: TPathwaysData['pathways']) =>
    getSortedPathways(getFilteredPathways(pathways));

  return (
    <SharedDataLoader<TPathwaysData> query={GET_PATHWAYS}>
      {({ pathways }) => (
        <>
          <div className={styles.assignmentHeader}>
            <h4 className={styles.header}>
              {t('user.dashboard.extensionFields.settings.pathways')}
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
            {parsePathways(pathways).map((pathway) => (
              <SharedCheckbox
                key={pathway.id}
                checked={!!field.value.find((obj) => obj.id === pathway.id)}
                label={pathway.name}
                value={pathway.id}
                onChange={onChange('pathways', { id: pathway.id, name: pathway.name })}
              />
            ))}
          </div>
        </>
      )}
    </SharedDataLoader>
  );
};

export default ExtensionPathways;
