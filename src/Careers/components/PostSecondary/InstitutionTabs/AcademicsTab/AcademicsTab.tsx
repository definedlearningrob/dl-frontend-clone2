import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import { useState } from 'react';
import { isEmpty, omitBy, uniq } from 'lodash-es';
import { useUpdateEffect } from 'react-use';

import { TInstitution } from '@dc/resources/types';
import {
  PROGRAMS_PER_PAGE,
  useInstitutionPrograms,
} from '@dc/graphql/student/hooks/useInstitutionPrograms';
import { ProgramsDegree } from '@dc/graphql/student/queries/institutionPrograms';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import { InstitutionCard } from '../../InstitutionCard';

import { AcademicsTable } from './AcademicsTable';
import styles from './AcademicsTab.module.sass';
import { ProgramFilters } from './ProgramFilters';

type Props = {
  institution: TInstitution;
};

export type ProgramFilters = {
  degrees: ProgramsDegree[] | null;
  title: string | null;
};

export const AcademicsTab = ({ institution }: Props) => {
  const { t } = useTranslation();
  const { studentFacultyRatio, name, id } = institution;
  const {
    data: programsData,
    fetchMore,
    loading,
    refetch,
  } = useInstitutionPrograms({
    id,
    // Since the same query is used for both the initial load and filters
    // we need to store the first value of nodesCount to use as the total
    onCompleted: (data) => {
      if (programsCount === -1) {
        setProgramsCount(data.institution.programs.nodesCount);
      }
    },
  });
  const [programsCount, setProgramsCount] = useState(-1);
  const [page, setPage] = useState(() => {
    if (programsData) {
      const initialPage = Math.ceil(
        programsData.institution.programs.nodes.length / PROGRAMS_PER_PAGE
      );

      return initialPage;
    }

    return 1;
  });

  const [otherFilters, setOtherFilters] = useState<ProgramFilters>({
    degrees: null,
    title: null,
  });

  useUpdateEffect(() => {
    refetch({ filter: omitBy(otherFilters, isEmpty), page: 1, infiniteScroll: false });
    setPage(1);
  }, [otherFilters, refetch]);

  if (!programsData) return null;

  const hasMore = page * PROGRAMS_PER_PAGE < programsData.institution.programs.nodesCount;

  const facultyText = studentFacultyRatio
    ? ` ${t('postSecondary.institution.academicsFacultyRatio', { ratio: studentFacultyRatio })}`
    : '';

  const text =
    t('postSecondary.institution.academicsOffer', {
      name,
      count: programsCount,
    }) + facultyText;

  const tableData = programsData?.institution.programs.nodes.map((program) => ({
    name: program.title,
    degrees: uniq(program.degrees).join(', '),
  }));

  const loadMore = () => {
    // loadMore fn fires multiple times on threshold hit
    // with loading check we prevent multiple calls
    if (loading) return;
    const newPage = page + 1;

    fetchMore({
      variables: {
        page: newPage,
        infiniteScroll: true,
      },
    });

    setPage((prev) => prev + 1);
  };

  return (
    <InstitutionCard description={text} title={t('postSecondary.institution.academicsSummary')}>
      <section>
        <ProgramFilters loading={loading} setFilters={setOtherFilters} />
        <InfiniteScroll
          hasMore={hasMore}
          initialLoad={false}
          loadMore={loadMore}
          loader={
            <div className={styles.loader}>
              <SharedLoadingSpinner size='small' />
            </div>
          }
          pageStart={1}
          threshold={500}
          useWindow={true}>
          <AcademicsTable data={tableData} />
        </InfiniteScroll>
      </section>
    </InstitutionCard>
  );
};
