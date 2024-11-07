import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import {
  CREATE_TASK_PRODUCT,
  TCreateTaskProductMutationInput,
} from '@dc/graphql/user/mutations/createTaskProduct';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { type TUserInfo } from '@pbl/graphql/user/queries/userInfo';

import useQueryParams from '@shared/hooks/useQueryParams';

type TContextProps = {
  editMode: boolean;
  isAssigned: boolean;
  isOwned: boolean;
  isOwner: boolean;
  projectId: string;
  createProductLoading: boolean;
  toggleEditMode: () => void;
  turnOffEditMode: () => void;
  addNewProduct: (input: TCreateTaskProductMutationInput['input']) => void;
};

const CustomizeProjectContext = createContext<TContextProps>({
  editMode: false,
  isAssigned: false,
  isOwned: false,
  isOwner: false,
  createProductLoading: false,
  projectId: '',
  toggleEditMode: () => {},
  turnOffEditMode: () => {},
  addNewProduct: () => {},
});

type TProviderProps = {
  children: ReactNode;
  id: string;
  isAssigned: boolean;
  ownerId: string;
};

export function CustomizeProjectProvider({
  children,
  id: projectId,
  isAssigned,
  ownerId,
}: TProviderProps) {
  const { params, updateQueryParams, removeQueryParams } = useQueryParams<{ editMode?: string }>();
  const {
    userInfo: { uuid },
  } = useUserInfo<TUserInfo>();
  const [createProduct, { loading: createProductLoading }] = useMutation(CREATE_TASK_PRODUCT);
  const [isOwner, setOwner] = useState(uuid === ownerId);
  const [editMode, setEditMode] = useState(params.editMode === 'true');
  const isOwned = !!ownerId;

  useEffect(() => {
    if (editMode) {
      updateQueryParams({ editMode: 'true' });
    } else {
      removeQueryParams(['editMode']);
    }
  }, [editMode]);

  const toggleEditMode = () => setEditMode((mode) => !mode);
  const turnOffEditMode = () => setEditMode(false);

  const addNewProduct = async (input: TCreateTaskProductMutationInput['input']) => {
    await createProduct({
      variables: { input },
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({
            id: input.taskId,
            __typename: 'Task',
          }),
          fields: {
            products(existingProducts = [], { toReference }) {
              const createdProduct = data?.createProduct?.product;
              const createdProductRef = toReference({
                __typename: 'Product',
                id: createdProduct?.id,
              });

              return [createdProductRef, ...existingProducts];
            },
          },
        });
      },
    });
  };

  useEffect(() => {
    setOwner(uuid === ownerId);
  }, [projectId, ownerId]);

  return (
    <CustomizeProjectContext.Provider
      value={{
        editMode,
        isAssigned,
        isOwner,
        isOwned,
        projectId,
        toggleEditMode,
        turnOffEditMode,
        addNewProduct,
        createProductLoading,
      }}>
      {children}
    </CustomizeProjectContext.Provider>
  );
}

export const useCustomizeProject = () => useContext(CustomizeProjectContext);

export default useCustomizeProject;
