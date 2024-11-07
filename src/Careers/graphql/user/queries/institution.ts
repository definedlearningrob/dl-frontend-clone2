import { gql } from '@apollo/client';

import { TInstitution as TBaseInstitution } from '@dc/resources/types';

export default gql`
  query UserInstitution($id: ID!, $track: Boolean) {
    institution(id: $id, track: $track) {
      id
      type
      name
      sizeType
      sizeDescription
      cost
      commonAppApplicationUrl
      imageUrl
      thumbnailUrl
      address {
        street
        city
        zip
        state
        stateCode
        area {
          kind
          type
        }
      }
      admissionRate
      satMathMin
      satMathMax
      satReadingMin
      satReadingMax
      actMin
      actMax
      studentFacultyRatio
      commonAppEnabled
      dates {
        deadlineDate
        decisionType
        term
      }
      degrees
      contact {
        phone
        urlAdmissions
        urlApplications
        urlFinancialAid
        urlNetPriceCalculator
        urlGeneral
      }
      isIpeds
    }
  }
`;

export type TInstitutionVariables = {
  id: string;
  track: boolean;
};

export type TInstitutionData = {
  institution: TBaseInstitution;
};
