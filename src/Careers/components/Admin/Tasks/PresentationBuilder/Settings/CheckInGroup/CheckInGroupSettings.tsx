import { useCheckInGroupsOverviewQuery } from '@graphql/shared/users/hooks';
import { useParams } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { CHECK_IN_ITEM_TYPES } from '@pbl/resources/enums';

import { Select } from '@shared/components/Select';
import { handleError } from '@shared/utils/handleError';

import { CheckInGroupOption } from './CheckInGroupOption';

export type CheckInGroupSelectOption = {
  label: string;
  value: string;
  data: { name: string; displayName: string | null };
};

export const CheckInGroupSettings = () => {
  const { currentSlide, updateSlide } = usePresentationBuilder();
  const { t } = useTranslation();

  const { taskId, projectId } = useParams<{ taskId: string; projectId: string }>();

  const { data } = useCheckInGroupsOverviewQuery({ variables: { id: taskId || projectId } });

  if (!data || !currentSlide) return null;

  const options = data?.task?.checkInGroups.map((checkInGroup) => {
    const label = checkInGroup.displayName
      ? `${checkInGroup.name} - ${checkInGroup.displayName}`
      : checkInGroup.name;

    return {
      value: checkInGroup.id,
      data: { name: checkInGroup.name, displayName: checkInGroup.displayName },
      label,
    };
  });

  const handleChange = async (option: SingleValue<CheckInGroupSelectOption>) => {
    const checkInItems = option?.value
      ? [{ itemType: CHECK_IN_ITEM_TYPES.CHECK_IN_GROUP, itemId: option.value }]
      : [];

    try {
      await updateSlide({
        variables: {
          input: {
            id: currentSlide!.id,
            checkInItems: checkInItems,
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  };

  const currentValue =
    options?.find((option) => option.value === currentSlide?.checkInGroups?.[0]?.id) || null;

  return (
    <div key={currentSlide.id} className='animate-fadeDropIn ]'>
      <div>
        <h6>{t('presentation.checkInGroup')}</h6>
        <Select<CheckInGroupSelectOption>
          components={{
            Option: (props) => <CheckInGroupOption {...props} size='md' />,
          }}
          isClearable={true}
          menuPortalTarget={document.body}
          options={options}
          placeholder={t('presentation.checkInGroupPlaceholder')}
          styles={{
            menu: () => ({
              position: 'absolute',
              right: 0,
            }),
          }}
          value={currentValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
