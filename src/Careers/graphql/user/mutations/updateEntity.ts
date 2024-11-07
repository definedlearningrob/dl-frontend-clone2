import { gql, TypedDocumentNode } from '@apollo/client';

export const UPDATE_ENTITY: TypedDocumentNode<TUpdateEntityData, TUpdateEntityVariables> = gql`
  mutation UpdateEntity($input: UpdateEntityMutationInput!) {
    updateEntity(input: $input) {
      entity {
        uuid
        dcIconUrl
        dcLogoUrl
        dlIconUrl
        dlLogoUrl
        welcomeMessage {
          dcStudent
          dcTeacher
          dlStudent
          dlTeacher
        }
      }
    }
  }
`;

export type TUpdateEntityData = {
  entity: {
    uuid: string;
    dcIconUrl: string;
    dcLogoUrl: string;
    dlIconUrl: string;
    dlLogoUrl: string;
    welcomeMessage: {
      dcStudent: string;
      dcTeacher: string;
      dlStudent: string;
      dlTeacher: string;
    };
  };
};

export type LogoDetails = { uuid: string | null; filename: string | null; url: string };

export type TVariableMessage = {
  dcStudent: string;
  dcTeacher: string;
  dlStudent: string;
  dlTeacher: string;
};

export type UpdateEntityInput = {
  uuid: string;
  applyToHierarchy?: boolean;
  dcLogoUuid?: string | null;
  dcIconUuid?: string | null;
  dlLogoUuid?: string | null;
  dlIconUuid?: string | null;
  dcLogoFilename?: string | null;
  dcIconFilename?: string | null;
  dlLogoFilename?: string | null;
  dlIconFilename?: string | null;
  welcomeMessage?: TVariableMessage;
};

export type TUpdateEntityVariables = {
  input: UpdateEntityInput;
};
