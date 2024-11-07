/*eslint-disable react/no-danger */
import { isEmpty } from 'lodash-es';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useVirtualInternshipQuery } from '@dc/graphql/user/hooks/useVirtualInternshipQuery';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { Lesson, TPathway } from '@dc/components/Admin/VirtualInternships/types';

import Heading from '@shared/components/Heading/Heading';
import Link from '@shared/components/Link';
import SharedCard from '@shared/components/Card/Card';
import { cleanInjection } from '@shared/utils/cleanInjection';

import styles from './VirtualInternshipScreen.module.sass';

export const VirtualInternshipScreen = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useVirtualInternshipQuery({ id });

  if (loading || !data) return null;

  const {
    virtualInternship: {
      requiredExperiences,
      status,
      opportunity: {
        name,
        description,
        imageUrl,
        opportunityType,
        creditsOutcomes,
        availableSpots,
        pathways,
      },
      calendarLessons,
      experienceOpportunityLessons,
      postExperienceLessons,
      readinessSkillsLessons,
    },
  } = data;

  const parsePathwayNames = pathways.map((pathway: TPathway) => pathway.name).join(', ');
  const getLessonNames = (lessons: Lesson[]) => lessons.map((lesson) => lesson.name).join(', ');

  return (
    <SharedMainContent>
      <header className={styles.header}>
        <Heading>{t('admin.virtualInternship.singleHeader')}</Heading>
        <Link to={`/admin/virtual-internships/${id}/edit`} variant='primary'>
          {t('common.actions.edit')}
        </Link>
      </header>
      <SharedCard>
        <SharedCard.Body className={styles.body}>
          <img alt='opportunity image' className={styles.image} src={imageUrl} />
          <div>
            <SharedCard.Title size='small'>{name}</SharedCard.Title>
            <p dangerouslySetInnerHTML={cleanInjection(description)} />
            <ul>
              <li>{t('admin.virtualInternship.form.status', { status })}</li>
              <li>{t('admin.virtualInternship.form.opportunityType', { opportunityType })}</li>
              <li>
                {t('admin.virtualInternship.form.requiredExperiences', { requiredExperiences })}
              </li>
              <li>{t('admin.virtualInternship.form.availableSpots', { availableSpots })}</li>
              <li>
                {`${t('admin.virtualInternship.creditsOutcomes')}:`}
                <span dangerouslySetInnerHTML={cleanInjection(creditsOutcomes)} />
              </li>
              <li>
                {t('admin.virtualInternship.form.pathways', {
                  pathways: parsePathwayNames,
                })}
              </li>
              {!isEmpty(calendarLessons) && (
                <li className={styles.lessons}>
                  {t('admin.virtualInternship.form.calendarLessons', {
                    calendarLessons: getLessonNames(calendarLessons),
                  })}
                </li>
              )}
              {!isEmpty(experienceOpportunityLessons) && (
                <li className={styles.lessons}>
                  {t('admin.virtualInternship.form.experienceOpportunityLessons', {
                    experienceOpportunityLessons: getLessonNames(experienceOpportunityLessons),
                  })}
                </li>
              )}
              {!isEmpty(postExperienceLessons) && (
                <li className={styles.lessons}>
                  {t('admin.virtualInternship.form.postExperienceLessons', {
                    postExperienceLessons: getLessonNames(postExperienceLessons),
                  })}
                </li>
              )}
              {!isEmpty(readinessSkillsLessons) && (
                <li className={styles.lessons}>
                  {t('admin.virtualInternship.form.readinessSkillsLessons', {
                    readinessSkillsLessons: getLessonNames(readinessSkillsLessons),
                  })}
                </li>
              )}
            </ul>
          </div>
        </SharedCard.Body>
      </SharedCard>
    </SharedMainContent>
  );
};
