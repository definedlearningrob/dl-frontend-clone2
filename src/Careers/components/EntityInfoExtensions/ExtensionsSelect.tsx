import { useTranslation } from 'react-i18next';

import GET_EXTENSIONS_TO_ASSIGN from '@dc/graphql/user/queries/extensionFieldsToAssign';

import { DeprecatedAsyncSelect } from '@shared/components/DeprecatedAsyncSelect';

type Props = {
  assignedExtensionIds: string[];
  extension: any;
  setExtension: (extension: any) => void;
};

export const ExtensionsSelect = ({ assignedExtensionIds, extension, setExtension }: Props) => {
  const { t } = useTranslation();

  //eslint-disable-next-line react/prop-types
  const OptionComponent = ({ data }: { data: any }) => (
    <div data-testid='catalog-option'>
      <span>
        {/* eslint-disable-next-line react/prop-types */}
        {data.name}
      </span>
    </div>
  );

  // eslint-disable-next-line react/prop-types
  const SelectedValueComponent = ({ data }: { data: any }) => <span>{data.name}</span>;

  return (
    <DeprecatedAsyncSelect
      OptionComponent={OptionComponent}
      SelectedValueComponent={SelectedValueComponent}
      dataKey='extensionFields.nodes'
      filterIds={assignedExtensionIds}
      filterName='nameCont'
      label={`${t('entityInfo.extensionFields.extensions')}:`}
      name='extensionField'
      placeholder={t('common.placeholders.search')}
      query={GET_EXTENSIONS_TO_ASSIGN}
      queryOptions={{ fetchPolicy: 'no-cache' }}
      value={extension}
      valueKey='id'
      onChange={setExtension}
    />
  );
};
