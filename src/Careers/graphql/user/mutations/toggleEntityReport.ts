import { gql, TypedDocumentNode } from '@apollo/client';

import { ReportType } from '@shared/resources/enums';

export const TOGGLE_ENTITY_REPORT: TypedDocumentNode<
  TToggleEntityReportData,
  TToggleEntityReportVariables
> = gql`
  mutation ToggleEntityReport($input: ToggleEntityReportTypeAvailabilityMutationInput!) {
    toggleEntityReportTypeAvailability(input: $input) {
      entity {
        uuid
        reportTypes
        children {
          nodes {
            uuid
            reportTypes
          }
        }
      }
    }
  }
`;

export type TToggleEntityReportInput = {
  entityUuid: string;
  reportType: ReportType;
  value: boolean;
  applyToHierarchy: boolean;
};

export type TToggleEntityReportData = {
  toggleEntityReportTypeAvailability: {
    entity: {
      uuid: string;
      reportTypes: ReportType[];
      children: {
        nodes: {
          uuid: string;
          reportTypes: ReportType[];
        }[];
      };
    };
  };
};

export type TToggleEntityReportVariables = {
  input: TToggleEntityReportInput;
};
