import { useState, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { TFunction, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import Details from '@dc/components/Admin/Courses/Form/Details/Details';
import Lessons from '@dc/components/Admin/Courses/Form/Lessons/Lessons';
import lessonsQuery, { TLessonsFilter } from '@dc/graphql/user/queries/lessons';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { getLessonLabel } from '@dc/utils/lessons';
import { LESSON_TYPES } from '@dc/resources/constants';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { BadgesSelector } from '@dc/components/Admin/BadgeManagement/BadgesSelector/BadgesSelector';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import Card from '@shared/components/Card/Card';

const getLessonTypeOptions = (t: TFunction<'translation'>) => {
  const allLessonsType = { value: null, label: t('common.fields.common.all') };
  const lessonTypes = Object.keys(LESSON_TYPES).map((key) => ({
    value: key.toLowerCase(),
    label: getLessonLabel(t, { type: key }),
  }));

  return [allLessonsType, ...lessonTypes];
};

type Props = {
  errors: {
    description: string;
    displayName: string;
    imageData: string;
    name: string;
    pathway: string;
    status: string;
  };
  touched: boolean;
  title: string;
};

export const AdminCoursesForm = ({ errors, touched, title }: Props) => {
  const { isSubmitting } = useFormikContext();
  const { t } = useTranslation();
  const history = useHistory();
  const [selectedLessonType, setSelectedLessonType] = useState(getLessonTypeOptions(t)[0]);

  const selectLessonType =
    (selectPage: (page: number) => void) => (type: { value: string; label: string }) => {
      selectPage(1);
      setSelectedLessonType(type);
    };

  const getLessonFilters = (providedFilters: TLessonsFilter) => {
    if (selectedLessonType.value) {
      return { ...providedFilters, typeEq: selectedLessonType.value };
    }

    return providedFilters;
  };

  useScrollToInvalidFormElement();

  return (
    <AdminFormWrapper data-testid='courses-form' title={title}>
      <Details errors={errors} touched={touched} />
      <FilterProvider omitUrl={true}>
        {({ SearchBar, clearFilter, filter }) => {
          const variables = useMemo(
            () => ({ filter: getLessonFilters(filter), scope: ARCHIVABLE_STATUSES.ACTIVE.value }),
            [filter, getLessonFilters]
          );

          return (
            <SharedPaginatedLoader
              omitUrl={true}
              options={{
                variables,
              }}
              query={lessonsQuery}>
              {(props) => (
                <Lessons
                  SearchBar={SearchBar}
                  clearFilter={clearFilter}
                  fieldName='lessons'
                  lessonTypeOptions={getLessonTypeOptions(t)}
                  pagingProps={props}
                  selectLessonType={selectLessonType}
                  selectedLessonType={selectedLessonType}
                />
              )}
            </SharedPaginatedLoader>
          );
        }}
      </FilterProvider>
      <Card>
        <BadgesSelector />
      </Card>
      <FormActions isLoading={isSubmitting} onCancel={history.goBack} />
    </AdminFormWrapper>
  );
};
