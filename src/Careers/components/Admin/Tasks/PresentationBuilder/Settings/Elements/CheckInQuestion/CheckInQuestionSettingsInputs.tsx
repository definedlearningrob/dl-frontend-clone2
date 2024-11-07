import { useField, useFormikContext } from 'formik';
import { useParams } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { useCheckInsOverviewQuery } from '@graphql/shared/users/hooks';

import { CHECK_IN_ITEM_TYPES } from '@pbl/resources/enums';

import { Select } from '@shared/components/Select';

export const CheckInQuestionSettingsInputs = ({ index }: { index: number }) => {
  const { t } = useTranslation();

  const { taskId, projectId } = useParams<{ taskId: string; projectId: string }>();

  const { submitForm } = useFormikContext();

  const [inputField, , inputHelpers] = useField<{
    itemId: string;
    itemType: CHECK_IN_ITEM_TYPES;
  } | null>(`checkInItems[${index}]`);

  const [checkInItemsInputField] = useField<{ itemId: string }[]>(`checkInItems`);

  const { data } = useCheckInsOverviewQuery({ variables: { id: taskId || projectId } });

  const checkInQuestions = data?.task?.checkInQuestions;

  if (!checkInQuestions) return null;

  const options = checkInQuestions.map((question) => ({
    value: question.id,
    label: question.question,
  }));

  const notSelectedOptions = options.filter(
    ({ value }) => !checkInItemsInputField.value.some((item) => item?.itemId === value)
  );

  const value = options.find((option) => option.value === inputField.value?.itemId);

  const handleChange = (newValue: SingleValue<{ label: string; value: string }>) => {
    inputHelpers.setValue(
      newValue
        ? {
            itemId: newValue.value,
            itemType: CHECK_IN_ITEM_TYPES.CHECK_IN_QUESTION,
          }
        : null
    );

    submitForm();
  };

  return (
    <Select
      isClearable={true}
      menuPlacement='auto'
      menuPortalTarget={document.body}
      options={notSelectedOptions}
      placeholder={t('presentation.checkInQuestionsPlaceholder')}
      styles={{
        menu: () => ({
          position: 'absolute',
          right: 0,
        }),
      }}
      value={value}
      onChange={handleChange}
    />
  );
};
