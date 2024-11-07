import { gql } from '@apollo/client';

import { TInstitution as TBaseInstitution } from '@dc/resources/types';

export default gql`
  query Institution($id: ID!, $track: Boolean) {
    institution(id: $id, track: $track) {
      id
      type
      applicationType
      applicationId
      name
      size
      sizeType
      sizeDescription
      hasApplied
      cost
      commonAppApplicationUrl
      imageUrl
      isFavorite
      maxTeacherEval
      minTeacherEval
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
  track?: boolean;
};

export type TInstitutionData = {
  institution: TBaseInstitution;
};
