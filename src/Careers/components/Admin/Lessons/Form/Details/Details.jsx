import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedFormDivider from '@dc/shared/FormDivider/FormDivider';
import SharedImageInput from '@dc/shared/ImageInput/ImageInput';
import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import { LESSON_TYPES } from '@dc/resources/constants';
import { shapeLessonForm } from '@dc/resources/typeDefs';
import { getLessonLabel } from '@dc/utils/lessons';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import { Select } from '@shared/components/Select';

AdminLessonsFormDetails.propTypes = {
  ...shapeLessonForm,
  isSurvey: PropTypes.bool,
};

function AdminLessonsFormDetails({ errors, isSurvey, touched }) {
  const [imageInput, , imageHelpers] = useField('imageData');
  const [introductionInput, , introductionHelpers] = useField('introduction');
  const [typeInput, , typeHelpers] = useField('type');
  const [goalInput, , goalHelpers] = useField('goal');
  const [roleInput, , roleHelpers] = useField('role');
  const [audienceInput, , audienceHelpers] = useField('audience');
  const [situationInput, , situationHelpers] = useField('situation');
  const { t } = useTranslation();

  const shouldShowDescription = [
    LESSON_TYPES.PROJECT,
    LESSON_TYPES.EXPERIENCE_OPPORTUNITY,
  ].includes(typeInput.value?.value);

  const lessonTypesOptions = Object.keys(LESSON_TYPES).map((key) => ({
    value: key,
    label: getLessonLabel(t, { type: key }),
  }));

  return (
    <>
      <div className='admin-form__details-container'>
        <SharedImageInput
          data-testid='lessons-image-input'
          errorMessage={touched.imageData && errors.imageData}
          inputConfig={{ ...imageInput, onChange: imageHelpers.setValue }}
        />
        <div className='admin-form__details-text-inputs flex flex-col gap-sm'>
          <SharedFormTextInput
            data-testid='lessons-name-input'
            isRequired={true}
            label={t('common.fields.common.name')}
            name='name'
          />
          <Select
            {...typeInput}
            data-testid='lessons-type-input'
            errorMessage={touched.type && errors.type}
            isDisabled={isSurvey}
            isRequired={true}
            label={t('admin.lessons.type')}
            menuPortalTarget={document.body}
            options={lessonTypesOptions}
            onChange={typeHelpers.setValue}
          />
        </div>
      </div>
      {shouldShowDescription && (
        <>
          <SharedFormDivider />
          <h4 data-testid='lessons-description-title'>{t('common.fields.common.description')}</h4>
          <div className='lessons__form-description'>
            <SharedTextEditor
              data-testid='lessons-introduction-input'
              editorConfig={{ ...introductionInput, onChange: introductionHelpers.setValue }}
              errorMessage={touched.introduction && errors.introduction}
              label={t('admin.lessons.introduction')}
            />
            <SharedTextEditor
              data-testid='lessons-goal-input'
              editorConfig={{ ...goalInput, onChange: goalHelpers.setValue }}
              errorMessage={touched.goal && errors.goal}
              label={t('admin.lessons.goal')}
            />
            <SharedTextEditor
              data-testid='lessons-role-input'
              editorConfig={{ ...roleInput, onChange: roleHelpers.setValue }}
              errorMessage={touched.role && errors.role}
              label={t('admin.lessons.role')}
            />
            <SharedTextEditor
              data-testid='lessons-audience-input'
              editorConfig={{ ...audienceInput, onChange: audienceHelpers.setValue }}
              errorMessage={touched.audience && errors.audience}
              label={t('admin.lessons.audience')}
            />
            <SharedTextEditor
              data-testid='lessons-situation-input'
              editorConfig={{ ...situationInput, onChange: situationHelpers.setValue }}
              errorMessage={touched.situation && errors.situation}
              label={t('admin.lessons.situation')}
            />
          </div>
        </>
      )}
    </>
  );
}

export default AdminLessonsFormDetails;
