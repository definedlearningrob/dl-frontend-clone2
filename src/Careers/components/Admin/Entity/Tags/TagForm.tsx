import { Form } from 'formik';
import { useMemo } from 'react';

import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import { TAGS } from '@dc/graphql/user/queries/tags';
import { TagsSelection } from '@dc/components/Admin/Entity/Tags/TagsSelection';
import { AddTagModal } from '@dc/components/Admin/Entity/Tags/Modal/AddTagModal';
import { SaveTagModal } from '@dc/components/Admin/Entity/Tags/Modal/SaveTagModal';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

type Props = {
  entityName: string;
  isSaveTagModalOpen: boolean;
  setIsSaveTagModalOpen: () => void;
  setIsNewTagModalOpen: () => void;
  isNewTagModalOpen: boolean;
};

export const TagForm = ({
  entityName,
  isSaveTagModalOpen,
  setIsSaveTagModalOpen,
  setIsNewTagModalOpen,
  isNewTagModalOpen,
}: Props) => (
  <Form>
    <FilterProvider omitUrl={true}>
      {({ SearchBar, filter }) => {
        const { tagsCont: nameCont } = filter;
        const variables = useMemo(
          () => ({
            filter: { nameCont },
          }),
          [nameCont]
        );

        return (
          <SharedPaginatedLoader
            omitUrl={true}
            options={{
              variables,
            }}
            query={TAGS}>
            {(props) => <TagsSelection SearchBar={SearchBar} pagingProps={props} />}
          </SharedPaginatedLoader>
        );
      }}
    </FilterProvider>
    {isNewTagModalOpen && <AddTagModal onClose={setIsNewTagModalOpen} />}
    {isSaveTagModalOpen && <SaveTagModal entityName={entityName} onClose={setIsSaveTagModalOpen} />}
  </Form>
);
