import { useTranslation } from 'react-i18next';

import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';

import { useFilterContext } from '@shared/hooks/useFilterContext';

const ProjectAssignSearch = () => {
  //@ts-ignore
  const { fields, handleChange } = useFilterContext();
  const { t } = useTranslation();

  return (
    <SharedFilterProvider.Search
      field='name'
      fields={fields}
      handleChange={handleChange}
      minLetters={3}
      placeholder={t('user.project.assignment.search')}
    />
  );
};

export default ProjectAssignSearch;
