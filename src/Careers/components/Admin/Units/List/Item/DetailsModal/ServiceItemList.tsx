import { useTranslation } from 'react-i18next';

import { TUnit } from '@dc/graphql/user/queries/unit';

import { SERVICE_NAME } from '@shared/resources/enums';

type Props = {
  unit: TUnit;
};

const serviceType = {
  [SERVICE_NAME.LEARNING]: 'tasks',
  [SERVICE_NAME.CAREERS]: 'resources',
} as const;

export const ServiceItemList = ({ unit }: Props) => {
  const { t } = useTranslation();

  const serviceItems = unit.service;

  const unitServiceType = serviceType[serviceItems];

  const itemList = unit[unitServiceType];

  return (
    <div>
      <h3 className='admin-preview-modal-heading'>{t(`admin.units.tasks.${unitServiceType}`)}</h3>
      <ul>
        {itemList.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
