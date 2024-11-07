import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { ReactComponent as EmptyExploreMore } from '@pbl/images/empty_explore_more.svg';
import { TAlignedCoursesData } from '@pbl/graphql/fragments/course';

import SharedCard from '@shared/components/Card/Card';
import useQueryParams from '@shared/hooks/useQueryParams';
import SharedImage from '@shared/components/Image/Image';

import styles from './ExploreMoreCard.module.sass';

export type Props = {
  alignedCourses: TAlignedCoursesData;
  isPublic?: boolean;
};

const ExploreMoreCard = ({ alignedCourses, isPublic }: Props) => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    params: { code },
  } = useQueryParams<{ code?: string }>();
  const { state } = useLocation();
  const { t } = useTranslation();

  if (isEmpty(alignedCourses)) {
    return (
      <SharedCard className={styles.emptyCard}>
        <EmptyExploreMore className={styles.emptyCardImage} />
        <h6 className={styles.emptyCardTitle}>{t('courseDetails.emptyExploreMore')}</h6>
        <p>{t('courseDetails.noExternalLinks')}</p>
      </SharedCard>
    );
  }

  return (
    <SharedCard>
      <SharedCard.Header>
        <SharedCard.Title className={styles.title} size='medium'>
          {t('courseDetails.exploreMore')}
        </SharedCard.Title>
      </SharedCard.Header>
      <SharedCard.Body>
        <p>{t('courseDetails.exploreMoreIntroduction')}</p>
        <ul className={styles.list}>
          {alignedCourses.map(({ id, name }) => (
            <li key={id} className={styles.listItem}>
              <Link
                to={{
                  pathname: isPublic
                    ? `/shared/student/projects/${projectId}/courses/${id}`
                    : `/projects/${projectId}/courses/${id}`,
                  search: code && `?code=${code}`,
                  state,
                }}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.footerContainer}>
          <hr className={styles.divider} />
          <div className={styles.content}>
            <a
              href='https://services.onetcenter.org/'
              target='_blank'
              title={t('project.careersConnections.onetFooterTitle')}>
              <SharedImage
                alt={t('project.careersConnections.onetImgAlt')}
                className={styles.onetImage}
                src='https://www.onetcenter.org/image/link/onet-in-it.svg'
              />
            </a>
            <a href='https://services.onetcenter.org/' target='_blank'>
              {t('project.careersConnections.onetFooterLink', {
                symbol: '\u00AE',
                interpolation: { escapeValue: false },
              })}
            </a>
          </div>
        </div>
      </SharedCard.Body>
    </SharedCard>
  );
};

export default ExploreMoreCard;
