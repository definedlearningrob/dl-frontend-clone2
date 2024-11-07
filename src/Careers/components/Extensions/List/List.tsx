import cx from 'classnames';
import { useEffect, useState } from 'react';
import { ObservableQueryFields } from '@apollo/client';

import GET_EXTENSIONS, {
  type TExtensionFieldsData,
  type TExtensionFieldsVariables,
  type TExtensionField,
} from '@dc/graphql/user/queries/extensionFields';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';

import useClearCacheKey from '@shared/hooks/useClearCacheKey';
import SharedInfiniteScrollContainer from '@shared/components/InfiniteScrollContainer/InfiniteScrollContainer';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { ToStringLiteral } from '@shared/utils/types';

import ExtensionsListItem from './Item/Item';
import styles from './List.module.sass';
import ExtensionsShowMoreModal from './ShowMoreModal/ShowMoreModal';

const EXTENSIONS_PER_PAGE = 15;

type Props = {
  filter: object;
  page: number;
  scope: ToStringLiteral<typeof ARCHIVABLE_STATUSES>;
  setPage: (page: number) => void;
};

const ExtensionsList = ({ filter, page, scope, setPage }: Props) => {
  const [selectedExtensionField, setSelectedExtensionField] = useState<TExtensionField | null>(
    null
  );
  const { clearCache } = useClearCacheKey();

  const onShowMore =
    (
      fetchMore:
        | ObservableQueryFields<TExtensionFieldsData, TExtensionFieldsVariables>['fetchMore']
        | undefined
    ) =>
    () => {
      const newPage = page + 1;

      fetchMore &&
        fetchMore({
          variables: { page: newPage, perPage: EXTENSIONS_PER_PAGE },
        });

      setPage(newPage);
    };

  const onShowMorePublished = (extension: TExtensionField) => {
    setSelectedExtensionField(extension);
  };

  useEffect(
    () => () => {
      clearCache('extensionFields');
    },
    []
  );

  return (
    <>
      <SharedDataLoader<TExtensionFieldsData, TExtensionFieldsVariables>
        options={{
          variables: {
            //@ts-ignore
            filter,
            page: page,
            perPage: EXTENSIONS_PER_PAGE,
            //@ts-ignore
            scope: scope.value,
          },
        }}
        query={GET_EXTENSIONS}>
        {({ extensionFields }, fetchMore) => (
          <SharedInfiniteScrollContainer
            className={cx(styles.list, 'dashboard-scroll')}
            fetchMore={onShowMore(fetchMore)}
            hasNextPage={extensionFields.pagesCount >= page}
            withScrollbar={true}>
            <ul className={styles.grid}>
              {extensionFields.nodes.map((extension) => (
                <ExtensionsListItem
                  key={extension.id}
                  extension={extension}
                  onShowMore={onShowMorePublished}
                />
              ))}
            </ul>
          </SharedInfiniteScrollContainer>
        )}
      </SharedDataLoader>
      {selectedExtensionField && (
        <ExtensionsShowMoreModal
          extension={selectedExtensionField}
          isOpen={!!selectedExtensionField}
          onDismiss={() => setSelectedExtensionField(null)}
        />
      )}
    </>
  );
};

export default ExtensionsList;
