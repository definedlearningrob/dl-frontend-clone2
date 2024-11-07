import { useField, useFormikContext } from 'formik';
import { BaseSyntheticEvent } from 'react';
import dayjs from 'dayjs';

import { ComboPrompt } from '@shared/components/ComboPrompt';
import { ResumeItemAttributes } from '@shared/resources/types';

export type Props = {
  item: ResumeItemAttributes;
  fieldName: string;
  onItemDelete: () => void;
  index: number;
  itemConfig: {
    placeholders: {
      description: string;
      name: string;
      period: string;
    };
  };
};

export const EditPortfolioCardItem = ({
  item,
  fieldName,
  onItemDelete,
  index,
  itemConfig,
}: Props) => {
  const fieldAddress = `${fieldName}.${index}`;

  const [, nameMeta] = useField<string>(`${fieldAddress}.name`);
  const [startedAtField, startedAtMeta] = useField<Date | null>(`${fieldAddress}.startedAt`);
  const [endedAtField] = useField<Date | null>(`${fieldAddress}.endedAt`);

  const { setFieldValue } = useFormikContext();

  const data = {
    periodStart: item.startedAt ? dayjs(item.startedAt).toDate() : null,
    periodEnd: item.endedAt ? dayjs(item.endedAt).toDate() : null,
    description: item.description,
    name: item.name,
    show: !!item.visible,
    ...(item.id && { id: item.id }),
  };

  const handleChange = (event: BaseSyntheticEvent) => {
    if (event.target.type === 'checkbox') {
      setFieldValue(event.target.name, event.target.checked);
    } else {
      setFieldValue(event.target.name, event.target.value);
    }
  };

  const handlePeriodChange = (dates: [Date, Date]) => {
    if (dates[0] instanceof Date) {
      setFieldValue(startedAtField.name, dayjs(dates[0]).format('YYYY-MM-DD'));
      setFieldValue(endedAtField.name, null);
    }

    if (dates[1] instanceof Date) {
      setFieldValue(endedAtField.name, dayjs(dates[1]).format('YYYY-MM-DD'));
    }
  };

  const errors = {
    name: nameMeta.touched ? nameMeta.error : undefined,
    period: startedAtMeta.touched ? startedAtMeta.error : undefined,
  };

  return (
    <li className='mb-base'>
      <ComboPrompt
        data={data}
        errors={errors}
        groupName={fieldAddress}
        handleChange={handleChange}
        handleDelete={onItemDelete}
        handlePeriodChange={handlePeriodChange}
        placeholders={itemConfig.placeholders}
        showPresent={true}
      />
    </li>
  );
};
