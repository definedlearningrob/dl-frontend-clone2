import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import GET_EXTENSION_FIELD, {
  TExtensionFieldsData,
  TExtensionFieldsVariables,
} from '@dc/graphql/user/queries/extensionField';
import ExtensionFieldHeader from '@dc/components/Extensions/Header/Header';
import ExtensionsSettings from '@dc/components/Extensions/Settings/Settings';
import ExtensionFieldDetails from '@dc/components/Extensions/Details/Details';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { cleanInjection } from '@shared/utils/cleanInjection';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './Extension.module.sass';

const ExtensionFieldScreen = () => {
  const { id } = useParams<{ id: string }>();

  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <SharedDataLoader<TExtensionFieldsData, TExtensionFieldsVariables>
        options={{
          variables: {
            id,
          },
        }}
        query={GET_EXTENSION_FIELD}>
        {({
          extensionField,
          extensionField: { author, description, files, imageUrl, links, name },
        }) => (
          <div className={styles.layout}>
            <section className={styles.left}>
              <ExtensionFieldHeader
                image={imageUrl}
                owner={author}
                title={name}
                username={author.username}
              />
              <p
                className={styles.description}
                //eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={cleanInjection(description)}
              />
              <ExtensionFieldDetails files={files} links={links} />
            </section>
            <aside className={styles.right}>
              <ExtensionsSettings extension={extensionField} />
            </aside>
          </div>
        )}
      </SharedDataLoader>
    </SharedMainContent>
  );
};

export default ExtensionFieldScreen;
