import { useTranslation } from 'react-i18next';
import { ChangeEvent, useCallback } from 'react';
import { camelCase, debounce } from 'lodash-es';
import { CareerReviewSurveyAnswerContextTypes } from '@graphql/dc/users/types';
import { MultiValue } from 'react-select';

import { useCareerReviewSurveyResultsFilters } from '@dc/screens/UserApp/CareerReviewReport/useCareerReviewSurveyReportResultsFilters';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as SearchIcon } from '@shared/assets/icons/search.svg';
import { Select } from '@shared/components/Select';

type SelectOption = {
  label: string;
  value: CareerReviewSurveyAnswerContextTypes;
};

const DEBOUNCE_TIME = 700;

export const CareerReviewSurveyTableFilters = () => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  const { handleFilterChange, filters } = useCareerReviewSurveyResultsFilters();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('fullNameOrSisIdCont', event.target.value);
  };
  const debouncedSetFilter = useCallback(debounce(handleSearchChange, DEBOUNCE_TIME), []);

  const handleContextChange = (newSelection: MultiValue<SelectOption>) => {
    handleFilterChange(
      'contextTypeIn',
      newSelection.map((value) => value.value)
    );
  };

  const contextOptions = [
    {
      label: t('careerReviewSurveyReport.surveyReport.answers.course'),
      value: CareerReviewSurveyAnswerContextTypes.COURSE,
    },
    {
      label: t('careerReviewSurveyReport.surveyReport.answers.virtualInternship'),
      value: CareerReviewSurveyAnswerContextTypes.VIRTUAL_INTERNSHIP,
    },
    {
      label: t('careerReviewSurveyReport.surveyReport.answers.assessment'),
      value: CareerReviewSurveyAnswerContextTypes.ASSESSMENT,
    },
  ];

  return (
    <div className='flex gap-sm items-center bg-neutral-200 px-sm py-xs xxxl:px-base xxxl:py-x rounded-t-sm'>
      <TextInput
        Icon={SearchIcon}
        className='!w-[240px] xxxl:!w-[320px]'
        iconPlacement='end'
        placeholder={t('careerReviewSurveyReport.surveyReport.surveySearchPlaceholder')}
        size={isFullHD ? 'md' : 'sm'}
        onChange={debouncedSetFilter}
      />
      <Select
        className='w-[220px]'
        isMulti={true}
        options={contextOptions}
        size={isFullHD ? 'md' : 'sm'}
        value={filters.contextTypeIn.map((value) => ({
          label: t(
            `careerReviewSurveyReport.surveyReport.answers.${camelCase(value.toLowerCase())}`
          ),
          value,
        }))}
        onChange={handleContextChange}
      />
    </div>
  );
};
