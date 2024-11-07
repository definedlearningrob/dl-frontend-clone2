import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { affectedResourcesConfig } from '@dc/utils/affectedResourcesConfig';

import { RubricsEditHeader } from '@shared/components/RubricsEditor/RubricsEditHeader/RubricsEditHeader';
import { RubricsEditorProvider } from '@shared/components/RubricsEditor/RubricsEditorProvider/RubricsEditorProvider';
import { RubricsEditor } from '@shared/components/RubricsEditor';
import Card from '@shared/components/Card/Card';

AdminAppRubricEdit.propTypes = {
  rubric: PropTypes.object,
};

function AdminAppRubricEdit({ rubric }) {
  const affectedResources = affectedResourcesConfig(rubric);
  const { t } = useTranslation();

  return (
    <SharedMainContent>
      <h2 className='text-sm mb-sm'>{t('components.rubric.editRubric')}</h2>
      <Card>
        <RubricsEditHeader rubric={rubric} />
        <div className='mb-sm xxxl:mb-base'>
          <RubricsEditorProvider rubric={rubric}>
            <h6>{t('components.rubric.rubric')}</h6>
            <RubricsEditor />
          </RubricsEditorProvider>
        </div>
        {rubric.id &&
          affectedResources.map((resource) => (
            <AffectedResources
              key={resource.resourcesField}
              id={rubric.id}
              query={resource.query}
              resourcesField={resource.resourcesField}
            />
          ))}
      </Card>
    </SharedMainContent>
  );
}

export default AdminAppRubricEdit;
