import { isNil, omitBy } from 'lodash-es';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { OPPORTUNITY_APPLICATION_STATUS, VISIBILITY_SCOPE } from '@dc/resources/enums';

import { getDateWithCurrentTime } from '@shared/utils/date';

type PathwayOptions = {
  label: string;
  value: string;
}[];

export type FormValues = {
  entityUuids: {
    label: string;
    value: string;
  }[];
  automaticAcceptance: boolean;
  availableSpots: number;
  creditsOutcomes: string;
  name: string;
  description: string;
  image: string;
  opportunityType: { label: string; value: OpportunityTypes } | null;
  pathways: PathwayOptions;
  location: string | null;
  salaryInformation: string | null;
  tags: {
    label: string;
    value: string;
  }[];
  visibilityScope: VISIBILITY_SCOPE;
  deadline: Date | null;
  periodEnd: Date | null;
  periodStart: Date | null;
  partner: { label: string; value: string } | null;
  imageData?: { url?: string | null; file?: File; urlForUpload?: string; uuid?: string };
  imageFitToContainer: boolean;
};

type NullableFields = 'opportunityType' | 'deadline' | 'periodStart' | 'periodEnd';

export type InitialFormValues = {
  [Key in keyof FormValues]: Key extends NullableFields ? FormValues[Key] | null : FormValues[Key];
};

type ParseFormDataParams = Omit<FormValues, 'image'>;
type ParsedValues = Omit<
  ParseFormDataParams,
  'tags' | 'opportunityType' | 'deadline' | 'periodStart' | 'periodEnd'
>;

export const parseOpportunityFormData = ({
  tags,
  opportunityType,
  deadline,
  periodStart,
  periodEnd,
  partner,
  ...values
}: ParseFormDataParams) => {
  const parsedTags = tags.map((tag) => tag.value);
  const parsedAutomaticAcceptance = values.automaticAcceptance === true;
  const parsedValues = omitBy(values, isNil) as ParsedValues;
  const parsedOpportunityType = opportunityType!.value || null;

  // INFO: react-datepicker sets time to 00:00:00 by default, which causes problems with ISO string (previous day is set due to timezone change)
  const parsedDeadline = deadline ? getDateWithCurrentTime(deadline) : null;
  const parsedPeriodStart = periodStart ? getDateWithCurrentTime(periodStart!) : null;
  const parsedPeriodEnd = periodEnd ? getDateWithCurrentTime(periodEnd!) : null;

  return {
    ...parsedValues,
    automaticAcceptance: parsedAutomaticAcceptance,
    opportunityType: parsedOpportunityType,
    tags: parsedTags,
    deadline: parsedDeadline,
    periodStart: parsedPeriodStart,
    periodEnd: parsedPeriodEnd,
    partnerId: partner?.value || null,
  };
};

export const newMappedApplicationStatus = {
  [OPPORTUNITY_APPLICATION_STATUS.ACCEPTED]: OPPORTUNITY_APPLICATION_STATUS.STARTED,
  [OPPORTUNITY_APPLICATION_STATUS.FINISHED]: OPPORTUNITY_APPLICATION_STATUS.STARTED,
  [OPPORTUNITY_APPLICATION_STATUS.STARTED]: OPPORTUNITY_APPLICATION_STATUS.FINISHED,
  [OPPORTUNITY_APPLICATION_STATUS.PENDING]: null,
  [OPPORTUNITY_APPLICATION_STATUS.REJECTED]: null,
  [OPPORTUNITY_APPLICATION_STATUS.EXPIRED]: null,
};
