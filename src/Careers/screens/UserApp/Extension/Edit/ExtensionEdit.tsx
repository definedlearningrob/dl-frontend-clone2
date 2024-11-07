import { useParams } from 'react-router-dom';

import ExtensionEdit from '@dc/components/Extensions/Edit/Edit';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import GET_EXTENSION, {
  type TExtensionFieldsData,
  TExtensionFieldsVariables,
} from '@dc/graphql/user/queries/extensionField';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

const ExtensionEditScreen = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <SharedMainContent>
      <SharedDataLoader<TExtensionFieldsData, TExtensionFieldsVariables>
        options={{ variables: { id } }}
        query={GET_EXTENSION}>
        {({ extensionField }) => <ExtensionEdit extension={extensionField} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
};

export default ExtensionEditScreen;
