import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useWizard } from 'react-use-wizard';

import useStandardTasks from '@pbl/graphql/user/hooks/useStandardTasks';
import StandardSearchResult from '@pbl/components/User/StandardSearch/StandardSearchResult';
import CoursesSkeleton from '@pbl/components/User/Dashboard/Courses/Skeleton/CoursesSkeleton';
import { EmptyStandard } from '@pbl/components/User/StandardSearch/EmptyStandard/EmptyStandard';
import EmptyProject from '@pbl/assets/icons/white_empty_project.svg';
import ActionButtons from '@pbl/components/User/StandardSearch/ActionButtons/ActionButtons';
import { TagList } from '@pbl/components/User/StandardSearch/TagList/TagList';

import useStandardSearch from '@shared/hooks/useStandardSearchContext';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './FourthStep.module.sass';

const FourthStep = () => {
  const { setBackNavButton } = useNavigation();
  const { standardsSearchState } = useStandardSearch();
  const { previousStep } = useWizard();

  const { t } = useTranslation();
  const { data, loading } = useStandardTasks(standardsSearchState.selectedStandard.uuid);
  const history = useHistory();

  useEffect(() => {
    setBackNavButton(true, null, `${t('user.standardSearch.back')}`, previousStep);

    return () => setBackNavButton(false);
  }, []);

  const isDataEmpty = isEmpty(data?.standardTasks);
  const goToCourse = (id: string) => history.push(`/projects/${id}`);

  const tags = [
    [t('user.standardSearch.subject'), standardsSearchState.selectedSubject],
    [t('user.standardSearch.grade'), standardsSearchState.selectedGrade],
    [t('user.standardSearch.standard'), standardsSearchState.selectedStandard.label],
  ];

  return (
    <div className={styles.main}>
      <div className={styles.catalogNav}>
        <div className={styles.catalogHead}>
          <div className={styles.headWrapper}>
            <h4 className={styles.heading}>
              {t('user.standardSearch.result', { count: data?.standardTasks.length })}
            </h4>
            <TagList tags={tags} variant='light' />
          </div>
        </div>
        {loading && <CoursesSkeleton />}
        {!loading && isDataEmpty && (
          <>
            <EmptyStandard
              errorSubtitle={t('user.standardSearch.fourthCardSet.errorSubtitle')}
              errorText={t('user.standardSearch.fourthCardSet.errorText')}
              hasElements={isDataEmpty}
              image={EmptyProject}
            />
            <div className={styles.footerContainer}>
              <ActionButtons canGoForward={false} isDataEmpty={isDataEmpty} />
            </div>
          </>
        )}
        {!isDataEmpty && (
          <ul className='user-dashboard-courses grid grid-cols-4 gap-sm'>
            {data?.standardTasks.map((course) => (
              <div key={course.id}>
                <StandardSearchResult course={course} onClick={goToCourse} />
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FourthStep;
