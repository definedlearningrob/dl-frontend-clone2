import { Highlight } from 'react-instantsearch-dom';
import { Hit } from 'react-instantsearch-core';
import { isEmpty } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { HitGrades } from '@pbl/components/User/ProjectSearch/Hits/HitGrades';

import { ReactComponent as ChevronRight } from '@shared/svg/chevron_right.svg';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';

import styles from './Hit.module.sass';

type Props = {
  hit: Hit;
};

const UserProjectSearchHitsHit = ({ hit }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const imageContainer = useRef<HTMLDivElement>(null);
  // @ts-ignore
  const unitsNames = hit.units.join(', ');
  const grades = hit.grades;
  const cardDataClass = cx(styles.cardData, {
    [styles.hidden]: isEmpty(grades) && isEmpty(unitsNames),
  });

  useEffect(() => {
    if (imageContainer.current) {
      imageContainer.current.style.backgroundImage = `url(${hit.image_url})`;
    }
  }, [imageContainer]);

  const goToProject = () => history.push(`/projects/${hit.objectID}`);

  return (
    <div className={styles.searchHitWrapper}>
      <div ref={imageContainer} className={styles.imageWrapper} />
      <div className={cardDataClass}>
        {/* @ts-ignore */}
        {!isEmpty(grades) && <HitGrades grades={grades} />}
        {!isEmpty(unitsNames) && (
          <DeprecatedTooltip className={styles.unitsTooltip} message={unitsNames} variant='dark'>
            <div className={styles.unitsSummary}>
              <p className={styles.unitName}>{unitsNames}</p>
            </div>
          </DeprecatedTooltip>
        )}
      </div>
      <h4 className={styles.itemName} data-testid='dashboard-course-item-name'>
        <Highlight attribute='display_name' hit={hit} />
      </h4>
      <p className={styles.description}>
        <Highlight attribute='description' hit={hit} />
        <SharedButton className={styles.descriptionLink} variant='link' onClick={goToProject}>
          {t('user.projectSearch.readMore')}
          <SharedIcon className={styles.chevronRightIcon} icon={<ChevronRight />} size='xs' />
        </SharedButton>
      </p>
    </div>
  );
};

export default UserProjectSearchHitsHit;
